"use strict";(self.webpackChunklightroom_public_api=self.webpackChunklightroom_public_api||[]).push([[673],{7487:function(e,t,n){n.r(t),n.d(t,{_frontmatter:function(){return l},default:function(){return c}});var r=n(7462),i=n(3366),o=(n(5007),n(4983)),a=n(1515),h=["components"],l={},p={_frontmatter:l},d=a.Z;function c(e){var t=e.components,n=(0,i.Z)(e,h);return(0,o.mdx)(d,(0,r.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,o.mdx)("h1",{id:"lightroom-services-health-check"},"Lightroom Services Health Check"),(0,o.mdx)("p",null,"Registered partner applications can check the health of the Lightroom Services through the ",(0,o.mdx)("inlineCode",{parentName:"p"},"/v2/health")," API on the ",(0,o.mdx)("inlineCode",{parentName:"p"},"https://lr.adobe.io")," endpoint. The health check requires only the API key obtained by ",(0,o.mdx)("a",{parentName:"p",href:"../create_integration"},"Creating an Integration"),"."),(0,o.mdx)("p",null,"Sample cURL might be:"),(0,o.mdx)("pre",null,(0,o.mdx)("code",{parentName:"pre"},'curl -H "X-API-Key: NEW_API_KEY" https://lr.adobe.io/v2/health\n')),(0,o.mdx)("p",null,"with an expected response of the form:"),(0,o.mdx)("pre",null,(0,o.mdx)("code",{parentName:"pre"},'while (1) {}\n{"version":"aaf68f5ea64545693f3add0c309d420d42653bb0"}\n')),(0,o.mdx)("p",null,"If the API key is not subscribed to the Lightroom Services, an error will be returned:"),(0,o.mdx)("pre",null,(0,o.mdx)("code",{parentName:"pre"},'while (1) {}{"code":"403003", "description":"Api Key is invalid"}\n')),(0,o.mdx)("p",null,"Any other error indicates that the Lightroom Services are down. Partner applications are advised to retry the check with an exponential backoff in time until the service is restored."))}c.isMDXComponent=!0}}]);
//# sourceMappingURL=component---src-pages-getting-started-service-health-check-index-md-48433aa1c8efb90e3b6c.js.map