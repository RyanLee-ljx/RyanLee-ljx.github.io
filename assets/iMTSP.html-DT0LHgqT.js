import{_ as i}from"./plugin-vue_export-helper-DlAUqK2U.js";import{r as a,o as n,c as o,a as e,b as r,d as l,e as p}from"./app-5Pl4Vcyu.js";const s={},m=e("h1",{id:"imtsp-solving-min-max-multiple-traveling-salesman-problem-with-imperative-learning",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#imtsp-solving-min-max-multiple-traveling-salesman-problem-with-imperative-learning"},[e("span",null,"iMTSP: Solving Min-Max Multiple Traveling Salesman Problem with Imperative Learning")])],-1),g={href:"https://arxiv.org/abs/2405.00285",target:"_blank",rel:"noopener noreferrer"},c=p('<p>This paper presents a network-based approach to solving the Min-Max Multiple Traveling Salesman Problem (MTSP) by integrating a deep learning model with a traditional TSP solver. The MTSP problem is formulated as a bilevel optimization problem:</p><ul><li><p>Upper level: Optimizes the assignment of cities to agents using an allocation network. This network leverages a Compositional Message Passing Neural Network (CMPNN) to encode city topological relationships and an attention mechanism to determine which agent should visit which cities.</p></li><li><p>Lower level: Uses a traditional TSP solver to compute the optimal visiting order of cities for each agent, based on the assignment provided by the upper level. The objective is to minimize the longest tour length among all agents, which is non-differentiable and leads to high variance in gradient estimates, making optimization difficult.</p></li></ul><p>To address this:</p><ul><li><p>The log-derivative trick is applied to estimate the gradients for the non-differentiable allocation process.</p></li><li><p>A surrogate network is introduced to predict the maximum tour length based on the city assignments. This acts as a control variate, reducing the variance in gradient estimates and stabilizing the training process.</p></li></ul><p>The final gradient is a combination of:</p><ol><li><p>The log-derivative-based gradient, adjusted by the difference between the surrogate network’s prediction and the actual maximum tour length.</p></li><li><p>The gradient of the surrogate network, which helps improve its prediction accuracy.</p></li></ol><figure><img src="https://github.com/RyanLee-ljx/RyanLee-ljx.github.io/blob/image/paper/imtsp/ori.png?raw=true" alt="the original loss function of allocation network" tabindex="0" loading="lazy"><figcaption>the original loss function of allocation network</figcaption></figure><figure><img src="https://github.com/RyanLee-ljx/RyanLee-ljx.github.io/blob/image/paper/imtsp/new.png?raw=true" alt="the new loss function of allocation network" tabindex="0" loading="lazy"><figcaption>the new loss function of allocation network</figcaption></figure><p>Experimental results demonstrate that the proposed approach significantly improves convergence speed, solution quality (shorter tours), and scalability to larger problem instances.</p>',9);function h(d,u){const t=a("ExternalLinkIcon");return n(),o("div",null,[m,e("p",null,[e("a",g,[r("论文原址"),l(t)])]),c])}const T=i(s,[["render",h],["__file","iMTSP.html.vue"]]),f=JSON.parse(`{"path":"/path/paper/iMTSP.html","title":"iMTSP: Solving Min-Max Multiple Traveling  Salesman Problem with Imperative Learning","lang":"zh-CN","frontmatter":{"icon":"lunwen","ReadingTime":true,"date":"2024-10-06T00:00:00.000Z","Word":true,"PageView":true,"category":"PR","description":"iMTSP: Solving Min-Max Multiple Traveling Salesman Problem with Imperative Learning 论文原址 This paper presents a network-based approach to solving the Min-Max Multiple Traveling S...","head":[["meta",{"property":"og:url","content":"https://ryanlee-ljx.github.io/path/paper/iMTSP.html"}],["meta",{"property":"og:site_name","content":"RyanLee's blog"}],["meta",{"property":"og:title","content":"iMTSP: Solving Min-Max Multiple Traveling  Salesman Problem with Imperative Learning"}],["meta",{"property":"og:description","content":"iMTSP: Solving Min-Max Multiple Traveling Salesman Problem with Imperative Learning 论文原址 This paper presents a network-based approach to solving the Min-Max Multiple Traveling S..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://github.com/RyanLee-ljx/RyanLee-ljx.github.io/blob/image/paper/imtsp/ori.png?raw=true"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-10-06T04:20:00.000Z"}],["meta",{"property":"article:author","content":"RyanLee_ljx"}],["meta",{"property":"article:published_time","content":"2024-10-06T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-10-06T04:20:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"iMTSP: Solving Min-Max Multiple Traveling  Salesman Problem with Imperative Learning\\",\\"image\\":[\\"https://github.com/RyanLee-ljx/RyanLee-ljx.github.io/blob/image/paper/imtsp/ori.png?raw=true\\",\\"https://github.com/RyanLee-ljx/RyanLee-ljx.github.io/blob/image/paper/imtsp/new.png?raw=true\\"],\\"datePublished\\":\\"2024-10-06T00:00:00.000Z\\",\\"dateModified\\":\\"2024-10-06T04:20:00.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"RyanLee_ljx\\",\\"email\\":\\"2284771024@qq.com\\"}]}"]]},"headers":[],"git":{"createdTime":1728188126000,"updatedTime":1728188400000,"contributors":[{"name":"Flame","email":"2284771024@qq.com","commits":2}]},"readingTime":{"minutes":1.01,"words":304},"filePathRelative":"path/paper/iMTSP.md","localizedDate":"2024年10月6日","excerpt":"\\n<p><a href=\\"https://arxiv.org/abs/2405.00285\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">论文原址</a></p>\\n<p>This paper presents a network-based approach to solving the Min-Max Multiple Traveling Salesman Problem (MTSP) by integrating a deep learning model with a traditional TSP solver. The MTSP problem is formulated as a bilevel optimization problem:</p>","autoDesc":true}`);export{T as comp,f as data};