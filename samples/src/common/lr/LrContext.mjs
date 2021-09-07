/*
Copyright 2020 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it. If you have received this file from a source other than Adobe,
then your use, modification, or distribution of it requires the prior
written permission of Adobe. 
*/
import LrRequestor from './LrRequestor.mjs'
import CryptoUtils from '../crypto/CryptoUtils.mjs'

class LrContext {
	constructor(session, account, catalog) {
		this.account = account
		this.catalog = catalog
		this.chunkSize = 20 * 1024 * 1024 // minimum chunk size of 32K except last one

		this._session = session
		this._accountId = account.id
		this._catalogId = catalog.id
	}

	getFirstPageOfAssetsP() {
		let path = `/v2/catalogs/${this._catalogId}/assets?subtype=image%3Bvideo`
		return LrRequestor.getP(this._session, path).then((response) => response.resources)
	}

	getFirstAssetP() {
		let path = `/v2/catalogs/${this._catalogId}/assets?subtype=image%3Bvideo&limit=1`
		return LrRequestor.getP(this._session, path)
	}

	getAssetP(assetId) {
		let path = `/v2/catalogs/${this._catalogId}/assets/${assetId}`
		return LrRequestor.getP(this._session, path)
	}

	getIncompletesP() {
		let path = `/v2/catalogs/${this._catalogId}/assets?subtype=image%3Bvideo&exclude=complete`
		return LrRequestor.getPagedP(this._session, path)
	}

	async createRevisionP(subtype, name, size, sha256) {
		let assetId = await CryptoUtils.uuidP()
		let path = `/v2/catalogs/${this._catalogId}/assets/${assetId}`
		let importTimestamp = (new Date()).toISOString()
		let content = {
			subtype: subtype,
			payload: {
				captureDate: '0000-00-00T00:00:00',
				userCreated: importTimestamp,
				userUpdated: importTimestamp,
				importSource: {
					fileName: name,
					importTimestamp: importTimestamp,
					importedBy: this._accountId,
					importedOnDevice: this._session.apiKey
				}
			}
		}
		if (subtype == 'video') {
			content.payload.importSource.contentType = 'video/*'
			if (size) {
				content.payload.importSource.fileSize = size
			}
			if (sha256) {
				content.payload.importSource.sha256 = sha256
			}
		}
		await LrRequestor.putUniqueP(this._session, path, content, sha256) // 412 error if duplicate revision

		return assetId
	}

	getAlbumsP(subtype) {
		let path = `/v2/catalogs/${this._catalogId}/albums?subtype=${subtype}`
		return LrRequestor.getPagedP(this._session, path).then((response) => {
			let albums = response.resources
			albums.forEach(resource => resource.base = response.base)
			return response.resources
		})
	}

	getAlbumP(albumId) {
		let path = `/v2/catalogs/${this._catalogId}/albums/${albumId}`
		return LrRequestor.getP(this._session, path)
	}

	async getFirstAlbumAssetP(albumId) {
		let path = `/v2/catalogs/${this._catalogId}/albums/${albumId}/assets?subtype=image%3Bvideo&embed=asset&order_after=-&limit=1`
		let response = await LrRequestor.getP(this._session, path)
		return response.resources[0]
	}

	getAlbumAssetsP(albumId) {
		let path = `/v2/catalogs/${this._catalogId}/albums/${albumId}/assets?subtype=image%3Bvideo&embed=asset&order_after=-`
		return LrRequestor.getPagedP(this._session, path).then(response => response.resources)
	}

	async getAlbumCoverP(album) {
		if (album.links['/rels/cover_asset']) {
			let assetId = album.links['/rels/cover_asset'].href.match(/assets\/([a-f0-9]{32})\/?/)[1]
			return this.getAssetRenditionP(assetId, 'thumbnail2x')
		}
	}

	async getAlbumCoverOrFallbackAssetIdP(album) {
		if (album.links['/rels/cover_asset']) {
			return album.links['/rels/cover_asset'].href.match(/assets\/([a-f0-9]{32})\/?/)[1]
		}
		let albumAsset = await this.getFirstAlbumAssetP(album.id) // first asset
		return albumAsset?.asset.id  // undefined if the album is empty
	}

