/*
Copyright 2020 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it. If you have received this file from a source other than Adobe,
then your use, modification, or distribution of it requires the prior
written permission of Adobe. 
*/
import LrSession from '../../common/lr/LrSession.mjs'
import LrUtils from '../../common/lr/LrUtils.mjs'
import Directory from '../common/file/Directory.mjs'
import path from 'path'

async function _projectFromDirP(lr, dirPath, parentId) {
	let origs = await Directory.filesP(dirPath)
	let assets = await Directory.uploadFilesP(lr, origs)
	let name = path.basename(dirPath) // name project the same as the directory
	let projectId = await lr.createAlbumP('project', name, parentId, `${name}.remoteId`)
	await lr.addAssetsToAlbumP(projectId, assets)
	return projectId
}

async function mainP(dirPath) {
	if (!dirPath) {
		console.log('usage: connectdir <directory>')
		return
	}
	let lr = await LrSession.currentContextP()

	// create a project set to hold the project; named with a timestamp
	let rootName = new Date().toISOString()
	let parentId = await lr.createAlbumP('project_set', rootName, null, `${rootName}.remoteId`)
	let projectId = await _projectFromDirP(lr, dirPath, parentId)

	// print out the results
	console.log(`created project set: { id: ${parentId}, name: ${rootName} }`)
	let project = await lr.getAlbumP(projectId)
	await LrUtils.logAlbumP(lr, project)
}

let dirPath = process.argv[2]
mainP(dirPath).then(() => console.log('done')).catch(e => console.error(e))
