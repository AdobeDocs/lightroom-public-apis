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

async function mainP(name, remoteId) {
	if (!name || !remoteId) {
		console.log('usage: createproject <name> <remote identifier>')
		return
	}
	let lr = await LrSession.currentContextP()
	let albumId = await lr.createAlbumP('project', name, null, remoteId)
	console.log(`created project: ${albumId}`)
}

mainP(process.argv[2], process.argv[3]).then(() => console.log('done')).catch(e => console.error('error:', e))
