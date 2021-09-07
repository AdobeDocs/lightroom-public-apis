/*
Copyright 2020 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it. If you have received this file from a source other than Adobe,
then your use, modification, or distribution of it requires the prior
written permission of Adobe. 
*/
let LrUtils = {
	getAssetAspectRatio: (asset) => {
		if (asset.payload.develop) {
			let width = asset.payload.develop.croppedWidth
			let height = asset.payload.develop.croppedHeight
			if (width && height) {
				return width / height
			}
		}
		else {
			let width = asset.payload.importSource.originalWidth
			let height = asset.payload.importSource.originalHeight
			if (width && height) {
				return width / height
			}
		}
		return 4 / 3
	},

	logAlbumAssetsP: async (lr, album, offset = '') => {
		let albumAssets = await lr.getAlbumAssetsP(album.id)
		albumAssets.forEach((albumAsset) => {
			let assetId = albumAsset.asset.id
			let remoteId = albumAsset.payload.publishInfo ? albumAsset.payload.publishInfo.remoteId : undefined
			console.log(`${offset}{ id: ${assetId}, remoteId: ${remoteId} }`)
		})
	},

	logAlbumP: async (lr, album, offset = '') => {
		let name = album.payload.name
		let remoteId = album.payload.publishInfo ? album.payload.publishInfo.remoteId : undefined
		console.log(`${offset}${album.subtype} { id: ${album.id}, name: ${name}, remoteId: ${remoteId} }`)
		if (album.subtype == 'project') {
			await LrUtils.logAlbumAssetsP(lr, album, offset + '  ')
		}
	},

	logAlbumHierarchyP: async (lr, node, offset = '') => {
		if (node.data) {
			await LrUtils.logAlbumP(lr, node.data, offset)
		}
		else {
			console.log('root')
		}
		if (node.folders || node.albums) {
			for (const inode of node.folders) {
				await LrUtils.logAlbumHierarchyP(lr, inode, offset + '  ')
			}
			for (const inode of node.albums) {
				await LrUtils.logAlbumHierarchyP(lr, inode, offset + '  ')
			}
		}
	},

	createAlbumHierarchy: (subtype, name, albums) => {
		let root = {
			name,
			folders: [],
			albums: []
		}

		albums.sort((a, b) => { // alphabetical sort, with sets first
			if (a.subtype != b.subtype) {
					return a.subtype > b.subtype ? -1 : 1
				}
				return a.payload.name < b.payload.name ? -1 : 1
		})

		let inodeHash = {}
		albums.forEach((album) => {
			if (album.subtype == subtype) {
				inodeHash[album.id] = {
					name: album.payload.name,
					folders: [],
					albums: [],
					data: album
				}
			}
		})

		albums.forEach((album) => {
			let parent = (album.payload.parent && inodeHash[album.payload.parent.id]) || root
			let inode = inodeHash[album.id]
			if (inode) {
				inode.parent = parent
				parent.folders.push(inode)
			}
			else {
				parent.albums.push({
					parent,
					name: album.payload.name,
					folders: [],
					albums: [],
					data: album
				})
			}
		})

		return root
	},

	getRootCollectionSetP: async (lr) => {
		let albums = await lr.getAlbumsP('collection_set%3Bcollection')
		return LrUtils.createAlbumHierarchy('collection_set', 'Albums', albums)
	},

	getRootProjectSetP: async (lr) => {
		let albums = await lr.getAlbumsP('project_set%3Bproject')
		return LrUtils.createAlbumHierarchy('project_set', 'Projects', albums)
	}
}

export default LrUtils
