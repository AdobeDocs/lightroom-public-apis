"use strict";(self.webpackChunklightroom_public_api=self.webpackChunklightroom_public_api||[]).push([[1233],{65480:function(e,n,t){t.d(n,{Z:function(){return _}});var a=t(15861),s=t(42982),r=t(64687),o=t.n(r),l=t(15007),i=t(86029),c=t(75900),d=t.n(c),p=t(62802),u=t.n(p),m=t(95083),v=t.n(m),g=t(32956),f=t(68457),h=t(53971),y=t(3135),w=t(52078),x=t(24808),b=t(48788),C=t(23766),k=t(47549),Z=t(65034),N=t(11490);var D={name:"1a50hjl",styles:"border:none;padding:0;font-family:'adobe-clean';background:transparent;color:var(--spectrum-global-color-gray-800);text-decoration:underline;cursor:pointer;&:hover{color:var(--spectrum-global-color-gray-900);}"},S={name:"181f1kw",styles:"font-weight:700;color:var(--spectrum-global-color-gray-900)"},z={name:"wwrf8h",styles:"display:flex;flex-direction:column;gap:8px;width:80%"},P={name:"1swkvfk",styles:"padding:0;font-family:'adobe-clean';border:none;background:transparent;margin-left:10px;cursor:pointer;text-decoration:underline;color:rgb(0, 84, 182);&:hover{color:rgb(2, 101, 220);}"},L={name:"1f2v555",styles:"color:var(--spectrum-global-color-gray-900)"},B={name:"1f2v555",styles:"color:var(--spectrum-global-color-gray-900)"},j={name:"ti75j2",styles:"margin:0"},A={name:"a29rn1",styles:"display:flex;text-align:center;align-items:center;gap:10px"},M={name:"181f1kw",styles:"font-weight:700;color:var(--spectrum-global-color-gray-900)"},E={name:"1xg43bt",styles:"display:flex;gap:20px;align-items:baseline"},I={name:"6apepd",styles:"display:flex;flex-direction:column;gap:48px"},_=function e(n){var t,r,c=n.formData,p=n.response,m=n.handleRestart,_=(0,l.useContext)(Z.Z),U=_.getCredentialData,F=_.selectedOrganization,H=U,O=(0,l.useState)(),R=O[0],T=O[1],J=(0,l.useState)(""),G=J[0],W=J[1],X={},q={label:"products",productList:[]};null==H||null===(t=H[e])||void 0===t||t.children.forEach((function(e){var n,t,a=e.type,r=e.props;(X[a]=r,r.children&&a===C._)&&(null==r||null===(n=r.children)||void 0===n||n.forEach((function(e){var n=e.type,t=e.props;X[n]=t})));a===y.bi&&null!=r&&r.children&&(t=q.productList).push.apply(t,(0,s.Z)([].concat(r.children).map((function(e){var n=e.props;return{label:n.label,icon:n.icon}}))))}));var K=null==q?void 0:q.productList;(0,l.useEffect)((function(){c.Downloads&&V("/console/api/organizations/"+(null==F?void 0:F.id)+"/projects/"+p.projectId+"/workspaces/"+p.workspaceId+"/download",c.Download,c.zipUrl)}),[]);var Q=null==H?void 0:H[e],V=function(){var e=(0,a.Z)(o().mark((function e(n,t,a){var s,r,l,i,c,d,p,m,f,h,y,w,x;return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return void 0===t&&(t="download"),T(!0),e.prev=2,e.next=5,v().getBinaryContent(a);case 5:return d=e.sent,p=new Uint8Array(d).buffer,m=new(u()),e.next=10,m.loadAsync(p);case 10:return f=null===(s=window.adobeIMS)||void 0===s||null===(r=s.getTokenFromStorage())||void 0===r?void 0:r.token,h={method:"GET",headers:{"Content-Type":"application/json",Authorization:"Bearer "+f,"x-api-key":null===(l=window)||void 0===l||null===(i=l.adobeIMS)||void 0===i||null===(c=i.adobeIdData)||void 0===c?void 0:c.client_id}},e.next=14,fetch(n,h);case 14:if(200!==(y=e.sent).status){e.next=26;break}return e.next=18,y.json();case 18:return w=e.sent,m.file("credential.json",JSON.stringify(w)),e.next=22,m.generateAsync({type:"blob"});case 22:x=e.sent,(0,g.saveAs)(x,t+".zip"),e.next=27;break;case 26:console.error("Failed to fetch additional data. Response status:",y.status);case 27:e.next=32;break;case 29:e.prev=29,e.t0=e.catch(2),console.error("An error occurred:",e.t0);case 32:return e.prev=32,T(!1),e.finish(32);case 35:case"end":return e.stop()}}),e,null,[[2,29,32,35]])})));return function(n,t,a){return e.apply(this,arguments)}}();return(0,i.tZ)("div",{className:d()(null==Q?void 0:Q.className),css:I},(0,i.tZ)("div",{className:d()(null==Q?void 0:Q.className),css:(0,i.iv)("display:flex;flex-direction:column;gap:16px;color:var(--spectrum-global-color-gray-800);width:100%;height:100%;text-align:left;@media screen and (min-width: ",f.xU,") and (max-width: ",f.Ey,"){padding:0;width:100%;}","")},(0,i.tZ)("div",{css:E},(null==Q?void 0:Q.title)&&(0,i.tZ)("h2",{className:"spectrum-Heading spectrum-Heading--sizeL",css:M},null==Q?void 0:Q.title),R&&(0,i.tZ)("div",{css:A},(0,i.tZ)("div",{className:"spectrum-ProgressCircle spectrum-ProgressCircle--indeterminate spectrum-ProgressCircle--small"},(0,i.tZ)("div",{className:"spectrum-ProgressCircle-track"}),(0,i.tZ)("div",{className:"spectrum-ProgressCircle-fills"},(0,i.tZ)("div",{className:"spectrum-ProgressCircle-fillMask1"},(0,i.tZ)("div",{className:"spectrum-ProgressCircle-fillSubMask1"},(0,i.tZ)("div",{className:"spectrum-ProgressCircle-fill"}))),(0,i.tZ)("div",{className:"spectrum-ProgressCircle-fillMask2"},(0,i.tZ)("div",{className:"spectrum-ProgressCircle-fillSubMask2"},(0,i.tZ)("div",{className:"spectrum-ProgressCircle-fill"}))))),(0,i.tZ)("p",{css:j},"Downloading..."))),c.Downloads&&(null==Q?void 0:Q.paragraph)&&(0,i.tZ)("p",{className:"spectrum-Body spectrum-Body--sizeL",css:B},null==Q?void 0:Q.paragraph),c.Downloads&&(0,i.tZ)("p",{className:"spectrum-Body spectrum-Body--sizeS",css:L},"Download not working?",(0,i.tZ)("button",{css:P,onClick:function(){return V("/console/api/organizations/"+(null==F?void 0:F.id)+"/projects/"+p.projectId+"/workspaces/"+p.workspaceId+"/download",c.Download,c.zipUrl)}},"Restart download"))),(0,i.tZ)("div",{css:(0,i.iv)("display:flex;gap:35px;@media screen and (min-width: ",f.xU,") and (max-width: ",f.Ey,"){flex-direction:column;padding-left:0;}","")},(0,i.tZ)("div",{css:(0,i.iv)("display:flex;flex-direction:column;gap:35px;width:50%;@media screen and (min-width: ",f.xU,") and (max-width: ",f.Ey,"){width:100%;}","")},(0,i.tZ)(N.W,{credentialName:c.CredentialName,productList:K,ProductComponent:y.bi,AccessTokenComponent:x.J,DevConsoleLinkComponent:b.A,ClientDetailsComponent:C._,allowedOriginsDetails:c.AllowedOrigins,organizationName:F,response:p,nextButtonLink:null==Q?void 0:Q.nextStepsHref,nextButtonLabel:null==Q?void 0:Q.nextStepsLabel,devConsoleLink:null==Q?void 0:Q.devConsoleDirection,developerConsoleManage:null==Q?void 0:Q.developerConsoleManage,myCredentialFields:X}),(0,i.tZ)("div",{css:z},(0,i.tZ)("h4",{className:"spectrum-Heading spectrum-Heading--sizeXS",css:S},"Need another credential"),(0,i.tZ)("p",{className:"spectrum-Body spectrum-Body--sizeS"},(0,i.tZ)("button",{onClick:m,css:D},"Restart and create a new credential")))),null!=Q&&Q.children?(0,i.tZ)(k.c,{sideContent:null===(r=X[w.v])||void 0===r?void 0:r.children,SideComp:w.v}):null),G&&(0,i.tZ)(h.F,{variant:"success",message:"Copied to clipboard",disable:1e3,customDisableFunction:W}))}}}]);
//# sourceMappingURL=862bb76f-dd2fbe58d0a22d8c9ec8.js.map