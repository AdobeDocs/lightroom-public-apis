---
title: Developer Guidelines
description: Page for Developer Guidelines
contributors:
  - https://github.com/bagra98
---

# Developer Guidelines

## Be respectful of system resource utilization 

- Access resources only once per session and make use of short-lived local cache 

- Only retrieve resources with a high likelihood of immediate user access 

- Limit look ahead to a reasonable number of pages 

- Constrain the size of resources used in fast scrolls to thumbnails 

- Access smaller resources rather than doing local downsizing 

- Limit polling to resources immediately required only 

- Employ a managed local cache to avoid retrieving the same rendition multiple times, but be aware that renditions can change 

- Avoid retrieving and caching unneeded resources 

## Store only supported file types and valid files in Lightroom 

- Failure to create thumbnails or import a file through a Lightroom application are both indications a given file is not supported 

- Invalid or unsupported files may be deleted  

## Limit retries 

- Responses with a 500 may indicate a temporary error condition and should be retried, after backing off. 

- Retries should be limited - 3  

- See https://status.adobe.com/ for system status 

- Contact Adobe should 500 errors persist 

- Other http errors should only be retried as guided in the documentation 

## Use the documentation 

- Undocumented features and functionality may cease to work without notice in a future release. 

- Please discuss any additional API or data needs with Adobe 

Adobe reserves the right to avoid abuse of system resources. Failure to follow this guidance may result in a warning and possible revocation of your license keys