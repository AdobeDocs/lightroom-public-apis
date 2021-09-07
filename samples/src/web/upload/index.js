/*
Copyright 2020 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it. If you have received this file from a source other than Adobe,
then your use, modification, or distribution of it requires the prior
written permission of Adobe. 
*/
import { html, render } from 'lit-html'
import { until } from 'lit-html/directives/until.js'
import InfoView from '../common/info/InfoView'
import LrSession from '../../common/lr/LrSession'
import LrUtils from '../../common/lr/LrUtils'
import OriginalUtils from '../../common/original/OriginalUtils'
import LrAssetThumbnailManager from '../common/image/LrAssetThumbnailManager'
import File from '../common/file/File'
import './styles.css'

function _gridView(assets, container, thumbnailManager) {
	const assetGrid = (assets) => html`
		<div>
			${ assets.map((asset) => html`
				<img style=width:${ LrUtils.getAssetAspectRatio(asset) * 100 + 'px' };height:100px
					src=${ until(thumbnailManager.getAssetRenditionObjectURLP(asset.id, 'thumbnail2x'), '') }
					@click=${ (event) => console.log('clicked asset') }>
				</img>
			`) }
		</div>
	`
	render(assetGrid(assets), container)
}

async function mainP() {
	// construct the top-level page with a header and container
	let header = document.createElement('div')
	header.className = 'header'
	document.body.appendChild(header)

	let picker = document.createElement('div')
	picker.className = 'picker'
	document.body.appendChild(picker)

	let container = document.createElement('div')
	container.className = 'container'
	document.body.appendChild(container)

	// authenticate; check account and catalog, and show status
	let infoView = InfoView()
	header.appendChild(infoView.element)
	let lr
	try {
		lr = await LrSession.currentContextP()
		infoView.user = `${ lr.account.full_name } (${ lr.account.email })`
		infoView.entitlement = lr.account.entitlement.status
		infoView.status = 'account and catalog found'
	}
	catch (err) {
		infoView.status = err.message
		return // bail out
	}

	let thumbnailManager = new LrAssetThumbnailManager(lr._session, lr.account, lr.catalog)

	let assets = [] // running array of assets from selected files

	let appendAssetP = async (assetId) => {
		console.log('adding another asset to grid', assetId)
		let thumbnailExists = await lr.assetRenditionExistsP(assetId, 'thumbnail2x')
		if (!thumbnailExists) {
			await lr.waitForRenditionP(assetId, 'thumbnail2x')
		}
		let asset = await lr.getAssetP(assetId)
		assets.push(asset)
		_gridView(assets, container, thumbnailManager)
	}

	let filepicker = document.createElement('input')
	filepicker.id = 'filepicker'
	filepicker.type = 'file'
	filepicker.addEventListener('change', () => {
		let input = document.getElementById('filepicker')
		let file = input.files[0]
		console.log('trying to upload file:', file)
		let orig = File.original(file)
		OriginalUtils.uploadP(lr, orig)
			.then(assetId => appendAssetP(assetId))
			.catch(err => console.log('file upload error', err))
	})
	picker.appendChild(filepicker)
}

mainP()
