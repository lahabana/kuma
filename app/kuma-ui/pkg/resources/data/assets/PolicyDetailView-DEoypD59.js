import{d as P,r as l,o as i,m,w as e,b as s,k as _,Z as b,e as t,t as p,p as d,l as R,ay as L,A as N,c as x,L as B,E as X}from"./index-sgqUZBhH.js";import{S}from"./SummaryView-lo6vVtOH.js";const Z={class:"columns"},E=_("h3",null,`
          Affected Data Plane Proxies
        `,-1),$=P({__name:"PolicyDetailView",props:{data:{}},setup(w){const r=w;return(G,K)=>{const u=l("XAction"),h=l("KCard"),y=l("RouterLink"),g=l("XActionGroup"),k=l("DataCollection"),C=l("RouterView"),v=l("DataLoader"),V=l("AppView"),A=l("RouteView");return i(),m(A,{name:"policy-detail-view",params:{page:1,size:50,s:"",mesh:"",policy:"",policyPath:"",dataPlane:""}},{default:e(({route:a,t:z,uri:D,can:f,me:c})=>[s(V,null,{default:e(()=>[s(h,null,{default:e(()=>[_("div",Z,[f("use zones")&&r.data.zone?(i(),m(b,{key:0},{title:e(()=>[t(`
              Zone
            `)]),body:e(()=>[s(u,{to:{name:"zone-cp-detail-view",params:{zone:r.data.zone}}},{default:e(()=>[t(p(r.data.zone),1)]),_:1},8,["to"])]),_:1})):d("",!0)])]),_:2},1024),t(),_("div",null,[E,t(),s(h,{class:"mt-4"},{default:e(()=>[s(v,{src:D(R(L),"/meshes/:mesh/policy-path/:path/policy/:name/dataplanes",{mesh:a.params.mesh,path:a.params.policyPath,name:a.params.policy},{page:a.params.page,size:a.params.size})},{loadable:e(({data:o})=>[s(k,{type:"data-planes",items:(o==null?void 0:o.items)??[void 0],page:a.params.page,"page-size":a.params.size,total:o==null?void 0:o.total,onChange:a.update},{default:e(()=>[s(N,{headers:[{...c.get("headers.name"),label:"Name",key:"name"},{...c.get("headers.namespace"),label:"Namespace",key:"namespace"},...f("use zones")?[{...c.get("headers.zone"),label:"Zone",key:"zone"}]:[],{...c.get("headers.actions"),label:"Actions",key:"actions",hideLabel:!0}],items:o==null?void 0:o.items,"is-selected-row":n=>n.id===a.params.dataPlane,onResize:c.set},{name:e(({row:n})=>[s(y,{"data-action":"",to:{name:"data-plane-detail-view",params:{dataPlane:n.id}}},{default:e(()=>[t(p(n.name),1)]),_:2},1032,["to"])]),namespace:e(({row:n})=>[t(p(n.namespace),1)]),zone:e(({row:n})=>[n.zone?(i(),m(y,{key:0,to:{name:"zone-cp-detail-view",params:{zone:n.zone}}},{default:e(()=>[t(p(n.zone),1)]),_:2},1032,["to"])):(i(),x(B,{key:1},[t(p(z("common.collection.none")),1)],64))]),actions:e(({row:n})=>[s(g,null,{default:e(()=>[s(u,{to:{name:"data-plane-detail-view",params:{dataPlane:n.id}}},{default:e(()=>[t(p(z("common.collection.actions.view")),1)]),_:2},1032,["to"])]),_:2},1024)]),_:2},1032,["headers","items","is-selected-row","onResize"])]),_:2},1032,["items","page","page-size","total","onChange"]),t(),s(C,null,{default:e(({Component:n})=>[a.child()?(i(),m(S,{key:0,onClose:q=>a.replace({params:{mesh:a.params.mesh},query:{page:a.params.page,size:a.params.size,s:a.params.s}})},{default:e(()=>[typeof o<"u"?(i(),m(X(n),{key:0,items:o.items},null,8,["items"])):d("",!0)]),_:2},1032,["onClose"])):d("",!0)]),_:2},1024)]),_:2},1032,["src"])]),_:2},1024)])]),_:2},1024)]),_:1})}}});export{$ as default};
