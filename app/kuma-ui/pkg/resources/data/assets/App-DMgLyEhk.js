import{_ as y,o as p,c as E,r as m,d as h,a as l,b as d,w as t,e as a,f as e,n as $,h as C,g as R,i as I,j as V,u as D,k as T,l as z,m as i,p as r,t as _,q as g,N as U,O as B,s as P,v as H}from"./index-C1qiy_FS.js";const G=""+new URL("product-logo-CDoXkXpC.png",import.meta.url).href,X={},Y={class:"app-navigator"};function Z(c,o){return p(),E("li",Y,[m(c.$slots,"default")])}const k=y(X,[["render",Z]]),q=h({__name:"ControlPlaneNavigator",setup(c){return(o,u)=>{const s=l("RouterLink");return p(),d(k,{"data-testid":"control-planes-navigator"},{default:t(()=>[a(s,{class:$({"is-active":[o.$route.name].concat(o.$route.matched.map(n=>n.name)).some(n=>n==="home")}),to:{name:"home"}},{default:t(()=>[e(`
      Home
    `)]),_:1},8,["class"])]),_:1})}}}),j=h({name:"github-button",props:{href:String,ariaLabel:String,title:String,dataIcon:String,dataColorScheme:String,dataSize:String,dataShowCount:String,dataText:String},render:function(){const c={ref:"_"};for(const o in this.$props)c[C(o)]=this.$props[o];return R("span",[I(this.$slots,"default")?R("a",c,this.$slots.default()):R("a",c)])},mounted:function(){this.paint()},beforeUpdate:function(){this.reset()},updated:function(){this.paint()},beforeUnmount:function(){this.reset()},methods:{paint:function(){const c=this.$el.appendChild(document.createElement("span")),o=this;V(()=>import("./buttons.esm-B8a_CsNS.js"),[],import.meta.url).then(function(u){u.render(c.appendChild(o.$refs._),function(s){try{c.parentNode.replaceChild(s,c)}catch{}})})},reset:function(){this.$el.replaceChild(this.$refs._,this.$el.lastChild)}}}),M=c=>(P("data-v-8928b4ce"),c=c(),H(),c),F={class:"application-shell"},J={role:"banner"},Q={class:"horizontal-list"},W={class:"upgrade-check-wrapper"},x={class:"alert-content"},ee={class:"horizontal-list"},te={class:"app-status app-status--mobile"},ne={class:"app-status app-status--desktop"},oe=M(()=>i("span",{class:"visually-hidden"},"Help",-1)),ae=M(()=>i("span",{class:"visually-hidden"},"Diagnostics",-1)),se={class:"app-content-container"},re={key:0,"aria-label":"Main",class:"app-sidebar"},ie={class:"app-main-content"},ce={class:"app-notifications"},le=["innerHTML"],pe=h({__name:"ApplicationShell",setup(c){const o=D(),u=T(),{t:s}=z();return(n,N)=>{const b=l("XTeleportSlot"),S=l("RouterLink"),f=l("KButton"),v=l("KAlert"),A=l("DataSource"),O=l("KPop"),w=l("KDropdownItem"),K=l("KDropdown");return p(),E("div",F,[a(b,{name:"modal-layer"}),e(),i("header",J,[i("div",Q,[m(n.$slots,"header",{},()=>[a(S,{to:{name:"home"}},{default:t(()=>[m(n.$slots,"home",{},void 0,!0)]),_:3}),e(),a(r(j),{class:"gh-star",href:"https://github.com/kumahq/kuma","aria-label":"Star kumahq/kuma on GitHub"},{default:t(()=>[e(`
            Star
          `)]),_:1}),e(),i("div",W,[a(A,{src:"/control-plane/version/latest"},{default:t(({data:L})=>[L&&r(o)("KUMA_VERSION")!==L.version?(p(),d(v,{key:0,class:"upgrade-alert","data-testid":"upgrade-check",appearance:"info"},{default:t(()=>[i("div",x,[i("p",null,_(r(s)("common.product.name"))+` update available
                  `,1),e(),a(f,{appearance:"primary",to:r(s)("common.product.href.install")},{default:t(()=>[e(`
                    Update
                  `)]),_:1},8,["to"])])]),_:1})):g("",!0)]),_:1})])],!0)]),e(),i("div",ee,[m(n.$slots,"content-info",{},()=>[i("div",te,[a(O,{width:"280"},{content:t(()=>[i("p",null,[e(_(r(s)("common.product.name"))+" ",1),i("b",null,_(r(o)("KUMA_VERSION")),1),e(" on "),i("b",null,_(r(s)(`common.product.environment.${r(o)("KUMA_ENVIRONMENT")}`)),1),e(" ("+_(r(s)(`common.product.mode.${r(o)("KUMA_MODE")}`))+`)
                `,1)])]),default:t(()=>[a(f,{appearance:"tertiary"},{default:t(()=>[e(`
                Info
              `)]),_:1}),e()]),_:1})]),e(),i("p",ne,[e(_(r(s)("common.product.name"))+" ",1),i("b",null,_(r(o)("KUMA_VERSION")),1),e(" on "),i("b",null,_(r(s)(`common.product.environment.${r(o)("KUMA_ENVIRONMENT")}`)),1),e(" ("+_(r(s)(`common.product.mode.${r(o)("KUMA_MODE")}`))+`)
          `,1)]),e(),a(K,{"kpop-attributes":{placement:"bottomEnd"}},{items:t(()=>[a(w,{item:{to:r(s)("common.product.href.docs.index"),label:""},target:"_blank",rel:"noopener noreferrer"},{default:t(()=>[e(`
                Documentation
              `)]),_:1},8,["item"]),e(),a(w,{item:{to:r(s)("common.product.href.feedback"),label:""},target:"_blank",rel:"noopener noreferrer"},{default:t(()=>[e(`
                Feedback
              `)]),_:1},8,["item"]),e(),a(w,{item:{to:{name:"onboarding-welcome-view"},label:""}},{default:t(()=>[e(`
                Onboarding
              `)]),_:1})]),default:t(()=>[a(f,{appearance:"tertiary","icon-only":""},{default:t(()=>[a(r(U)),e(),oe]),_:1}),e()]),_:1}),e(),a(f,{to:{name:"diagnostics"},appearance:"tertiary","icon-only":"","data-testid":"nav-item-diagnostics"},{default:t(()=>[a(r(B)),e(),ae]),_:1})],!0)])]),e(),i("div",se,[n.$slots.navigation?(p(),E("nav",re,[i("ul",null,[m(n.$slots,"navigation",{},void 0,!0)])])):g("",!0),e(),i("div",ie,[i("div",ce,[m(n.$slots,"notifications",{},void 0,!0)]),e(),m(n.$slots,"notifications",{},()=>[r(u)("use state")?g("",!0):(p(),d(v,{key:0,class:"mb-4",appearance:"warning"},{default:t(()=>[i("ul",null,[i("li",{"data-testid":"warning-GLOBAL_STORE_TYPE_MEMORY",innerHTML:r(s)("common.warnings.GLOBAL_STORE_TYPE_MEMORY")},null,8,le)])]),_:1}))],!0),e(),m(n.$slots,"default",{},void 0,!0)])])])}}}),de=y(pe,[["__scopeId","data-v-8928b4ce"]]),_e=h({__name:"MeshNavigator",setup(c){return(o,u)=>{const s=l("RouterLink");return p(),d(k,{"data-testid":"meshes-navigator"},{default:t(()=>[a(s,{class:$({"is-active":[o.$route.name].concat(o.$route.matched.map(n=>n.name)).some(n=>n==="mesh-index-view")}),to:{name:"mesh-list-view"}},{default:t(()=>[e(`
      Meshes
    `)]),_:1},8,["class"])]),_:1})}}}),ue=h({__name:"ZoneEgressNavigator",setup(c){return(o,u)=>{const s=l("RouterLink");return p(),d(k,{"data-testid":"zone-egresses-navigator"},{default:t(()=>[a(s,{class:$({"is-active":[o.$route.name].concat(o.$route.matched.map(n=>n.name)).some(n=>n==="zone-egress-list-view")}),to:{name:"zone-egress-list-view"}},{default:t(()=>[e(`
      Zone Egresses
    `)]),_:1},8,["class"])]),_:1})}}}),me=h({__name:"ZoneNavigator",setup(c){return(o,u)=>{const s=l("RouterLink");return p(),d(k,{"data-testid":"zones-navigator"},{default:t(()=>[a(s,{class:$({"is-active":[o.$route.name].concat(o.$route.matched.map(n=>n.name)).some(n=>n==="zone-index-view")}),to:{name:"zone-cp-list-view"}},{default:t(()=>[e(`
      Zones
    `)]),_:1},8,["class"])]),_:1})}}}),he=["alt"],fe=h({__name:"App",setup(c){return(o,u)=>{const s=l("RouterView"),n=l("AppView"),N=l("RouteView"),b=l("DataSource");return p(),d(b,{src:"/control-plane/addresses"},{default:t(({data:S})=>[typeof S<"u"?(p(),d(N,{key:0,name:"app",attrs:{class:"kuma-ready"},"data-testid-root":"mesh-app"},{default:t(({t:f,can:v})=>[a(de,{class:"kuma-application"},{home:t(()=>[i("img",{class:"logo",src:G,alt:`${f("common.product.name")} Logo`,"data-testid":"logo"},null,8,he)]),navigation:t(()=>[a(q),e(),v("use zones")?(p(),d(me,{key:0})):(p(),d(ue,{key:1})),e(),a(_e)]),default:t(()=>[e(),e(),a(n,null,{default:t(()=>[a(s)]),_:1})]),_:2},1024)]),_:1})):g("",!0)]),_:1})}}}),ge=y(fe,[["__scopeId","data-v-f821200e"]]);export{ge as default};
