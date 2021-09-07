/*
Copyright 2020 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it. If you have received this file from a source other than Adobe,
then your use, modification, or distribution of it requires the prior
written permission of Adobe. 
*/
let CryptoUtils = {}

let node
try { node = process.versions.node } catch (err) {}

if (node) {
	// import crypto from 'crypto' // could use static import if we are only on node
	let crypto, _cryptoPromise = import('crypto').then(module => crypto = module)

	let _uuid = () => {
		// helper function for generating a Lightroom unique identifier
		let bytes = crypto.randomBytes(16)
		bytes[6] = bytes[6] & 0x0f | 0x40
		bytes[8] = bytes[8] & 0x3f | 0x80
		return bytes.toString('hex')
	}

	let _sha256P = async (streamP) => {
		const sha256 = crypto.createHash('sha256')
		let chunkSize = 20 * 1024 * 1024 // 20 MB
		let chunkHandlerP = data => sha256.update(data)
		await streamP(chunkSize, chunkHandlerP)
		return sha256.digest('hex')
	}

	CryptoUtils.uuidP = () => _cryptoPromise.then(() => _uuid())
	CryptoUtils.sha256P = (streamP) => _cryptoPromise.then(() => _sha256P(streamP))
}
else {
	let _toStringHex = (bytes) => {
		let str = ''
		for (let byte of bytes) {
			const hex = byte.toString(16)
			str += (hex.length == 1) ? '0' + hex : hex 
		}
		return str
	}

	CryptoUtils.uuidP = async () => { // async to mimic node version above
		let bytes = new Uint8Array(16)
		crypto.getRandomValues(bytes)
		bytes[6] = bytes[6] & 0x0f | 0x40
		bytes[8] = bytes[8] & 0x3f | 0x80
		return _toStringHex(bytes)
	}

	CryptoUtils.sha256P = async (streamP) => {
		let subtle = window.crypto.subtle
		if (!subtle) {
			return Promise.reject(new Error('missing crypto.subtle'))
		}
		let chunkSize = 0 // can only handle one chunk with subtle
		let digest
		let chunkHandlerP = async (data, offset = 0) => {
			if (digest) {
				return Promise.reject(new Error('can only hash one chunk'))
			}
			digest = await subtle.digest('SHA-256', data)
		}
		await streamP(chunkSize, chunkHandlerP)
		return _toStringHex(new Uint8Array(digest))
	}
}

export default CryptoUtils
