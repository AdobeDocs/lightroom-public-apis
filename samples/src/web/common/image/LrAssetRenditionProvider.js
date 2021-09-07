/*
Copyright 2020 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it. If you have received this file from a source other than Adobe,
then your use, modification, or distribution of it requires the prior
written permission of Adobe. 
*/
class LrAssetRenditionProvider {
	constructor(lr, assetId, type) {
		this._disposed = false
		let request = lr.getAssetRenditionP(assetId, type)
		this.promise = request.then(buffer => this._createObjectURL(buffer))
	}

	_createObjectURL(buffer) {
		if (this._disposed) {
			return ''
		}
		let blob = buffer ? new Blob([ new Uint8Array(buffer) ], { type: 'image/jpeg' }) : null
		return this._objectURL = blob ? URL.createObjectURL(blob) : ''
	}

	dispose() {
		// manually manage the objectURL because it is not garbage collected
		this._disposed = true
		this.promise = Promise.resolve('')
		URL.revokeObjectURL(this._objectURL)
	}
}

export default LrAssetRenditionProvider
