# Lightroom Partner API Samples

This directory contains various examples using the Lightroom Partner APIs. The samples are all written in JavaScript, and divided into two major categories: Node.js command-line samples in `src/node` and web application samples in `src/web`. There is a corresponding README in each of those directories. Common code shared among the samples is found in `src/common` and described below. The bulk of the Lightroom operations are handled by the common code, and most of the Node.js samples are thin wrappers around them.

## Prerequisites

* Configuring a system for development, such as installing Node.js and managing browser compatibility is outside the scope of these samples. It is assumed this has been completed.

* Developers must create an application integration with the `Lightroom Services` as described in the [Adobe Lightroom developer documentation](https://developer.adobe.com/lightroom). This process will generate an `API Key` and `Client Secret`.

* Developers must acquire an OAuth 2.0 `user access token` for a Lightroom customer as detailed in the [Adobe Developer authentication documentation](https://developer.adobe.com/authentication/auth-methods.html#!AdobeDocs/adobeio-auth/master/OAuth/OAuth.md), with the `openid`, `lr_partner_apis` and `lr_partner_rendition_apis` scopes.

## Lightroom Common Code

Common code for making requests and managing Lightroom content can be found `src/common/lr`. They are:

* `LrAuth.mjs`: This module provides a simple abstraction to the authentication process that a full-featured application might use. In this case, it simply fetches the API Key and user access token from the `process.env` and promises to return them in a `session`.

* `LrRequestor.mjs`: This module makes requests to the `lr.adobe.io` endpoints, parses JSON return data when needed, and throws an error when a request has failed. It takes in the `session` returned by `LrAuth.js` to construct the proper requests.

* `LrSession.mjs`: This module authenticates a user via `LrAuth.mjs` and validates that they are entitled to use Lightroom (their account has either a `trial` or `subscriber` status) and that they have a catalog. It will throw an error if these conditions are not satisfied, and return an `LrContext.mjs` object on success.

* `LrContext.mjs`: Set of application-friendly wrappers for calling the methods in `LrRequestor.mjs`. Constructs API paths, forms request bodies when needed, and traps expected error conditions.

* `LrUtils.mjs`: A collection of different utlities that applications might find useful.

## HTTP Request Common Code

Common code for handling HTTP requests is found in `src/common/request`. It consists of:

* `RequestUtils.mjs`: Utilities for making promise-wrapped HTTP requests. Contains both Node.js and web browser implementation, which are dynamically loaded depending on the current environment.

## Cryptographic Common Code

Shared cryptographic code is found in `src/common/cyrpto`. It consists of:

* `CryptoUtils.mjs`: Utilities for generating a universally unique identifier that conforms to the Lightroom Services APIs and for computing the SHA-256 hash of a buffer of streamed buffer of data. Contains both Node.js and web browser implementation, which are dynamically loaded depending on the current environment.

## Original Common Code

Shared code for handling original photos and videos that will be uploaded to Lightroom is found in `src/common/original`. It consists of:

* `OriginalUtils.mjs`: Utilities for creating an object that describes original media (such as subtype or upload MIME type) and to upload these originals with the help of methods found in `LrContext.mjs`.
