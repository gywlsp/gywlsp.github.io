(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{"8JVb":function(e,t,n){"use strict";n.r(t);var r=n("q1tI"),a=n.n(r),i=n("vOnD"),o=n("EvL2"),l=n("LlmJ"),c=n("Wbzz"),m=n("9eSz"),s=n.n(m),p=n("Wgwc"),d=n.n(p),f=n("iYic");function u(e){var t=e.content,n=e.currentHeaderHref,r=Object(i.a)(["li a[href='","']{font-weight:bold;color:",";}"],n,f.f);return a.a.createElement(g,null,a.a.createElement(b,null,"TABLE OF CONTENTS"),a.a.createElement(w,{className:"tableOfContent",dangerouslySetInnerHTML:{__html:t},_css:r}))}var g=i.b.div.withConfig({displayName:"toc__Wrapper",componentId:"sc-1w92qt2-0"})(["position:sticky;flex:1;top:2rem;left:2.8rem;margin-top:8.8rem;margin-left:2.8rem;height:fit-content;@media (max-width:1400px){display:none;}"]),b=i.b.p.withConfig({displayName:"toc__Title",componentId:"sc-1w92qt2-1"})(["font-size:1.4rem;margin:0;margin-bottom:1.2rem;font-weight:bold;"]),h=i.b.div.withConfig({displayName:"toc__TOC",componentId:"sc-1w92qt2-2"})(["flex:1;"]),w=Object(i.b)(h).withConfig({displayName:"toc___StyledTOC",componentId:"sc-1w92qt2-3"})(["",""],(function(e){return e._css})),y=n("WeT4");function v(){var e=Object(c.useStaticQuery)("3274528899").site.siteMetadata.author;return a.a.createElement(O,null,a.a.createElement(y.a,{src:"/images/profile-image.jpeg",width:"10rem",height:"10rem",alt:"profile-image",circle:!0,cover:!0,style:{marginRight:"2rem"}}),a.a.createElement(_,null,a.a.createElement("strong",null,e.name),a.a.createElement("br",null),"Front-end Developer",a.a.createElement("br",null),a.a.createElement("a",{target:"_blank",href:"https://gywlsp.notion.site/gywlsp/gywlsp-8073dc1ab1d346dfa75bdef108e88783"},"About ME ✨"),a.a.createElement("br",null)))}var E=a.a.memo(v),O=i.b.div.withConfig({displayName:"bio__Wrapper",componentId:"sc-20yvs3-0"})(["box-shadow:none;text-decoration:none;color:",";display:flex;flex:1;margin:2.8rem 0;align-items:center;"],f.a),_=i.b.p.withConfig({displayName:"bio__P",componentId:"sc-20yvs3-1"})(["font-size:1.6rem;margin:0;"]);var x=function(e){var t=e.frontmatter,n=e.html,i=e.tableOfContents,o=Object(r.useState)(),l=o[0],c=o[1],m=t.thumbnail,p=t.title,g=t.tags,b=t.date;return Object(r.useEffect)((function(){var e=function(){for(var e=document.querySelectorAll(".anchor-header"),t=0;t<e.length;t++){var n,r=e[t],a=t===e.length-1,i=r.getBoundingClientRect().top;if(!(i<=10)||a){var o=i>10?null===(n=e[t-1])||void 0===n?void 0:n.href:r.href;c(null==o?void 0:o.replace(window.location.origin,""));break}}};return window.addEventListener("scroll",e),function(){window.removeEventListener("scroll",e)}}),[]),a.a.createElement(j,null,a.a.createElement(C,null,a.a.createElement("header",null,a.a.createElement(N,null,p),a.a.createElement(I,null,g.map((function(e){return a.a.createElement(y.b,{key:e,name:e})}))),a.a.createElement(I,null,a.a.createElement(S,{to:"/"},a.a.createElement(k,null,"박효진 (@gywlsp)")),a.a.createElement(P,null,d()(b).format("YYYY년 MM월 DD일"))),a.a.createElement(s.a,{fluid:m.childImageSharp.fluid,style:{width:"80%",maxWidth:"800px",height:"auto",objectFit:"cover",margin:"0.8rem auto 2.4rem",border:"0.1px solid "+f.d}})),a.a.createElement("section",{className:"postContents",dangerouslySetInnerHTML:{__html:n}}),a.a.createElement("hr",null),a.a.createElement("footer",null,a.a.createElement(E,null))),i&&a.a.createElement(u,{content:i,currentHeaderHref:l}))},j=i.b.div.withConfig({displayName:"content__Wrapper",componentId:"sc-1h5rc5q-0"})(["display:flex;width:100%;"]),C=i.b.article.withConfig({displayName:"content__Article",componentId:"sc-1h5rc5q-1"})(["width:calc(100% - 260px - 1.6rem);@media (max-width:1400px){width:100%;}"]),N=i.b.h1.withConfig({displayName:"content__H1",componentId:"sc-1h5rc5q-2"})(["&&{margin:0;margin-bottom:0.8rem;font-size:2.6rem;}"]),I=i.b.div.withConfig({displayName:"content__Row",componentId:"sc-1h5rc5q-3"})(["display:flex;align-items:baseline;"]),k=i.b.p.withConfig({displayName:"content__Name",componentId:"sc-1h5rc5q-4"})(["font-size:1.4rem;margin-right:1.2rem;"]),P=i.b.p.withConfig({displayName:"content__Date",componentId:"sc-1h5rc5q-5"})(["font-size:1.4rem;font-weight:400;color:",";"],f.e),S=Object(i.b)(c.Link).withConfig({displayName:"content__StyledLink",componentId:"sc-1h5rc5q-6"})(["box-shadow:none;text-decoration:none;color:",";"],f.a),D=n("rePB");function q(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function L(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?q(Object(n),!0).forEach((function(t){Object(D.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):q(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function z(e){var t=e.style,n=void 0===t?{}:t,r=e.fill,i=void 0===r?f.b:r;return a.a.createElement("svg",{style:L({width:"2rem",height:"2rem"},n),fill:i,xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20"},a.a.createElement("polygon",{points:"20 9.26 2.91 9.26 11.29 1.08 10.24 0.01 0 10.01 10.24 20.01 11.29 18.94 2.91 10.76 20 10.76 20 9.26"}))}function T(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function W(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?T(Object(n),!0).forEach((function(t){Object(D.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):T(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function H(e){var t=e.style,n=void 0===t?{}:t,r=e.fill,i=void 0===r?f.b:r;return a.a.createElement("svg",{style:W({width:"2rem",height:"2rem"},n),fill:i,xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20"},a.a.createElement("polygon",{points:"0 10.76 17.09 10.76 8.71 18.94 9.76 20.01 20 10.01 9.76 0.01 8.71 1.08 17.09 9.26 0 9.26 0 10.76"})," ")}function M(e){var t=e.type,n=e.fields,r=e.frontmatter;return a.a.createElement(R,{to:n.slug,type:t},"previous"===t&&a.a.createElement(A,{style:{marginRight:"1.2rem"}},a.a.createElement(z,null)),a.a.createElement("div",null,a.a.createElement(B,null,"previous"===t?"이전":"다음"," 포스트"),a.a.createElement(J,null,r.title)),"next"===t&&a.a.createElement(A,{style:{marginLeft:"1.2rem"}},a.a.createElement(H,null)))}var R=Object(i.b)(c.Link).withConfig({displayName:"context__Wrapper",componentId:"sc-1efe6hm-0"})(["display:flex;align-items:center;justify-content:space-between;width:100%;padding:2rem;",";background-color:",";box-shadow:none;text-decoration:none;margin-bottom:1.2rem;"],(function(e){return"previous"===e.type?"margin-right: auto":"margin-left: auto"}),f.c),A=i.b.div.withConfig({displayName:"context__Circle",componentId:"sc-1efe6hm-1"})(["display:flex;justify-content:center;padding:0.8rem;align-items:center;border:0.1rem solid ",";border-radius:99999px;"],f.b),B=i.b.p.withConfig({displayName:"context__Label",componentId:"sc-1efe6hm-2"})(["margin:0;margin-bottom:0.4rem;font-size:1.4rem;color:",";"],f.a),J=i.b.p.withConfig({displayName:"context__Title",componentId:"sc-1efe6hm-3"})(["margin:0;font-size:1.8rem;font-weight:700;color:",";overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;word-wrap:break-word;"],f.a);function Y(e){var t=e.next,n=e.previous;return a.a.createElement(Q,null,t&&a.a.createElement(M,Object.assign({type:"next"},t)),n&&a.a.createElement(M,Object.assign({type:"previous"},n)))}var F=a.a.memo(Y),Q=i.b.nav.withConfig({displayName:"nav__Wrapper",componentId:"y3p15k-0"})(["display:flex;flex-wrap:wrap;justify-content:space-between;width:calc(100% - 260px - 1.6rem);@media (max-width:1400px){width:100%;}margin-top:2rem;"]);function U(e){var t=e.repo,n=Object(r.useRef)();return Object(r.useLayoutEffect)((function(){var e,r=document.createElement("script"),a={src:"https://utteranc.es/client.js",repo:t,theme:"github-light","issue-term":"pathname",label:"💬 comments",crossOrigin:"anonymous",async:"true"};Object.entries(a).forEach((function(e){var t=e[0],n=e[1];r.setAttribute(t,n)})),null==n||null===(e=n.current)||void 0===e||e.appendChild(r)}),[t]),a.a.createElement(V,{ref:n})}var V=i.b.div.withConfig({displayName:"comment-section__Div",componentId:"svgyu2-0"})(["width:calc(100% - 260px - 1.6rem);@media (max-width:1400px){width:100%;}"]);t.default=function(e){var t=e.data,n=e.pageContext,r=e.location,i=t.markdownRemark,c=i.fields,m=i.frontmatter,s=i.excerpt,p=c.slug,d=m.title,f=m.description,u=m.date,g=m.thumbnail,b=""+t.site.siteMetadata.siteUrl+p,h=g.childImageSharp.fluid.src,w=Object(l.b)({url:b,title:d,image:h,description:s,datePublished:u});return a.a.createElement(o.a,{pathname:r.pathname},a.a.createElement(l.a,{title:d,description:f||s,meta:[{name:"image",content:h},{name:"og:image",content:h},{name:"og:type",content:"article"},{name:"og:url",content:b}]},a.a.createElement("script",{type:"application/ld+json"},JSON.stringify(w))),a.a.createElement(G,null,a.a.createElement(x,i),a.a.createElement(F,n),a.a.createElement(U,{repo:"gywlsp/blog-comments"})))};var G=i.b.div.withConfig({displayName:"blog-post__Wrapper",componentId:"sc-15sn6p5-0"})(["width:100%;"])}}]);
//# sourceMappingURL=component---src-templates-blog-post-index-tsx-b38125493048b100e54e.js.map