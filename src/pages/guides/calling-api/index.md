---
title: Calling a Lightroom API
description: Page for Calling a Lightroom API
contributors:
  - https://github.com/bagra98
---

# Calling a Lightroom API

As described elsewhere, applications must acquire an _API key_ by registering an _integration_ as an Adobe partner. Using the API key to authenticate a Lightroom customer with the Adobe Identity Management System enables the application to acquire an _access token_.

The API key must be included in the `X-API-Key` header in every API call, while the access token must be included in the `Authorization: Bearer` header.

Sample cURL for calling an API might be:

```
key=ClientAPIKey
token=eyJ4NXUi...
curl -H "X-API-Key: ${key}" -H "Authorization: Bearer ${token}" https://lr.adobe.io/v2/...
```

and sample JavaScript might be:

```
var key='ClientAPIKey'
var token='eyJ4NXUi...'
var xhr = new XMLHttpRequest()
xhr.open('GET', apiURL)
xhr.setRequestHeader('X-API-Key', key)
xhr.setRequestHeader('Authorization', `Bearer ${token}`)
```

### Content Type

Lightroom content is encapsulated in a variety of objects, including _accounts_, _catalogs_, _assets_, and _albums_. The content type of every API is _JSON_, with the exception of the APIs that handle binary data (content type _application/octet-stream_) and those that handle external XMP Develop Settings (content type _application/rdf+xml_).

### Handling JSON

Returned JSON content is always prepended with a `while(1){}` clause to mitigate abuse. This clause must be stripped by client applications before using the incoming result.

Sample JavaScript for eliding the preface and constructing an object might be:

```
function _processJSONResponse(response) {
	let while1Regex = /^while\s*\(\s*1\s*\)\s*{\s*}\s*/
	return response ? JSON.parse(response.replace(while1Regex, '')) : null
}
```