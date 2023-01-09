"use strict";(self["webpackChunkkuma_gui"]=self["webpackChunkkuma_gui"]||[]).push([[241],{61458:function(t,e,a){a.r(e),a.d(e,{default:function(){return D}});var i=function(){var t=this,e=t._self._c;return e("div",{staticClass:"all-meshes"},[e("FrameSkeleton",[e("DataOverview",{attrs:{"page-size":t.pageSize,"has-error":t.hasError,"is-loading":t.isLoading,"empty-state":t.empty_state,"table-data":t.tableData,"table-data-is-empty":t.tableDataIsEmpty,next:t.next},on:{tableAction:t.tableAction,loadData:function(e){return t.loadData(e)}},scopedSlots:t._u([{key:"additionalControls",fn:function(){return[e("KButton",{staticClass:"add-mesh-button",attrs:{appearance:"primary",size:"small",to:{path:"/wizard/mesh"}},nativeOn:{click:function(e){return t.onCreateClick.apply(null,arguments)}}},[e("span",{staticClass:"custom-control-icon"},[t._v(" + ")]),t._v(" Create Mesh ")])]},proxy:!0}])}),!1===t.isEmpty?e("TabsWidget",{attrs:{"has-error":t.hasError,"is-loading":t.isLoading,tabs:t.tabs,"initial-tab-override":"overview"},scopedSlots:t._u([{key:"tabHeader",fn:function(){return[t.entity.basicData?e("div",[e("h3",[t._v(" Mesh: "+t._s(t.entity.basicData.name))])]):t._e()]},proxy:!0},{key:"overview",fn:function(){return[e("LabelList",{attrs:{"has-error":t.entityHasError,"is-loading":t.entityIsLoading,"is-empty":t.entityIsEmpty}},[e("div",[e("ul",t._l(t.entity.basicData,(function(a,i){return e("li",{key:i},[e("h4","creationTime"===i?[t._v(" Created ")]:"modificationTime"===i?[t._v(" Last Modified ")]:[t._v(" "+t._s(i)+" ")]),e("p","creationTime"===i||"modificationTime"===i?[t._v(" "+t._s(t._f("readableDate")(a))+" "),e("em",[t._v("("+t._s(t._f("rawDate")(a))+")")])]:[t._v(" "+t._s(a)+" ")])])})),0)]),t.entity.extendedData&&t.entity.extendedData.length?e("div",[e("ul",[t._l(t.entity.extendedData,(function(a,i){return e("li",{key:i},[e("h4",[t._v(t._s(a.label))]),a.value?e("p",{staticClass:"label-cols"},[e("span",[t._v(" "+t._s(a.value.type)+" ")]),e("span",[t._v(" "+t._s(a.value.name)+" ")])]):e("KBadge",{attrs:{size:"small",appearance:"danger"}},[t._v(" Disabled ")])],1)})),e("li",[e("h4",[t._v("Locality Aware Loadbalancing")]),t.entity.localityEnabled?e("p",[e("KBadge",{attrs:{size:"small",appearance:"success"}},[t._v(" Enabled ")])],1):e("KBadge",{attrs:{size:"small",appearance:"danger"}},[t._v(" Disabled ")])],1)],2)]):t._e()])]},proxy:!0},{key:"yaml",fn:function(){return[e("YamlView",{attrs:{"has-error":t.entityHasError,"is-loading":t.entityIsLoading,"is-empty":t.entityIsEmpty,content:t.rawEntity}})]},proxy:!0},{key:"resources",fn:function(){return[e("LabelList",{attrs:{"has-error":t.entityHasError,"is-loading":t.entityIsLoading,"is-empty":t.entityIsEmpty}},t._l(t.countCols,(function(a){return e("div",{key:a},[e("ul",t._l(t.counts.slice((a-1)*t.itemsPerCol,a*t.itemsPerCol),(function(a,i){return e("li",{key:i},[e("h4",[t._v(t._s(a.title))]),e("p",[t._v(t._s(t._f("formatValue")(a.value)))])])})),0)])})),0)]},proxy:!0}],null,!1,159924467)}):t._e()],1)],1)},s=[],n=a(20629),l=a(89340),r=a(17463),o=a(70172),y=a(95814),c=a(70878),h=a(53419),u=a(84855),d=a(56882),m=a(7001),p=a(59316),g=a(33561),b=a(45689),f={name:"MeshesView",metaInfo:{title:"Meshes"},components:{FrameSkeleton:u.Z,DataOverview:d.Z,TabsWidget:m.Z,YamlView:p.Z,LabelList:g.Z},filters:{formatValue(t){return t?t.toLocaleString("en").toString():0},readableDate(t){return(0,h.tV)(t)},rawDate(t){return(0,h.Jx)(t)}},data(){return{isLoading:!0,isEmpty:!1,hasError:!1,entityIsLoading:!0,entityIsEmpty:!1,entityHasError:!1,tableDataIsEmpty:!1,empty_state:{title:"No Data",message:"There are no Meshes present."},tableData:{headers:[{key:"actions",hideLabel:!0},{label:"Name",key:"name"},{label:"Type",key:"type"}],data:[]},tabs:[{hash:"#overview",title:"Overview"},{hash:"#resources",title:"Resources"},{hash:"#yaml",title:"YAML"}],entity:{},rawEntity:{},pageSize:b.NR,next:null,itemsPerCol:3,meshInsight:(0,y.go)()}},computed:{...(0,n.rn)({policies:t=>t.policies}),...(0,n.Se)({featureFlags:"config/featureFlags"}),counts(){const t=this.policies.map((t=>({title:t.pluralDisplayName,value:this.meshInsight.policies[t.name]?.total||0})));return[{title:"Data plane proxies",value:this.meshInsight.dataplanes.total},...t]},countCols(){return Math.ceil(this.counts.length/this.itemsPerCol)}},watch:{$route(t,e){this.init()}},beforeMount(){this.init()},methods:{init(){this.loadData()},onCreateClick(){l.fy.logger.info(c.T.CREATE_MESH_CLICKED)},tableAction(t){const e=t;this.getEntity(e)},async loadData(t="0"){this.isLoading=!0,this.isEmpty=!1;const e=this.$route.params.mesh;let a;"all"!==e&&(a=this.$route.params.mesh);try{const{data:e,next:i}=await(0,o.W)({getSingleEntity:r.Z.getMesh.bind(r.Z),getAllEntities:r.Z.getAllMeshes.bind(r.Z),size:this.pageSize,offset:t,query:a});this.next=i,e.length?(this.tableData.data=[...e],this.tableDataIsEmpty=!1,this.isEmpty=!1,this.getEntity({name:e[0].name})):(this.tableData.data=[],this.tableDataIsEmpty=!0,this.isEmpty=!0,this.entityIsEmpty=!0)}catch(i){this.hasError=!0,this.isEmpty=!0,console.error(i)}finally{this.isLoading=!1}},getEntity(t){if(this.entityIsLoading=!0,this.entityIsEmpty=!1,this.entityHasError=!1,t&&null!==t)return r.Z.getMesh({name:t.name}).then((e=>{if(e){r.Z.getMeshInsights({name:t.name}).then((t=>{this.meshInsight=t}));const a=(0,h.wy)(e,["type","name"]),i=()=>{const t=Object.entries((0,h.wy)(e,["mtls","logging","metrics","tracing"])),a=[];return t.forEach((t=>{const e=t[0],i=t[1]||null;if(i&&i.enabledBackend){const t=i.enabledBackend,s=i.backends.find((e=>e.name===t));s&&a.push({label:e,value:{type:s.type,name:s.name}})}else if(i&&i.defaultBackend){const t=i.defaultBackend,s=i.backends.find((e=>e.name===t));s&&a.push({label:e,value:{type:s.type,name:s.name}})}else if(i&&i.backends){const t=i.backends[0];t&&a.push({label:e,value:{type:t.type,name:t.name}})}else a.push({label:e,value:null})})),a},s=()=>{const{routing:t}=e;return t&&t.localityAwareLoadBalancing};this.entity={basicData:a,extendedData:i(),localityEnabled:s()},this.rawEntity=(0,h.RV)(e)}else this.entity={},this.entityIsEmpty=!0})).catch((t=>{this.entityHasError=!0,console.error(t)})).finally((()=>{setTimeout((()=>{this.entityIsLoading=!1}),"500")}));setTimeout((()=>{this.entityIsEmpty=!0,this.entityIsLoading=!1}),"500")}}},v=f,_=a(1001),E=(0,_.Z)(v,i,s,!1,null,"33e695d7",null),D=E.exports}}]);