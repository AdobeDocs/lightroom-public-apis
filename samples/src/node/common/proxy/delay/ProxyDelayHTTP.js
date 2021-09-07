/*
Copyright 2020 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it. If you have received this file from a source other than Adobe,
then your use, modification, or distribution of it requires the prior
written permission of Adobe. 
*/
const https = require('https')
const http = require('http')

class Deferred {
	constructor() {
		this.promise = new Promise((resolve, reject) => this._deferredApi = { resolve, reject })
	}

	resolve(value) {
		this._deferredApi.resolve(value)
	}

	reject(value) {
		this._deferredApi.reject(value)
	}
}

let _requestListener = (host) => (req, res) => {
	let headers = Object.assign({}, req.headers)
	delete headers.host
	let options = {
		method: req.method,
		protocol: 'https:',
		host,
		path: req.url,
		headers
	}
	let proxy_req = https.request(options, (proxy_res) => {
		let deferred = new Deferred()
		setTimeout(() => deferred.resolve(), 3000) // defer response for three seconds
		res.writeHead(proxy_res.statusCode, proxy_res.headers)
		proxy_res.on('data', (chunk) => deferred.promise.then(() => res.write(chunk)))
		proxy_res.on('end', () => deferred.promise.then(() => res.end()))
	}).on('error', (err) => console.log('server error', err))
	req.on('abort', (arg) => console.log('server abort', arg))
	req.on('data', chunk => proxy_req.write(chunk))
	req.on('end', () => proxy_req.end())
}

const hostname = 'localhost'
const port = 8000
const remote = process.env.HOST || 'lr.adobe.io'

http.createServer({}, _requestListener(remote))
	.listen(port, hostname, (err) => {
		if (err) console.log('listen error:', err)
		console.log(`listening on: http://${hostname}:${port}`)
	})
