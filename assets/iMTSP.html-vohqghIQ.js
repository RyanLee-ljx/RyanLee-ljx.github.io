import{_ as i}from"./plugin-vue_export-helper-DlAUqK2U.js";import{r as n,o,c as l,a as e,b as t,d as r,e as s}from"./app-DuZzy0xh.js";const p={},m=e("h1",{id:"imtsp-solving-min-max-multiple-traveling-salesman-problem-with-imperative-learning",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#imtsp-solving-min-max-multiple-traveling-salesman-problem-with-imperative-learning"},[e("span",null,"iMTSP: Solving Min-Max Multiple Traveling Salesman Problem with Imperative Learning")])],-1),c={href:"https://arxiv.org/abs/2405.00285",target:"_blank",rel:"noopener noreferrer"},h=s("<p>This paper presents a network-based approach to solving the Min-Max Multiple Traveling Salesman Problem (MTSP) by integrating a deep learning model with a traditional TSP solver. The MTSP problem is formulated as a bilevel optimization problem:</p><ul><li><p>Upper level: Optimizes the assignment of cities to agents using an allocation network. This network leverages a Compositional Message Passing Neural Network (CMPNN) to encode city topological relationships and an attention mechanism to determine which agent should visit which cities.</p></li><li><p>Lower level: Uses a traditional TSP solver to compute the optimal visiting order of cities for each agent, based on the assignment provided by the upper level.</p></li></ul><p>The objective is to minimize the longest tour length among all agents, which is non-differentiable and leads to high variance in gradient estimates, making optimization difficult.</p><p>To address this:</p><ul><li><p>The log-derivative trick is applied to estimate the gradients for the non-differentiable allocation process.</p></li><li><p>A surrogate network is introduced to predict the maximum tour length based on the city assignments. This acts as a control variate, reducing the variance in gradient estimates and stabilizing the training process.</p></li></ul>",5),g=e("p",null,[t("The final gradien of the parameter "),e("span",{class:"katex"},[e("span",{class:"katex-mathml"},[e("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[e("semantics",null,[e("mrow",null,[e("mi",null,"θ")]),e("annotation",{encoding:"application/x-tex"},"\\theta")])])]),e("span",{class:"katex-html","aria-hidden":"true"},[e("span",{class:"base"},[e("span",{class:"strut",style:{height:"0.6944em"}}),e("span",{class:"mord mathnormal",style:{"margin-right":"0.02778em"}},"θ")])])]),t(" in allocation network is a combination of:")],-1),d=e("ol",null,[e("li",null,[e("p",null,"The log-derivative-based gradient, adjusted by the difference between the surrogate network’s prediction and the actual maximum tour length.")]),e("li",null,[e("p",null,"The gradient of the surrogate network, which helps improve its prediction accuracy.")])],-1),u=e("figure",null,[e("img",{src:"https://github.com/RyanLee-ljx/RyanLee-ljx.github.io/blob/image/paper/imtsp/ori.png?raw=true",alt:"the original loss function of allocation network",tabindex:"0",loading:"lazy"}),e("figcaption",null,"the original loss function of allocation network")],-1),b=e("figure",null,[e("img",{src:"https://github.com/RyanLee-ljx/RyanLee-ljx.github.io/blob/image/paper/imtsp/new.png?raw=true",alt:"the new loss function of allocation network",tabindex:"0",loading:"lazy"}),e("figcaption",null,"the new loss function of allocation network")],-1),v=e("p",null,"Experimental results demonstrate that the proposed approach significantly improves convergence speed, solution quality (shorter tours), and scalability to larger problem instances.",-1);function T(M,w){const a=n("ExternalLinkIcon");return o(),l("div",null,[m,e("p",null,[e("a",c,[t("论文原址"),r(a)])]),h,g,d,u,b,v])}const y=i(p,[["render",T],["__file","iMTSP.html.vue"]]),_=JSON.parse(`{"path":"/path/paper/iMTSP.html","title":"iMTSP: Solving Min-Max Multiple Traveling  Salesman Problem with Imperative Learning","lang":"zh-CN","frontmatter":{"icon":"lunwen","ReadingTime":true,"date":"2024-10-06T00:00:00.000Z","Word":true,"PageView":true,"category":"PR","description":"iMTSP: Solving Min-Max Multiple Traveling Salesman Problem with Imperative Learning 论文原址 This paper presents a network-based approach to solving the Min-Max Multiple Traveling S...","head":[["meta",{"property":"og:url","content":"https://ryanlee-ljx.github.io/path/paper/iMTSP.html"}],["meta",{"property":"og:site_name","content":"RyanLee's blog"}],["meta",{"property":"og:title","content":"iMTSP: Solving Min-Max Multiple Traveling  Salesman Problem with Imperative Learning"}],["meta",{"property":"og:description","content":"iMTSP: Solving Min-Max Multiple Traveling Salesman Problem with Imperative Learning 论文原址 This paper presents a network-based approach to solving the Min-Max Multiple Traveling S..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://github.com/RyanLee-ljx/RyanLee-ljx.github.io/blob/image/paper/imtsp/ori.png?raw=true"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-10-10T09:02:36.000Z"}],["meta",{"property":"article:author","content":"RyanLee_ljx"}],["meta",{"property":"article:published_time","content":"2024-10-06T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-10-10T09:02:36.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"iMTSP: Solving Min-Max Multiple Traveling  Salesman Problem with Imperative Learning\\",\\"image\\":[\\"https://github.com/RyanLee-ljx/RyanLee-ljx.github.io/blob/image/paper/imtsp/ori.png?raw=true\\",\\"https://github.com/RyanLee-ljx/RyanLee-ljx.github.io/blob/image/paper/imtsp/new.png?raw=true\\"],\\"datePublished\\":\\"2024-10-06T00:00:00.000Z\\",\\"dateModified\\":\\"2024-10-10T09:02:36.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"RyanLee_ljx\\",\\"email\\":\\"2284771024@qq.com\\"}]}"]]},"headers":[],"git":{"createdTime":1728188126000,"updatedTime":1728550956000,"contributors":[{"name":"Flame","email":"2284771024@qq.com","commits":3}]},"readingTime":{"minutes":1.04,"words":311},"filePathRelative":"path/paper/iMTSP.md","localizedDate":"2024年10月6日","excerpt":"\\n<p><a href=\\"https://arxiv.org/abs/2405.00285\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">论文原址</a></p>\\n<p>This paper presents a network-based approach to solving the Min-Max Multiple Traveling Salesman Problem (MTSP) by integrating a deep learning model with a traditional TSP solver. The MTSP problem is formulated as a bilevel optimization problem:</p>","autoDesc":true}`);export{y as comp,_ as data};