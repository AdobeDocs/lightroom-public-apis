## Lightroom Originals, Proxies, and Renditions

Lightroom is built on a non-destructive editing model, where the original media (raw image, jpeg, or other supported type) is left untouched, and edits are held in a sidecar data structure affiliated with the asset. Whenever a rendition is required, Adobe Camera Raw is employed to generate jpeg renditions of various resolutions from the original and its edit metadata.

To optimize workflows when the original is not readily available or is too resource heavy, Lightroom includes a `proxy DNG`, sometimes referred to as a `smart preview`, that can stand in for the original file. The proxy has a maximum dimension of 2560 pixels on a side. As with the original, Adobe Camera Raw can apply the asset edit metadata to the proxy to generate jpeg renditions of various resolutions.

_NOTE: Lightroom (on desktop, web, and mobile) always uploads the original file and proxy for every asset. However, Lightroom Classic will only upload a proxy for assets originating from Lightroom Classic._

### Cached Renditions

Lightroom always generates and caches two renditions for each asset: a thumbnail rendition (`thumbnail2x`) and a screen size rendition with a maximum dimension of 2048 pixels on a side (`2048`). These are both available immediately through the Lightroom Services APIs.

### Generating Renditions

Workflows that require renditions of higher resolution than the cached 2048 can use the Lightroom Services APIs to generate `2560` (from the proxy and having its dimensions) or `fullsize` (from the original and sharing its dimensions) renditions on demand.

Rendition generation is an asynchronous process that might take several seconds to complete, depending on the dimensions of the original and the sophistication of the edits. A client calls an endpoint and receives a rendition `link` with the the URL at which the rendition will eventually be available. It then polls, through a `HEAD` call, until the rendition exists, after which it can fetch the result.

There are some important considerations when generating renditions:

* Lightroom Classic only uploads the 2560 proxy and has no original. Therefore, it is not possible to generate a fullsize rendition, and attempting to do so will result in an error. A client should first check if the original `link` is present in the asset. If not, it should request that a 2560 rendition be generated instead.

* The 2560 or fullsize renditions are purged after an unspecified time. Therefore, clients should check whether the rendition exists to determine if they need to request that a new rendition be generated.
