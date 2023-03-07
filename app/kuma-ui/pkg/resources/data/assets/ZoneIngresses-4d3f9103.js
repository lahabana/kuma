import{u as R,e as U,h as j,j as N}from"./production-8e9d4248.js";import{A as G,T as H}from"./kongponents.es-397ed6da.js";import{Q as q}from"./QueryParameter-70743f73.js";import{u as K}from"./store-a0dee8a0.js";import{a as W,A as X}from"./AccordionItem-54fe15fc.js";import{D as Y}from"./DataOverview-1773da80.js";import{E as I}from"./EnvoyData-7c8014bf.js";import{F as J}from"./FrameSkeleton-b2918b04.js";import{_ as ee}from"./LabelList.vue_vue_type_style_index_0_lang-4dcdfbcd.js";import{_ as te}from"./MultizoneInfo.vue_vue_type_script_setup_true_lang-992d8462.js";import{_ as ae,S as se}from"./SubscriptionHeader.vue_vue_type_script_setup_true_lang-6d14514a.js";import{T as ne}from"./TabsWidget-f9af5fad.js";import{u as re}from"./index-b9ed8cb2.js";import{d as oe,r as o,q as le,a3 as ie,h as g,u as p,a as d,w as a,o as l,e as i,f as z,b as O,g as f,t as w,F as B,l as L}from"./runtime-dom.esm-bundler-60661421.js";import"./_plugin-vue_export-helper-c27b6911.js";import"./datadogLogEvents-302eea7b.js";import"./EmptyBlock.vue_vue_type_script_setup_true_lang-61434a71.js";import"./ErrorBlock-a28072a7.js";import"./LoadingBlock.vue_vue_type_script_setup_true_lang-91bf7b5c.js";import"./StatusBadge-90038e37.js";import"./TagList-5f773a77.js";import"./CodeBlock.vue_vue_type_style_index_0_lang-f2b527a7.js";const ue={class:"zoneingresses"},ce={class:"entity-heading"},qe=oe({__name:"ZoneIngresses",props:{selectedZoneIngressName:{type:String,required:!1,default:null},offset:{type:Number,required:!1,default:0}},setup(C){const y=C,S=re(),F={title:"No Data",message:"There are no Zone Ingresses present."},V=[{hash:"#overview",title:"Overview"},{hash:"#insights",title:"Zone Ingress Insights"},{hash:"#xds-configuration",title:"XDS Configuration"},{hash:"#envoy-stats",title:"Stats"},{hash:"#envoy-clusters",title:"Clusters"}],h=R(),k=K(),m=o(!0),c=o(!1),v=o(null),_=o({headers:[{label:"Actions",key:"actions",hideLabel:!0},{label:"Status",key:"status"},{label:"Name",key:"name"}],data:[]}),u=o(null),A=o([]),x=o(null),D=o([]),T=o(y.offset);le(()=>h.params.mesh,function(){h.name==="zoneingresses"&&(m.value=!0,c.value=!1,v.value=null,b(0))}),ie(function(){M(y.offset)});function M(t){k.getters["config/getMulticlusterStatus"]&&b(t)}async function b(t){T.value=t,q.set("offset",t>0?t:null),m.value=!0,c.value=!1;const s=h.query.ns||null,r=N;try{const{data:e,next:n}=await $(s,r,t);x.value=n,e.length?(c.value=!1,A.value=e,E({name:y.selectedZoneIngressName??e[0].name}),_.value.data=e.map(Z=>{const{zoneIngressInsight:P={}}=Z,Q=U(P);return{...Z,status:Q}})):(_.value.data=[],c.value=!0)}catch(e){e instanceof Error?v.value=e:console.error(e),c.value=!0}finally{m.value=!1}}function E({name:t}){var e;const s=A.value.find(n=>n.name===t),r=((e=s==null?void 0:s.zoneIngressInsight)==null?void 0:e.subscriptions)??[];D.value=Array.from(r).reverse(),u.value=j(s,["type","name"]),q.set("zoneIngress",t)}async function $(t,s,r){if(t)return{data:[await S.getZoneIngressOverview({name:t},{size:s,offset:r})],next:null};{const{items:e,next:n}=await S.getAllZoneIngressOverviews({size:s,offset:r});return{data:e??[],next:n}}}return(t,s)=>(l(),g("div",ue,[p(k).getters["config/getMulticlusterStatus"]===!1?(l(),d(te,{key:0})):(l(),d(J,{key:1},{default:a(()=>{var r;return[i(Y,{"selected-entity-name":(r=u.value)==null?void 0:r.name,"page-size":p(N),"is-loading":m.value,error:v.value,"empty-state":F,"table-data":_.value,"table-data-is-empty":c.value,next:x.value,"page-offset":T.value,onTableAction:E,onLoadData:b},{additionalControls:a(()=>[t.$route.query.ns?(l(),d(p(G),{key:0,class:"back-button",appearance:"primary",icon:"arrowLeft",to:{name:"zoneingresses"}},{default:a(()=>[z(`
            View all
          `)]),_:1})):O("",!0)]),_:1},8,["selected-entity-name","page-size","is-loading","error","table-data","table-data-is-empty","next","page-offset"]),z(),c.value===!1&&u.value!==null?(l(),d(ne,{key:0,"has-error":v.value!==null,"is-loading":m.value,tabs:V},{tabHeader:a(()=>[f("h1",ce,`
            Zone Ingress: `+w(u.value.name),1)]),overview:a(()=>[i(ee,null,{default:a(()=>[f("div",null,[f("ul",null,[(l(!0),g(B,null,L(u.value,(e,n)=>(l(),g("li",{key:n},[f("h4",null,w(n),1),z(),f("p",null,w(e),1)]))),128))])])]),_:1})]),insights:a(()=>[i(p(H),{"border-variant":"noBorder"},{body:a(()=>[i(W,{"initially-open":0},{default:a(()=>[(l(!0),g(B,null,L(D.value,(e,n)=>(l(),d(X,{key:n},{"accordion-header":a(()=>[i(ae,{details:e},null,8,["details"])]),"accordion-content":a(()=>[i(se,{details:e,"is-discovery-subscription":""},null,8,["details"])]),_:2},1024))),128))]),_:1})]),_:1})]),"xds-configuration":a(()=>[i(I,{"data-path":"xds","zone-ingress-name":u.value.name,"query-key":"envoy-data-zone-ingress"},null,8,["zone-ingress-name"])]),"envoy-stats":a(()=>[i(I,{"data-path":"stats","zone-ingress-name":u.value.name,"query-key":"envoy-data-zone-ingress"},null,8,["zone-ingress-name"])]),"envoy-clusters":a(()=>[i(I,{"data-path":"clusters","zone-ingress-name":u.value.name,"query-key":"envoy-data-zone-ingress"},null,8,["zone-ingress-name"])]),_:1},8,["has-error","is-loading"])):O("",!0)]}),_:1}))]))}});export{qe as default};