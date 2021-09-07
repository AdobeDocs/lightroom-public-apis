/*
Copyright 2020 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it. If you have received this file from a source other than Adobe,
then your use, modification, or distribution of it requires the prior
written permission of Adobe. 
*/
import { LitElement, html, css } from 'lit-element'
import { until } from 'lit-html/directives/until.js'
import LrContext from '../../../common/lr/LrContext'
import LrUtils from '../../../common/lr/LrUtils'

class LrGrid extends LitElement {

	static _lrContext // current lightroom session
	static _session
	static _account
	static _catalog
	static _imageManager
	static _cache = {}

	static set session(session) {
		this._session = {
			accessToken: session.accessToken,
			apiKey: session.apiKey,
			host: session.host
		}
	}

	static set account(account) {
		this._account = account
	}

	static set catalog(catalog) {
		this._catalog = catalog
	}

	static set imageManager(manager) {
		this._imageManager = manager
	}

	static get _lr() {
		if (!this._lrContext) {
			this._lrContext = new LrContext(this._session, this._account, this._catalog)
		}
		return this._lrContext
	}

	static get properties() {
		return {
			context: { type: String, reflect: true },
			_assets: { type: Array },
		}
	}

	constructor() {
		super()
		this._assets = []
	}

	static get styles() {
		return css`
			.container {
				width: 100%;
				height: 100%;
				overflow-x: hidden;
				overflow-y: auto;
			}
			.container::-webkit-scrollbar {
				width: 10px;
				height: 10px;
			}
			.container::-webkit-scrollbar-thumb {
				background-color: var(--spectrum-global-color-gray-500);
				border-radius: 8px;
				width: 8px;
				height: 8px;
				border-top: 2px solid rgba(0, 0, 0, 0);
				border-bottom: 2px solid rgba(0, 0, 0, 0);
				background-clip: padding-box;
			}
			.container::-webkit-scrollbar-track, .container::-webkit-scrollbar-track-piece {
				background: var(--spectrum-global-color-gray-200);
			}
			.grid {
				display: flex;
				flex-direction: row;
				flex-wrap: wrap;
				box-sizing: border-box;
				padding: 1px;
				width: 100%;
			}
			img {
				margin: 1px;
				cursor: pointer;
			}
		`
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (name == 'context' && newValue) {
			const { source, preselected } = JSON.parse(newValue)

			if (!LrGrid._cache) {
				console.error('need to initialize samples album grid component')
				return
			}

			if (source.type === 'album') {
				if (!LrGrid._cache[source.id]) {
					LrGrid._cache[source.id] = LrGrid._lr.getAlbumAssetsP(source.id)
				}
				LrGrid._cache[source.id].then((albumAssets) => {
					this._assets = albumAssets.map((albumAsset) => albumAsset.asset)
				})
			}
			if (source.type === 'catalog') {
				if (!LrGrid._cache[source.id]) {
					LrGrid._cache[source.id] = LrGrid._lr.getFirstPageOfAssetsP()
				}
				LrGrid._cache[source.id].then((assets) => this._assets = assets)
			}
		}
	}

	_onAssetClick(asset) {
		let selection = {
			selected: [ asset ],
			deselected: []
		}
		this.dispatchEvent(new CustomEvent('selected-changed', { detail: selection }))
	}

	_getCachedAssetThumbnailObjectURLP(asset) {
		if (LrGrid._imageManager) {
			return LrGrid._imageManager.getAssetRenditionObjectURLP(asset.id, 'thumbnail2x')
		}
		return ''
	}

	render() {
		return html`<div class='container'><div class='grid'>
			${ this._assets.map((asset) => html`
				<img style=width:${ LrUtils.getAssetAspectRatio(asset) * 100 + 'px' };height:100px
					src=${ until(this._getCachedAssetThumbnailObjectURLP(asset), '') }
					@click=${ (event) => this._onAssetClick(asset) }>
				</img>
			`) }
		</div></div>`
	}
}

customElements.define('lr-samples-grid', LrGrid)