	async createAlbumP (subtype, name, parentId, remoteId) {
		let albumId = await CryptoUtils.uuidP()
		let path = `/v2/catalogs/${this._catalogId}/albums/${albumId}`
		let importTimestamp = (new Date()).toISOString()
		let content = {
			subtype: subtype,
			serviceId: this._session.apiKey,
			payload: {
				userCreated: importTimestamp,
				userUpdated: importTimestamp,
				name: name
			}
		}
		if (parentId) {
			content.payload.parent = {
				id: parentId
			}
		}
		if (remoteId) {
			content.payload.publishInfo = {
				created: importTimestamp,
				updated: importTimestamp,
				remoteId: remoteId
			}
		}
		await LrRequestor.putP(this._session, path, content)
		return albumId
	}

	deleteAlbumP = function(albumId) {
		let path = `/v2/catalogs/${this._catalogId}/albums/${albumId}`
		return LrRequestor.deleteP(this._session, path)
	}

	putOriginalP(assetId, mime, size, streamP) {
		let path = `/v2/catalogs/${this._catalogId}/assets/${assetId}/master`
		let chunkHandlerP = (data, offset) => {
			console.log(`Received ${data.byteLength} bytes of data at ${offset}`)
			return LrRequestor.putChunkP(this._session, path, mime, data, offset, size)
		}
		return streamP(this.chunkSize, chunkHandlerP)
	}

	async addAssetsToAlbumP(albumId, assets) {
		// assets is an array of { id: assetId, remoteId: remoteId }
		let albumAssets = assets.map((asset) => {
			let resource = {
				id: asset.id
			}
			if (asset.remoteId) {
				let importTimestamp = (new Date()).toISOString()
				resource.payload = {
					userCreated: importTimestamp,
					userUpdated: importTimestamp,
					publishInfo: {
						remoteId: asset.remoteId
					}
				}
			}
			return resource
		})
		let path = `/v2/catalogs/${this._catalogId}/albums/${albumId}/assets`
		for (let len = albumAssets.length, i = 0; i < len; i += 50) { // maximum chunk size of 50
			let content = { resources: albumAssets.slice(i, i + 50) }
			let count = content.resources.length
			try {
				await LrRequestor.putP(this._session, path, content)
			} catch (err) {
				if (err.statusCode != 403) {
					throw err
				}
				// recover from error where all assets are already in the album; treat as success
				let response = err.error
				if (count != response.errors.filter((error) => error.subtype == 'ResourceExistsError').length) {
					throw err
				}
				console.log('add assets: all assets in chunk are already in album')
			}
		}
	}

	async existsP(path) {
		try {
			await LrRequestor.headP(this._session, path)
			return true
		} catch (err) {
			if (err.statusCode != 404) {
				throw err
			}
			return false
		}
	}

	async waitForP(path) {
		let sleep = () => new Promise(resolve => setTimeout(resolve, 3000)) // 3 sec
		let retries = 10
		for (let i = 0; i < retries; i++) {
			console.log(`try ${i}: sleeping...`)
			await sleep()
			console.log(`try ${i}: checking`)
			if (await this.existsP(path)) {
				console.log(`try ${i}: exists`)
				return path
			}
		}
		throw new Error(`timed out on: ${path}`)
	}

	getAssetRenditionP(assetId, type) {
		let path = `/v2/catalogs/${this._catalogId}/assets/${assetId}/renditions/${type}`
		return LrRequestor.getP(this._session, path)
	}

	waitForRenditionP(assetId, type) {
		let path = `/v2/catalogs/${this._catalogId}/assets/${assetId}/renditions/${type}`
		return this.waitForP(path)
	}

	assetRenditionExistsP(assetId, type) {
		let path = `/v2/catalogs/${this._catalogId}/assets/${assetId}/renditions/${type}`
		return this.existsP(path)
	}

	async generateRenditionP(assetId, type) {
		let path = `/v2/catalogs/${this._catalogId}/assets/${assetId}/renditions`
		let response = await LrRequestor.genP(this._session, path, type)

		let link = response.links[`/rels/rendition_type/${type}`]
		return `/v2/catalogs/${this._catalogId}/${link.href}` // return the path
	}
}

export default LrContext
