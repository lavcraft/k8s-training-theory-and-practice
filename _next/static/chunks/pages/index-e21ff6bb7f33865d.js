(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{8312:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return n(85)}])},3991:function(e,t){"use strict";var n,r;Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var n in t)Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}(t,{PrefetchKind:function(){return n},ACTION_REFRESH:function(){return o},ACTION_NAVIGATE:function(){return u},ACTION_RESTORE:function(){return l},ACTION_SERVER_PATCH:function(){return f},ACTION_PREFETCH:function(){return i},ACTION_FAST_REFRESH:function(){return a},ACTION_SERVER_ACTION:function(){return c}});let o="refresh",u="navigate",l="restore",f="server-patch",i="prefetch",a="fast-refresh",c="server-action";(r=n||(n={})).AUTO="auto",r.FULL="full",r.TEMPORARY="temporary",("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},1516:function(e,t){"use strict";function n(e,t,n,r){return!1}Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"getDomainLocale",{enumerable:!0,get:function(){return n}}),("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},5569:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return O}});let r=n(8754),o=r._(n(7294)),u=n(4532),l=n(3353),f=n(1410),i=n(9064),a=n(370),c=n(9955),s=n(4224),d=n(508),p=n(1516),_=n(4266),h=n(3991),y=new Set;function b(e,t,n,r,o,u){if(!u&&!(0,l.isLocalURL)(t))return;if(!r.bypassPrefetchedCheck){let o=void 0!==r.locale?r.locale:"locale"in e?e.locale:void 0,u=t+"%"+n+"%"+o;if(y.has(u))return;y.add(u)}let f=u?e.prefetch(t,o):e.prefetch(t,n,r);Promise.resolve(f).catch(e=>{})}function v(e){return"string"==typeof e?e:(0,f.formatUrl)(e)}let m=o.default.forwardRef(function(e,t){let n,r;let{href:f,as:y,children:m,prefetch:O=null,passHref:g,replace:j,shallow:E,scroll:C,locale:P,onClick:T,onMouseEnter:x,onTouchStart:k,legacyBehavior:M=!1,...N}=e;n=m,M&&("string"==typeof n||"number"==typeof n)&&(n=o.default.createElement("a",null,n));let R=!1!==O,A=null===O?h.PrefetchKind.AUTO:h.PrefetchKind.FULL,I=o.default.useContext(c.RouterContext),S=o.default.useContext(s.AppRouterContext),L=null!=I?I:S,w=!I,{href:U,as:K}=o.default.useMemo(()=>{if(!I){let e=v(f);return{href:e,as:y?v(y):e}}let[e,t]=(0,u.resolveHref)(I,f,!0);return{href:e,as:y?(0,u.resolveHref)(I,y):t||e}},[I,f,y]),F=o.default.useRef(U),H=o.default.useRef(K);M&&(r=o.default.Children.only(n));let D=M?r&&"object"==typeof r&&r.ref:t,[V,G,X]=(0,d.useIntersection)({rootMargin:"200px"}),q=o.default.useCallback(e=>{(H.current!==K||F.current!==U)&&(X(),H.current=K,F.current=U),V(e),D&&("function"==typeof D?D(e):"object"==typeof D&&(D.current=e))},[K,D,U,X,V]);o.default.useEffect(()=>{L&&G&&R&&b(L,U,K,{locale:P},{kind:A},w)},[K,U,G,P,R,null==I?void 0:I.locale,L,w,A]);let z={ref:q,onClick(e){M||"function"!=typeof T||T(e),M&&r.props&&"function"==typeof r.props.onClick&&r.props.onClick(e),L&&!e.defaultPrevented&&function(e,t,n,r,u,f,i,a,c,s){let{nodeName:d}=e.currentTarget,p="A"===d.toUpperCase();if(p&&(function(e){let t=e.currentTarget,n=t.getAttribute("target");return n&&"_self"!==n||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.nativeEvent&&2===e.nativeEvent.which}(e)||!c&&!(0,l.isLocalURL)(n)))return;e.preventDefault();let _=()=>{"beforePopState"in t?t[u?"replace":"push"](n,r,{shallow:f,locale:a,scroll:i}):t[u?"replace":"push"](r||n,{forceOptimisticNavigation:!s})};c?o.default.startTransition(_):_()}(e,L,U,K,j,E,C,P,w,R)},onMouseEnter(e){M||"function"!=typeof x||x(e),M&&r.props&&"function"==typeof r.props.onMouseEnter&&r.props.onMouseEnter(e),L&&(R||!w)&&b(L,U,K,{locale:P,priority:!0,bypassPrefetchedCheck:!0},{kind:A},w)},onTouchStart(e){M||"function"!=typeof k||k(e),M&&r.props&&"function"==typeof r.props.onTouchStart&&r.props.onTouchStart(e),L&&(R||!w)&&b(L,U,K,{locale:P,priority:!0,bypassPrefetchedCheck:!0},{kind:A},w)}};if((0,i.isAbsoluteUrl)(K))z.href=K;else if(!M||g||"a"===r.type&&!("href"in r.props)){let e=void 0!==P?P:null==I?void 0:I.locale,t=(null==I?void 0:I.isLocaleDomain)&&(0,p.getDomainLocale)(K,e,null==I?void 0:I.locales,null==I?void 0:I.domainLocales);z.href=t||(0,_.addBasePath)((0,a.addLocale)(K,e,null==I?void 0:I.defaultLocale))}return M?o.default.cloneElement(r,z):o.default.createElement("a",{...N,...z},n)}),O=m;("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},508:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"useIntersection",{enumerable:!0,get:function(){return i}});let r=n(7294),o=n(29),u="function"==typeof IntersectionObserver,l=new Map,f=[];function i(e){let{rootRef:t,rootMargin:n,disabled:i}=e,a=i||!u,[c,s]=(0,r.useState)(!1),d=(0,r.useRef)(null),p=(0,r.useCallback)(e=>{d.current=e},[]);(0,r.useEffect)(()=>{if(u){if(a||c)return;let e=d.current;if(e&&e.tagName){let r=function(e,t,n){let{id:r,observer:o,elements:u}=function(e){let t;let n={root:e.root||null,margin:e.rootMargin||""},r=f.find(e=>e.root===n.root&&e.margin===n.margin);if(r&&(t=l.get(r)))return t;let o=new Map,u=new IntersectionObserver(e=>{e.forEach(e=>{let t=o.get(e.target),n=e.isIntersecting||e.intersectionRatio>0;t&&n&&t(n)})},e);return t={id:n,observer:u,elements:o},f.push(n),l.set(n,t),t}(n);return u.set(e,t),o.observe(e),function(){if(u.delete(e),o.unobserve(e),0===u.size){o.disconnect(),l.delete(r);let e=f.findIndex(e=>e.root===r.root&&e.margin===r.margin);e>-1&&f.splice(e,1)}}}(e,e=>e&&s(e),{root:null==t?void 0:t.current,rootMargin:n});return r}}else if(!c){let e=(0,o.requestIdleCallback)(()=>s(!0));return()=>(0,o.cancelIdleCallback)(e)}},[a,n,t,c,d.current]);let _=(0,r.useCallback)(()=>{s(!1)},[]);return[p,c,_]}("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},85:function(e,t,n){"use strict";n.r(t),n.d(t,{__N_SSG:function(){return c}});var r=n(5893),o=n(9008),u=n.n(o),l=n(1664),f=n.n(l),i=n(2729),a=n.n(i),c=!0;t.default=e=>{let{trainingBlockKeys:t,blocks:n}=e;return(0,r.jsxs)("div",{className:a().container,children:[(0,r.jsxs)(u(),{children:[(0,r.jsx)("title",{children:"Create Next App"}),(0,r.jsx)("meta",{name:"description",content:"K8S training"}),(0,r.jsx)("link",{rel:"icon",href:"/favicon.ico"})]}),(0,r.jsx)("main",{className:a().main,children:n.sort((e,t)=>e.order-t.order).map(e=>(0,r.jsx)("h3",{children:(0,r.jsx)(f(),{href:"/blocks/".concat(e.key),children:e.name})},e.key))}),(0,r.jsx)("footer",{className:a().footer})]})}},2729:function(e){e.exports={container:"index_container__gnN1f"}},9008:function(e,t,n){e.exports=n(2636)},1664:function(e,t,n){e.exports=n(5569)}},function(e){e.O(0,[774,888,179],function(){return e(e.s=8312)}),_N_E=e.O()}]);