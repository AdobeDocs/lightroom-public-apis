---
title: Creating an Integration
description: Page for Creating an Integration
contributors:
  - https://github.com/bagra98
---

# Creating an Integration

The process for creating a new partner integration is described in detail in the [Adobe I/O OAuth Integration](https://www.adobe.io/authentication/auth-methods.html#!AdobeDocs/adobeio-auth/master/AuthenticationOverview/OAuthIntegration.md) documentation. A brief walkthrough for Lightroom Services is:

1. Identify an existing Adobe ID with an affiliated email address, or create a new one, to manage the integration. This Adobe ID will have administrative privileges for the lifecycle of the integration.

2. Log into the <a href="https://console.adobe.io" target="_blank">Adobe I/O Console</a> with the chosen Adobe ID. Select "Create new project", and "Add API".

3. Under the "Creative Cloud" offerings, select "Lightroom Services" and "Continue". Complete the form as directed in the [Adobe I/O OAuth Integration](https://www.adobe.io/authentication/auth-methods.html#!AdobeDocs/adobeio-auth/master/AuthenticationOverview/OAuthIntegration.md) documentation to obtain an API key and client secret.

4. Verify access to the Lightroom Services through a [Services Health Check](../service_health_check) and by [Authenticating Customers](../authenticate_customers).
