(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[197],{4184:function(e,t){var n;!function(){"use strict";var r={}.hasOwnProperty;function o(){for(var e=[],t=0;t<arguments.length;t++){var n=arguments[t];if(n){var a=typeof n;if("string"===a||"number"===a)e.push(n);else if(Array.isArray(n)){if(n.length){var i=o.apply(null,n);i&&e.push(i)}}else if("object"===a)if(n.toString===Object.prototype.toString)for(var c in n)r.call(n,c)&&n[c]&&e.push(c);else e.push(n.toString())}}return e.join(" ")}e.exports?(o.default=o,e.exports=o):void 0===(n=function(){return o}.apply(t,[]))||(e.exports=n)}()},2167:function(e,t,n){"use strict";var r=n(3848);t.default=void 0;var o,a=(o=n(7294))&&o.__esModule?o:{default:o},i=n(1063),c=n(4651),s=n(7426);var l={};function u(e,t,n,r){if(e&&i.isLocalURL(t)){e.prefetch(t,n,r).catch((function(e){0}));var o=r&&"undefined"!==typeof r.locale?r.locale:e&&e.locale;l[t+"%"+n+(o?"%"+o:"")]=!0}}var f=function(e){var t,n=!1!==e.prefetch,o=c.useRouter(),f=a.default.useMemo((function(){var t=i.resolveHref(o,e.href,!0),n=r(t,2),a=n[0],c=n[1];return{href:a,as:e.as?i.resolveHref(o,e.as):c||a}}),[o,e.href,e.as]),d=f.href,h=f.as,p=e.children,v=e.replace,x=e.shallow,m=e.scroll,g=e.locale;"string"===typeof p&&(p=a.default.createElement("a",null,p));var y=(t=a.default.Children.only(p))&&"object"===typeof t&&t.ref,j=s.useIntersection({rootMargin:"200px"}),w=r(j,2),b=w[0],N=w[1],L=a.default.useCallback((function(e){b(e),y&&("function"===typeof y?y(e):"object"===typeof y&&(y.current=e))}),[y,b]);a.default.useEffect((function(){var e=N&&n&&i.isLocalURL(d),t="undefined"!==typeof g?g:o&&o.locale,r=l[d+"%"+h+(t?"%"+t:"")];e&&!r&&u(o,d,h,{locale:t})}),[h,d,N,g,n,o]);var _={ref:L,onClick:function(e){t.props&&"function"===typeof t.props.onClick&&t.props.onClick(e),e.defaultPrevented||function(e,t,n,r,o,a,c,s){("A"!==e.currentTarget.nodeName||!function(e){var t=e.currentTarget.target;return t&&"_self"!==t||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.nativeEvent&&2===e.nativeEvent.which}(e)&&i.isLocalURL(n))&&(e.preventDefault(),null==c&&r.indexOf("#")>=0&&(c=!1),t[o?"replace":"push"](n,r,{shallow:a,locale:s,scroll:c}))}(e,o,d,h,v,x,m,g)},onMouseEnter:function(e){i.isLocalURL(d)&&(t.props&&"function"===typeof t.props.onMouseEnter&&t.props.onMouseEnter(e),u(o,d,h,{priority:!0}))}};if(e.passHref||"a"===t.type&&!("href"in t.props)){var E="undefined"!==typeof g?g:o&&o.locale,M=o&&o.isLocaleDomain&&i.getDomainLocale(h,E,o&&o.locales,o&&o.domainLocales);_.href=M||i.addBasePath(i.addLocale(h,E,o&&o.defaultLocale))}return a.default.cloneElement(t,_)};t.default=f},7426:function(e,t,n){"use strict";var r=n(3848);Object.defineProperty(t,"__esModule",{value:!0}),t.useIntersection=function(e){var t=e.rootMargin,n=e.disabled||!i,s=o.useRef(),l=o.useState(!1),u=r(l,2),f=u[0],d=u[1],h=o.useCallback((function(e){s.current&&(s.current(),s.current=void 0),n||f||e&&e.tagName&&(s.current=function(e,t,n){var r=function(e){var t=e.rootMargin||"",n=c.get(t);if(n)return n;var r=new Map,o=new IntersectionObserver((function(e){e.forEach((function(e){var t=r.get(e.target),n=e.isIntersecting||e.intersectionRatio>0;t&&n&&t(n)}))}),e);return c.set(t,n={id:t,observer:o,elements:r}),n}(n),o=r.id,a=r.observer,i=r.elements;return i.set(e,t),a.observe(e),function(){i.delete(e),a.unobserve(e),0===i.size&&(a.disconnect(),c.delete(o))}}(e,(function(e){return e&&d(e)}),{rootMargin:t}))}),[n,t,f]);return o.useEffect((function(){if(!i&&!f){var e=a.requestIdleCallback((function(){return d(!0)}));return function(){return a.cancelIdleCallback(e)}}}),[f]),[h,f]};var o=n(7294),a=n(3447),i="undefined"!==typeof IntersectionObserver;var c=new Map},748:function(e,t,n){"use strict";n.d(t,{Ey:function(){return i},m9:function(){return c},bR:function(){return s}});var r=n(4184),o=n.n(r),a=n(5893),i=function(e){var t=e.width,n=void 0===t?5:t,r=e.height,i=void 0===r?5:r,c=e.className;return(0,a.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:o()("w-".concat(n),"h-".concat(i),c),viewBox:"0 0 20 20",fill:"currentColor",children:(0,a.jsx)("path",{fillRule:"evenodd",d:"M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z",clipRule:"evenodd"})})},c=function(e){var t=e.width,n=void 0===t?5:t,r=e.height,i=void 0===r?5:r,c=e.className;return(0,a.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:o()("w-".concat(n),"h-".concat(i),c),viewBox:"0 0 20 20",fill:"currentColor",children:(0,a.jsx)("path",{fillRule:"evenodd",d:"M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z",clipRule:"evenodd"})})},s=function(e){var t=e.width,n=void 0===t?6:t,r=e.height,i=void 0===r?6:r,c=e.className;return(0,a.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:o()("w-".concat(n),"h-".concat(i),c),fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:(0,a.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"})})}},688:function(e,t,n){"use strict";var r=n(9008),o=n(2218),a=n(5893);t.Z=function(e){var t=e.title,n=e.description,i=e.path,c=e.image,s=e.isBlogTitleDisabled?t||o.yU:"".concat(o.yU).concat(t?" | ".concat(t):"");return(0,a.jsxs)(r.default,{children:[(0,a.jsx)("title",{children:s}),n&&(0,a.jsx)("meta",{name:"description",content:n}),(0,a.jsx)("meta",{property:"og:type",content:"website"}),i&&(0,a.jsx)("meta",{property:"og:url",content:"".concat(o.Ql).concat(i)}),(0,a.jsx)("meta",{property:"og:title",content:s}),n&&(0,a.jsx)("meta",{property:"og:description",content:n}),c&&(0,a.jsx)("meta",{property:"og:image",content:c})]})}},9946:function(e,t,n){"use strict";n.d(t,{Z:function(){return f}});var r=n(2218),o=n(1664),a=n(1163),i=n(4184),c=n.n(i);n(809);var s=n(5893),l=function(e){var t,n=e.children,r=e.href,i=(0,a.useRouter)(),l=(null===(t=null===i||void 0===i?void 0:i.asPath)||void 0===t?void 0:t.split(/[?#]/)[0])===r;return(0,s.jsx)(o.default,{href:r,children:(0,s.jsx)("a",{className:c()("hover:text-purple-500",{"text-purple-500":l}),children:n})})},u=function(){return(0,s.jsxs)("header",{className:"flex flex-row items-center my-4 sm:my-6",children:[(0,s.jsx)("div",{className:"mr-auto",children:(0,s.jsx)(o.default,{href:"/",children:(0,s.jsx)("a",{className:"text-2xl font-semibold font-mono hover:text-purple-500",children:r.yU})})}),(0,s.jsxs)("nav",{className:"flex flex-row items-center space-x-4",children:[(0,s.jsx)(l,{href:"/about",children:"About"}),(0,s.jsx)(l,{href:"/archive",children:"Archive"}),(0,s.jsx)(l,{href:"/tags",children:"Tags"})]})]})},f=function(e){var t=e.children;return(0,s.jsxs)("div",{className:"container mx-auto px-4",children:[(0,s.jsx)(u,{}),(0,s.jsx)("main",{className:"my-10",children:t}),(0,s.jsxs)("footer",{className:"my-4 sm:my-6 text-center text-gray-700",children:["Copyright \xa9 2021 ",r.x1]})]})}},2218:function(e,t,n){"use strict";n.d(t,{Ql:function(){return r},yU:function(){return o},x1:function(){return a},TH:function(){return i}});var r="https://yrnana.github.io",o="nana.log",a="nana",i="yrnana/yrnana.github.io-comment"},9505:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return s}});var r=n(688),o=n(748),a=n(9946),i=n(5893),c=function(){return(0,i.jsx)(a.Z,{children:(0,i.jsxs)("div",{className:"text-center py-20",children:[(0,i.jsx)(o.bR,{width:14,height:14,className:"mx-auto text-red-500"}),(0,i.jsx)("div",{className:"font-bold text-9xl mt-2 mb-4",children:"404"}),(0,i.jsx)("div",{className:"font-semibold text-2xl text-gray-600",children:"Page Not Found"})]})})},s=function(){return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(r.Z,{title:"404 not found",path:"/404"}),(0,i.jsx)(c,{})]})}},9014:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/404",function(){return n(9505)}])},9008:function(e,t,n){e.exports=n(639)},1664:function(e,t,n){e.exports=n(2167)},1163:function(e,t,n){e.exports=n(4651)}},function(e){e.O(0,[774,888,179],(function(){return t=9014,e(e.s=t);var t}));var t=e.O();_N_E=t}]);