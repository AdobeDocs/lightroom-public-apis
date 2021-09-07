/*
Copyright 2020 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it. If you have received this file from a source other than Adobe,
then your use, modification, or distribution of it requires the prior
written permission of Adobe. 
*/
import LrContext from '../../../common/lr/LrContext'
import LrAssetRenditionProvider from './LrAssetRenditionProvider'

class LrAssetThumbnailManager {
	constructor(session, account, catalog) {
		this._lr = new LrContext(session, account, catalog)
		this._providerHash = {}
	}

	clear() {
		Object.values(this._providerHash).forEach(provider => provider.dispose())
		this._providerHash = {}
	}

	getAssetRenditionObjectURLP(assetId, type) {
		if (!assetId || !this._providerHash) {
			return Promise.resolve('')
		}
		if (!this._providerHash[assetId]) {
			this._providerHash[assetId] = new LrAssetRenditionProvider(this._lr, assetId, type)
		}
		return this._providerHash[assetId].promise
	}
}

export default LrAssetThumbnailManager
