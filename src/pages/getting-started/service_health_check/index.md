---
title: Services Health Check
description: Page for Services Health Check
contributors:
  - https://github.com/bagra98
---

# Lightroom Services Health Check

Registered partner applications can check the health of the Lightroom Services through the `/v2/health` API on the `https://lr.adobe.io` endpoint. The health check requires only the API key obtained by [Creating an Integration](/getting-started/create_integration).

Sample cURL might be:

```
curl -H "X-API-Key: NEW_API_KEY" https://lr.adobe.io/v2/health
```

with an expected response of the form:

```
while (1) {}
{"version":"aaf68f5ea64545693f3add0c309d420d42653bb0"}
```

If the API key is not subscribed to the Lightroom Services, an error will be returned:

```
while (1) {}{"code":"403003", "description":"Api Key is invalid"}
```

Any other error indicates that the Lightroom Services are down. Partner applications are advised to retry the check with an exponential backoff in time until the service is restored.