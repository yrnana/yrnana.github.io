/*! For license information please see component---src-templates-post-list-template-tsx-9bb91eb47c14d34fbc7e.js.LICENSE.txt */
(self.webpackChunkyrnana_github_io=self.webpackChunkyrnana_github_io||[]).push([[703],{5900:function(e,t){var r;!function(){"use strict";var n={}.hasOwnProperty;function s(){for(var e=[],t=0;t<arguments.length;t++){var r=arguments[t];if(r){var a=typeof r;if("string"===a||"number"===a)e.push(r);else if(Array.isArray(r)){if(r.length){var i=s.apply(null,r);i&&e.push(i)}}else if("object"===a)if(r.toString===Object.prototype.toString)for(var l in r)n.call(r,l)&&r[l]&&e.push(l);else e.push(r.toString())}}return e.join(" ")}e.exports?(s.default=s,e.exports=s):void 0===(r=function(){return s}.apply(t,[]))||(e.exports=r)}()},2255:function(e,t,r){"use strict";r.d(t,{Ey:function(){return i},m9:function(){return l},bR:function(){return c}});var n=r(5900),s=r.n(n),a=r(5893),i=function(e){var t=e.width,r=void 0===t?5:t,n=e.height,i=void 0===n?5:n,l=e.className;return(0,a.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:s()("w-"+r,"h-"+i,l),viewBox:"0 0 20 20",fill:"currentColor",children:(0,a.jsx)("path",{fillRule:"evenodd",d:"M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z",clipRule:"evenodd"})})},l=function(e){var t=e.width,r=void 0===t?5:t,n=e.height,i=void 0===n?5:n,l=e.className;return(0,a.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:s()("w-"+r,"h-"+i,l),viewBox:"0 0 20 20",fill:"currentColor",children:(0,a.jsx)("path",{fillRule:"evenodd",d:"M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z",clipRule:"evenodd"})})},c=function(e){var t=e.width,r=void 0===t?6:t,n=e.height,i=void 0===n?6:n,l=e.className;return(0,a.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:s()("w-"+r,"h-"+i,l),fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:(0,a.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"})})}},7124:function(e,t,r){"use strict";var n=r(2255),s=r(5893);t.Z=function(){return(0,s.jsxs)("div",{className:"text-center py-20",children:[(0,s.jsx)("div",{className:"flex items-center justify-center text-gray-300",children:(0,s.jsx)(n.bR,{})}),(0,s.jsx)("div",{className:"mt-4 text-gray-300",children:"No Data"})]})}},7724:function(e,t,r){"use strict";r.d(t,{Z:function(){return o}});var n=r(7124),s=r(5444),a=r(8698),i=r(7525),l=r(5893),c=function(e){var t=e.slug,r=e.excerptAst,n=e.frontmatter,c=n.date,o=n.title,u=n.tags,x=n.excerptAst;return(0,l.jsxs)("div",{children:[(0,l.jsx)(s.Link,{to:t,className:"hover:text-purple-500",children:(0,l.jsx)("h2",{className:"text-xl font-medium",children:o})}),(0,l.jsx)("div",{className:"text-gray-500 mt-2",children:(0,i.p)(c)}),(0,l.jsx)("div",{className:"mt-2 markdown excerpt-markdown",children:(0,i.i)(x||r,!0)}),u&&(0,l.jsx)("div",{className:"flex flex-row flex-wrap space-x-3 mt-3",children:u.map((function(e){return(0,l.jsx)(a.Z,{name:e,color:"purple"},e)}))})]})},o=function(e){var t=e.posts;return 0===t.length?(0,l.jsx)(n.Z,{}):(0,l.jsx)("div",{className:"flex flex-col space-y-12",children:t.map((function(e){return(0,l.jsx)(c,Object.assign({},e),e.slug)}))})}},8465:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return v}});var n=r(5827),s=r(2721),a=r(7294),i=r(5900),l=r.n(i),c=r(5444),o=r(2255),u=r(5893),x="w-10 py-2 text-center",d="flex justify-center",f=function(e){var t=e.currentPage,r=e.pageCount,n=e.hasPreviousPage,s=e.hasNextPage,i=(0,a.useMemo)((function(){return function(e,t){if(t<=7)return Array.from({length:t},(function(t,r){return{isPage:!0,isCurrentPage:r+1===e,page:r+1}}));var r;r=e<=4?[1,2,3,4,5,"…",t]:e>=t-3?[1,"…",t-4,t-3,t-2,t-1,t]:[1,"…",e-1,e,e+1,"…",t];return r.map((function(t){return{isPage:"number"==typeof t,isCurrentPage:t===e,page:t}}))}(t,r)}),[t,r]);return(0,u.jsxs)("div",{className:"flex flex-row flex-nowrap items-center justify-center mt-8",children:[n?(0,u.jsx)(c.Link,{to:"/page/"+(t-1),className:l()(x,d),children:(0,u.jsx)(o.Ey,{})}):(0,u.jsx)("div",{className:l()("text-gray-300",x,d),children:(0,u.jsx)(o.Ey,{})}),i.map((function(e,t){return(0,u.jsx)(h,Object.assign({},e),e.page+"_"+t)})),s?(0,u.jsx)(c.Link,{to:"/page/"+(t+1),className:l()(x,d),children:(0,u.jsx)(o.m9,{})}):(0,u.jsx)("div",{className:l()("text-gray-300",x,d),children:(0,u.jsx)(o.m9,{})})]})},h=function(e){var t=e.page,r=e.isPage,n=e.isCurrentPage;return r&&!n?(0,u.jsx)(c.Link,{to:"/page/"+t,className:x,children:t}):(0,u.jsx)("div",{className:l()(x,"cursor-default",{"text-purple-500":n}),children:t})};var p=r(7724),v=function(e){var t=e.data.allMarkdownRemark,r=t.nodes,a=t.pageInfo;return(0,u.jsxs)(s.Z,{children:[(0,u.jsx)(n.Z,{}),(0,u.jsx)(p.Z,{posts:r}),(0,u.jsx)(f,Object.assign({},a))]})}}}]);
//# sourceMappingURL=component---src-templates-post-list-template-tsx-9bb91eb47c14d34fbc7e.js.map