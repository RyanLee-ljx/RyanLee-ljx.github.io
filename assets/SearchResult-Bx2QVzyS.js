import{u as U,f as te,g as ae,h as z,i as se,P as le,t as re,j as ie,k as P,l as w,m as ue,n as B,p as a,q as oe,R as O,s as ne,v as ce,x as ve,C as pe,y as he,z as ye,A as de,B as me,D as ge,E as fe,F as He,G as _,H as $,I as Re,J as x,K as ke}from"./app-5Pl4Vcyu.js";const Qe=["/","/intro.html","/ML/convolution.html","/ML/question.html","/traffic/CA.html","/traffic/ns.html","/traffic/pedestrian.html","/daily/english/tec_1.html","/daily/english/vocabulary.html","/daily/guitar/jiezou.html","/daily/guitar/pu.html","/daily/guitar/yinxiuzhifu.html","/path/paper/iMTSP.html","/path/pla/chapter1.html","/path/pla/chapter2.html","/404.html","/ML/","/traffic/","/daily/english/","/daily/","/daily/guitar/","/path/paper/","/path/","/path/pla/","/category/","/category/ml/","/category/%E4%BA%A4%E9%80%9A/","/category/gt/","/category/pr/","/tag/","/tag/traffic/","/article/","/star/","/timeline/"],qe="SEARCH_PRO_QUERY_HISTORY",g=U(qe,[]),we=()=>{const{queryHistoryCount:s}=x,l=s>0;return{enabled:l,queryHistory:g,addQueryHistory:r=>{l&&(g.value=Array.from(new Set([r,...g.value.slice(0,s-1)])))},removeQueryHistory:r=>{g.value=[...g.value.slice(0,r),...g.value.slice(r+1)]}}},F=s=>Qe[s.id]+("anchor"in s?`#${s.anchor}`:""),xe="SEARCH_PRO_RESULT_HISTORY",{resultHistoryCount:I}=x,f=U(xe,[]),Se=()=>{const s=I>0;return{enabled:s,resultHistory:f,addResultHistory:l=>{if(s){const r={link:F(l),display:l.display};"header"in l&&(r.header=l.header),f.value=[r,...f.value.slice(0,I-1)]}},removeResultHistory:l=>{f.value=[...f.value.slice(0,l),...f.value.slice(l+1)]}}},Ce=s=>{const l=pe(),r=z(),S=he(),u=P(0),k=w(()=>u.value>0),y=ye([]);return de(()=>{const{search:d,terminate:C}=me(),H=Re(c=>{const R=c.join(" "),{searchFilter:L=h=>h,splitWord:A,suggestionsFilter:T,...m}=l.value;R?(u.value+=1,d(c.join(" "),r.value,m).then(h=>L(h,R,r.value,S.value)).then(h=>{u.value-=1,y.value=h}).catch(h=>{console.warn(h),u.value-=1,u.value||(y.value=[])})):y.value=[]},x.searchDelay-x.suggestDelay);B([s,r],([c])=>H(c),{immediate:!0}),ge(()=>{C()})}),{isSearching:k,results:y}};var Ae=te({name:"SearchResult",props:{queries:{type:Array,required:!0},isFocusing:Boolean},emits:["close","updateQuery"],setup(s,{emit:l}){const r=ae(),S=z(),u=se(le),{enabled:k,addQueryHistory:y,queryHistory:d,removeQueryHistory:C}=we(),{enabled:H,resultHistory:c,addResultHistory:R,removeResultHistory:L}=Se(),A=k||H,T=re(s,"queries"),{results:m,isSearching:h}=Ce(T),i=ie({isQuery:!0,index:0}),v=P(0),p=P(0),j=w(()=>A&&(d.value.length>0||c.value.length>0)),D=w(()=>m.value.length>0),E=w(()=>m.value[v.value]||null),Y=()=>{const{isQuery:e,index:t}=i;t===0?(i.isQuery=!e,i.index=e?c.value.length-1:d.value.length-1):i.index=t-1},G=()=>{const{isQuery:e,index:t}=i;t===(e?d.value.length-1:c.value.length-1)?(i.isQuery=!e,i.index=0):i.index=t+1},J=()=>{v.value=v.value>0?v.value-1:m.value.length-1,p.value=E.value.contents.length-1},K=()=>{v.value=v.value<m.value.length-1?v.value+1:0,p.value=0},V=()=>{p.value<E.value.contents.length-1?p.value+=1:K()},N=()=>{p.value>0?p.value-=1:J()},b=e=>e.map(t=>ke(t)?t:a(t[0],t[1])),W=e=>{if(e.type==="customField"){const t=fe[e.index]||"$content",[o,q=""]=He(t)?t[S.value].split("$content"):t.split("$content");return e.display.map(n=>a("div",b([o,...n,q])))}return e.display.map(t=>a("div",b(t)))},Q=()=>{v.value=0,p.value=0,l("updateQuery",""),l("close")},X=()=>k?a("ul",{class:"search-pro-result-list"},a("li",{class:"search-pro-result-list-item"},[a("div",{class:"search-pro-result-title"},u.value.queryHistory),d.value.map((e,t)=>a("div",{class:["search-pro-result-item",{active:i.isQuery&&i.index===t}],onClick:()=>{l("updateQuery",e)}},[a(_,{class:"search-pro-result-type"}),a("div",{class:"search-pro-result-content"},e),a("button",{class:"search-pro-remove-icon",innerHTML:$,onClick:o=>{o.preventDefault(),o.stopPropagation(),C(t)}})]))])):null,Z=()=>H?a("ul",{class:"search-pro-result-list"},a("li",{class:"search-pro-result-list-item"},[a("div",{class:"search-pro-result-title"},u.value.resultHistory),c.value.map((e,t)=>a(O,{to:e.link,class:["search-pro-result-item",{active:!i.isQuery&&i.index===t}],onClick:()=>{Q()}},()=>[a(_,{class:"search-pro-result-type"}),a("div",{class:"search-pro-result-content"},[e.header?a("div",{class:"content-header"},e.header):null,a("div",e.display.map(o=>b(o)).flat())]),a("button",{class:"search-pro-remove-icon",innerHTML:$,onClick:o=>{o.preventDefault(),o.stopPropagation(),L(t)}})]))])):null;return ue("keydown",e=>{if(s.isFocusing){if(D.value){if(e.key==="ArrowUp")N();else if(e.key==="ArrowDown")V();else if(e.key==="Enter"){const t=E.value.contents[p.value];y(s.queries.join(" ")),R(t),r.push(F(t)),Q()}}else if(H){if(e.key==="ArrowUp")Y();else if(e.key==="ArrowDown")G();else if(e.key==="Enter"){const{index:t}=i;i.isQuery?(l("updateQuery",d.value[t]),e.preventDefault()):(r.push(c.value[t].link),Q())}}}}),B([v,p],()=>{var e;(e=document.querySelector(".search-pro-result-list-item.active .search-pro-result-item.active"))==null||e.scrollIntoView(!1)},{flush:"post"}),()=>a("div",{class:["search-pro-result-wrapper",{empty:s.queries.length?!D.value:!j.value}],id:"search-pro-results"},s.queries.length?h.value?a(oe,{hint:u.value.searching}):D.value?a("ul",{class:"search-pro-result-list"},m.value.map(({title:e,contents:t},o)=>{const q=v.value===o;return a("li",{class:["search-pro-result-list-item",{active:q}]},[a("div",{class:"search-pro-result-title"},e||u.value.defaultTitle),t.map((n,ee)=>{const M=q&&p.value===ee;return a(O,{to:F(n),class:["search-pro-result-item",{active:M,"aria-selected":M}],onClick:()=>{y(s.queries.join(" ")),R(n),Q()}},()=>[n.type==="text"?null:a(n.type==="title"?ne:n.type==="heading"?ce:ve,{class:"search-pro-result-type"}),a("div",{class:"search-pro-result-content"},[n.type==="text"&&n.header?a("div",{class:"content-header"},n.header):null,a("div",W(n))])])})])})):u.value.emptyResult:A?j.value?[X(),Z()]:u.value.emptyHistory:u.value.emptyResult)}});export{Ae as default};
