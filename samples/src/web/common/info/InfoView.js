/*
Copyright 2020 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it. If you have received this file from a source other than Adobe,
then your use, modification, or distribution of it requires the prior
written permission of Adobe. 
*/
import './InfoView.css'

class InfoView {
	constructor() {
		this.element = document.createElement('div')

		let user = document.createElement('div')
		user.className = 'info'
		this._user = document.createTextNode('loading user...')
		user.appendChild(this._user)
		this.element.appendChild(user)

		let entitlement = document.createElement('div')
		entitlement.className = 'info'
		this._entitlement = document.createTextNode('loading entitlement...')
		entitlement.appendChild(this._entitlement)
		this.element.appendChild(entitlement)

		let status = document.createElement('div')
		status.className = 'info'
		this._status = document.createTextNode('loading status...')
		status.appendChild(this._status)
		this.element.appendChild(status)
	}

	set user(user) {
		let node = document.createTextNode(user)
		this._user.replaceWith(node)
		this._user = node
	}

	set entitlement(entitlement) {
		let node = document.createTextNode(entitlement)
		this._entitlement.replaceWith(node)
		this._entitlement = node
	}

	set status(status) {
		let node = document.createTextNode(status)
		this._status.replaceWith(node)
		this._status = node
	}
}

export default () => new InfoView()
