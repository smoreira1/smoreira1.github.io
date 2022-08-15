import{_ as R}from"./chunks/index.e83a213e.js";import{p as T,_ as S,s as g,e as d}from"./chunks/jsxRuntime.module.949ed929.js";import{s as b}from"./chunks/ThemeToggleButton.b2a43f1a.js";import"./chunks/preact.module.b8ec28b5.js";let c=[],I=n=>{let e,r=[],t={lc:0,value:n,set(s){t.value=s,t.notify()},get(){return t.lc||t.listen(()=>{})(),t.value},notify(s){e=r;let i=!c.length;for(let l=0;l<e.length;l++)c.push(e[l],t.value,s);if(i){for(let l=0;l<c.length;l+=3)c[l](c[l+1],c[l+2]);c.length=0}},listen(s){return r===e&&(r=r.slice()),t.lc=r.push(s),()=>{r===e&&(r=r.slice());let i=r.indexOf(s);~i&&(r.splice(i,1),t.lc--)}},subscribe(s){let i=t.listen(s);return s(t.value),i},off(){}};return t},E=(n={})=>{let e=I(n);return e.setKey=function(r,t){typeof t>"u"?r in e.value&&(e.value={...e.value},delete e.value[r],e.notify(r)):e.value[r]!==t&&(e.value={...e.value,[r]:t},e.notify(r))},e};function L(n,e,r){let t=new Set([...e,void 0]);return n.listen((s,i)=>{t.has(i)&&r(s,i)})}const y=I(0),x=E({});function N(){const n=y.get();return y.set(n+1),n}function j(n,e={}){let[,r]=T({});return S(()=>{let t,s,i,l=()=>{t||(t=1,s=setTimeout(()=>{t=void 0,r({})}))};return e.keys?i=L(n,e.keys,l):i=n.listen(l),()=>{i(),clearTimeout(s)}},[n,""+e.keys]),n.get()}function B(n,e){const r=j(x),t=T(n);if(!e)return t;const s=r[e]?.curr??n;function i(l){if(e)x.setKey(e,{curr:l});else throw new Error("[Tabs] Looks like a sharedStore key is no longer present on your tab view! If your store key is dynamic, consider using a static string value instead.")}return[s,i]}const h="tab.",w="panel.";function C(n){const[e]=n;return e.startsWith(h)}function F(n){const[e]=n;return e.startsWith(w)}function p(n){return n.replace(new RegExp(`^${h}`),"")}function v(n){return n.replace(new RegExp(`^${w}`),"")}function O({sharedStore:n,...e}){const r=N(),t=Object.entries(e).filter(C),s=Object.entries(e).filter(F),i=g({}),l=g(null),$=s[0]?.[0]??"",[f,K]=B(v($),n);function m(o,u){n&&(l.current=u),K(p(o))}S(()=>{l.current&&(l.current.scrollIntoView({behavior:"smooth"}),l.current=null)},[f]);function _(o){if(o.key==="ArrowLeft"){const u=t.findIndex(([a])=>p(a)===f);if(u>0){const[a]=t[u-1];m(a,i.current[a]),i.current[a]?.focus()}}if(o.key==="ArrowRight"){const u=t.findIndex(([a])=>p(a)===f);if(u<t.length-1){const[a]=t[u+1];m(a,i.current[a]),i.current[a]?.focus()}}}return d("div",{className:b.container,children:[d("div",{className:b["tab-scroll-overflow"],children:d("div",{className:`${b.tablist} TabGroup no-flex`,role:"tablist",onKeyDown:_,children:t.map(([o,u])=>d("button",{ref:a=>i.current[o]=a,onClick:()=>m(o,i.current[o]),"aria-selected":f===p(o),tabIndex:f===p(o)?0:-1,role:"tab",type:"button",className:b.tab,id:`${r}-${o}`,children:u},o))})}),s.map(([o,u])=>d("div",{hidden:f!==v(o),role:"tabpanel","aria-labelledby":`${r}-${h}${v(o)}`,className:b.tabpanel,children:u},o))]})}R(O,"@astrojs/preact");export{O as default};