import{d as r,u as i,c as s,o as c,b as n,f as l}from"./index-f7ce65b2.js";import{_ as u}from"./PolicyDetails.vue_vue_type_script_setup_true_lang-2295663e.js";import{u as y}from"./store-24703c45.js";import"./StatusInfo.vue_vue_type_script_setup_true_lang-95cb4be0.js";import"./EmptyBlock.vue_vue_type_script_setup_true_lang-9123a8b0.js";import"./kongponents.es-7a007505.js";import"./ErrorBlock-60de54e4.js";import"./_plugin-vue_export-helper-c27b6911.js";import"./LoadingBlock.vue_vue_type_script_setup_true_lang-18829a32.js";import"./index-8dfd0d8f.js";import"./ResourceCodeBlock.vue_vue_type_script_setup_true_lang-33617e6c.js";import"./CodeBlock.vue_vue_type_style_index_0_lang-d021301d.js";import"./TextWithCopyButton-d1b5c6f5.js";import"./toYaml-4e00099e.js";import"./TabsWidget-d607a8b4.js";import"./QueryParameter-70743f73.js";const S=r({__name:"PolicyDetailView",props:{mesh:{},policyPath:{},policyName:{}},setup(p){const t=p,a=i(),o=y(),e=s(()=>o.state.policyTypesByPath[t.policyPath]);m();function m(){o.dispatch("updatePageTitle",a.params.policy)}return(h,f)=>e.value?(c(),n(u,{key:0,name:t.policyName,mesh:t.mesh,path:t.policyPath,type:e.value.name},null,8,["name","mesh","path","type"])):l("",!0)}});export{S as default};