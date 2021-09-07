/*
Copyright 2020 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it. If you have received this file from a source other than Adobe,
then your use, modification, or distribution of it requires the prior
written permission of Adobe. 
*/
import LrAuth from './LrAuth.mjs'
import LrRequestor from './LrRequestor.mjs'
import LrContext from './LrContext.mjs'

let _lr

let _fetchAccountP = async (session) => {
	try {
		return await LrRequestor.getP(session, '/v2/account')
	}
	catch (err) {
		throw new Error('error: failed to get account') // recast
	}
}

let _getEntitledAccountP = async (session) => {
	let account = await _fetchAccountP(session)
	let status = account.entitlement.status
	if (status != 'trial' && status != 'subscriber') {
		throw new Error('error: user not entitled')
	}
	return account
}

let _fetchCatalogP = async (session) => {
	try {
		return await LrRequestor.getP(session, '/v2/catalog')
	}
	catch (err) {
		throw new Error('error: failed to get catalog') // recast
	}
}

let _getExistingCatalogP = async (session) => {
	let catalog = await _fetchCatalogP(session)
	if (!catalog) {
		throw new Error('error: user has no catalog')
	}
	return catalog
}

let LrSession = {
	currentContextP: async () => {
		if (_lr) {
			return _lr
		}
		let session = await LrAuth.authenticateP()
		let account = await _getEntitledAccountP(session)
		let catalog = await _getExistingCatalogP(session)
		_lr = new LrContext(session, account, catalog)
		return _lr
	}
}

export default LrSession
