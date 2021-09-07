/*
Copyright 2020 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it. If you have received this file from a source other than Adobe,
then your use, modification, or distribution of it requires the prior
written permission of Adobe. 
*/
import './styles.css'
import InfoView from '../common/info/InfoView'
import LrSession from '../../common/lr/LrSession'

async function mainP() {
	// construct the top-level page with a header
	let header = document.createElement('div')
	header.className = 'header'
	document.body.appendChild(header)

	// authenticate; check account and catalog; and show entitlement
	let infoView = InfoView()
	header.appendChild(infoView.element)
	try {
		let lr = await LrSession.currentContextP()
		infoView.user = `${ lr.account.full_name } (${ lr.account.email })`
		infoView.entitlement = lr.account.entitlement.status
		infoView.status = 'account and catalog found'
	}
	catch (err) {
		infoView.status = err.message
		return // bail out
	}
}

mainP()
