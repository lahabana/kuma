import{d as C,a as s,o as w,b as x,w as n,e as o,m as r,f as c,p as R,a2 as $}from"./index-BvBYCJa7.js";import{C as y}from"./CodeBlock-BjIL_GX7.js";const B=C({__name:"ConnectionInboundSummaryStatsView",props:{data:{},dataplaneOverview:{}},setup(i){const e=i;return(V,v)=>{const p=s("RouteTitle"),l=s("KButton"),m=s("DataCollection"),u=s("DataLoader"),_=s("AppView"),h=s("RouteView");return w(),x(h,{params:{codeSearch:"",codeFilter:!1,codeRegExp:!1,mesh:"",dataPlane:"",connection:""},name:"connection-inbound-summary-stats-view"},{default:n(({route:a})=>[o(_,null,{title:n(()=>[r("h3",null,[o(p,{title:"Stats"})])]),default:n(()=>[c(),r("div",null,[o(u,{src:`/meshes/${a.params.mesh}/dataplanes/${a.params.dataPlane}/stats/${e.dataplaneOverview.dataplane.networking.inboundAddress}`},{default:n(({data:g,refresh:f})=>[o(m,{items:g.raw.split(`
`),predicate:d=>[`listener.${e.data.listenerAddress.length>0?e.data.listenerAddress:a.params.connection}`,`cluster.${e.data.name}.`,`http.${e.data.name}.`,`tcp.${e.data.name}.`].some(t=>d.startsWith(t))&&(!d.includes(".rds.")||d.includes(`_${e.data.port}`))},{default:n(({items:d})=>[o(y,{language:"json",code:d.map(t=>t.replace(`${e.data.listenerAddress.length>0?e.data.listenerAddress:a.params.connection}.`,"").replace(`${e.data.name}.`,"")).join(`
`),"is-searchable":"",query:a.params.codeSearch,"is-filter-mode":a.params.codeFilter,"is-reg-exp-mode":a.params.codeRegExp,onQueryChange:t=>a.update({codeSearch:t}),onFilterModeChange:t=>a.update({codeFilter:t}),onRegExpModeChange:t=>a.update({codeRegExp:t})},{"primary-actions":n(()=>[o(l,{appearance:"primary",onClick:f},{default:n(()=>[o(R($)),c(`

                  Refresh
                `)]),_:2},1032,["onClick"])]),_:2},1032,["code","query","is-filter-mode","is-reg-exp-mode","onQueryChange","onFilterModeChange","onRegExpModeChange"])]),_:2},1032,["items","predicate"])]),_:2},1032,["src"])])]),_:2},1024)]),_:1})}}});export{B as default};
