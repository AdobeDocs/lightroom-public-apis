/*
Copyright 2020 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it. If you have received this file from a source other than Adobe,
then your use, modification, or distribution of it requires the prior
written permission of Adobe. 
*/
let preauthenticatedHost = 'lr.adobe.io'
let preauthenticatedApiKey
let preauthenticatedToken

if (process && process.env) {
	preauthenticatedHost = process.env.HOST || preauthenticatedHost
	preauthenticatedApiKey = process.env.KEY || preauthenticatedApiKey
	preauthenticatedToken = process.env.TOKEN || preauthenticatedToken
}

let LrAuth = {
	getHost: () => preauthenticatedHost,
	getApiKey: () => preauthenticatedApiKey,

	authenticateP: async () => {
		return {
			host: preauthenticatedHost,
			apiKey: preauthenticatedApiKey,
			accessToken: preauthenticatedToken
		}
	}
}

export default LrAuth
