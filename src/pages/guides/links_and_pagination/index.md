---
title: Links and Pagination
description: Page for Links and Pagination
contributors:
  - https://github.com/bagra98
---

# Links and Pagination

### Links

Content returned from the Lightroom APIs often includes a `base` URL and table of relative `links` that should be used when assembling subsequent requests. To ensure the most robust future-proofing, clients should avoid cobbling together their own fully formed URLs when possible.

For example, the API to retrieve a catalog might return (unique identifiers have been shortened to preserve readability):

```
{
    "base": "https://lr.adobe.io/v2/catalogs/18c23e15/",
    ...
    "links" {
        "self": {
            "href": "/v2/catalogs/18c23e15"
        },
        "/rels/albums": {
            "href": "albums"
        }
    }
}
```

To construct the API endpoint to enumerate the albums in the catalog, an application should concatenate the `base` with the `/rels/albums` value in `href`. When composing these two elements into a single URL, clients should use the standard rules for URI resolution as defined in section 5.2 of RFC 3986. We strongly recommend that clients use standard library implementations to avoid worrying about corner cases of the RFC URI rules.

### Pagination

Indefinitely long lists of content, such as albums and assets, may be paginated during their return. Therefore, a client may need to make multiple calls to enumerate the entire list. The `links` subsection of returned content will contain a `next` field that encapsulates the API call for fetching an additional page of assets. Sample recursive JavaScript might be:

```
function getPagedJSONContentP(url) {
    return new Promise(function(resolve, reject) {
        var response = {
            resources: []
        }
        function getPage(url) {
            getJSONContentP(url).then(function(page) {
                response.base = page.base
                response.resources = response.resources.concat(page.resources)
                if (page.links.next) {
                    getPage(page.base + page.links.next.href)
                }
                else {
                    resolve(response)
                }
            }, reject)
        }
        getPage(url)
    })
}
```