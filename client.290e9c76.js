import{a as m,r}from"./chunks/index.ef9e3d6c.js";var i,f,l=m.exports;f=l.createRoot,i=l.hydrateRoot;const a=({value:t,name:e})=>t?r.exports.createElement("astro-slot",{name:e,suppressHydrationWarning:!0,dangerouslySetInnerHTML:{__html:t}}):null;a.shouldComponentUpdate=()=>!1;function x(t){for(const e in t)if(e.startsWith("__reactContainer"))return e}var E=t=>(e,n,{default:o,...d},{client:p})=>{if(!t.hasAttribute("ssr"))return;for(const[u,y]of Object.entries(d))n[u]=r.exports.createElement(a,{value:y,name:u});const s=r.exports.createElement(e,n,o!=null?r.exports.createElement(a,{value:o}):o),c=x(t);return c&&delete t[c],p==="only"?f(t).render(s):i(t,s)};export{E as default};