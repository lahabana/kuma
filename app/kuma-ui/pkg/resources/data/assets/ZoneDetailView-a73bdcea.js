import{d as _,u as d,r as i,v as u,o,j as c,b as l,g as k}from"./index-f7ce65b2.js";import{_ as w}from"./ZoneDetails.vue_vue_type_script_setup_true_lang-0dc5e882.js";import{_ as z}from"./EmptyBlock.vue_vue_type_script_setup_true_lang-9123a8b0.js";import{E as h}from"./ErrorBlock-60de54e4.js";import{_ as y}from"./LoadingBlock.vue_vue_type_script_setup_true_lang-18829a32.js";import{u as g}from"./store-24703c45.js";import{u as B}from"./index-8dfd0d8f.js";import"./kongponents.es-7a007505.js";import"./AccordionList-917e3a28.js";import"./_plugin-vue_export-helper-c27b6911.js";import"./CodeBlock.vue_vue_type_style_index_0_lang-d021301d.js";import"./DefinitionListItem-99edc8cb.js";import"./SubscriptionHeader.vue_vue_type_script_setup_true_lang-b29e23c7.js";import"./TabsWidget-d607a8b4.js";import"./QueryParameter-70743f73.js";import"./TextWithCopyButton-d1b5c6f5.js";import"./WarningsWidget.vue_vue_type_script_setup_true_lang-bab9ac01.js";const E={class:"zone-details"},$={key:3,class:"kcard-border"},G=_({__name:"ZoneDetailView",setup(b){const p=B(),e=d(),f=g(),a=i(null),n=i(!0),r=i(null);u(()=>e.params.mesh,function(){e.name==="zone-detail-view"&&s()}),u(()=>e.params.name,function(){e.name==="zone-detail-view"&&s()}),v();function v(){f.dispatch("updatePageTitle",e.params.zone),s()}async function s(){n.value=!0,r.value=null;const m=e.params.zone;try{a.value=await p.getZoneOverview({name:m})}catch(t){a.value=null,t instanceof Error?r.value=t:console.error(t)}finally{n.value=!1}}return(m,t)=>(o(),c("div",E,[n.value?(o(),l(y,{key:0})):r.value!==null?(o(),l(h,{key:1,error:r.value},null,8,["error"])):a.value===null?(o(),l(z,{key:2})):(o(),c("div",$,[k(w,{"zone-overview":a.value},null,8,["zone-overview"])]))]))}});export{G as default};