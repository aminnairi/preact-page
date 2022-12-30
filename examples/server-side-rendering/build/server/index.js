import{jsx as e,jsxs as r}from"preact/jsx-runtime";import{join as t}from"path";import{render as i}from"preact-render-to-string";import l from"preact-ssr-prepass";import s from"express";import{PageLink as n,PageView as o,PageStaticProvider as c,PageDescription as a,PageTitle as h}from"preact-page";import{lazy as d}from"preact/compat";import{Fragment as p}from"preact";const m=d((()=>import("./home-7f94c4be.js"))),u=d((()=>import("./user-8e5aecb1.js"))),g=[{path:"/",title:()=>"Home page",description:()=>"This is the home page",element:e(m,{})},{path:"/user/:user",title:({user:e})=>`User#${e} details page`,description:({user:e})=>`This is the user#${e} details page`,element:e(u,{})}];var f=()=>e("h1",{children:"Not found"});const w=()=>r(p,{children:[e("h1",{children:"Loading your page"}),e("p",{children:"Please wait..."})]}),v=()=>e("header",{children:e("nav",{children:r("ul",{children:[e("li",{children:e(n,{path:"/",children:"Home"})}),e("li",{children:e(n,{path:"/about",children:"About"})}),e("li",{children:e(n,{path:"/user/1",children:"User#1"})}),e("li",{children:e(n,{path:"/user/2",children:"User#2"})}),e("li",{children:e(n,{path:"/user/3",children:"User#3"})})]})})}),U=()=>r(p,{children:[e(v,{}),e(o,{fallback:e(f,{}),loading:e(w,{})})]}),b=s();b.use(s.static(t(process.cwd(),"build/client"))),console.log(process.cwd()),b.all("*",(async(t,s)=>{const n=e(c,{pages:g,path:t.url,children:r("html",{lang:"en-US",children:[r("head",{children:[e("meta",{charSet:"UTF-8"}),e("meta",{name:"viewport",content:"width=device-width, initial-scale=1.0"}),e(a,{}),e(h,{}),e("script",{src:"/index.js",type:"module"})]}),e("body",{children:e("div",{id:"root",children:e(U,{})})})]})});await l(n),s.set("Content-Type","text/html").send("<!DOCTYPE html>"+i(n))})),b.listen(8e3,(()=>{console.log("Server listening for requests")}));
