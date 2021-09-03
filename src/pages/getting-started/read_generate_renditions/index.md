---
title: Read and Generate Renditions
description: Page for Reading and Generating Renditions
contributors:
  - https://github.com/bagra98
---

# Read and Generate Renditions

## Renditions
Each photo asset has a set of JPEGs intended for application display of the latest visual representation of the asset (either edited or original uploaded state)

## Details of Renditions

* Creation - Upon uploading a photo, the following renditions will be created (JPEG format)
    * thumbnail2x (320 pixels constraint on either edge) 
    * 640 (640 pixels on long edge)
    * 1280 (1280 pixels on long edge) 
    * 2048 (2048 pixels on long edge) 
    
* Edit - Upon editing a photo, the following renditions will be newly created with all edits applied
    * thumbnail2x (320 pixels constraint on either edge) 
    * 640 (640 pixels on long edge) 
    * 1280 (1280 pixels on long edge) 
    * 2048 (2048 pixels on long edge) 
    
For best performance, use the smallest size possible for all application scrolling case 


## Workflow to generate renditions for print workflow

Generate renditions for an original file asynchronously. Allowed rendition types are fullsize and 2560. Generated rendition will be deleted after 1 day automatically. Both these renditions must always be requested on demand.  First check to see if one is available, and if not create it. These renditions are not available with basic API access. Should your application require this capability, you must contact Adobe and describe your needs. Here are the details of fullsize and 2560
- Fullsize - size of original with edits, constrained by any applied crops.
- 2560 - 2560 pixels on long edge 


_STEP 1_: Generate Renditions for an asset asynchronously.

```
POST /v2/catalogs/{catalog_id}/assets/{asset_id}/renditions HTTP/1.1
Authorization: {auth_token}
X-Generate-Renditions: {fullsize,2560}
```

Sample success response:

```
HTTP/1.1 202
```

_STEP 2_: HEAD call for Rendition API. As creation is asynchronous, please poll with exponential back with a timeout of 10 min until the rendition is available. If renditions are not genearted within 10 min then probably the operations has failed. You need to retry from Step 1 in that case. Contact us if the problem persists. 

```
HEAD /v2/catalogs/{catalog_id}/assets/{asset_id}/renditions/<rendition_type> HTTP/1.1
Authorization: {auth_token}
```


Sample success response:

```
HTTP/1.1 200
```

_STEP 3_: If the HEAD call returns 200 successfully then that means rendition has been generated correctly. Now call the read rendition api to get the rendition. 

```
GET /v2/catalogs/{catalog_id}/assets/{asset_id}/renditions/<rendition_type> HTTP/1.1
Authorization: {auth_token}
```

Sample success response:

```
HTTP/1.1 200
```

It will return the bits of the rendition

NOTE: Refer to the API documentation for further information about above listed APIs.

### Generate Renditions diagrams
![Generate Renditions for Lightroom Assets](../../../../static/PrintWorkflow.png)