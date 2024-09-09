var U=Object.defineProperty;var Z=(e,t,i)=>t in e?U(e,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[t]=i;var w=(e,t,i)=>Z(e,typeof t!="symbol"?t+"":t,i);import{d as q,I as A,F as S,o as l,m as G,w as J,c,t as b,p as I,G as Q,E as W,H as D,J as j,k as o,K as Y,ad as X,v,V as ee,U as te,ar as ie,as as re,e as p,b as B,l as k,N as $,at as se,a as ne,au as oe,av as ae,n as M,L as le,M as ue,q as de}from"./index-sgqUZBhH.js";const ce=e=>(D("data-v-72dec7c8"),e=e(),j(),e),fe=["aria-hidden"],ge={key:0,"data-testid":"kui-icon-svg-title"},pe=ce(()=>o("path",{d:"M9.4 18L8 16.6L12.6 12L8 7.4L9.4 6L15.4 12L9.4 18Z",fill:"currentColor"},null,-1)),he=q({__name:"ChevronRightIcon",props:{title:{type:String,required:!1,default:""},color:{type:String,required:!1,default:"currentColor"},display:{type:String,required:!1,default:"block"},decorative:{type:Boolean,required:!1,default:!1},size:{type:[Number,String],required:!1,default:A,validator:e=>{if(typeof e=="number"&&e>0)return!0;if(typeof e=="string"){const t=String(e).replace(/px/gi,""),i=Number(t);if(i&&!isNaN(i)&&Number.isInteger(i)&&i>0)return!0}return!1}},as:{type:String,required:!1,default:"span"}},setup(e){const t=e,i=S(()=>{if(typeof t.size=="number"&&t.size>0)return`${t.size}px`;if(typeof t.size=="string"){const u=String(t.size).replace(/px/gi,""),a=Number(u);if(a&&!isNaN(a)&&Number.isInteger(a)&&a>0)return`${a}px`}return A}),f=S(()=>({boxSizing:"border-box",color:t.color,display:t.display,flexShrink:"0",height:i.value,lineHeight:"0",width:i.value}));return(u,a)=>(l(),G(W(e.as),{"aria-hidden":e.decorative?"true":void 0,class:"kui-icon chevron-right-icon","data-testid":"kui-icon-wrapper-chevron-right-icon",style:Q(f.value)},{default:J(()=>[(l(),c("svg",{"aria-hidden":e.decorative?"true":void 0,"data-testid":"kui-icon-svg-chevron-right-icon",fill:"none",height:"100%",role:"img",viewBox:"0 0 24 24",width:"100%",xmlns:"http://www.w3.org/2000/svg"},[e.title?(l(),c("title",ge,b(e.title),1)):I("",!0),pe],8,fe))]),_:1},8,["aria-hidden","style"]))}}),me=Y(he,[["__scopeId","data-v-72dec7c8"]]),ve=["ControlLeft","ControlRight","ShiftLeft","ShiftRight","AltLeft"];class be{constructor(t,i){w(this,"commands");w(this,"keyMap");w(this,"boundTriggerShortcuts");this.commands=i,this.keyMap=Object.fromEntries(Object.entries(t).map(([f,u])=>[f.toLowerCase(),u])),this.boundTriggerShortcuts=this.triggerShortcuts.bind(this)}registerListener(){document.addEventListener("keydown",this.boundTriggerShortcuts)}unRegisterListener(){document.removeEventListener("keydown",this.boundTriggerShortcuts)}triggerShortcuts(t){ye(t,this.keyMap,this.commands)}}function ye(e,t,i){const f=Se(e.code),u=[e.ctrlKey?"ctrl":"",e.shiftKey?"shift":"",e.altKey?"alt":"",f].filter(y=>y!=="").join("+"),a=t[u];if(!a)return;const g=i[a];g.isAllowedContext&&!g.isAllowedContext(e)||(g.shouldPreventDefaultAction&&e.preventDefault(),!(g.isDisabled&&g.isDisabled())&&g.trigger(e))}function Se(e){return ve.includes(e)?"":e.replace(/^Key/,"").toLowerCase()}const _e=e=>(D("data-v-2016eda0"),e=e(),j(),e),we=_e(()=>o("span",{class:"visually-hidden"},"Focus filter",-1)),ke={class:"filter-bar-icon"},xe=["for"],Ie=["id","placeholder"],Ce={key:0,class:"suggestion-box","data-testid":"filter-bar-suggestion-box"},Ne={class:"suggestion-list"},Le={key:0,class:"filter-bar-error"},Fe={key:0},Te=["title","data-filter-field"],ze={class:"visually-hidden"},Ae=q({__name:"FilterBar",props:{fields:{},placeholder:{default:""},query:{default:""},id:{default:()=>X("filter-bar")}},emits:["change"],setup(e,{emit:t}){const i=e,f=v(),u=t,a=r=>{r!=null&&r.target&&(u("change",new FormData(r.target)),h.value=!1)},g=r=>{u("change",new FormData(f.value))},y=v(null),d=v(null),C=v(null),h=v(!1),m=v(i.query);ee(()=>i.query,r=>{m.value=r});const _=v(0),N=S(()=>Object.keys(i.fields)),L=S(()=>Object.entries(i.fields).slice(0,5).map(([r,n])=>({fieldName:r,...n}))),F=S(()=>N.value.length>0?`Filter by ${N.value.join(", ")}`:"Filter"),P=S(()=>i.placeholder??F.value),E={ArrowDown:"jumpToNextSuggestion",ArrowUp:"jumpToPreviousSuggestion"},K={jumpToNextSuggestion:{trigger:()=>z(1),isAllowedContext(r){return d.value!==null&&r.composedPath().includes(d.value)},shouldPreventDefaultAction:!0},jumpToPreviousSuggestion:{trigger:()=>z(-1),isAllowedContext(r){return d.value!==null&&r.composedPath().includes(d.value)},shouldPreventDefaultAction:!0}},T=new be(E,K);te(function(){T.registerListener()}),ie(function(){T.unRegisterListener()});function z(r){const n=L.value.length;let s=_.value+r;s===-1&&(s=n),_.value=s%(n+1)}function O(){d.value instanceof HTMLInputElement&&d.value.focus()}function R(r){const s=r.currentTarget.getAttribute("data-filter-field");s&&d.value instanceof HTMLInputElement&&V(d.value,s)}function V(r,n){const s=m.value===""||m.value.endsWith(" ")?"":" ";m.value+=s+n+":",r.focus(),_.value=0}function H(r){r.relatedTarget===null&&(h.value=!1),y.value instanceof HTMLElement&&r.relatedTarget instanceof Node&&!y.value.contains(r.relatedTarget)&&(h.value=!1)}return(r,n)=>(l(),c("div",{ref_key:"filterBar",ref:y,class:"filter-bar","data-testid":"filter-bar"},[o("search",null,[o("form",{ref_key:"$form",ref:f,onSubmit:re(a,["prevent"])},[o("button",{class:"focus-filter-input-button",title:"Focus filter",type:"button","data-testid":"filter-bar-focus-filter-input-button",onClick:O},[we,p(),o("span",ke,[B(k(se),{decorative:"","data-testid":"filter-bar-filter-icon","hide-title":"",size:k($)},null,8,["size"])])]),p(),o("label",{for:`${i.id}-filter-bar-input`,class:"visually-hidden"},[ne(r.$slots,"default",{},()=>[p(b(F.value),1)],!0)],8,xe),p(),oe(o("input",{id:`${i.id}-filter-bar-input`,ref_key:"filterInput",ref:d,"onUpdate:modelValue":n[0]||(n[0]=s=>m.value=s),class:"filter-bar-input",type:"search",placeholder:P.value,"data-testid":"filter-bar-filter-input",name:"s",onFocus:n[1]||(n[1]=s=>h.value=!0),onInput:n[2]||(n[2]=s=>h.value=!0),onBlur:H,onSearch:n[3]||(n[3]=s=>{s.target.value.length===0&&(g(),h.value=!0)})},null,40,Ie),[[ae,m.value]]),p(),h.value?(l(),c("div",Ce,[o("div",Ne,[C.value!==null?(l(),c("p",Le,b(C.value.message),1)):(l(),c("button",{key:1,type:"submit",class:M(["submit-query-button",{"submit-query-button-is-selected":_.value===0}]),"data-testid":"filter-bar-submit-query-button"},`
              Submit `+b(m.value),3)),p(),(l(!0),c(le,null,ue(L.value,(s,x)=>(l(),c("div",{key:`${i.id}-${x}`,class:M(["suggestion-list-item",{"suggestion-list-item-is-selected":_.value===x+1}])},[o("b",null,b(s.fieldName),1),s.description!==""?(l(),c("span",Fe,": "+b(s.description),1)):I("",!0),p(),o("button",{class:"apply-suggestion-button",title:`Add ${s.fieldName}:`,type:"button","data-filter-field":s.fieldName,"data-testid":"filter-bar-apply-suggestion-button",onClick:R},[o("span",ze,"Add "+b(s.fieldName)+":",1),p(),B(k(me),{decorative:"","hide-title":"",size:k($)},null,8,["size"])],8,Te)],2))),128))])])):I("",!0)],544)])],512))}}),Me=de(Ae,[["__scopeId","data-v-2016eda0"]]);export{Me as F};
