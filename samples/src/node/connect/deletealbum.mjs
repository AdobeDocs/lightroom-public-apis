import LrSession from '../../common/lr/LrSession.mjs'

async function mainP(albumId) {
	let lr = await LrSession.currentContextP()
	await lr.deleteAlbumP(albumId)
	console.log('deleted album', albumId)
}

let albumId = process.argv[2]
mainP(albumId).then(() => console.log('done')).catch(e => console.error(e))
