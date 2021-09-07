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
import './styles.css'
import InfoView from '../common/info/InfoView'
import LrSession from '../../common/lr/LrSession'
import LrUtils from '../../common/lr/LrUtils'
import LrAssetThumbnailManager from '../common/image/LrAssetThumbnailManager'
import '../common/grid/LrGrid'

function InsertFolderView(container, folderRoot, onSelectedChanged) {
	const _breadcrumbTemplate = (node, onClick) => html`
		<div class='spectrum-SideNav-item' @click=${ (event) => onClick(node) }}>
			<div class='spectrum-SideNav-itemLink'>
				${ (node.parent ? '\u25C3 ' : '') + node.name }
			</div>
		</div>
	`

	const _nodeIcon = (node) => {
		if (!node.data || node.data.type === 'catalog') {
			return html ``
		}
		if (node.data.subtype === 'collection_set') {
			return html`
				<svg class='spectrum-Icon spectrum-Icon--sizeM spectrum-SideNav-itemIcon' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'>
					<path fill='#777777' d='M58,12H36.7c-0.3,0-0.5-0.1-0.7-0.3l-6.2-6.2c-1-1-2.2-1.5-3.5-1.5H6c-3.3,0-6,2.7-6,6v44c0,3.3,2.7,6,6,6h52 c3.3,0,6-2.7,6-6V18C64,14.7,61.3,12,58,12z M62,54c0,2.2-1.8,4-4,4H6c-2.2,0-4-1.8-4-4V14h56c2.2,0,4,1.8,4,4V54z'></path>
				</svg>
			`
		}
		return html ``
	}

	const _nodeTemplate = (node, onClick) => html`
		<div class='spectrum-SideNav-item' @click=${ (event) => onClick(node) }>
			<div class='spectrum-SideNav-itemLink'>
				${ _nodeIcon(node) }
				${ node.name }
			</div>
		</div>
	`

	const _navTemplate = (node, onClick) => html`
		<nav>
			<div class='spectrum-SideNav spectrum-SideNav--multiLevel'>
				<div class='spectrum-SideNav spectrum-SideNav--multiLevel'>
					${ node.folders.map((node) => _nodeTemplate(node, onClick)) }
					${ node.albums.map((node) => _nodeTemplate(node, onClick)) }
				</div>
			</div>
		</nav>
	`

	const navTemp = (node, onClick) => html`
		<div class='columnheader'>
			${ _breadcrumbTemplate(node, (node) => onClick(node.parent)) }
		</div>
		<div class='columnbody'>
			${ node.data && (node.data.subtype === 'collection' || node.data.type === 'catalog')
			? html `
					<lr-samples-grid context=${ JSON.stringify({ source: node.data, preselected: []}) }
						@selected-changed=${ event => onSelectedChanged(event.detail) }>
					<lr-samples-grid/>
				`
			: html `
					<div class='columnscroller'>
						${ _navTemplate(node, onClick) }
					</div>
				`}
		</div>
	`

	let update = (node) => render(navTemp(node, (node) => {
		if (node) {
			update(node)
		}
	}), container)

	update(folderRoot)
}

async function mainP() {
	// construct the top-level page with a header, left hand panel, and well
	let header = document.createElement('div')
	header.className = 'header'
	document.body.appendChild(header)

	let column = document.createElement('div')
	column.className = 'column'
	document.body.appendChild(column)

	// authenticate; check account and catalog; load album hierarchy; and show status
	let infoView = InfoView()
	header.appendChild(infoView.element)
	let lr
	let folderRoot
	try {
		lr = await LrSession.currentContextP()
		infoView.user = `${ lr.account.full_name } (${ lr.account.email })`
		infoView.entitlement = lr.account.entitlement.status

		folderRoot = { name: '\u25C3 Back', folders: [], albums: [] }
		let root = await LrUtils.getRootCollectionSetP(lr)
		folderRoot.folders.push({
			parent: folderRoot,
			name: 'All Photos',
			folders: [],
			albums: [],
			data: lr.catalog
		})
		root.parent = folderRoot
		folderRoot.folders.push(root)
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

	let onSelectedChanged = selection => console.log('got selection', selection)
	InsertFolderView(column, folderRoot, onSelectedChanged)
}

mainP()
