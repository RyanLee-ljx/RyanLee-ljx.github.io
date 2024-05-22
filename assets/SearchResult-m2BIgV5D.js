import{u as U,f as te,g as se,h as z,i as ae,P as le,t as re,j as ie,k as b,l as _,m as ue,w as B,n as s,p as ne,R as T,q as oe,s as ce,v as ve,C as he,x as pe,y as de,z as ye,A as fe,B as me,D as ge,E as He,F as $,G as I,H as Re,I as q,J as ke}from"./app-Db0BSUZh.js";const we=["/","/intro.html","/ML/question.html","/english/terminology.html","/traffic/Astar.html","/traffic/CA.html","/traffic/ad_Astar.html","/traffic/dijkstra.html","/traffic/floyd.html","/traffic/ns.html","/traffic/pedestrian.html","/traffic/planning.html","/traffic/traffic_theory_1.html","/traffic/zengzhangxishu.html","/english/paper/paper_1.html","/english/tec/tec_1.html","/english/traffic/traffic_1.html","/english/traffic_planning/planning_1.html","/english/traffic_theory/theory_1.html","/404.html","/ML/","/english/","/traffic/","/english/paper/","/english/tec/","/english/traffic/","/english/traffic_planning/","/english/traffic_theory/","/category/","/category/%E4%BA%A4%E9%80%9A/","/tag/","/tag/traffic/","/article/","/star/","/timeline/"],Qe="SEARCH_PRO_QUERY_HISTORY",m=U(Qe,[]),_e=()=>{const{queryHistoryCount:a}=q,l=a>0;return{enabled:l,queryHistory:m,addQueryHistory:r=>{l&&(m.value=Array.from(new Set([r,...m.value.slice(0,a-1)])))},removeQueryHistory:r=>{m.value=[...m.value.slice(0,r),...m.value.slice(r+1)]}}},F=a=>we[a.id]+("anchor"in a?`#${a.anchor}`:""),qe="SEARCH_PRO_RESULT_HISTORY",{resultHistoryCount:M}=q,g=U(qe,[]),xe=()=>{const a=M>0;return{enabled:a,resultHistory:g,addResultHistory:l=>{if(a){const r={link:F(l),display:l.display};"header"in l&&(r.header=l.header),g.value=[r,...g.value.slice(0,M-1)]}},removeResultHistory:l=>{g.value=[...g.value.slice(0,l),...g.value.slice(l+1)]}}},Ae=a=>{const l=he(),r=z(),x=pe(),u=b(0),k=_(()=>u.value>0),d=de([]);return ye(()=>{const{search:y,terminate:A}=fe(),H=Re(c=>{const R=c.join(" "),{searchFilter:C=p=>p,splitWord:S,suggestionsFilter:P,...f}=l.value;R?(u.value+=1,y(c.join(" "),r.value,f).then(p=>C(p,R,r.value,x.value)).then(p=>{u.value-=1,d.value=p}).catch(p=>{console.warn(p),u.value-=1,u.value||(d.value=[])})):d.value=[]},q.searchDelay-q.suggestDelay);B([a,r],([c])=>H(c),{immediate:!0}),me(()=>{A()})}),{isSearching:k,results:d}};var Se=te({name:"SearchResult",props:{queries:{type:Array,required:!0},isFocusing:Boolean},emits:["close","updateQuery"],setup(a,{emit:l}){const r=se(),x=z(),u=ae(le),{enabled:k,addQueryHistory:d,queryHistory:y,removeQueryHistory:A}=_e(),{enabled:H,resultHistory:c,addResultHistory:R,removeResultHistory:C}=xe(),S=k||H,P=re(a,"queries"),{results:f,isSearching:p}=Ae(P),i=ie({isQuery:!0,index:0}),v=b(0),h=b(0),j=_(()=>S&&(y.value.length>0||c.value.length>0)),L=_(()=>f.value.length>0),D=_(()=>f.value[v.value]||null),Y=()=>{const{isQuery:e,index:t}=i;t===0?(i.isQuery=!e,i.index=e?c.value.length-1:y.value.length-1):i.index=t-1},G=()=>{const{isQuery:e,index:t}=i;t===(e?y.value.length-1:c.value.length-1)?(i.isQuery=!e,i.index=0):i.index=t+1},J=()=>{v.value=v.value>0?v.value-1:f.value.length-1,h.value=D.value.contents.length-1},V=()=>{v.value=v.value<f.value.length-1?v.value+1:0,h.value=0},K=()=>{h.value<D.value.contents.length-1?h.value+=1:V()},N=()=>{h.value>0?h.value-=1:J()},E=e=>e.map(t=>ke(t)?t:s(t[0],t[1])),W=e=>{if(e.type==="customField"){const t=ge[e.index]||"$content",[n,Q=""]=He(t)?t[x.value].split("$content"):t.split("$content");return e.display.map(o=>s("div",E([n,...o,Q])))}return e.display.map(t=>s("div",E(t)))},w=()=>{v.value=0,h.value=0,l("updateQuery",""),l("close")},X=()=>k?s("ul",{class:"search-pro-result-list"},s("li",{class:"search-pro-result-list-item"},[s("div",{class:"search-pro-result-title"},u.value.queryHistory),y.value.map((e,t)=>s("div",{class:["search-pro-result-item",{active:i.isQuery&&i.index===t}],onClick:()=>{l("updateQuery",e)}},[s($,{class:"search-pro-result-type"}),s("div",{class:"search-pro-result-content"},e),s("button",{class:"search-pro-remove-icon",innerHTML:I,onClick:n=>{n.preventDefault(),n.stopPropagation(),A(t)}})]))])):null,Z=()=>H?s("ul",{class:"search-pro-result-list"},s("li",{class:"search-pro-result-list-item"},[s("div",{class:"search-pro-result-title"},u.value.resultHistory),c.value.map((e,t)=>s(T,{to:e.link,class:["search-pro-result-item",{active:!i.isQuery&&i.index===t}],onClick:()=>{w()}},()=>[s($,{class:"search-pro-result-type"}),s("div",{class:"search-pro-result-content"},[e.header?s("div",{class:"content-header"},e.header):null,s("div",e.display.map(n=>E(n)).flat())]),s("button",{class:"search-pro-remove-icon",innerHTML:I,onClick:n=>{n.preventDefault(),n.stopPropagation(),C(t)}})]))])):null;return ue("keydown",e=>{if(a.isFocusing){if(L.value){if(e.key==="ArrowUp")N();else if(e.key==="ArrowDown")K();else if(e.key==="Enter"){const t=D.value.contents[h.value];d(a.queries.join(" ")),R(t),r.push(F(t)),w()}}else if(H){if(e.key==="ArrowUp")Y();else if(e.key==="ArrowDown")G();else if(e.key==="Enter"){const{index:t}=i;i.isQuery?(l("updateQuery",y.value[t]),e.preventDefault()):(r.push(c.value[t].link),w())}}}}),B([v,h],()=>{var e;(e=document.querySelector(".search-pro-result-list-item.active .search-pro-result-item.active"))==null||e.scrollIntoView(!1)},{flush:"post"}),()=>s("div",{class:["search-pro-result-wrapper",{empty:a.queries.length?!L.value:!j.value}],id:"search-pro-results"},a.queries.length?p.value?s(ne,{hint:u.value.searching}):L.value?s("ul",{class:"search-pro-result-list"},f.value.map(({title:e,contents:t},n)=>{const Q=v.value===n;return s("li",{class:["search-pro-result-list-item",{active:Q}]},[s("div",{class:"search-pro-result-title"},e||u.value.defaultTitle),t.map((o,ee)=>{const O=Q&&h.value===ee;return s(T,{to:F(o),class:["search-pro-result-item",{active:O,"aria-selected":O}],onClick:()=>{d(a.queries.join(" ")),R(o),w()}},()=>[o.type==="text"?null:s(o.type==="title"?oe:o.type==="heading"?ce:ve,{class:"search-pro-result-type"}),s("div",{class:"search-pro-result-content"},[o.type==="text"&&o.header?s("div",{class:"content-header"},o.header):null,s("div",W(o))])])})])})):u.value.emptyResult:S?j.value?[X(),Z()]:u.value.emptyHistory:u.value.emptyResult)}});export{Se as default};
