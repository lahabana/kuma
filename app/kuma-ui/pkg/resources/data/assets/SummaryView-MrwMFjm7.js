import{ad as w,ae as C,U as b,af as g,ag as _,ah as x,ai as L,d as O,ab as T,aj as I,v as P,ak as V,r as E,o as N,m as $,w as S,b as q,l as B,e as R,a as W,q as j}from"./index-CncPC2Du.js";const A=x?window:void 0;function y(n){var r;const s=_(n);return(r=s==null?void 0:s.$el)!=null?r:s}function v(...n){let r,s,t,f;if(typeof n[0]=="string"||Array.isArray(n[0])?([s,t,f]=n,r=A):[r,s,t,f]=n,!r)return w;Array.isArray(s)||(s=[s]),Array.isArray(t)||(t=[t]);const c=[],l=()=>{c.forEach(a=>a()),c.length=0},i=(a,d,h,e)=>(a.addEventListener(d,h,e),()=>a.removeEventListener(d,h,e)),m=b(()=>[y(r),_(f)],([a,d])=>{if(l(),!a)return;const h=g(d)?{...d}:d;c.push(...s.flatMap(e=>t.map(o=>i(a,e,o,h))))},{immediate:!0,flush:"post"}),p=()=>{m(),l()};return L(p),p}let k=!1;function F(n,r,s={}){const{window:t=A,ignore:f=[],capture:c=!0,detectIframe:l=!1}=s;if(!t)return w;C&&!k&&(k=!0,Array.from(t.document.body.children).forEach(e=>e.addEventListener("click",w)),t.document.documentElement.addEventListener("click",w));let i=!0;const m=e=>_(f).some(o=>{if(typeof o=="string")return Array.from(t.document.querySelectorAll(o)).some(u=>u===e.target||e.composedPath().includes(u));{const u=y(o);return u&&(e.target===u||e.composedPath().includes(u))}}),p=e=>{const o=y(n);if(!(!o||o===e.target||e.composedPath().includes(o))){if(e.detail===0&&(i=!m(e)),!i){i=!0;return}r(e)}};let a=!1;const d=[v(t,"click",e=>{a||(a=!0,setTimeout(()=>{a=!1},0),p(e))},{passive:!0,capture:c}),v(t,"pointerdown",e=>{const o=y(n);i=!m(e)&&!!(o&&!e.composedPath().includes(o))},{passive:!0}),l&&v(t,"blur",e=>{setTimeout(()=>{var o;const u=y(n);((o=t.document.activeElement)==null?void 0:o.tagName)==="IFRAME"&&!(u!=null&&u.contains(t.document.activeElement))&&r(e)},0)})].filter(Boolean);return()=>d.forEach(e=>e())}const K=O({__name:"SummaryView",props:{width:{default:"560px"}},emits:["close"],setup(n,{emit:r}){const s=T("summary-view-title");I("app-summary-view",s);const t=P(null);F(t,V(l=>{const i=l.target;l.isTrusted&&i.nodeName.toLowerCase()!=="a"&&c("close")},1,!0,!1));const f=n,c=r;return(l,i)=>{const m=E("XTeleportSlot"),p=E("KSlideout");return N(),$(p,{ref_key:"slideOutRef",ref:t,class:"summary-slideout","close-on-blur":!1,"has-overlay":!1,visible:"","max-width":f.width,"offset-top":"var(--app-slideout-offset-top, 0)","data-testid":"summary",onClose:i[0]||(i[0]=a=>c("close"))},{title:S(()=>[q(m,{name:B(s)},null,8,["name"])]),default:S(()=>[R(),W(l.$slots,"default",{},void 0,!0)]),_:3},8,["max-width"])}}}),X=j(K,[["__scopeId","data-v-1eac95d3"]]);export{X as S};
