## Web Samples

Tested with latest Safari and Chrome and Node.js 14.15.0.

---

This directory contains various examples using the Lightroom Services APIs in a web application.

### Prerequisites

* Developers must create an application integration with the `Lightroom Services` as described in the [Adobe Lightroom developer documentation](https://developer.adobe.com/lightroom). This process will generate an `API Key` and `Client Secret`.

* Developers must acquire an OAuth 2.0 `user access token` for a Lightroom customer as detailed in the [Adobe Developer authentication documentation](https://developer.adobe.com/authentication/auth-methods.html#!AdobeDocs/adobeio-auth/master/OAuth/OAuth.md), with the `openid`, `lr_partner_apis` and `lr_partner_rendition_apis` scopes.

* The samples acquire the API Key and user access token through the
`process.env.KEY` and `process.env.TOKEN` environment variables.
These are set by creating a `.env` file in the directory containing
this README:

      KEY='<integration API Key>'
      TOKEN='<user access token>'

* The samples are served through [Parcel](https://parceljs.org), which can be installed with npm, along with any other dependencies:

      npm ci

### Common Code

Common code shared by the web application samples can be found in the `common` directory. It consists of:

* `common/file`: Modules that leverage the `../common/original/OriginalUtils.mjs` media abstraction to support uploading files to Lightroom from the browser.

* `common/grid`: A LitElement that displays assets in a user catalog or album in a grid. Supports an on-click event for parent applications to interact with individual assets.

* `common/image`: Modules that manage loading asset renditions and creating/revoking ObjectURLs so they can be displayed as img.src attributes in the DOM.

* `common/info`: Basic information display suitable for headers.

### Samples

The `npx` command can be used to have Parcel package and host the given sample: `npx parcel <samplename>/index.html`. To view the sample, browse to http://localhost:1234/index.html.

* Asset Picker

    npx parcel pickasset/index.html

    This example demonstrates browsing assets contained in the catalog of an authenticated Adobe Lightroom customer.

    The application header is from `common/info/InfoView.js`. The application first attempts to load the account and catalog information of the Lightroom user associated with the provided user access token. Then the album hierarchy (of subtype "collection") is generated. On success, the user status is displayed in the header.

    The album hierarchy is shown in the left-hand panel. When an album is selected, a grid of the album asset thumbnails is displayed in the well.
    
    Clicking on any asset in the grid will fetch the 2048 rendition and display it in a scrollable overlay. Clicking the overlay will dispatch the overlay and release the associated rendition.

* Columnal Asset Browser

    npx parcel browsecolumn/index.html

    This example demonstrates browsing assets contained in the catalog of an authenticated Adobe Lightroom customer.

    The application header is from `common/info/InfoView.js`. The application first attempts to load the account and catalog information of the Lightroom user associated with the provided user access token. Then the album hierarchy (of subtype "collection") is generated. On success, the user status is displayed in the header.

    The album hierarchy is shown in a single column. When an album is selected, a grid of the album asset thumbnails is displayed in the column.

* Image Uploader

    npx parcel upload/index.html

    The application header is from `common/info/InfoView.js`. The application first attempts to load the account and catalog information of the Lightroom user associated with the provided user access token. On success, the user status is displayed in the header.

    This example uses a file `input` dialog to enable a user to select an asset to upload to the Lightroom catalog. After an asset is successfully loaded, it is appended to an asset grid underneath the header.

    If the file to uploaded is found to be a duplicate of an existing asset, the existing asset is shown in the asset grid.

* User Info

      npx parcel userinfo/index.html

    The application attempts to load the account and catalog information of the Lightroom user associated with the provided user access token. On success, some account information is displayed in the header populated as a `common/info/InfoView.js`. Otherwise, the reason for the failure is given.
