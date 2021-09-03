---
title: Overview - Adobe Lightroom API
description: This is the overview page of Adobe Lightroom API
contributors:
  - https://github.com/bagra98 
---

<Hero slots="image, heading, text" background="rgb(64, 34, 138)"/>

![Hero image](./hero.png)

# Adobe Lightroom API

Build applications that work with Lightroom

<Resources slots="heading, links"/>

#### Resources

* [API Documentation](https://www.adobe.io/apis/creativecloud/lightroom/apidocs.html)
* [Adobe Lightroom Github Repo](https://github.com/AdobeDocs/lightroom-public-apis)

## Welcome to Lightroom API!

Adobe Photoshop Lightroom stores user assets, with their associated metadata and media renditions, in a catalog in the cloud.

The [Getting Started](getting-started/) page will walk you through how to use our API.

## Contributing 

We encourage you to participate in our open documentation initiative, if you have suggestions, corrections, additions 
or deletions for this documentation, check out the source from [this github repo](https://github.com/adobe/gatsby-theme-spectrum-example), and submit a pull 
request with your contribution. For more information, refer to the [contributing page](support/contribute/).

## API Requests & Rate Limits

The timeout for API requests through adobe.io is currently *60 seconds*.

The default rate limit for an Adobe Lightroom Company is *120 requests per minute*. (The limit is enforced as *12 requests every 6 seconds*).
When rate limiting is being enforced you will get `429` HTTP response codes with the following response body: `{"error_code":"429050","message":"Too many requests"}`    
