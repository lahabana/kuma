import{d as C,a as t,o as w,b as x,w as n,e as o,m as c,f as p,p as R,a2 as y}from"./index-BvBYCJa7.js";import{C as V}from"./CodeBlock-BjIL_GX7.js";const b=C({__name:"ConnectionOutboundSummaryStatsView",props:{dataplaneOverview:{}},setup(r){const i=r;return(v,k)=>{const d=t("RouteTitle"),l=t("KButton"),m=t("DataCollection"),u=t("DataLoader"),_=t("AppView"),f=t("RouteView");return w(),x(f,{params:{codeSearch:"",codeFilter:!1,codeRegExp:!1,mesh:"",dataPlane:"",connection:""},name:"connection-outbound-summary-stats-view"},{default:n(({route:e})=>[o(_,null,{title:n(()=>[c("h3",null,[o(d,{title:"Stats"})])]),default:n(()=>[p(),c("div",null,[o(u,{src:`/meshes/${e.params.mesh}/dataplanes/${e.params.dataPlane}/stats/${i.dataplaneOverview.dataplane.networking.inboundAddress}`},{default:n(({data:h,refresh:g})=>[o(m,{items:h.raw.split(`
`),predicate:s=>s.includes(`.${e.params.connection}.`)},{default:n(({items:s})=>[o(V,{language:"json",code:s.map(a=>a.replace(`${e.params.connection}.`,"")).join(`
`),"is-searchable":"",query:e.params.codeSearch,"is-filter-mode":e.params.codeFilter,"is-reg-exp-mode":e.params.codeRegExp,onQueryChange:a=>e.update({codeSearch:a}),onFilterModeChange:a=>e.update({codeFilter:a}),onRegExpModeChange:a=>e.update({codeRegExp:a})},{"primary-actions":n(()=>[o(l,{appearance:"primary",onClick:g},{default:n(()=>[o(R(y)),p(`

                  Refresh
                `)]),_:2},1032,["onClick"])]),_:2},1032,["code","query","is-filter-mode","is-reg-exp-mode","onQueryChange","onFilterModeChange","onRegExpModeChange"])]),_:2},1032,["items","predicate"])]),_:2},1032,["src"])])]),_:2},1024)]),_:1})}}});export{b as default};
