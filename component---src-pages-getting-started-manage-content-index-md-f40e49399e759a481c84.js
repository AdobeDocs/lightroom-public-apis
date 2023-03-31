"use strict";(self.webpackChunklightroom_public_api=self.webpackChunklightroom_public_api||[]).push([[3],{99418:function(e,t,a){a.r(t),a.d(t,{_frontmatter:function(){return d},default:function(){return p}});var n=a(87462),i=a(63366),r=(a(15007),a(64983)),o=a(91515),l=["components"],d={},s={_frontmatter:d},m=o.Z;function p(e){var t=e.components,o=(0,i.Z)(e,l);return(0,r.mdx)(m,(0,n.Z)({},s,o,{components:t,mdxType:"MDXLayout"}),(0,r.mdx)("h1",{id:"manage-content"},"Manage Content"),(0,r.mdx)("p",null,"There are two workflows with which a partner application can manage content:"),(0,r.mdx)("ul",null,(0,r.mdx)("li",{parentName:"ul"},"Affiliating Content"),(0,r.mdx)("li",{parentName:"ul"},"Uploading to Lightroom and Managing Content")),(0,r.mdx)("h2",{id:"affiliating-content"},"Affiliating Content"),(0,r.mdx)("p",null,"A partner application can affiliate content in Lightroom with content in its own asset management system, and publish content from Lightroom."),(0,r.mdx)("h2",{id:"uploading-to-lightroom-and-managing-content"},"Uploading to Lightroom and Managing Content"),(0,r.mdx)("p",null,(0,r.mdx)("em",{parentName:"p"},"Note: When a ",(0,r.mdx)("a",{parentName:"em",href:"../upload_content/"},"new asset is created and uploaded")," to a Lightroom catalog, partner applications should always set the ",(0,r.mdx)("inlineCode",{parentName:"em"},"importedOnDevice")," field to their API key. This will ensure that the asset is properly tagged in Lightroom as having originated from the partner application. They should also retain the unique identifier of the asset (",(0,r.mdx)("inlineCode",{parentName:"em"},"asset_id"),") and catalog (",(0,r.mdx)("inlineCode",{parentName:"em"},"catalog_id"),") for use in the workflows detailed below.")),(0,r.mdx)("p",null,"Partner applications that upload new assets to the catalog of a Lightroom customer may want a way to identify those assets, both inside the Lightroom clients as well as in applications on their own services."),(0,r.mdx)("p",null,"Assets can be grouped together in a catalog through a special album of subtype ",(0,r.mdx)("em",{parentName:"p"},"project"),". Partner applications can create one or more project albums and add uploaded assets to them. Lightroom clients will display project albums of recognized partner applications in their ",(0,r.mdx)("em",{parentName:"p"},"Connections")," panel, enabling Lightroom customers to further manage the content directly in Lightroom."),(0,r.mdx)("h3",{id:"creating-a-project-album"},"Creating a Project Album"),(0,r.mdx)("p",null,"As with the ",(0,r.mdx)("inlineCode",{parentName:"p"},"asset_id")," of new assets, partner applications should generate a globally unique identifier for a new project album (",(0,r.mdx)("inlineCode",{parentName:"p"},"album_id"),"), conforming to RFC-4122 without hypens. They can then create a new project album with this and the ",(0,r.mdx)("inlineCode",{parentName:"p"},"catalog_id"),":"),(0,r.mdx)("pre",null,(0,r.mdx)("code",{parentName:"pre"},"PUT /v2/catalogs/{catalog_id}/albums/{album_id}\n")),(0,r.mdx)("p",null,"With a body of the form:"),(0,r.mdx)("pre",null,(0,r.mdx)("code",{parentName:"pre"},'{\n    "subtype": "project",\n    "serviceId": "<partner API key>",\n    "payload": {\n        "userCreated": "2012-01-03T04:54:15Z",\n        "userUpdated": "2012-01-03T04:54:15Z",\n        "name": "Crivitz",\n        "publishInfo": {\n            "version": 3,\n            "created": "2017-08-03T04:54:32.884643Z",\n            "updated": "2017-08-03T04:54:32.884643Z",\n            "deleted": true,\n            "remoteId": "seRviC3-sp3c1fic",\n            "remoteLinks": {\n                "edit": {\n                    "href": "https://external.site.com/editor/albums/afd05f03"\n                },\n                "view": {\n                    "href": "https://external.site.com/albums/afd05f03"\n                }\n            },\n            "servicePayload": "service-specific string"\n        }\n    }\n}\n')),(0,r.mdx)("p",null,"See the ",(0,r.mdx)("a",{parentName:"p",href:"../guides/common_data_model/"},"generic data model page")," for descriptions of common fields. At the top level of the object is a ",(0,r.mdx)("inlineCode",{parentName:"p"},"serviceId")," that must be set to the API key of the partner application. The ",(0,r.mdx)("inlineCode",{parentName:"p"},"payload.name")," field holds a user-visible string that will be shown in Lightroom clients when they present the project album."),(0,r.mdx)("p",null,"The ",(0,r.mdx)("inlineCode",{parentName:"p"},"publishInfo")," clause is the place for partner applications to persist information in the Lightroom catalog regarding external content that is affiliated with the project album. Its fields are:"),(0,r.mdx)("ul",null,(0,r.mdx)("li",{parentName:"ul"},(0,r.mdx)("inlineCode",{parentName:"li"},"version")," (required, integer) Should be 3 for new projects."),(0,r.mdx)("li",{parentName:"ul"},(0,r.mdx)("inlineCode",{parentName:"li"},"created")," (optional, ISO 8601 date) Date when any externally affiliated content on the partner service was initially created."),(0,r.mdx)("li",{parentName:"ul"},(0,r.mdx)("inlineCode",{parentName:"li"},"updated")," (optional, ISO 8601 date) Date when any externally affiliated content on the partner service was updated or deleted. Must match the created field when that field is first set."),(0,r.mdx)("li",{parentName:"ul"},(0,r.mdx)("inlineCode",{parentName:"li"},"deleted")," (optional, boolean) Whether the externally affiliated content has been deleted from the partner service, thereby acting as a tombstone."),(0,r.mdx)("li",{parentName:"ul"},(0,r.mdx)("inlineCode",{parentName:"li"},"remoteId")," (optional, string) Identifier for the externally affiliated content that is unique to the partner service."),(0,r.mdx)("li",{parentName:"ul"},(0,r.mdx)("inlineCode",{parentName:"li"},"remoteLinks")," (optional, table): Links to affiliated URLs on the partner service.",(0,r.mdx)("ul",{parentName:"li"},(0,r.mdx)("li",{parentName:"ul"},(0,r.mdx)("inlineCode",{parentName:"li"},"edit"),' (optional, table): Table whose "href" entry is an absolute URL to edit the externally affiliated content on the partner service'),(0,r.mdx)("li",{parentName:"ul"},(0,r.mdx)("inlineCode",{parentName:"li"},"view"),' (optional, table): Table whose "href" entry is an absolute URL to view the externally affiliated content on the partner service'))),(0,r.mdx)("li",{parentName:"ul"},(0,r.mdx)("inlineCode",{parentName:"li"},"servicePayload")," (optional, string) Metadata that is unique to the partner service, encapsulated as a single string with a maximum length of 1024 characters.")),(0,r.mdx)("h3",{id:"enumerating-project-albums"},"Enumerating Project Albums"),(0,r.mdx)("p",null,"Partner applications can enumerate project albums with:"),(0,r.mdx)("pre",null,(0,r.mdx)("code",{parentName:"pre"},"GET /v2/catalogs/{catalog_id}/albums?subtype=project\n")),(0,r.mdx)("p",null,"It will return an array of project albums in ",(0,r.mdx)("inlineCode",{parentName:"p"},"resources"),". If there are no project albums affiliated with the partner application, then the array will be empty."),(0,r.mdx)("pre",null,(0,r.mdx)("code",{parentName:"pre"},'{\n    "base": "https://lr.adobe.io/v2/catalogs/9479135e/",\n    "resources": [\n        {\n            "id": "a3c679e3",\n            "created": "2012-01-03T04:54:32.884643Z",\n            "updated": "2012-01-03T04:54:32.884643Z",\n            "type": "album",\n            "subtype": "project",\n            "serviceId": "<partner API key>",\n            "payload": {\n                "userCreated": "2012-01-03T04:54:15Z",\n                "userUpdated": "2012-01-03T04:54:15Z",\n                "name": "Crivitz",\n                "publishInfo": {\n                    "version": 3,\n                    "created": "2017-08-03T04:54:32.884643Z",\n                    "updated": "2017-08-03T04:54:32.884643Z",\n                    "remoteId": "seRviC3-sp3c1fic",\n                    "remoteLinks": {\n                        "edit": {\n                            "href": "https://external.site.com/editor/albums/afd05f03"\n                        },\n                        "view": {\n                            "href": "https://external.site.com/albums/afd05f03"\n                        }\n                    },\n                    "servicePayload": "service-specific string"\n                }\n            },\n            "links": {\n                ....\n            }\n        },\n        ...\n    ]\n}\n')),(0,r.mdx)("h3",{id:"adding-assets-to-a-project-album"},"Adding Assets to a Project Album"),(0,r.mdx)("p",null,"To add one or more assets to a project album with an ID ",(0,r.mdx)("inlineCode",{parentName:"p"},"album_id")," in a catalog with an ID ",(0,r.mdx)("inlineCode",{parentName:"p"},"catalog_id")," (up to 50 assets per call), use the API:"),(0,r.mdx)("pre",null,(0,r.mdx)("code",{parentName:"pre"},"PUT /v2/catalogs/{catalog_id}/albums/{album_id}/assets\n")),(0,r.mdx)("p",null,"with a body of the form:"),(0,r.mdx)("pre",null,(0,r.mdx)("code",{parentName:"pre"},'{\n    "resources": [\n        {\n            "id": "<asset_id_0>",\n            "payload": {\n                "cover": true,\n                "order": "string",\n                "publishInfo": {\n                    "remoteId": "seRviC3-sp3c1fic",\n                    "servicePayload": "service-specific string"\n                }\n            }\n        },\n        ...\n    ]\n}\n')),(0,r.mdx)("p",null,"This will generate a new ",(0,r.mdx)("em",{parentName:"p"},"album asset")," with the given metadata for each asset in the list. A single asset may be placed in multiple albums in a Lightroom catalog, and the album asset metadata provides a mechanism to attach information to the asset that is unique to each album in which it appears."),(0,r.mdx)("p",null,"The ",(0,r.mdx)("inlineCode",{parentName:"p"},"publishInfo")," clause is the place for partner applications to persist information in the Lightroom catalog regarding external content that is affiliated with each asset being added to the project album. Its fields are:"),(0,r.mdx)("ul",null,(0,r.mdx)("li",{parentName:"ul"},(0,r.mdx)("inlineCode",{parentName:"li"},"remoteId")," (optional, string) Identifier for the externally affiliated content that is unique to the partner service."),(0,r.mdx)("li",{parentName:"ul"},(0,r.mdx)("inlineCode",{parentName:"li"},"servicePayload")," (optional, string) Metadata that is unique to the partner service, encapsulated as a single string with a maximum length of 1024 characters.")),(0,r.mdx)("p",null,"Setting the optional ",(0,r.mdx)("inlineCode",{parentName:"p"},"cover")," to be ",(0,r.mdx)("inlineCode",{parentName:"p"},"true")," will inform Lightroom clients and partner applications that any visual representation of the project album should use that asset as its thumbnail. Only one asset can be the cover. If the project album does not have a cover asset, clients are expected to use the first asset in the album as the cover."),(0,r.mdx)("h4",{id:"custom-order"},"Custom Order"),(0,r.mdx)("p",null,"The optional ",(0,r.mdx)("inlineCode",{parentName:"p"},"order")," field supports custom ordering of assets in the project album. The order string shall contain a maximum of 1024 characters in the set: ","[-0-9A-Z_a-z]",". This is the same character set as ",(0,r.mdx)("inlineCode",{parentName:"p"},"base64url")," described in RFC 4648 and was chosen for its URL-safeness. It differs from base64url due to the lexicographical sort order: (“-”, “0”, “9”, “A”, “Z”, “_”, “a”, “z”)."),(0,r.mdx)("p",null,"This charset and sort order shall be called ",(0,r.mdx)("em",{parentName:"p"},"lex64"),". The following should be taken into consideration:"),(0,r.mdx)("ul",null,(0,r.mdx)("li",{parentName:"ul"},"The absence of an order field will cause that object to be sorted at the end for an ascending sort, or at the beginning for a descending sort."),(0,r.mdx)("li",{parentName:"ul"},"The secondary sort field will be the captureDate date of the object (for identical or absent values)."),(0,r.mdx)("li",{parentName:"ul"},"The tertiary sort field will be the created date of the object (for identical or absent captureDate values)."),(0,r.mdx)("li",{parentName:"ul"},"The empty string is not a valid order field value."),(0,r.mdx)("li",{parentName:"ul"},"In order to preserve the ability to insert at the beginning of the list, the order string cannot end with the “-” character.")),(0,r.mdx)("h3",{id:"connect-workflow-diagrams"},"Connect Workflow diagrams"),(0,r.mdx)("p",null,(0,r.mdx)("img",{alt:"Connect Albums Workflow",src:a(3760)})))}p.isMDXComponent=!0},3760:function(e,t,a){a.r(t),t.default=a.p+"static/ConnectWorkflowDiagrams-6d6949e539c00d5d8958dd88adc62166.png"}}]);
//# sourceMappingURL=component---src-pages-getting-started-manage-content-index-md-f40e49399e759a481c84.js.map