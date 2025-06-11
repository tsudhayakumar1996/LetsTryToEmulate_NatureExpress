import{i as j,an as G,r as M,k as _,j as f,d as y,e as A,f as n,g as I,ap as C,ar as R}from"./index-C7SD2Up6.js";import{c as S,k as w}from"./emotion-react.browser.esm-QGPxL-g3.js";function U(e){return j("MuiCircularProgress",e)}G("MuiCircularProgress",["root","determinate","indeterminate","colorPrimary","colorSecondary","svg","circle","circleDeterminate","circleIndeterminate","circleDisableShrink"]);const t=44,h=w`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`,g=w`
  0% {
    stroke-dasharray: 1px, 200px;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -15px;
  }

  100% {
    stroke-dasharray: 1px, 200px;
    stroke-dashoffset: -126px;
  }
`,H=typeof h!="string"?S`
        animation: ${h} 1.4s linear infinite;
      `:null,L=typeof g!="string"?S`
        animation: ${g} 1.4s ease-in-out infinite;
      `:null,z=e=>{const{classes:r,variant:s,color:a,disableShrink:c}=e,l={root:["root",s,`color${n(a)}`],svg:["svg"],circle:["circle",`circle${n(s)}`,c&&"circleDisableShrink"]};return I(l,U,r)},F=y("span",{name:"MuiCircularProgress",slot:"Root",overridesResolver:(e,r)=>{const{ownerState:s}=e;return[r.root,r[s.variant],r[`color${n(s.color)}`]]}})(C(({theme:e})=>({display:"inline-block",variants:[{props:{variant:"determinate"},style:{transition:e.transitions.create("transform")}},{props:{variant:"indeterminate"},style:H||{animation:`${h} 1.4s linear infinite`}},...Object.entries(e.palette).filter(R()).map(([r])=>({props:{color:r},style:{color:(e.vars||e).palette[r].main}}))]}))),J=y("svg",{name:"MuiCircularProgress",slot:"Svg",overridesResolver:(e,r)=>r.svg})({display:"block"}),K=y("circle",{name:"MuiCircularProgress",slot:"Circle",overridesResolver:(e,r)=>{const{ownerState:s}=e;return[r.circle,r[`circle${n(s.variant)}`],s.disableShrink&&r.circleDisableShrink]}})(C(({theme:e})=>({stroke:"currentColor",variants:[{props:{variant:"determinate"},style:{transition:e.transitions.create("stroke-dashoffset")}},{props:{variant:"indeterminate"},style:{strokeDasharray:"80px, 200px",strokeDashoffset:0}},{props:({ownerState:r})=>r.variant==="indeterminate"&&!r.disableShrink,style:L||{animation:`${g} 1.4s ease-in-out infinite`}}]}))),q=M.forwardRef(function(r,s){const a=_({props:r,name:"MuiCircularProgress"}),{className:c,color:l="primary",disableShrink:D=!1,size:p=40,style:N,thickness:o=3.6,value:u=0,variant:k="indeterminate",...T}=a,i={...a,color:l,disableShrink:D,size:p,thickness:o,value:u,variant:k},d=z(i),m={},v={},x={};if(k==="determinate"){const P=2*Math.PI*((t-o)/2);m.strokeDasharray=P.toFixed(3),x["aria-valuenow"]=Math.round(u),m.strokeDashoffset=`${((100-u)/100*P).toFixed(3)}px`,v.transform="rotate(-90deg)"}return f.jsx(F,{className:A(d.root,c),style:{width:p,height:p,...v,...N},ownerState:i,ref:s,role:"progressbar",...x,...T,children:f.jsx(J,{className:d.svg,ownerState:i,viewBox:`${t/2} ${t/2} ${t} ${t}`,children:f.jsx(K,{className:d.circle,style:m,ownerState:i,cx:t,cy:t,r:(t-o)/2,fill:"none",strokeWidth:o})})})}),Q="/auth/me",X="/auth/login/google",Y="/auth/logout",V="GET",B="POST",$="https://makegreennature.xyz",b=async e=>{const r=await e.json();if(e.ok)return r;throw new Error(r.message)},E=e=>{let r="An unknown error occurred";return e instanceof Error&&(r=e.message),new Error(JSON.stringify({message:r}))},O=()=>({"Content-Type":"application/json"}),rr=async({endUrl:e})=>{try{const r=await fetch(`${$}${e}`,{method:V,headers:O(),credentials:"include"});return await b(r)}catch(r){throw E(r)}},er=async({endUrl:e,reqObj:r})=>{try{const s=await fetch(`${$}${e}`,{method:B,headers:O(),body:JSON.stringify(r),credentials:"include"});return await b(s)}catch(s){throw E(s)}};export{q as C,X as G,Y as L,Q as a,rr as g,er as p};
