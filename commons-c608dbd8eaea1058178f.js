(self.webpackChunkyrnana_github_io=self.webpackChunkyrnana_github_io||[]).push([[351],{2993:function(e){var t="undefined"!=typeof Element,n="function"==typeof Map,r="function"==typeof Set,o="function"==typeof ArrayBuffer&&!!ArrayBuffer.isView;function i(e,a){if(e===a)return!0;if(e&&a&&"object"==typeof e&&"object"==typeof a){if(e.constructor!==a.constructor)return!1;var c,u,s,l;if(Array.isArray(e)){if((c=e.length)!=a.length)return!1;for(u=c;0!=u--;)if(!i(e[u],a[u]))return!1;return!0}if(n&&e instanceof Map&&a instanceof Map){if(e.size!==a.size)return!1;for(l=e.entries();!(u=l.next()).done;)if(!a.has(u.value[0]))return!1;for(l=e.entries();!(u=l.next()).done;)if(!i(u.value[1],a.get(u.value[0])))return!1;return!0}if(r&&e instanceof Set&&a instanceof Set){if(e.size!==a.size)return!1;for(l=e.entries();!(u=l.next()).done;)if(!a.has(u.value[0]))return!1;return!0}if(o&&ArrayBuffer.isView(e)&&ArrayBuffer.isView(a)){if((c=e.length)!=a.length)return!1;for(u=c;0!=u--;)if(e[u]!==a[u])return!1;return!0}if(e.constructor===RegExp)return e.source===a.source&&e.flags===a.flags;if(e.valueOf!==Object.prototype.valueOf)return e.valueOf()===a.valueOf();if(e.toString!==Object.prototype.toString)return e.toString()===a.toString();if((c=(s=Object.keys(e)).length)!==Object.keys(a).length)return!1;for(u=c;0!=u--;)if(!Object.prototype.hasOwnProperty.call(a,s[u]))return!1;if(t&&e instanceof Element)return!1;for(u=c;0!=u--;)if(("_owner"!==s[u]&&"__v"!==s[u]&&"__o"!==s[u]||!e.$$typeof)&&!i(e[s[u]],a[s[u]]))return!1;return!0}return e!=e&&a!=a}e.exports=function(e,t){try{return i(e,t)}catch(n){if((n.message||"").match(/stack|recursion/i))return console.warn("react-fast-compare cannot handle circular refs"),!1;throw n}}},4839:function(e,t,n){"use strict";var r,o=n(7294),i=(r=o)&&"object"==typeof r&&"default"in r?r.default:r;function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var c=!("undefined"==typeof window||!window.document||!window.document.createElement);e.exports=function(e,t,n){if("function"!=typeof e)throw new Error("Expected reducePropsToState to be a function.");if("function"!=typeof t)throw new Error("Expected handleStateChangeOnClient to be a function.");if(void 0!==n&&"function"!=typeof n)throw new Error("Expected mapStateOnServer to either be undefined or a function.");return function(r){if("function"!=typeof r)throw new Error("Expected WrappedComponent to be a React component.");var u,s=[];function l(){u=e(s.map((function(e){return e.props}))),f.canUseDOM?t(u):n&&(u=n(u))}var f=function(e){var t,n;function o(){return e.apply(this,arguments)||this}n=e,(t=o).prototype=Object.create(n.prototype),t.prototype.constructor=t,t.__proto__=n,o.peek=function(){return u},o.rewind=function(){if(o.canUseDOM)throw new Error("You may only call rewind() on the server. Call peek() to read the current state.");var e=u;return u=void 0,s=[],e};var a=o.prototype;return a.UNSAFE_componentWillMount=function(){s.push(this),l()},a.componentDidUpdate=function(){l()},a.componentWillUnmount=function(){var e=s.indexOf(this);s.splice(e,1),l()},a.render=function(){return i.createElement(r,this.props)},o}(o.PureComponent);return a(f,"displayName","SideEffect("+function(e){return e.displayName||e.name||"Component"}(r)+")"),a(f,"canUseDOM",c),f}}},5827:function(e,t,n){"use strict";n.d(t,{Z:function(){return ge}});var r,o,i,a,c=n(9499),u=n(5444),s=n(5697),l=n.n(s),f=n(4839),p=n.n(f),d=n(2993),h=n.n(d),m=n(7294),y=n(6494),b=n.n(y),v="bodyAttributes",g="htmlAttributes",T="titleAttributes",w={BASE:"base",BODY:"body",HEAD:"head",HTML:"html",LINK:"link",META:"meta",NOSCRIPT:"noscript",SCRIPT:"script",STYLE:"style",TITLE:"title"},x=(Object.keys(w).map((function(e){return w[e]})),"charset"),A="cssText",j="href",C="http-equiv",O="innerHTML",S="itemprop",E="name",k="property",P="rel",L="src",I="target",N={accesskey:"accessKey",charset:"charSet",class:"className",contenteditable:"contentEditable",contextmenu:"contextMenu","http-equiv":"httpEquiv",itemprop:"itemProp",tabindex:"tabIndex"},M="defaultTitle",_="defer",R="encodeSpecialCharacters",B="onChangeClientState",D="titleTemplate",H=Object.keys(N).reduce((function(e,t){return e[N[t]]=t,e}),{}),q=[w.NOSCRIPT,w.SCRIPT,w.STYLE],Y="data-react-helmet",F="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},U=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")},z=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),K=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},W=function(e,t){var n={};for(var r in e)t.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r]);return n},V=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t},Q=function(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];return!1===t?String(e):String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")},Z=function(e){var t=ee(e,w.TITLE),n=ee(e,D);if(n&&t)return n.replace(/%s/g,(function(){return Array.isArray(t)?t.join(""):t}));var r=ee(e,M);return t||r||void 0},$=function(e){return ee(e,B)||function(){}},J=function(e,t){return t.filter((function(t){return void 0!==t[e]})).map((function(t){return t[e]})).reduce((function(e,t){return K({},e,t)}),{})},G=function(e,t){return t.filter((function(e){return void 0!==e[w.BASE]})).map((function(e){return e[w.BASE]})).reverse().reduce((function(t,n){if(!t.length)for(var r=Object.keys(n),o=0;o<r.length;o++){var i=r[o].toLowerCase();if(-1!==e.indexOf(i)&&n[i])return t.concat(n)}return t}),[])},X=function(e,t,n){var r={};return n.filter((function(t){return!!Array.isArray(t[e])||(void 0!==t[e]&&ie("Helmet: "+e+' should be of type "Array". Instead found type "'+F(t[e])+'"'),!1)})).map((function(t){return t[e]})).reverse().reduce((function(e,n){var o={};n.filter((function(e){for(var n=void 0,i=Object.keys(e),a=0;a<i.length;a++){var c=i[a],u=c.toLowerCase();-1===t.indexOf(u)||n===P&&"canonical"===e[n].toLowerCase()||u===P&&"stylesheet"===e[u].toLowerCase()||(n=u),-1===t.indexOf(c)||c!==O&&c!==A&&c!==S||(n=c)}if(!n||!e[n])return!1;var s=e[n].toLowerCase();return r[n]||(r[n]={}),o[n]||(o[n]={}),!r[n][s]&&(o[n][s]=!0,!0)})).reverse().forEach((function(t){return e.push(t)}));for(var i=Object.keys(o),a=0;a<i.length;a++){var c=i[a],u=b()({},r[c],o[c]);r[c]=u}return e}),[]).reverse()},ee=function(e,t){for(var n=e.length-1;n>=0;n--){var r=e[n];if(r.hasOwnProperty(t))return r[t]}return null},te=(r=Date.now(),function(e){var t=Date.now();t-r>16?(r=t,e(t)):setTimeout((function(){te(e)}),0)}),ne=function(e){return clearTimeout(e)},re="undefined"!=typeof window?window.requestAnimationFrame&&window.requestAnimationFrame.bind(window)||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||te:n.g.requestAnimationFrame||te,oe="undefined"!=typeof window?window.cancelAnimationFrame||window.webkitCancelAnimationFrame||window.mozCancelAnimationFrame||ne:n.g.cancelAnimationFrame||ne,ie=function(e){return console&&"function"==typeof console.warn&&console.warn(e)},ae=null,ce=function(e,t){var n=e.baseTag,r=e.bodyAttributes,o=e.htmlAttributes,i=e.linkTags,a=e.metaTags,c=e.noscriptTags,u=e.onChangeClientState,s=e.scriptTags,l=e.styleTags,f=e.title,p=e.titleAttributes;le(w.BODY,r),le(w.HTML,o),se(f,p);var d={baseTag:fe(w.BASE,n),linkTags:fe(w.LINK,i),metaTags:fe(w.META,a),noscriptTags:fe(w.NOSCRIPT,c),scriptTags:fe(w.SCRIPT,s),styleTags:fe(w.STYLE,l)},h={},m={};Object.keys(d).forEach((function(e){var t=d[e],n=t.newTags,r=t.oldTags;n.length&&(h[e]=n),r.length&&(m[e]=d[e].oldTags)})),t&&t(),u(e,h,m)},ue=function(e){return Array.isArray(e)?e.join(""):e},se=function(e,t){void 0!==e&&document.title!==e&&(document.title=ue(e)),le(w.TITLE,t)},le=function(e,t){var n=document.getElementsByTagName(e)[0];if(n){for(var r=n.getAttribute(Y),o=r?r.split(","):[],i=[].concat(o),a=Object.keys(t),c=0;c<a.length;c++){var u=a[c],s=t[u]||"";n.getAttribute(u)!==s&&n.setAttribute(u,s),-1===o.indexOf(u)&&o.push(u);var l=i.indexOf(u);-1!==l&&i.splice(l,1)}for(var f=i.length-1;f>=0;f--)n.removeAttribute(i[f]);o.length===i.length?n.removeAttribute(Y):n.getAttribute(Y)!==a.join(",")&&n.setAttribute(Y,a.join(","))}},fe=function(e,t){var n=document.head||document.querySelector(w.HEAD),r=n.querySelectorAll(e+"["+"data-react-helmet]"),o=Array.prototype.slice.call(r),i=[],a=void 0;return t&&t.length&&t.forEach((function(t){var n=document.createElement(e);for(var r in t)if(t.hasOwnProperty(r))if(r===O)n.innerHTML=t.innerHTML;else if(r===A)n.styleSheet?n.styleSheet.cssText=t.cssText:n.appendChild(document.createTextNode(t.cssText));else{var c=void 0===t[r]?"":t[r];n.setAttribute(r,c)}n.setAttribute(Y,"true"),o.some((function(e,t){return a=t,n.isEqualNode(e)}))?o.splice(a,1):i.push(n)})),o.forEach((function(e){return e.parentNode.removeChild(e)})),i.forEach((function(e){return n.appendChild(e)})),{oldTags:o,newTags:i}},pe=function(e){return Object.keys(e).reduce((function(t,n){var r=void 0!==e[n]?n+'="'+e[n]+'"':""+n;return t?t+" "+r:r}),"")},de=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return Object.keys(e).reduce((function(t,n){return t[N[n]||n]=e[n],t}),t)},he=function(e,t,n){switch(e){case w.TITLE:return{toComponent:function(){return e=t.title,n=t.titleAttributes,(r={key:e})[Y]=!0,o=de(n,r),[m.createElement(w.TITLE,o,e)];var e,n,r,o},toString:function(){return function(e,t,n,r){var o=pe(n),i=ue(t);return o?"<"+e+' data-react-helmet="true" '+o+">"+Q(i,r)+"</"+e+">":"<"+e+' data-react-helmet="true">'+Q(i,r)+"</"+e+">"}(e,t.title,t.titleAttributes,n)}};case v:case g:return{toComponent:function(){return de(t)},toString:function(){return pe(t)}};default:return{toComponent:function(){return function(e,t){return t.map((function(t,n){var r,o=((r={key:n})[Y]=!0,r);return Object.keys(t).forEach((function(e){var n=N[e]||e;if(n===O||n===A){var r=t.innerHTML||t.cssText;o.dangerouslySetInnerHTML={__html:r}}else o[n]=t[e]})),m.createElement(e,o)}))}(e,t)},toString:function(){return function(e,t,n){return t.reduce((function(t,r){var o=Object.keys(r).filter((function(e){return!(e===O||e===A)})).reduce((function(e,t){var o=void 0===r[t]?t:t+'="'+Q(r[t],n)+'"';return e?e+" "+o:o}),""),i=r.innerHTML||r.cssText||"",a=-1===q.indexOf(e);return t+"<"+e+' data-react-helmet="true" '+o+(a?"/>":">"+i+"</"+e+">")}),"")}(e,t,n)}}}},me=function(e){var t=e.baseTag,n=e.bodyAttributes,r=e.encode,o=e.htmlAttributes,i=e.linkTags,a=e.metaTags,c=e.noscriptTags,u=e.scriptTags,s=e.styleTags,l=e.title,f=void 0===l?"":l,p=e.titleAttributes;return{base:he(w.BASE,t,r),bodyAttributes:he(v,n,r),htmlAttributes:he(g,o,r),link:he(w.LINK,i,r),meta:he(w.META,a,r),noscript:he(w.NOSCRIPT,c,r),script:he(w.SCRIPT,u,r),style:he(w.STYLE,s,r),title:he(w.TITLE,{title:f,titleAttributes:p},r)}},ye=p()((function(e){return{baseTag:G([j,I],e),bodyAttributes:J(v,e),defer:ee(e,_),encode:ee(e,R),htmlAttributes:J(g,e),linkTags:X(w.LINK,[P,j],e),metaTags:X(w.META,[E,x,C,k,S],e),noscriptTags:X(w.NOSCRIPT,[O],e),onChangeClientState:$(e),scriptTags:X(w.SCRIPT,[L,O],e),styleTags:X(w.STYLE,[A],e),title:Z(e),titleAttributes:J(T,e)}}),(function(e){ae&&oe(ae),e.defer?ae=re((function(){ce(e,(function(){ae=null}))})):(ce(e),ae=null)}),me)((function(){return null})),be=(o=ye,a=i=function(e){function t(){return U(this,t),V(this,e.apply(this,arguments))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),t.prototype.shouldComponentUpdate=function(e){return!h()(this.props,e)},t.prototype.mapNestedChildrenToProps=function(e,t){if(!t)return null;switch(e.type){case w.SCRIPT:case w.NOSCRIPT:return{innerHTML:t};case w.STYLE:return{cssText:t}}throw new Error("<"+e.type+" /> elements are self-closing and can not contain children. Refer to our API for more information.")},t.prototype.flattenArrayTypeChildren=function(e){var t,n=e.child,r=e.arrayTypeChildren,o=e.newChildProps,i=e.nestedChildren;return K({},r,((t={})[n.type]=[].concat(r[n.type]||[],[K({},o,this.mapNestedChildrenToProps(n,i))]),t))},t.prototype.mapObjectTypeChildren=function(e){var t,n,r=e.child,o=e.newProps,i=e.newChildProps,a=e.nestedChildren;switch(r.type){case w.TITLE:return K({},o,((t={})[r.type]=a,t.titleAttributes=K({},i),t));case w.BODY:return K({},o,{bodyAttributes:K({},i)});case w.HTML:return K({},o,{htmlAttributes:K({},i)})}return K({},o,((n={})[r.type]=K({},i),n))},t.prototype.mapArrayTypeChildrenToProps=function(e,t){var n=K({},t);return Object.keys(e).forEach((function(t){var r;n=K({},n,((r={})[t]=e[t],r))})),n},t.prototype.warnOnInvalidChildren=function(e,t){return!0},t.prototype.mapChildrenToProps=function(e,t){var n=this,r={};return m.Children.forEach(e,(function(e){if(e&&e.props){var o=e.props,i=o.children,a=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return Object.keys(e).reduce((function(t,n){return t[H[n]||n]=e[n],t}),t)}(W(o,["children"]));switch(n.warnOnInvalidChildren(e,i),e.type){case w.LINK:case w.META:case w.NOSCRIPT:case w.SCRIPT:case w.STYLE:r=n.flattenArrayTypeChildren({child:e,arrayTypeChildren:r,newChildProps:a,nestedChildren:i});break;default:t=n.mapObjectTypeChildren({child:e,newProps:t,newChildProps:a,nestedChildren:i})}}})),t=this.mapArrayTypeChildrenToProps(r,t)},t.prototype.render=function(){var e=this.props,t=e.children,n=W(e,["children"]),r=K({},n);return t&&(r=this.mapChildrenToProps(t,r)),m.createElement(o,r)},z(t,null,[{key:"canUseDOM",set:function(e){o.canUseDOM=e}}]),t}(m.Component),i.propTypes={base:l().object,bodyAttributes:l().object,children:l().oneOfType([l().arrayOf(l().node),l().node]),defaultTitle:l().string,defer:l().bool,encodeSpecialCharacters:l().bool,htmlAttributes:l().object,link:l().arrayOf(l().object),meta:l().arrayOf(l().object),noscript:l().arrayOf(l().object),onChangeClientState:l().func,script:l().arrayOf(l().object),style:l().arrayOf(l().object),title:l().string,titleAttributes:l().object,titleTemplate:l().string},i.defaultProps={defer:!0,encodeSpecialCharacters:!0},i.peek=o.peek,i.rewind=function(){var e=o.rewind();return e||(e=me({baseTag:[],bodyAttributes:{},encodeSpecialCharacters:!0,htmlAttributes:{},linkTags:[],metaTags:[],noscriptTags:[],scriptTags:[],styleTags:[],title:"",titleAttributes:{}})),e},a);be.renderStatic=be.rewind;var ve=n(5893),ge=function(e){var t,n,r,o=e.title,i=e.description,a=e.image,s=e.noindex,l=e.keywords,f=e.type,p=void 0===f?"website":f,d=e.isBlogTitleDisabled,h=(0,c.useLocation)().pathname,m=(0,u.useStaticQuery)("5457840").site,y=null==m||null===(t=m.siteMetadata)||void 0===t?void 0:t.title,b=null==m||null===(n=m.siteMetadata)||void 0===n?void 0:n.siteUrl,v=null==m||null===(r=m.siteMetadata)||void 0===r?void 0:r.defaultImage,g=""+b+h,T=""+b+(a||v),w=d?o||y:y+(o?" | "+o:"");return(0,ve.jsxs)(be,{children:[(0,ve.jsx)("html",{lang:"ko"}),(0,ve.jsx)("meta",{charSet:"utf-8"}),s&&(0,ve.jsx)("meta",{name:"robots",content:"noindex"}),(0,ve.jsx)("title",{children:w}),(0,ve.jsx)("meta",{name:"google-site-verification",content:"H7DNse5ObBh-m99zO6U0iw-K6iC00p7BJxRBuWp-nyc"}),i&&(0,ve.jsx)("meta",{name:"description",content:i}),l&&(0,ve.jsx)("meta",{name:"keywords",content:l}),(0,ve.jsx)("link",{rel:"canonical",href:g}),(0,ve.jsx)("meta",{property:"og:type",content:p}),h&&(0,ve.jsx)("meta",{property:"og:url",content:g}),(0,ve.jsx)("meta",{property:"og:title",content:w}),i&&(0,ve.jsx)("meta",{property:"og:description",content:i}),T&&(0,ve.jsx)("meta",{property:"og:image",content:T}),(0,ve.jsx)("meta",{name:"twitter:card",content:"summary_large_image"}),w&&(0,ve.jsx)("meta",{name:"twitter:title",content:w}),i&&(0,ve.jsx)("meta",{name:"twitter:description",content:i})]})}},2721:function(e,t,n){"use strict";n.d(t,{Z:function(){return c}});var r=n(5444),o=n(5893),i=function(e){var t=e.to,n=e.children;return(0,o.jsx)(r.Link,{to:t,className:"hover:text-violet-500 text-sm sm:text-base",activeClassName:"text-violet-500",children:n})},a=function(e){var t=e.title;return(0,o.jsxs)("header",{className:"mt-4 sm:mt-6 flex flex-row items-center",children:[(0,o.jsx)("div",{className:"mr-auto",children:(0,o.jsx)(r.Link,{to:"/",className:"select-none text-xl sm:text-2xl font-semibold font-mono hover:text-violet-500",children:t})}),(0,o.jsxs)("nav",{className:"flex flex-row items-center space-x-4",children:[(0,o.jsx)(i,{to:"/about",children:"About"}),(0,o.jsx)(i,{to:"/archive",children:"Archive"}),(0,o.jsx)(i,{to:"/tags",children:"Tags"})]})]})},c=function(e){var t,n,i=e.children,c=(0,r.useStaticQuery)("1957264973").site;return(0,o.jsxs)("div",{className:"container mx-auto px-4 flex flex-col min-h-screen",children:[(0,o.jsx)(a,{title:null==c||null===(t=c.siteMetadata)||void 0===t?void 0:t.title}),(0,o.jsx)("main",{className:"py-10 flex-grow",children:i}),(0,o.jsxs)("footer",{className:"mb-4 sm:mb-6 text-center text-slate-700",children:[(0,o.jsxs)("span",{className:"mr-2 text-sm sm:text-base",children:["Copyright © ",(new Date).getFullYear()]}),(0,o.jsx)("span",{children:null==c||null===(n=c.siteMetadata)||void 0===n?void 0:n.author})]})]})}}}]);
//# sourceMappingURL=commons-c608dbd8eaea1058178f.js.map