var Ne=Object.defineProperty;var Ke=(t,a,e)=>a in t?Ne(t,a,{enumerable:!0,configurable:!0,writable:!0,value:e}):t[a]=e;var X=(t,a,e)=>(Ke(t,typeof a!="symbol"?a+"":a,e),e);import{d as te,B as Le,o as u,e as v,k as m,n as re,g as l,b as L,f as K,q as U,c as E,s as Y,h as S,t as A,H as Se,I as Me,x as we,F as B,j as R,v as qe,A as je,p as ue,m as de,r as Be,a as z,w as P,K as ze,J as Re,P as He,L as Te}from"./index-5fe06e34.js";import{l as ee,q as Qe,J as Ge,a as Je}from"./kongponents.es-995fd5eb.js";import{f as ae,g as Ye,i as Ze,k as Pe,F as De,j as Ae,l as We,e as Xe,E as Ce,m as et,C as tt,B as at,D as nt,n as st}from"./RouteView.vue_vue_type_script_setup_true_lang-ae2f3329.js";import{D as lt}from"./DataOverview-82df9a27.js";import{T as ot,_ as it}from"./TextWithCopyButton-aaf3f087.js";import{a as Q,D as ie}from"./DefinitionListItem-25b65a74.js";import{_ as rt}from"./ResourceCodeBlock.vue_vue_type_script_setup_true_lang-715d243f.js";import{S as ut}from"./StatusBadge-e1a1fba1.js";import{T as dt}from"./TagList-c84c0a85.js";import{Q as G}from"./QueryParameter-70743f73.js";const xe=[{key:"status",label:"Status"},{key:"entity",label:"Name"},{key:"type",label:"Type"},{key:"service",label:"Service"},{key:"protocol",label:"Protocol"},{key:"zone",label:"Zone"},{key:"lastConnected",label:"Last Connected"},{key:"lastUpdated",label:"Last Updated"},{key:"totalUpdates",label:"Total Updates"},{key:"dpVersion",label:"Kuma DP version"},{key:"envoyVersion",label:"Envoy version"}],ct=["entity"],pt=xe.filter(t=>!ct.includes(t.key)).map(t=>({tableHeaderKey:t.key,label:t.label,isChecked:!1})),Ie=["status","entity","type","service","protocol","zone","lastUpdated","dpVersion"];function ft(t,a=Ie){return xe.filter(e=>a.includes(e.key)?t?!0:e.key!=="zone":!1)}const mt={class:"content-wrapper"},vt={class:"content-wrapper__content kcard-border"},gt={key:0,class:"content-wrapper__sidebar"},yt=te({__name:"ContentWrapper",setup(t){const a=Le();return(e,_)=>(u(),v("div",mt,[m("div",vt,[re(e.$slots,"content",{},void 0,!0)]),l(),L(a).sidebar?(u(),v("div",gt,[re(e.$slots,"sidebar",{},void 0,!0)])):K("",!0)]))}});const ht=ae(yt,[["__scopeId","data-v-22673661"]]);function _t(t,a,e){return Math.max(a,Math.min(t,e))}const bt=["ControlLeft","ControlRight","ShiftLeft","ShiftRight","AltLeft"];class kt{constructor(a,e){X(this,"commands");X(this,"keyMap");X(this,"boundTriggerShortcuts");this.commands=e,this.keyMap=Object.fromEntries(Object.entries(a).map(([_,i])=>[_.toLowerCase(),i])),this.boundTriggerShortcuts=this.triggerShortcuts.bind(this)}registerListener(){document.addEventListener("keydown",this.boundTriggerShortcuts)}unRegisterListener(){document.removeEventListener("keydown",this.boundTriggerShortcuts)}triggerShortcuts(a){wt(a,this.keyMap,this.commands)}}function wt(t,a,e){const _=Tt(t.code),i=[t.ctrlKey?"ctrl":"",t.shiftKey?"shift":"",t.altKey?"alt":"",_].filter(b=>b!=="").join("+"),d=a[i];if(!d)return;const p=e[d];p.isAllowedContext&&!p.isAllowedContext(t)||(p.shouldPreventDefaultAction&&t.preventDefault(),!(p.isDisabled&&p.isDisabled())&&p.trigger(t))}function Tt(t){return bt.includes(t)?"":t.replace(/^Key/,"").toLowerCase()}function Dt(t,a){const e=" "+t,_=e.matchAll(/ ([-\s\w]+):\s*/g),i=[];for(const d of Array.from(_)){if(d.index===void 0)continue;const p=Ct(d[1]);if(a.length>0&&!a.includes(p))throw new Error(`Unknown field “${p}”. Known fields: ${a.join(", ")}`);const b=d.index+d[0].length,C=e.substring(b);let k;if(/^\s*["']/.test(C)){const r=C.match(/['"](.*?)['"]/);if(r!==null)k=r[1];else throw new Error(`Quote mismatch for field “${p}”.`)}else{const r=C.indexOf(" "),w=r===-1?C.length:r;k=C.substring(0,w)}k!==""&&i.push([p,k])}return i}function Ct(t){return t.trim().replace(/\s+/g,"-").replace(/-[a-z]/g,(a,e)=>e===0?a:a.substring(1).toUpperCase())}const $e=t=>(ue("data-v-2fcde9ea"),t=t(),de(),t),St=$e(()=>m("span",{class:"visually-hidden"},"Focus filter",-1)),Pt=["for"],At=["id","placeholder"],xt={key:0,class:"k-suggestion-box","data-testid":"k-filter-bar-suggestion-box"},It={class:"k-suggestion-list"},$t={key:0,class:"k-filter-bar-error"},Et={key:0},Ot=["title","data-filter-field"],Ut={class:"visually-hidden"},Vt=$e(()=>m("span",{class:"visually-hidden"},"Clear query",-1)),Ft=te({__name:"KFilterBar",props:{id:{type:String,required:!0},fields:{type:Object,required:!0},placeholder:{type:String,required:!1,default:null},query:{type:String,required:!1,default:""}},emits:["fields-change"],setup(t,{emit:a}){const e=t,_=U(null),i=U(null),d=U(e.query),p=U([]),b=U(null),C=U(!1),k=U(-1),F=E(()=>Object.keys(e.fields)),r=E(()=>Object.entries(e.fields).slice(0,5).map(([n,c])=>({fieldName:n,...c}))),w=E(()=>F.value.length>0?`Filter by ${F.value.join(", ")}`:"Filter"),T=E(()=>e.placeholder??w.value);Y(()=>p.value,function(n,c){$(n,c)||(b.value=null,a("fields-change",{fields:n,query:d.value}))}),Y(()=>d.value,function(){d.value===""&&(b.value=null),C.value=!0});const g={Enter:"submitQuery",Escape:"closeSuggestionBox",ArrowDown:"jumpToNextSuggestion",ArrowUp:"jumpToPreviousSuggestion"},D={submitQuery:{trigger:x,isAllowedContext(n){return i.value!==null&&n.composedPath().includes(i.value)},shouldPreventDefaultAction:!0},jumpToNextSuggestion:{trigger:q,isAllowedContext(n){return i.value!==null&&n.composedPath().includes(i.value)},shouldPreventDefaultAction:!0},jumpToPreviousSuggestion:{trigger:ne,isAllowedContext(n){return i.value!==null&&n.composedPath().includes(i.value)},shouldPreventDefaultAction:!0},closeSuggestionBox:{trigger:I,isAllowedContext(n){return _.value!==null&&n.composedPath().includes(_.value)}}};function M(){const n=new kt(g,D);qe(function(){n.registerListener()}),je(function(){n.unRegisterListener()}),y(d.value)}M();function V(n){const c=n.target;y(c.value)}function x(){if(i.value instanceof HTMLInputElement)if(k.value===-1)y(i.value.value),C.value=!1;else{const n=r.value[k.value].fieldName;n&&W(i.value,n)}}function q(){J(1)}function ne(){J(-1)}function J(n){k.value=_t(k.value+n,-1,r.value.length-1)}function Z(){i.value instanceof HTMLInputElement&&i.value.focus()}function se(n){const h=n.currentTarget.getAttribute("data-filter-field");h&&i.value instanceof HTMLInputElement&&W(i.value,h)}function W(n,c){const h=d.value===""||d.value.endsWith(" ")?"":" ";d.value+=h+c+":",n.focus(),k.value=-1}function s(){d.value="",i.value instanceof HTMLInputElement&&(i.value.value="",i.value.focus(),y(""))}function o(n){n.relatedTarget===null&&I(),_.value instanceof HTMLElement&&n.relatedTarget instanceof Node&&!_.value.contains(n.relatedTarget)&&I()}function I(){C.value=!1}function y(n){b.value=null;try{const c=Dt(n,F.value);c.sort((h,j)=>h[0].localeCompare(j[0])),p.value=c}catch(c){if(c instanceof Error)b.value=c,C.value=!0;else throw c}}function $(n,c){return JSON.stringify(n)===JSON.stringify(c)}return(n,c)=>(u(),v("div",{ref_key:"filterBar",ref:_,class:"k-filter-bar","data-testid":"k-filter-bar"},[m("button",{class:"k-focus-filter-input-button",title:"Focus filter",type:"button","data-testid":"k-filter-bar-focus-filter-input-button",onClick:Z},[St,l(),S(L(ee),{"aria-hidden":"true",class:"k-filter-icon",color:"var(--grey-400)","data-testid":"k-filter-bar-filter-icon","hide-title":"",icon:"filter",size:"20"})]),l(),m("label",{for:`${e.id}-filter-bar-input`,class:"visually-hidden"},[re(n.$slots,"default",{},()=>[l(A(w.value),1)],!0)],8,Pt),l(),Se(m("input",{id:`${e.id}-filter-bar-input`,ref_key:"filterInput",ref:i,"onUpdate:modelValue":c[0]||(c[0]=h=>d.value=h),class:"k-filter-bar-input",type:"text",placeholder:T.value,"data-testid":"k-filter-bar-filter-input",onFocus:c[1]||(c[1]=h=>C.value=!0),onBlur:o,onChange:V},null,40,At),[[Me,d.value]]),l(),C.value?(u(),v("div",xt,[m("div",It,[b.value!==null?(u(),v("p",$t,A(b.value.message),1)):(u(),v("button",{key:1,class:we(["k-submit-query-button",{"k-submit-query-button-is-selected":k.value===-1}]),title:"Submit query",type:"button","data-testid":"k-filter-bar-submit-query-button",onClick:x},`
          Submit `+A(d.value),3)),l(),(u(!0),v(B,null,R(r.value,(h,j)=>(u(),v("div",{key:`${e.id}-${j}`,class:we(["k-suggestion-list-item",{"k-suggestion-list-item-is-selected":k.value===j}])},[m("b",null,A(h.fieldName),1),h.description!==""?(u(),v("span",Et,": "+A(h.description),1)):K("",!0),l(),m("button",{class:"k-apply-suggestion-button",title:`Add ${h.fieldName}:`,type:"button","data-filter-field":h.fieldName,"data-testid":"k-filter-bar-apply-suggestion-button",onClick:se},[m("span",Ut,"Add "+A(h.fieldName)+":",1),l(),S(L(ee),{"aria-hidden":"true",color:"currentColor","hide-title":"",icon:"chevronRight",size:"16"})],8,Ot)],2))),128))])])):K("",!0),l(),d.value!==""?(u(),v("button",{key:1,class:"k-clear-query-button",title:"Clear query",type:"button","data-testid":"k-filter-bar-clear-query-button",onClick:s},[Vt,l(),S(L(ee),{"aria-hidden":"true",color:"currentColor",icon:"clear","hide-title":"",size:"20"})])):K("",!0)],512))}});const Nt=ae(Ft,[["__scopeId","data-v-2fcde9ea"]]),Ee=t=>(ue("data-v-fc544ac8"),t=t(),de(),t),Kt={class:"entity-section-list"},Lt={class:"entity-title","data-testid":"data-plane-proxy-title"},Mt={class:"mt-2 heading-with-icon"},qt={key:0},jt=Ee(()=>m("h4",null,"Insights",-1)),Bt={class:"block-list"},zt={key:0,class:"mt-2"},Rt=Ee(()=>m("summary",null,`
                  Responses (acknowledged / sent)
                `,-1)),Ht=te({__name:"DataPlaneEntitySummary",props:{dataPlaneOverview:{type:Object,required:!0}},setup(t){const a=t,e=Ye(),{t:_}=Ze(),i=E(()=>({name:"data-plane-detail-view",params:{mesh:a.dataPlaneOverview.mesh,dataPlane:a.dataPlaneOverview.name}})),d=E(()=>Pe(a.dataPlaneOverview.dataplane)),p=E(()=>{var w;const r=Array.from(((w=a.dataPlaneOverview.dataplaneInsight)==null?void 0:w.subscriptions)??[]);return r.reverse(),r.map(T=>{const g=T.connectTime!==void 0?De(T.connectTime):"—",D=T.disconnectTime!==void 0?De(T.disconnectTime):"—",M=Object.entries(T.status).filter(([V])=>!["total","lastUpdateTime"].includes(V)).map(([V,x])=>{const q=`${x.responsesAcknowledged??0} / ${x.responsesSent??0}`;return{type:V.toUpperCase(),ratio:q,responsesSent:x.responsesSent??0,responsesAcknowledged:x.responsesAcknowledged??0,responsesRejected:x.responsesRejected??0}});return{subscription:T,formattedConnectDate:g,formattedDisconnectDate:D,statuses:M}})}),b=E(()=>{const{status:r}=Ae(a.dataPlaneOverview.dataplane,a.dataPlaneOverview.dataplaneInsight);return r}),C=E(()=>{const r=We(a.dataPlaneOverview.dataplaneInsight);return r!==null?Object.entries(r).map(([w,T])=>({name:w,version:T})):[]}),k=E(()=>{var x;const r=((x=a.dataPlaneOverview.dataplaneInsight)==null?void 0:x.subscriptions)??[];if(r.length===0)return[];const w=r[r.length-1];if(!w.version)return[];const T=[],g=w.version.envoy,D=w.version.kumaDp;if(!(g.kumaDpCompatible!==void 0?g.kumaDpCompatible:!0)){const q=`Envoy ${g.version} is not supported by Kuma DP ${D.version}.`;T.push(q)}if(!(D.kumaCpCompatible!==void 0?D.kumaCpCompatible:!0)){const q=`Kuma DP ${D.version} is not supported by this Kuma control plane.`;T.push(q)}return T});async function F(r){const{mesh:w,name:T}=a.dataPlaneOverview;return await e.getDataplaneFromMesh({mesh:w,name:T},r)}return(r,w)=>{const T=Be("router-link");return u(),z(L(Qe),null,{body:P(()=>[m("div",Kt,[m("section",null,[m("h3",Lt,[m("span",null,[l(`
              DPP:

              `),S(ot,{text:t.dataPlaneOverview.name},{default:P(()=>[S(T,{to:i.value},{default:P(()=>[l(A(t.dataPlaneOverview.name),1)]),_:1},8,["to"])]),_:1},8,["text"])]),l(),S(ut,{status:b.value},null,8,["status"])]),l(),S(ie,{class:"mt-4"},{default:P(()=>[d.value!==null?(u(),z(Q,{key:0,term:"Tags"},{default:P(()=>[S(dt,{tags:d.value},null,8,["tags"])]),_:1})):K("",!0),l(),C.value.length>0?(u(),z(Q,{key:1,term:"Dependencies"},{default:P(()=>[m("ul",null,[(u(!0),v(B,null,R(C.value,(g,D)=>(u(),v("li",{key:D},A(g.name)+": "+A(g.version),1))),128))]),l(),k.value.length>0?(u(),v(B,{key:0},[m("h5",Mt,[l(`
                  Warnings

                  `),S(L(ee),{class:"ml-1",icon:"warning",color:"var(--black-500)","secondary-color":"var(--yellow-300)",size:"20"})]),l(),(u(!0),v(B,null,R(k.value,(g,D)=>(u(),v("p",{key:D},A(g),1))),128))],64)):K("",!0)]),_:1})):K("",!0)]),_:1})]),l(),p.value.length>0?(u(),v("section",qt,[jt,l(),m("div",Bt,[(u(!0),v(B,null,R(p.value,(g,D)=>(u(),v("div",{key:D},[S(ie,null,{default:P(()=>[S(Q,{term:"Connect time","data-testid":`data-plane-connect-time-${D}`},{default:P(()=>[l(A(g.formattedConnectDate),1)]),_:2},1032,["data-testid"]),l(),S(Q,{term:"Disconnect time","data-testid":`data-plane-disconnect-time-${D}`},{default:P(()=>[l(A(g.formattedDisconnectDate),1)]),_:2},1032,["data-testid"]),l(),S(Q,{term:L(_)("http.api.property.controlPlaneInstanceId")},{default:P(()=>[l(A(g.subscription.controlPlaneInstanceId),1)]),_:2},1032,["term"])]),_:2},1024),l(),g.statuses.length>0?(u(),v("details",zt,[Rt,l(),S(ie,null,{default:P(()=>[(u(!0),v(B,null,R(g.statuses,(M,V)=>(u(),z(Q,{key:`${D}-${V}`,term:M.type,"data-testid":`data-plane-subscription-status-${D}-${V}`},{default:P(()=>[l(A(M.ratio),1)]),_:2},1032,["term","data-testid"]))),128))]),_:2},1024)])):K("",!0)]))),128))])])):K("",!0),l(),S(rt,{id:"code-block-data-plane-summary","resource-fetcher":F,"resource-fetcher-watch-key":a.dataPlaneOverview.name,"code-max-height":"250px"},null,8,["resource-fetcher-watch-key"])])]),_:1})}}});const Qt=ae(Ht,[["__scopeId","data-v-fc544ac8"]]),Gt=["protocol","service","zone"];function Jt(t){const a=new Map;for(const[e,_]of t){const i=Gt.includes(e),d=i?"tag":e;a.has(d)||a.set(d,[]);const p=a.get(d);let b;d==="tag"?b=(i?`kuma.io/${e}:${_}`:_).replace(/\s+/g,""):b=_,p.push(b.trim())}return a}const Yt=t=>(ue("data-v-e5b4b05e"),t=t(),de(),t),Zt={key:0},Wt=Yt(()=>m("label",{for:"data-planes-type-filter",class:"mr-2"},`
              Type:
            `,-1)),Xt=["value"],ea=["for"],ta=["id","checked","onChange"],aa=te({__name:"DataPlaneList",props:{dataPlaneOverviews:{type:Array,required:!0},isLoading:{type:Boolean,required:!1,default:!1},error:{type:[Error,null],required:!1,default:null},nextUrl:{type:String,required:!1,default:null},pageOffset:{type:Number,required:!1,default:0},selectedDppName:{type:String,required:!1,default:null},isGatewayView:{type:Boolean,required:!1,default:!1},gatewayType:{type:String,required:!1,default:"true"},dppFilterFields:{type:Object,required:!0}},emits:["load-data"],setup(t,{emit:a}){const e=t,_=Xe(),i={true:"All",builtin:"Builtin",delegated:"Delegated"},d={title:"No Data",message:"There are no data plane proxies present."},p=U(Ie),b=U({headers:[],data:[]}),C=U(G.get("filterQuery")??""),k=U(e.gatewayType),F=U({}),r=U(null),w=E(()=>_.getters["config/getMulticlusterStatus"]),T=E(()=>"tag"in e.dppFilterFields?'tag: "kuma.io/protocol: http"':"name"in e.dppFilterFields?"name: cluster":"field: value"),g=E(()=>{let s=ft(w.value,p.value);return e.isGatewayView?s=s.filter(o=>o.key!=="protocol"):s=s.filter(o=>o.key!=="type"),{data:b.value.data,headers:s}}),D=E(()=>pt.filter(s=>e.isGatewayView?s.tableHeaderKey!=="protocol":s.tableHeaderKey!=="type").filter(s=>w.value?!0:s.tableHeaderKey!=="zone").map(s=>{const o=p.value.includes(s.tableHeaderKey);return{...s,isChecked:o}}));Y(k,function(){x(0)}),Y(F,function(){x(0)}),Y(()=>e.dataPlaneOverviews,function(){J()});function M(){const s=Te.get("dpVisibleTableHeaderKeys");Array.isArray(s)&&(p.value=s),J()}M();function V(s){x(s)}function x(s){const o={...F.value};"gateway"in o||(o.gateway=k.value),a("load-data",s,o)}function q(s){s.stopPropagation()}function ne(s,o){const I=s.target,y=p.value.findIndex($=>$===o);I.checked&&y===-1?p.value.push(o):!I.checked&&y>-1&&p.value.splice(y,1),Te.set("dpVisibleTableHeaderKeys",Array.from(new Set(p.value)))}function J(){var s;try{b.value.data=se(e.dataPlaneOverviews??[]),Z({name:e.selectedDppName??((s=e.dataPlaneOverviews[0])==null?void 0:s.name)})}catch(o){console.error(o)}}function Z({name:s}){s&&e.dataPlaneOverviews.length>0?(r.value=e.dataPlaneOverviews.find(o=>o.name===s)??e.dataPlaneOverviews[0],G.set(e.isGatewayView?"gateway":"dpp",r.value.name)):(r.value=null,G.set(e.isGatewayView?"gateway":"dpp",null))}function se(s){return s.map(o=>{var fe,me,ve,ge,ye,he;const I=o.mesh,y=o.name,$=((fe=o.dataplane.networking.gateway)==null?void 0:fe.type)||"STANDARD",n={name:$==="STANDARD"?"data-plane-detail-view":"gateway-detail-view",params:{mesh:I,dataPlane:y}},c=["kuma.io/protocol","kuma.io/service","kuma.io/zone"],h=Pe(o.dataplane).filter(f=>c.includes(f.label)),j=(me=h.find(f=>f.label==="kuma.io/service"))==null?void 0:me.value,Oe=(ve=h.find(f=>f.label==="kuma.io/protocol"))==null?void 0:ve.value,le=(ge=h.find(f=>f.label==="kuma.io/zone"))==null?void 0:ge.value;let ce;j!==void 0&&(ce={name:"service-detail-view",params:{mesh:I,service:j}});let pe;le!==void 0&&(pe={name:"zone-cp-detail-view",params:{zone:le}});const{status:Ue}=Ae(o.dataplane,o.dataplaneInsight),Ve=((ye=o.dataplaneInsight)==null?void 0:ye.subscriptions)??[],Fe={totalUpdates:0,totalRejectedUpdates:0,dpVersion:null,envoyVersion:null,selectedTime:NaN,selectedUpdateTime:NaN,version:null},O=Ve.reduce((f,N)=>{var _e,be;if(N.connectTime){const ke=Date.parse(N.connectTime);(!f.selectedTime||ke>f.selectedTime)&&(f.selectedTime=ke)}const oe=Date.parse(N.status.lastUpdateTime);return oe&&(!f.selectedUpdateTime||oe>f.selectedUpdateTime)&&(f.selectedUpdateTime=oe),{totalUpdates:f.totalUpdates+parseInt(N.status.total.responsesSent??"0",10),totalRejectedUpdates:f.totalRejectedUpdates+parseInt(N.status.total.responsesRejected??"0",10),dpVersion:((_e=N.version)==null?void 0:_e.kumaDp.version)||f.dpVersion,envoyVersion:((be=N.version)==null?void 0:be.envoy.version)||f.envoyVersion,selectedTime:f.selectedTime,selectedUpdateTime:f.selectedUpdateTime,version:N.version||f.version}},Fe),H={entity:o,detailViewRoute:n,type:$,zone:{title:le??"—",route:pe},service:{title:j??"—",route:ce},protocol:Oe??"—",status:Ue,totalUpdates:O.totalUpdates,totalRejectedUpdates:O.totalRejectedUpdates,dpVersion:O.dpVersion??"—",envoyVersion:O.envoyVersion??"—",warnings:[],unsupportedEnvoyVersion:!1,unsupportedKumaDPVersion:!1,kumaDpAndKumaCpMismatch:!1,lastUpdated:O.selectedUpdateTime?Ce(new Date(O.selectedUpdateTime).toUTCString()):"—",lastConnected:O.selectedTime?Ce(new Date(O.selectedTime).toUTCString()):"—",overview:o};if(O.version){const{kind:f}=et(O.version);switch(f!==tt&&H.warnings.push(f),f){case nt:H.unsupportedEnvoyVersion=!0;break;case at:H.unsupportedKumaDPVersion=!0;break}}return w.value&&O.dpVersion&&h.find(N=>N.label===ze)&&typeof((he=O.version)==null?void 0:he.kumaDp.kumaCpCompatible)=="boolean"&&!O.version.kumaDp.kumaCpCompatible&&(H.warnings.push(st),H.kumaDpAndKumaCpMismatch=!0),H})}function W({fields:s,query:o}){const I=G.get("filterFields"),y=I!==null?JSON.parse(I):{},$=JSON.stringify(y),n=Object.fromEntries(Jt(s)),c=JSON.stringify(n);G.set("filterQuery",o||null),G.set("filterFields",c),$!==c&&(F.value=n)}return(s,o)=>(u(),z(ht,null,{content:P(()=>{var I;return[S(lt,{"selected-entity-name":(I=r.value)==null?void 0:I.name,"page-size":L(He),"is-loading":e.isLoading,error:t.error,"empty-state":d,"table-data":g.value,"table-data-is-empty":g.value.data.length===0,next:e.nextUrl!==null,"page-offset":e.pageOffset,onTableAction:Z,onLoadData:V},{additionalControls:P(()=>[S(Nt,{id:"data-plane-proxy-filter",class:"data-plane-proxy-filter",placeholder:T.value,query:C.value,fields:e.dppFilterFields,onFieldsChange:W},null,8,["placeholder","query","fields"]),l(),e.isGatewayView?(u(),v("div",Zt,[Wt,l(),Se(m("select",{id:"data-planes-type-filter","onUpdate:modelValue":o[0]||(o[0]=y=>k.value=y),"data-testid":"data-planes-type-filter"},[(u(),v(B,null,R(i,(y,$)=>m("option",{key:$,value:$},A(y),9,Xt)),64))],512),[[Re,k.value]])])):K("",!0),l(),S(L(Ge),{label:"Columns",icon:"cogwheel","button-appearance":"outline"},{items:P(()=>[m("div",{onClick:q},[(u(!0),v(B,null,R(D.value,(y,$)=>(u(),z(L(Je),{key:$,class:"table-header-selector-item",item:y},{default:P(()=>[m("label",{for:`data-plane-table-header-checkbox-${$}`,class:"k-checkbox table-header-selector-item-checkbox"},[m("input",{id:`data-plane-table-header-checkbox-${$}`,checked:y.isChecked,type:"checkbox",class:"k-input",onChange:n=>ne(n,y.tableHeaderKey)},null,40,ta),l(" "+A(y.label),1)],8,ea)]),_:2},1032,["item"]))),128))])]),_:1})]),_:1},8,["selected-entity-name","page-size","is-loading","error","table-data","table-data-is-empty","next","page-offset"])]}),sidebar:P(()=>[r.value!==null?(u(),z(Qt,{key:0,"data-plane-overview":r.value},null,8,["data-plane-overview"])):(u(),z(it,{key:1}))]),_:1}))}});const ma=ae(aa,[["__scopeId","data-v-e5b4b05e"]]);export{ma as D};
