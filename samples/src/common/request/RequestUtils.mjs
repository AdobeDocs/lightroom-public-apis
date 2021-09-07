/*
Copyright 2020 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it. If you have received this file from a source other than Adobe,
then your use, modification, or distribution of it requires the prior
written permission of Adobe. 
*/
let RequestUtils = {}

let node
try { node = process.versions.node } catch (err) {}

if (node) {
	// import https from 'https' // could use static import if we are only on node
	// import http from 'http' // could use static import if we are only on node
	let _httpsPromise = import('https')
	let _httpPromise = import('http')

	let _requestP = (module, options, data, signal) => new Promise((resolve, reject) => {
		if (data) {
			options.headers['content-length'] = Buffer.byteLength(data)
		}
		let req = module.request(options, (res) => {
			let chunks = []
			res.on('data', (chunk) => chunks.push(Buffer.from(chunk)))
			res.on('end', () => resolve({
				status: res.statusCode,
				contentType: res.headers['content-type'],
				body: Buffer.concat(chunks)
			}))
		}).on('error', reject).end(data)

		if (signal) {
			signal.onabort = () => req.destroy(new Error('request aborted'))
		}
	})

	RequestUtils.requestP = (options, data, signal) => {
		let modulePromise = options.protocol === 'http:' ? _httpPromise : _httpsPromise
		return modulePromise.then(module => _requestP(module, options, data, signal))
	}
}
else {
	let _fetchP = (options, data, signal) => new Promise((resolve, reject) => {
		if (options.method !== 'GET') {
			reject('only gets for now')
			return
		}
		let port = options.port ? `:${options.port}` : ''
		let url = `${options.protocol}//${options.host}${port}${options.path}`
		options = {
			method: options.method,
			headers: options.headers,
			signal
		}
		fetch(url, options).then(res => {
			res.arrayBuffer().then(body => resolve({
				status: res.status,
				contentType: res.headers.get('content-type'),
				body
			}))
		}).catch(reject)
	})

	let _xhrP = (options, data, signal) => new Promise((resolve, reject) => {
		let blob = data ? new Blob([data]) : undefined
		let port = options.port ? `:${options.port}` : ''
		let url = `${options.protocol}//${options.host}${port}${options.path}`
		let xhr = new XMLHttpRequest()
		xhr.open(options.method, url, true)
		Object.entries(options.headers).forEach(([key, value]) => xhr.setRequestHeader(key, value))
		xhr.responseType = 'arraybuffer'
		xhr.onload = () => resolve({
			status: xhr.status,
			contentType: xhr.getResponseHeader('content-type'),
			body: xhr.response
		})
		xhr.onabort = () => reject(new Error('xhr aborted'))
		xhr.onerror = () => reject(new Error('xhr failed'))
		xhr.send(blob)

		if (signal) {
			signal.onabort = () => xhr.abort()
		}
	})

	RequestUtils.fetchP = _fetchP
	RequestUtils.xhrP = _xhrP
	RequestUtils.requestP = _xhrP // default
}

export default RequestUtils
