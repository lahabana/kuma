import{_ as N,W as x,X as F,P as H,Y as K,Z as R,K as h,$ as k,l as M,a0 as P,a1 as G,e as g,c as m,w as o,r as a,o as l,a as p,b as C,n as _,f as d,t as E,F as L,h as S}from"./index.8c6a97c0.js";import{S as q,a as U}from"./SubscriptionHeader.3ae591ed.js";import{M as J}from"./MultizoneInfo.9a5364e5.js";import{C as Y}from"./CodeBlock.31e0047b.js";import{g as j}from"./tableDataUtils.c46f1dec.js";import{F as X}from"./FrameSkeleton.3833562c.js";import{D as Q}from"./DataOverview.7798887e.js";import{T as $}from"./TabsWidget.10ca7693.js";import{E as ee}from"./EntityURLControl.a9e8b804.js";import{L as te}from"./LabelList.f7f25a11.js";import{W as se}from"./WarningsWidget.a388dc74.js";import"./_commonjsHelpers.712cc82f.js";import"./EmptyBlock.vue_vue_type_script_setup_true_lang.80be7515.js";import"./ErrorBlock.d4c6dfc2.js";import"./LoadingBlock.vue_vue_type_script_setup_true_lang.1c68a0d8.js";const ne={name:"ZonesView",components:{AccordionList:x,AccordionItem:F,FrameSkeleton:X,DataOverview:Q,TabsWidget:$,LabelList:te,WarningsWidget:se,CodeBlock:Y,SubscriptionDetails:q,SubscriptionHeader:U,MultizoneInfo:J,EntityURLControl:ee},data(){return{isLoading:!0,isEmpty:!1,hasError:!1,entityIsLoading:!0,entityIsEmpty:!1,entityHasError:!1,tableDataIsEmpty:!1,empty_state:{title:"No Data",message:"There are no Zones present."},tableData:{headers:[{key:"actions",hideLabel:!0},{label:"Status",key:"status"},{label:"Name",key:"name"},{label:"Zone CP Version",key:"zoneCpVersion"},{label:"Storage type",key:"storeType"},{label:"Ingress",key:"hasIngress"},{label:"Egress",key:"hasEgress"},{key:"warnings",hideLabel:!0}],data:[]},tabs:[{hash:"#overview",title:"Overview"},{hash:"#insights",title:"Zone Insights"},{hash:"#config",title:"Config"},{hash:"#warnings",title:"Warnings"}],entity:{},pageSize:H,next:null,warnings:[],subscriptionsReversed:[],codeOutput:null,zonesWithIngress:new Set}},computed:{...K({multicluster:"config/getMulticlusterStatus",globalCpVersion:"config/getVersion"})},watch:{$route(){this.isLoading=!0,this.isEmpty=!1,this.hasError=!1,this.entityIsLoading=!0,this.entityIsEmpty=!1,this.entityHasError=!1,this.tableDataIsEmpty=!1,this.init()}},beforeMount(){this.init()},methods:{init(){this.multicluster&&this.loadData()},filterTabs(){return this.warnings.length?this.tabs:this.tabs.filter(s=>s.hash!=="#warnings")},tableAction(s){const t=s;this.getEntity(t)},parseData(s){const{zoneInsight:t={},name:i}=s;let u="-",e="",r=!0;return t.subscriptions&&t.subscriptions.length&&t.subscriptions.forEach(n=>{if(n.version&&n.version.kumaCp){u=n.version.kumaCp.version;const{kumaCpGlobalCompatible:y=!0}=n.version.kumaCp;r=y,n.config&&(e=JSON.parse(n.config).store.type)}}),{...s,status:R(t).status,zoneCpVersion:u,storeType:e,hasIngress:this.zonesWithIngress.has(i)?"Yes":"No",hasEgress:this.zonesWithEgress.has(i)?"Yes":"No",withWarnings:!r}},calculateZonesWithIngress(s){const t=new Set;s.forEach(({zoneIngress:{zone:i}})=>{t.add(i)}),this.zonesWithIngress=t},calculateZonesWithEgress(s){const t=new Set;s.forEach(({zoneEgress:{zone:i}})=>{t.add(i)}),this.zonesWithEgress=t},async loadData(s="0"){this.isLoading=!0,this.isEmpty=!1;const t=this.$route.query.ns||null;try{const[{data:i,next:u},{items:e},{items:r}]=await Promise.all([j({getSingleEntity:h.getZoneOverview.bind(h),getAllEntities:h.getAllZoneOverviews.bind(h),size:this.pageSize,offset:s,query:t}),k({callEndpoint:h.getAllZoneIngressOverviews.bind(h)}),k({callEndpoint:h.getAllZoneEgressOverviews.bind(h)})]);this.next=u,i.length?(this.calculateZonesWithIngress(e),this.calculateZonesWithEgress(r),this.tableData.data=i.map(this.parseData),this.tableDataIsEmpty=!1,this.isEmpty=!1,this.getEntity({name:i[0].name})):(this.tableData.data=[],this.tableDataIsEmpty=!0,this.isEmpty=!0,this.entityIsEmpty=!0)}catch(i){this.hasError=!0,this.isEmpty=!0,console.error(i)}finally{this.isLoading=!1}},async getEntity(s){var u,e;this.entityIsLoading=!0,this.entityIsEmpty=!0;const t=["type","name"],i=setTimeout(()=>{this.entityIsEmpty=!0,this.entityIsLoading=!1},"500");if(s){this.entityIsEmpty=!1,this.warnings=[];try{const r=await h.getZoneOverview({name:s.name}),n=(e=(u=r.zoneInsight)==null?void 0:u.subscriptions)!=null?e:[];if(this.entity={...M(r,t),"Authentication Type":P(r)},this.subscriptionsReversed=Array.from(n).reverse(),n.length){const{version:y={}}=n[n.length-1],{kumaCp:b={}}=y,I=b.version||"-",{kumaCpGlobalCompatible:v=!0}=b;v||this.warnings.push({kind:G,payload:{zoneCpVersion:I,globalCpVersion:this.globalCpVersion}}),n[n.length-1].config&&(this.codeOutput=JSON.stringify(JSON.parse(n[n.length-1].config),null,2))}}catch(r){console.error(r),this.entity={},this.entityHasError=!0,this.entityIsEmpty=!0}finally{clearTimeout(i)}}this.entityIsLoading=!1}}},ie={class:"zones"},oe=d("span",{class:"custom-control-icon"}," \u2190 ",-1),ae={key:0},re={key:1},le={key:2};function ce(s,t,i,u,e,r){const n=a("MultizoneInfo"),y=a("KButton"),b=a("DataOverview"),I=a("EntityURLControl"),v=a("KBadge"),z=a("LabelList"),D=a("SubscriptionHeader"),A=a("SubscriptionDetails"),W=a("AccordionItem"),O=a("AccordionList"),w=a("KCard"),T=a("CodeBlock"),Z=a("WarningsWidget"),V=a("TabsWidget"),B=a("FrameSkeleton");return l(),g("div",ie,[s.multicluster===!1?(l(),m(n,{key:0})):(l(),m(B,{key:1},{default:o(()=>[p(b,{"page-size":e.pageSize,"has-error":e.hasError,"is-loading":e.isLoading,"empty-state":e.empty_state,"table-data":e.tableData,"table-data-is-empty":e.tableDataIsEmpty,"show-warnings":e.tableData.data.some(c=>c.withWarnings),next:e.next,onTableAction:r.tableAction,onLoadData:t[0]||(t[0]=c=>r.loadData(c))},{additionalControls:o(()=>[s.$route.query.ns?(l(),m(y,{key:0,class:"back-button",appearance:"primary",to:{name:"zones"}},{default:o(()=>[oe,C(" View All ")]),_:1})):_("",!0)]),_:1},8,["page-size","has-error","is-loading","empty-state","table-data","table-data-is-empty","show-warnings","next","onTableAction"]),e.isEmpty===!1?(l(),m(V,{key:0,"has-error":e.hasError,"is-loading":e.isLoading,tabs:r.filterTabs(),"initial-tab-override":"overview"},{tabHeader:o(()=>[d("div",null,[d("h3",null," Zone: "+E(e.entity.name),1)]),d("div",null,[p(I,{name:e.entity.name},null,8,["name"])])]),overview:o(()=>[p(z,{"has-error":e.entityHasError,"is-loading":e.entityIsLoading,"is-empty":e.entityIsEmpty},{default:o(()=>[d("div",null,[d("ul",null,[(l(!0),g(L,null,S(e.entity,(c,f)=>(l(),g("li",{key:f},[c?(l(),g("h4",ae,E(f),1)):_("",!0),f==="status"?(l(),g("p",re,[p(v,{appearance:c==="Offline"?"danger":"success"},{default:o(()=>[C(E(c),1)]),_:2},1032,["appearance"])])):(l(),g("p",le,E(c),1))]))),128))])])]),_:1},8,["has-error","is-loading","is-empty"])]),insights:o(()=>[p(w,{"border-variant":"noBorder"},{body:o(()=>[p(O,{"initially-open":0},{default:o(()=>[(l(!0),g(L,null,S(e.subscriptionsReversed,(c,f)=>(l(),m(W,{key:f},{"accordion-header":o(()=>[p(D,{details:c},null,8,["details"])]),"accordion-content":o(()=>[p(A,{details:c},null,8,["details"])]),_:2},1024))),128))]),_:1})]),_:1})]),config:o(()=>[e.codeOutput?(l(),m(w,{key:0,"border-variant":"noBorder"},{body:o(()=>[p(T,{id:"code-block-zone-config",language:"json",code:e.codeOutput,"is-searchable":"","query-key":"zone-config"},null,8,["code"])]),_:1})):_("",!0)]),warnings:o(()=>[p(Z,{warnings:e.warnings},null,8,["warnings"])]),_:1},8,["has-error","is-loading","tabs"])):_("",!0)]),_:1}))])}const Ce=N(ne,[["render",ce]]);export{Ce as default};