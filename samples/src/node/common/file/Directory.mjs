/*
Copyright 2020 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it. If you have received this file from a source other than Adobe,
then your use, modification, or distribution of it requires the prior
written permission of Adobe. 
*/
import fs from 'fs'
import path from 'path'
import File from './File.mjs'
import OriginalUtils from '../../../common/original/OriginalUtils.mjs'

let Directory = {
	filesP: async function(dirPath) {
		let entries = await fs.promises.readdir(dirPath, { withFileTypes: true })
		let files = entries.filter((entry) => !entry.isDirectory())
		files = files.filter((file) => !(/^\./).test(file.name)) // skip hidden
		return Promise.all(files.map((file) => File.originalP(path.join(dirPath, file.name))))
	},

	uploadFilesP: async function(lr, origs) {
		let assets = []
		for (const orig of origs) {
			let assetId = await OriginalUtils.uploadP(lr, orig) // could be parallel
			assets.push( { id: assetId, remoteId: orig.model.path })
		}
		return assets
	}
}

export default Directory
