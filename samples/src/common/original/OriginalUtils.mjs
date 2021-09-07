/*
Copyright 2020 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it. If you have received this file from a source other than Adobe,
then your use, modification, or distribution of it requires the prior
written permission of Adobe. 
*/
import CryptoUtils from '../crypto/CryptoUtils.mjs'

let _subtypeGuess = function(fileext) {
	let videoExts = [
		'.mp4',
		'.MP4',
		'.mov',
		'.MOV',
		'.avi',
		'.AVI',
		'.mpg',
		'.MPG',
		'.m4v',
		'.M4V'
	]
	return videoExts.find((ext) => ext == fileext) ? 'video' : 'image'
}

let OriginalUtils = {
	create: (path, parent, name, size, streamP) => {
		let index = name.lastIndexOf('.')
		let ext = (index < 1 || index === 0) ? '' : name.substring(index) // emulate node path.extname
		let subtype = _subtypeGuess(ext)
		let mime = subtype == 'video' ? 'application/octet-stream;video' : 'application/octet-stream' // or 'video/*'
		return {
			model: {
				path,
				parent,
				name,
				ext,
				mime,
				subtype,
				size,
			},
			streamP
		}
	},

	uploadP: async (lr, orig) => {
		let model = orig.model

		// compute the sha256 to check if there are duplicates
		let sha256 = await CryptoUtils.sha256P(orig.streamP)

		// create a new asset; if there is a duplicate, return the duplicate asset id
		let assetId
		try {
			assetId = await lr.createRevisionP(model.subtype, model.name, model.size, sha256)
		} catch(err) {
			if (err.statusCode != 412) {
				throw err
			}
			console.log('skipped upload (returning first duplicate)')
			let revision = err.error.revisions[0]
			return revision.links['/rels/asset'].href.match(/assets\/([a-f0-9]{32})\/?/)[1]
		}

		// upload the bits; if there is a failure, the asset is 'incomplete'
		try {
			await lr.putOriginalP(assetId, model.mime, model.size, orig.streamP)
		}
		catch (err) {
			console.log(`error on upload left an incomplete asset: ${assetId}`) // should retry
			throw(err)
		}
		return assetId
	}
}

export default OriginalUtils
