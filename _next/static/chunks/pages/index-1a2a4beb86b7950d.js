(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{5301:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return t(441)}])},8418:function(e,n,t){"use strict";function r(e,n){(null==n||n>e.length)&&(n=e.length);for(var t=0,r=new Array(n);t<n;t++)r[t]=e[t];return r}function o(e,n){return function(e){if(Array.isArray(e))return e}(e)||function(e,n){var t=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=t){var r,o,a=[],i=!0,u=!1;try{for(t=t.call(e);!(i=(r=t.next()).done)&&(a.push(r.value),!n||a.length!==n);i=!0);}catch(c){u=!0,o=c}finally{try{i||null==t.return||t.return()}finally{if(u)throw o}}return a}}(e,n)||function(e,n){if(!e)return;if("string"===typeof e)return r(e,n);var t=Object.prototype.toString.call(e).slice(8,-1);"Object"===t&&e.constructor&&(t=e.constructor.name);if("Map"===t||"Set"===t)return Array.from(t);if("Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return r(e,n)}(e,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}n.default=void 0;var a,i=(a=t(7294))&&a.__esModule?a:{default:a},u=t(6273),c=t(387),l=t(7190);var f={};function s(e,n,t,r){if(e&&u.isLocalURL(n)){e.prefetch(n,t,r).catch((function(e){0}));var o=r&&"undefined"!==typeof r.locale?r.locale:e&&e.locale;f[n+"%"+t+(o?"%"+o:"")]=!0}}var d=function(e){var n,t=!1!==e.prefetch,r=c.useRouter(),a=i.default.useMemo((function(){var n=o(u.resolveHref(r,e.href,!0),2),t=n[0],a=n[1];return{href:t,as:e.as?u.resolveHref(r,e.as):a||t}}),[r,e.href,e.as]),d=a.href,p=a.as,v=e.children,y=e.replace,h=e.shallow,m=e.scroll,b=e.locale;"string"===typeof v&&(v=i.default.createElement("a",null,v));var g=(n=i.default.Children.only(v))&&"object"===typeof n&&n.ref,_=o(l.useIntersection({rootMargin:"200px"}),2),w=_[0],j=_[1],x=i.default.useCallback((function(e){w(e),g&&("function"===typeof g?g(e):"object"===typeof g&&(g.current=e))}),[g,w]);i.default.useEffect((function(){var e=j&&t&&u.isLocalURL(d),n="undefined"!==typeof b?b:r&&r.locale,o=f[d+"%"+p+(n?"%"+n:"")];e&&!o&&s(r,d,p,{locale:n})}),[p,d,j,b,t,r]);var E={ref:x,onClick:function(e){n.props&&"function"===typeof n.props.onClick&&n.props.onClick(e),e.defaultPrevented||function(e,n,t,r,o,a,i,c){("A"!==e.currentTarget.nodeName||!function(e){var n=e.currentTarget.target;return n&&"_self"!==n||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.nativeEvent&&2===e.nativeEvent.which}(e)&&u.isLocalURL(t))&&(e.preventDefault(),null==i&&r.indexOf("#")>=0&&(i=!1),n[o?"replace":"push"](t,r,{shallow:a,locale:c,scroll:i}))}(e,r,d,p,y,h,m,b)},onMouseEnter:function(e){n.props&&"function"===typeof n.props.onMouseEnter&&n.props.onMouseEnter(e),u.isLocalURL(d)&&s(r,d,p,{priority:!0})}};if(e.passHref||"a"===n.type&&!("href"in n.props)){var k="undefined"!==typeof b?b:r&&r.locale,S=r&&r.isLocaleDomain&&u.getDomainLocale(p,k,r&&r.locales,r&&r.domainLocales);E.href=S||u.addBasePath(u.addLocale(p,k,r&&r.defaultLocale))}return i.default.cloneElement(n,E)};n.default=d},7190:function(e,n,t){"use strict";function r(e,n){(null==n||n>e.length)&&(n=e.length);for(var t=0,r=new Array(n);t<n;t++)r[t]=e[t];return r}function o(e,n){return function(e){if(Array.isArray(e))return e}(e)||function(e,n){var t=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=t){var r,o,a=[],i=!0,u=!1;try{for(t=t.call(e);!(i=(r=t.next()).done)&&(a.push(r.value),!n||a.length!==n);i=!0);}catch(c){u=!0,o=c}finally{try{i||null==t.return||t.return()}finally{if(u)throw o}}return a}}(e,n)||function(e,n){if(!e)return;if("string"===typeof e)return r(e,n);var t=Object.prototype.toString.call(e).slice(8,-1);"Object"===t&&e.constructor&&(t=e.constructor.name);if("Map"===t||"Set"===t)return Array.from(t);if("Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return r(e,n)}(e,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}Object.defineProperty(n,"__esModule",{value:!0}),n.useIntersection=function(e){var n=e.rootRef,t=e.rootMargin,r=e.disabled||!u,l=a.useRef(),f=o(a.useState(!1),2),s=f[0],d=f[1],p=o(a.useState(n?n.current:null),2),v=p[0],y=p[1],h=a.useCallback((function(e){l.current&&(l.current(),l.current=void 0),r||s||e&&e.tagName&&(l.current=function(e,n,t){var r=function(e){var n=e.rootMargin||"",t=c.get(n);if(t)return t;var r=new Map,o=new IntersectionObserver((function(e){e.forEach((function(e){var n=r.get(e.target),t=e.isIntersecting||e.intersectionRatio>0;n&&t&&n(t)}))}),e);return c.set(n,t={id:n,observer:o,elements:r}),t}(t),o=r.id,a=r.observer,i=r.elements;return i.set(e,n),a.observe(e),function(){i.delete(e),a.unobserve(e),0===i.size&&(a.disconnect(),c.delete(o))}}(e,(function(e){return e&&d(e)}),{root:v,rootMargin:t}))}),[r,v,t,s]);return a.useEffect((function(){if(!u&&!s){var e=i.requestIdleCallback((function(){return d(!0)}));return function(){return i.cancelIdleCallback(e)}}}),[s]),a.useEffect((function(){n&&y(n.current)}),[n]),[h,s]};var a=t(7294),i=t(9311),u="undefined"!==typeof IntersectionObserver;var c=new Map},441:function(e,n,t){"use strict";t.r(n),t.d(n,{__N_SSG:function(){return c}});var r=t(5893),o=t(9008),a=t(1664),i=t(1221),u=t.n(i),c=!0;n.default=function(e){e.trainingBlockKeys;var n=e.blocks;return(0,r.jsxs)("div",{className:u().container,children:[(0,r.jsxs)(o.default,{children:[(0,r.jsx)("title",{children:"Create Next App"}),(0,r.jsx)("meta",{name:"description",content:"K8S training"}),(0,r.jsx)("link",{rel:"icon",href:"/favicon.ico"})]}),(0,r.jsx)("main",{className:u().main,children:n.sort((function(e,n){return e.order-n.order})).map((function(e){return(0,r.jsx)("h3",{children:(0,r.jsx)(a.default,{href:"/blocks/".concat(e.key),children:(0,r.jsx)("a",{children:e.name})})},e.key)}))}),(0,r.jsx)("footer",{className:u().footer})]})}},1221:function(e){e.exports={container:"index_container__gnN1f"}},9008:function(e,n,t){e.exports=t(5443)},1664:function(e,n,t){e.exports=t(8418)}},function(e){e.O(0,[774,888,179],(function(){return n=5301,e(e.s=n);var n}));var n=e.O();_N_E=n}]);