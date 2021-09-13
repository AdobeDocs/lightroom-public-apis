---
title: Start building with the Lightroom APIs
description: Page for Getting Started
contributors:
  - https://github.com/bagra98
---

# Start building with the Lightroom APIs

Adobe Photoshop Lightroom stores user _assets_, with their associated metadata and media renditions, in a _catalog_ in the cloud.

## Accessing Lightroom Content

Lightroom content of a Creative Cloud customer is managed through a set of RESTful APIs. These APIs are available only to entitled partner applications that have authenticated the customer, and the customer has given their express permission to the client to act on their behalf. The [API Reference](../api/) documents the available APIs.

Partners must register a new _integration_ with Adobe to obtain a unique client identifier (_API key_) for their application. Partner applications authenticate Lightroom customers through the Adobe Identity Management System (IMS) using a standard OAuth 2.0 workflow. This process enables a client to obtain an _access token_ that must be included along with the integration API Key in privileged requests to the Lightroom APIs.
