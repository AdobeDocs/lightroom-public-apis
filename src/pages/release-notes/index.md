---
title: API Change Logs
description: Page for API Change Logs
contributors:
  - https://github.com/bagra98
---

# API Change Logs
This document provides information about new features and bug fixes with the Lightroom APIs.

## Version 1.2.1 (18 May, 2021)
- Revision IDs have been removed from the response of below APIs.
    1. Get a Catalog Asset (GET) - `/v2/catalogs/{catalog_id}/assets/{asset_id}`
    2. Retrieve Assets (GET) - `/v2/catalogs/{catalog_id}/assets`
    3. List assets of an album (GET)- `/v2/catalogs/{catalog_id}/albums/{album_id}/assets`
    4. Read a album (GET) - `/v2/catalogs/{catalog_id}/albums/{album_id}`
    5. Retrieve albums (GET) - `/v2/catalogs/{catalog_id}/albums`


- Added Create Master Links and Create xmp Develop Links to response of below APIs
    1. Get a Catalog Asset (GET) - `/v2/catalogs/{catalog_id}/assets/{asset_id}`
    2. Retrieve Assets (GET) - `/v2/catalogs/{catalog_id}/assets`
    3. List assets of an album (GET)- `/v2/catalogs/{catalog_id}/albums/{album_id}/assets`

## Version 1.2.0 (24 Feb, 2021)
- Added new Create Master API (PUT)- `/v2/catalogs/{catalog_id}/assets/{asset_id}/master` . It can be used to upload master for a new asset.

- Existing Create Master API (PUT) - `/v2/catalogs/{catalog_id}/assets/{asset_id}/revisions/{revision_id}/master` is removed and will be deprecated soon. Please use above mentioned Create Master API instead for uploading master.

## Version 1.1.0 (3 Feb, 2021)
- Added new Create Asset API (PUT)- `/v2/catalogs/{catalog_id}/assets/{asset_id}` . It can be used to create a new asset with initial metadata and import information.

- Existing Create Asset Revision API (PUT) - `/v2/catalogs/{catalog_id}/assets/{asset_id}/revisions/{revision_id}` is removed and will be deprecated soon. Please use above mentioned Create Asset API instead for creating asset.

- Added new Update Album API (POST)- `/v2/catalogs/{catalog_id}/albums/{album_id}`. It can be used to update an existing album. The existing album should be created via the same client app and of subtype project or project_set.

- Added new Delete Album API (DELETE)- `/v2/catalogs/{catalog_id}/albums/{album_id}`. It can be used to delete an existing album. The existing album should be created via the same client app and of subtype project or project_set.

- Added new Create External Develop XMP API (PUT)- `/v2/catalogs/{catalog_id}/assets{asset_id}/xmp/develop`. It can be used to upload external xmp develop file for an asset

- Added new Read External Develop XMP API (GET)- `/v2/catalogs/{catalog_id}/assets{asset_id}/xmp/develop`. It can be used to get latest external xmp develop file for an asset