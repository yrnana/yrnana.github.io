"use strict";(self.webpackChunkyrnana_github_io=self.webpackChunkyrnana_github_io||[]).push([[190],{7980:function(e,t,n){n.d(t,{Ey:function(){return i},m9:function(){return o},bR:function(){return s}});var r=n(5900),a=n.n(r),l=n(5893),i=function(e){var t=e.width,n=void 0===t?5:t,r=e.height,i=void 0===r?5:r,o=e.className;return(0,l.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:a()("w-"+n,"h-"+i,o),viewBox:"0 0 20 20",fill:"currentColor",children:(0,l.jsx)("path",{fillRule:"evenodd",d:"M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z",clipRule:"evenodd"})})},o=function(e){var t=e.width,n=void 0===t?5:t,r=e.height,i=void 0===r?5:r,o=e.className;return(0,l.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:a()("w-"+n,"h-"+i,o),viewBox:"0 0 20 20",fill:"currentColor",children:(0,l.jsx)("path",{fillRule:"evenodd",d:"M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z",clipRule:"evenodd"})})},s=function(e){var t=e.width,n=void 0===t?6:t,r=e.height,i=void 0===r?6:r,o=e.className;return(0,l.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:a()("w-"+n,"h-"+i,o),fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:(0,l.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"})})}},156:function(e,t,n){var r=n(7980),a=n(5893);t.Z=function(){return(0,a.jsxs)("div",{className:"text-center py-20",children:[(0,a.jsx)("div",{className:"flex items-center justify-center text-gray-300",children:(0,a.jsx)(r.bR,{})}),(0,a.jsx)("div",{className:"mt-4 text-gray-300",children:"No Data"})]})}},3133:function(e,t,n){n.r(t),n.d(t,{default:function(){return d}});var r=n(643),a=n(6373),l=n(7294),i=n(156),o=n(9882),s=n(5893),u=function(e){var t=e.tags,n=(0,l.useMemo)((function(){return function(e){var t=e.reduce((function(e,t){return e+t.totalCount}),0)/e.length,n=e.reduce((function(e,n){return e+Math.pow(n.totalCount-t,2)}),0)/e.length,r=Math.pow(n,.5);return{m:t,"σ":r}}(t)}),[t]),r=n.m,a=n.σ;return 0===t.length?(0,s.jsx)(i.Z,{}):(0,s.jsx)("div",{className:"flex flex-col space-y-4 items-start",children:t.map((function(e){return(0,s.jsx)(o.Z,{name:e.fieldValue,count:e.totalCount,color:c(e.totalCount,r,a)},e.fieldValue)}))})};function c(e,t,n){var r=(e-t)/n;return r<-.84?"yellow":r>=-.84&&r<-.25?"green":r>=-.25&&r<.25?"purple":r>=.25&&r<.84?"blue":"pink"}var d=function(e){var t=e.data;return(0,s.jsxs)(a.Z,{children:[(0,s.jsx)(r.Z,{title:"tags",noindex:!0}),(0,s.jsx)(u,{tags:t.allMdx.group})]})}}}]);
//# sourceMappingURL=component---src-pages-tags-tsx-903f8f7c6184f5aa39ef.js.map