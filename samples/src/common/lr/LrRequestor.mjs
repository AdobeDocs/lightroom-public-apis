/*
Copyright 2020 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it. If you have received this file from a source other than Adobe,
then your use, modification, or distribution of it requires the prior
written permission of Adobe. 
*/
import RequestUtils from '../request/RequestUtils.mjs'

let _toJSON = (body) => {
	if (body.byteLength === 0) {
		return // catch empty body to avoid an error in JSON parser
	}
	let decoder = new TextDecoder('utf-8')
	var string = decoder.decode(body)
	let while1Regex = /^while\s*\(\s*1\s*\)\s*{\s*}\s*/ // strip off while(1){}
	return JSON.parse(string.replace(while1Regex, ''))
}

let _isJSON = (contentType) => contentType == 'application/json' || contentType == 'application/json;charset=utf-8'

let _onEnd = (res) => {
	if (res.status < 200 || res.status > 299) {
		throw {
			statusCode: res.status,
			error: _toJSON(res.body)
		}
	}
	return _isJSON(res.contentType) ? _toJSON(res.body) : res.body
}

let _unauthGetP = function(session, path, signal) {
	let headers = {
		'X-API-Key': session.apiKey
	}
	let options = {
		method: 'GET',
		protocol: 'https:',
		host: session.host,
		path: path,
		headers: headers
	}
	return RequestUtils.requestP(options, undefined, signal).then(res => _onEnd(res))
}

let _authRequestP = function(session, method, path, headers, data, signal) {
	headers = Object.assign({}, headers)
	headers['X-API-Key'] = session.apiKey
	headers['Authorization'] = `Bearer ${session.accessToken}`
	let options = {
		method: method,
		protocol: 'https:',
		host: session.host,
		path: path,
		headers: headers
	}
	return RequestUtils.requestP(options, data, signal).then(res => _onEnd(res))
}

let _getPagedP = async function(session, path, resources = []) {
	let res = await _authRequestP(session, 'GET', path, {})
	res.resources = resources.concat(res.resources)
	if (res.links && res.links.next) {
		let uri = `${res.base}${res.links.next.href}`
		let url = new URL(uri) // peel off the path of the fully formed uri
		return _getPagedP(session, url.pathname + url.search, res.resources)
	}
	return res
}

let _sendJSONP = function(session, method, path, json, sha256) {
	let headers = { 'Content-Type': 'application/json' }
	if (sha256) {
		headers['If-None-Match'] = sha256
	}
	return _authRequestP(session, method, path, headers, JSON.stringify(json))
}

let _putChunkP = function(session, path, type, data, offset, size) {
	let headers = { 'Content-Type': type }
	let length = data.byteLength
	if (size != length) {
		headers['Content-Range'] = `bytes ${offset}-${offset + length - 1}/${size}`
	}
	return _authRequestP(session, 'PUT', path, headers, data)
}

let LrRequestor = {
	healthP: (apiKey, host = 'lr.adobe.io') => _unauthGetP({ apiKey, host }, '/v2/health'),
	headP: (session, path) => _authRequestP(session, 'HEAD', path, {}),
	getP: (session, path) => _authRequestP(session, 'GET', path, {}),
	getPagedP: (session, path) => _getPagedP(session, path),
	putP: (session, path, json) => _sendJSONP(session, 'PUT', path, json),
	putUniqueP: (session, path, json, sha256) => _sendJSONP(session, 'PUT', path, json, sha256),
	putChunkP: (session, path, type, data, offset, size) => _putChunkP(session, path, type, data, offset, size),
	postP: (session, path, json) => _sendJSONP(session, 'POST', path, json),
	deleteP: (session, path) => _authRequestP(session, 'DELETE', path, {}),
	genP: (session, path, type) => _authRequestP(session, 'POST', path, { 'X-Generate-Renditions': type })
}

export default LrRequestor
