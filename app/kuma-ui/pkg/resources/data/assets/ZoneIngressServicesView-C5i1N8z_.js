import{d as h,r as s,o as g,m as f,w as o,b as t,e as a,A as k,t as n}from"./index-sgqUZBhH.js";const y=h({__name:"ZoneIngressServicesView",props:{data:{}},setup(r){const i=r;return(b,A)=>{const m=s("RouteTitle"),l=s("RouterLink"),p=s("XAction"),_=s("XActionGroup"),u=s("DataCollection"),d=s("KCard"),v=s("AppView"),w=s("RouteView");return g(),f(w,{name:"zone-ingress-services-view"},{default:o(({t:c})=>[t(m,{render:!1,title:c("zone-ingresses.routes.item.navigation.zone-ingress-services-view")},null,8,["title"]),a(),t(v,null,{default:o(()=>[t(d,null,{default:o(()=>[t(u,{type:"services",items:i.data.zoneIngress.availableServices,total:i.data.zoneIngress.availableServices.length},{default:o(()=>[t(k,{"data-testid":"available-services-collection",headers:[{label:"Name",key:"name"},{label:"Mesh",key:"mesh"},{label:"Protocol",key:"protocol"},{label:"No. Instances",key:"instances"},{label:"Actions",key:"actions",hideLabel:!0}],items:i.data.zoneIngress.availableServices},{name:o(({row:e})=>[t(l,{to:{name:"service-detail-view",params:{mesh:e.mesh,service:e.tags["kuma.io/service"]}}},{default:o(()=>[a(n(e.tags["kuma.io/service"]),1)]),_:2},1032,["to"])]),mesh:o(({row:e})=>[t(l,{to:{name:"mesh-detail-view",params:{mesh:e.mesh}}},{default:o(()=>[a(n(e.mesh),1)]),_:2},1032,["to"])]),protocol:o(({row:e})=>[a(n(e.tags["kuma.io/protocol"]??c("common.collection.none")),1)]),instances:o(({row:e})=>[a(n(e.instances),1)]),actions:o(({row:e})=>[t(_,null,{default:o(()=>[t(p,{to:{name:"service-detail-view",params:{mesh:e.mesh,service:e.tags["kuma.io/service"]}}},{default:o(()=>[a(n(c("common.collection.actions.view")),1)]),_:2},1032,["to"])]),_:2},1024)]),_:2},1032,["items"])]),_:2},1032,["items","total"])]),_:2},1024)]),_:2},1024)]),_:1})}}});export{y as default};
