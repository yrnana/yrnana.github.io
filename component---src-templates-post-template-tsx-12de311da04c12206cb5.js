"use strict";(self.webpackChunkyrnana_github_io=self.webpackChunkyrnana_github_io||[]).push([[133],{4371:function(e,t,s){s.d(t,{HW:function(){return i},tl:function(){return m},SO:function(){return v},p_:function(){return g},i6:function(){return N}});var r=s(7294),n=s(5893),i=function(e){var t=e.id,s=(0,r.useRef)(null);return(0,r.useEffect)((function(){var e=s.current;if(e){var r=document.createElement("script");return r.setAttribute("src","https://utteranc.es/client.js"),r.setAttribute("repo","yrnana/yrnana.github.io"),r.setAttribute("issue-term",t),r.setAttribute("label","comment"),r.setAttribute("theme","github-light"),r.setAttribute("crossorigin","anonymous"),r.setAttribute("async","true"),e.appendChild(r),function(){e.innerHTML=""}}}),[t]),(0,n.jsx)("div",{ref:s,className:"mt-20 relative",style:{minHeight:269}})};i.displayName="Comments";var a=s(5900),l=s.n(a),c=s(1597),o=s(2618),x="w-10 py-2 text-center",u="flex justify-center",m=function(e){var t=e.currentPage,s=e.pageCount,i=e.hasPreviousPage,a=e.hasNextPage,m=(0,r.useMemo)((function(){return function(e,t){if(t<=7)return Array.from({length:t},(function(t,s){return{isPage:!0,isCurrentPage:s+1===e,page:s+1}}));var s;s=e<=4?[1,2,3,4,5,"…",t]:e>=t-3?[1,"…",t-4,t-3,t-2,t-1,t]:[1,"…",e-1,e,e+1,"…",t];return s.map((function(t){return{isPage:"number"==typeof t,isCurrentPage:t===e,page:t}}))}(t,s)}),[t,s]);return(0,n.jsxs)("div",{className:"flex flex-row flex-nowrap items-center justify-center mt-8",children:[i?(0,n.jsx)(c.Link,{to:"/page/"+(t-1),className:l()(x,u),children:(0,n.jsx)(o.Ey,{})}):(0,n.jsx)("div",{className:l()("text-slate-300",x,u),children:(0,n.jsx)(o.Ey,{})}),m.map((function(e,t){return(0,n.jsx)(d,Object.assign({},e),e.page+"_"+t)})),a?(0,n.jsx)(c.Link,{to:"/page/"+(t+1),className:l()(x,u),children:(0,n.jsx)(o.m9,{})}):(0,n.jsx)("div",{className:l()("text-slate-300",x,u),children:(0,n.jsx)(o.m9,{})})]})},d=function(e){var t=e.page,s=e.isPage,r=e.isCurrentPage;return s&&!r?(0,n.jsx)(c.Link,{to:"/page/"+t,className:x,children:t}):(0,n.jsx)("div",{className:l()(x,"cursor-default",{"text-violet-500":r}),children:t})};var h=s(8945),f=s(5173),j=s(4168),v=function(e){var t=e.frontmatter,s=e.htmlAst,r=t,i=r.title,a=r.date,l=r.preview,c=r.tags;return(0,n.jsxs)("article",{className:"mb-20",children:[(0,n.jsxs)("header",{className:"text-center mt-10 mb-20",children:[l&&(0,n.jsx)(h.G,{image:(0,h.d)(l),alt:i,className:"mb-10"}),(0,n.jsx)("h1",{className:"text-3xl font-semibold",children:i}),(0,n.jsx)("div",{className:"text-slate-500 mt-4",children:(0,j.p)(a)}),c&&(0,n.jsx)("div",{className:"flex flex-row flex-wrap justify-center space-x-3 mt-4",children:c.map((function(e){return(0,n.jsx)(f.V,{name:e,color:"violet"},e)}))})]}),(0,n.jsx)("div",{className:"markdown",children:(0,j.i)(s)})]})},p=function(e){var t=e.slug,s=e.excerpt,r=e.frontmatter,i=r.date,a=r.title,l=r.tags,o=r.excerptAst;return(0,n.jsxs)("div",{children:[(0,n.jsx)(c.Link,{to:t,className:"hover:text-violet-500",children:(0,n.jsx)("h2",{className:"text-xl font-medium",children:a})}),(0,n.jsx)("div",{className:"text-slate-500 mt-2",children:(0,j.p)(i)}),(0,n.jsx)("div",{className:"mt-2 excerpt-markdown",children:o?(0,j.i)(o):s}),l&&(0,n.jsx)("div",{className:"flex flex-row flex-wrap space-x-3 mt-3",children:l.map((function(e){return(0,n.jsx)(f.V,{name:e,color:"violet"},e)}))})]})},g=function(e){var t=e.posts;return 0===t.length?(0,n.jsx)(o.Jd,{}):(0,n.jsx)("div",{className:"flex flex-col space-y-12",children:t.map((function(e){return(0,n.jsx)(p,Object.assign({},e),e.slug)}))})},N=function(e){var t=e.previous,s=e.next;return t||s?(0,n.jsxs)("div",{className:"flex mt-10 -mb-10",children:[(0,n.jsx)("div",{className:"max-w-2/5",children:t&&(0,n.jsxs)(c.Link,{to:t.slug,className:"hover:text-violet-700 flex items-center",children:[(0,n.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-6 w-6 text-slate-400 mr-1 flex-shrink-0",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:(0,n.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M15 19l-7-7 7-7"})}),(0,n.jsxs)("div",{children:[(0,n.jsx)("div",{className:"text-xs text-slate-500",children:"Previous"}),(0,n.jsx)("div",{children:t.frontmatter.title})]})]})}),(0,n.jsx)("div",{className:"max-w-2/5 text-right ml-auto",children:s&&(0,n.jsxs)(c.Link,{to:s.slug,className:"hover:text-violet-700 flex items-center",children:[(0,n.jsxs)("div",{children:[(0,n.jsx)("div",{className:"text-xs text-slate-500",children:"Next"}),(0,n.jsx)("div",{children:s.frontmatter.title})]}),(0,n.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-6 w-6 text-slate-400 ml-1 flex-shrink-0",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:(0,n.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M9 5l7 7-7 7"})})]})})]}):null}},4054:function(e,t,s){s.r(t);var r=s(8945),n=s(2618),i=s(7073),a=s(4371),l=s(5893);t.default=function(e){var t=e.data,s=e.pageContext,c=t.markdownRemark,o=s.previous,x=s.next,u=s.id,m=c.frontmatter,d=m.title,h=m.excerpt,f=m.preview,j=m.tags;return(0,l.jsxs)(i.Ar,{children:[(0,l.jsx)(n.pQ,{title:d,description:h||c.excerpt,image:f?(0,r.e)(f):void 0,keywords:null==j?void 0:j.join(","),type:"article",isBlogTitleDisabled:!0}),(0,l.jsx)(a.SO,Object.assign({},c)),(0,l.jsx)(n.hn,{slot:"4448901342"}),(0,l.jsx)(a.i6,{previous:o,next:x}),(0,l.jsx)(a.HW,{id:u})]})}}}]);
//# sourceMappingURL=component---src-templates-post-template-tsx-12de311da04c12206cb5.js.map