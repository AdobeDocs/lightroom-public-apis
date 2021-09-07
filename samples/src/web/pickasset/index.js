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
import './styles.css'
import InfoView from '../common/info/InfoView'
import LrSession from '../../common/lr/LrSession'
import LrUtils from '../../common/lr/LrUtils'
import LrAssetThumbnailManager from '../common/image/LrAssetThumbnailManager'
import LrAssetRenditionProvider from '../common/image/LrAssetRenditionProvider'
import '../common/grid/LrGrid'

function InsertFolderView(container, folderRoot, coverThumbnailP, onClickAlbum) {
	const _allPhotosTemplate = (onClick) => html`
		<div class='spectrum-SideNav-item'>
			<div class='spectrum-SideNav-itemLink' @click=${ (event) => onClick() }>
				${ 'All Photos' }
			</div>
		</div>
	`

	const _breadcrumbTemplate = (node, onClick) => html`
		<div class='spectrum-SideNav-item' @click=${ (event) => { if (node.parent) onClick(node) }}>
			<div class='spectrum-SideNav-itemLink'>
				${ (node.parent ? '\u25C3 ' : '') + node.name }
			</div>
		</div>
	`

	const _folderTemplate = (node, onClick) => html`
		<div class='spectrum-SideNav-item' @click=${ (event) => onClick(node) }>
			<div class='spectrum-SideNav-itemLink'>
				<svg class='spectrum-Icon spectrum-Icon--sizeM spectrum-SideNav-itemIcon' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'>
					<path fill='#777777' d='M58,12H36.7c-0.3,0-0.5-0.1-0.7-0.3l-6.2-6.2c-1-1-2.2-1.5-3.5-1.5H6c-3.3,0-6,2.7-6,6v44c0,3.3,2.7,6,6,6h52 c3.3,0,6-2.7,6-6V18C64,14.7,61.3,12,58,12z M62,54c0,2.2-1.8,4-4,4H6c-2.2,0-4-1.8-4-4V14h56c2.2,0,4,1.8,4,4V54z'></path>
				</svg>
				${ node.name }
			</div>
		</div>
	`

	const _albumTemplate = (coverThumbnailP, album, onClick) => html`
		<div class='spectrum-SideNav-item' @click=${ (event) => onClick(album) }>
			<div class='spectrum-SideNav-itemLink'>
				<img class='spectrum-Icon spectrum-Icon--sizeM spectrum-SideNav-itemIcon' src=${ until(coverThumbnailP(album), '') }></img>
				${ album.payload.name }
			</div>
		</div>
	`

	const navTemplate = (coverThumbnailP, node, onClickFolder, onClickAlbum) => html`
		<nav>
			<div class='spectrum-SideNav spectrum-SideNav--multiLevel'>
				${ _allPhotosTemplate(() => onClickAlbum()) }
				${ _breadcrumbTemplate(node, (node) => onClickFolder(node.parent)) }
				<div class='spectrum-SideNav spectrum-SideNav--multiLevel'>
					${ node.folders.map((node) => _folderTemplate(node, onClickFolder)) }
					${ node.albums.map((node) => _albumTemplate(coverThumbnailP, node.data, onClickAlbum)) }
				</div>
			</div>
		</nav>
	`

	let update = (node) => render(navTemplate(coverThumbnailP, node, (node) => update(node), onClickAlbum), container)
	update(folderRoot)
}

async function Insert2048Rendition(container, lr, assetId) {
	if (!assetId) {
		return
	}

	let provider = new LrAssetRenditionProvider(lr, assetId, '2048')

	// create a popover div to display the rendition
	let img = document.createElement('img')
	let rendition = document.createElement('div')
	rendition.className = 'popover'
	rendition.appendChild(img)
	rendition.onclick = () => {
		provider.dispose()
		rendition.remove()
	}
	container.appendChild(rendition)

	// fetch the 2048 image and update the image source with it
	try {
		await provider.promise.then(objectURL => img.src = objectURL)
	}
	catch (err) {
		console.log('failed to fetch the 2048 rendition of asset:', assetId)
	}
}

async function mainP() {
	// construct the top-level page with a header, left hand panel, and well
	let header = document.createElement('div')
	header.className = 'header'
	document.body.appendChild(header)

	let lhp = document.createElement('div')
	lhp.className = 'lhp'
	document.body.appendChild(lhp)

	let well = document.createElement('div')
	well.className = 'well'
	document.body.appendChild(well)

	// authenticate; check account and catalog; load album hierarchy; and show status
	let infoView = InfoView()
	header.appendChild(infoView.element)
	let lr
	let folderRoot
	try {
		lr = await LrSession.currentContextP()
		infoView.user = `${ lr.account.full_name } (${ lr.account.email })`
		infoView.entitlement = lr.account.entitlement.status

		folderRoot = await LrUtils.getRootCollectionSetP(lr)
		infoView.status = 'album hierarchy loaded'
	}
	catch (err) {
		infoView.status = err.message
		return // bail out
	}

	let thumbnailManager = new LrAssetThumbnailManager(lr._session, lr.account, lr.catalog)

	// album grid in the well
	let albumGridComponentConstructor = window.customElements.get('lr-samples-grid')
	albumGridComponentConstructor.session = lr._session
	albumGridComponentConstructor.account = lr.account
	albumGridComponentConstructor.catalog = lr.catalog
	albumGridComponentConstructor.imageManager = thumbnailManager
	let picker = new albumGridComponentConstructor()
	picker.addEventListener('selected-changed', (event) => {
		let selection = event.detail
		let asset = selection && selection.selected[0] // first selected
		Insert2048Rendition(document.body, lr, asset.id)
	})
	let activeAlbumChanged = (album) => {
		let source = album ? album : lr.catalog // if no album, show all photos
		let context = JSON.stringify({
			source,
			preselected: []
		})
		picker.setAttribute('context', context)
	}
	well.appendChild(picker)

	// create a folder view in the left hand panel
	let coverThumbnailP = async (album) => {
		let assetId = await lr.getAlbumCoverOrFallbackAssetIdP(album)
		return thumbnailManager.getAssetRenditionObjectURLP(assetId, 'thumbnail2x')
	}
	InsertFolderView(lhp, folderRoot, coverThumbnailP, activeAlbumChanged)
}

mainP()
