import{p as i,e as o}from"./chunks/jsxRuntime.module.949ed929.js";import"./chunks/ThemeToggleButton.b2a43f1a.js";import"./chunks/preact.module.b8ec28b5.js";const p=({defaultActiveTab:r,labels:n})=>{const[t,l]=i(r);function c(a){document.querySelectorAll("li.nav-group").forEach(e=>e.classList.remove("active")),document.querySelectorAll(`li.nav-group.${a}`).forEach(e=>e.classList.add("active")),l(a)}return o("div",{class:"TabGroup",children:o("button",{class:t==="learn"?"active":"",onClick:()=>c("learn"),children:"Main"})})};export{p as default};
