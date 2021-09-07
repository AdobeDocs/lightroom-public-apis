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
import FileUtils from '../../common/file/FileUtils.mjs'

async function mainP(albumId) {
	let lr = await LrSession.currentContextP()
	let album = await lr.getAlbumP(albumId)
	let buffer = await lr.getAlbumCoverP(album)
	if (buffer) {
		let name = `${albumId}.thumb.jpg`
		await FileUtils.writeBufferToFileP(buffer, name)
		console.log('success: ', name)
	}
	else {
		console.log('success: no album cover')
	}
}

mainP(process.argv[2]).then(() => console.log('done')).catch(e => console.error('error:', e))
