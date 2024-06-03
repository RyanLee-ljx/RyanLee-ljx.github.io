import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{r as s,o as r,c as o,a as e,b as t,d as i,e as a}from"./app-BMBY-vxu.js";const c={},m=a('<h1 id="改进ns模型" tabindex="-1"><a class="header-anchor" href="#改进ns模型"><span>改进NS模型</span></a></h1><p>本节介绍NS模型基本内容、改进NS模型以及对应代码的实现。</p><h2 id="基本概念" tabindex="-1"><a class="header-anchor" href="#基本概念"><span>基本概念</span></a></h2><h3 id="nagel–schreckenberg-model-ns模型" tabindex="-1"><a class="header-anchor" href="#nagel–schreckenberg-model-ns模型"><span>Nagel–Schreckenberg model NS模型</span></a></h3>',4),g=e("strong",null,"Nagel–Schreckenberg model",-1),p={href:"https://en.wikipedia.org/wiki/Nagel%E2%80%93Schreckenberg_model#cite_note-sn-1",target:"_blank",rel:"noopener noreferrer"},h=a('<p><em>Nagel–Schreckenberg model, short for NS model, first develped by German physicists Kai Nagel and Michael Schreckenberg, is a theoretical Cellular Automata-based model for traffic simulation.</em></p><h3 id="rule-184" tabindex="-1"><a class="header-anchor" href="#rule-184"><span>Rule 184</span></a></h3><p>补充一下基于CA交通仿真中最常见的规则，即 Rule 184，即对于一条道路上连续的三个cell，他们的状态有以下8种（用0代表空，用1代表有车占有）,如下图所示：</p><figure><img src="https://github.com/RyanLee-ljx/RyanLee-ljx.github.io/blob/image/NS/184.png?raw=true" alt="Rule 184" tabindex="0" loading="lazy"><figcaption>Rule 184</figcaption></figure><h3 id="phantom-traffic-jam-幽灵拥堵" tabindex="-1"><a class="header-anchor" href="#phantom-traffic-jam-幽灵拥堵"><span>Phantom traffic jam 幽灵拥堵</span></a></h3><ul><li><p>定义：莫名发生的交通拥堵 traffic jam without clear reasons</p></li><li><p>原因：在拥堵（heavy）交通流中，微小的交通扰动（small disturbances），如司机过度刹车或者与其他车里的太近，都会被放大形成(be amplified into)内生性的交通拥堵。 Small disturbances, such as overreations of braking or getting too close to another vehicle, in heavy traffic can be amplified into a self-sustained traffic jam.</p></li><li><p>结果：形成stop-and-go wave</p></li></ul><div class="hint-container info"><p class="hint-container-title">Stop-And-Go Wave</p><p>字面意是停走波</p><p>形成原因：</p><ul><li>微观（从driver角度）：vehicle slowly move → decelerate → stop → accelerate →</li><li>宏观，如下图Time-Space Diagram所示：</li></ul><figure><img src="https://github.com/RyanLee-ljx/RyanLee-ljx.github.io/blob/image/NS/stg.png?raw=true" alt="Time-Space Diagram 时空图" tabindex="0" loading="lazy"><figcaption>Time-Space Diagram 时空图</figcaption></figure><p>由上图可以看到stop-and-go wave沿车流末端传播的速度，即<strong>wave speed</strong>以及波次间隔时间<strong>wave period</strong>。</p><p>这样的stop-and-go wave会造成以下危害：</p><ul><li>更费油与更多排放 more fuels and emmisions.</li><li>更加危险 more dangerous.</li></ul></div><h3 id="基本图-fundamental-diagram" tabindex="-1"><a class="header-anchor" href="#基本图-fundamental-diagram"><span>基本图 Fundamental Diagram</span></a></h3><figure><img src="https://github.com/RyanLee-ljx/RyanLee-ljx.github.io/blob/image/NS/fd.png?raw=true" alt="Fundamental Diagram 基本图" tabindex="0" loading="lazy"><figcaption>Fundamental Diagram 基本图</figcaption></figure><ul><li>Capacity/Maximum Flow 极大流率：qk曲线极值</li><li>Free Flow Speed 畅行速度：k=0对应的速度</li><li>Critical Density 临界密度：极大流率对应的密度</li><li>Critical Speed 临界速度：极大流率对应的速度</li><li>Jam Density 堵塞密度：v=0时的密度</li></ul><h2 id="model-description-模型描述" tabindex="-1"><a class="header-anchor" href="#model-description-模型描述"><span>Model Description 模型描述</span></a></h2><h3 id="model-information-模型说明" tabindex="-1"><a class="header-anchor" href="#model-information-模型说明"><span>Model Information 模型说明</span></a></h3><ul><li><p>空间时间上均离散化。 Discrete in space and time</p></li><li><p>所有车辆同步更新。 Each vehicle is updated parallel</p></li><li><p>每个元胞长7.5m（包括了车长+距离前车的安全距离）。 Lane is divided into cells of length 7.5 m, which includes the vehicle length and the safe distance to the preceeding/leading vehicle.</p></li><li><p>每个元胞为空或仅被一辆车占据。 Each cell can either be empty or occupied by only one vehicle.</p></li><li><p>每个车辆拥有坐标、速度属性，车辆有最大速度限制。 Each vehicle is characterized by its velocity and coordinates. The velocity has a limit.</p></li></ul><h3 id="model-step-更新规则" tabindex="-1"><a class="header-anchor" href="#model-step-更新规则"><span>Model Step 更新规则</span></a></h3><ul><li>**Step 1：加速 Acceleration：**对于未到达最大速度的车辆，以一个单位加速。 For vehicle not reaching speed limit, it accelerates with 1 unit.</li></ul>',15),d=e("div",{style:{"text-align":"center"}},[e("p",{class:"katex-block"},[e("span",{class:"katex-display"},[e("span",{class:"katex"},[e("span",{class:"katex-mathml"},[e("math",{xmlns:"http://www.w3.org/1998/Math/MathML",display:"block"},[e("semantics",null,[e("mrow",null,[e("mi",null,"v"),e("mo",{stretchy:"false"},"("),e("mi",null,"i"),e("mo",{stretchy:"false"},")"),e("mo",null,"→"),e("mi",null,"min"),e("mo",null,"⁡"),e("mrow",null,[e("mi",null,"v"),e("mo",{stretchy:"false"},"("),e("mi",null,"i"),e("mo",{stretchy:"false"},")"),e("mo",null,"+"),e("mn",null,"1"),e("mo",{separator:"true"},","),e("msub",null,[e("mi",null,"V"),e("mtext",null,"max")])])]),e("annotation",{encoding:"application/x-tex"}," v(i) \\rightarrow \\min{v(i) + 1, V_{\\text{max}}} ")])])]),e("span",{class:"katex-html","aria-hidden":"true"},[e("span",{class:"base"},[e("span",{class:"strut",style:{height:"1em","vertical-align":"-0.25em"}}),e("span",{class:"mord mathnormal",style:{"margin-right":"0.03588em"}},"v"),e("span",{class:"mopen"},"("),e("span",{class:"mord mathnormal"},"i"),e("span",{class:"mclose"},")"),e("span",{class:"mspace",style:{"margin-right":"0.2778em"}}),e("span",{class:"mrel"},"→"),e("span",{class:"mspace",style:{"margin-right":"0.2778em"}})]),e("span",{class:"base"},[e("span",{class:"strut",style:{height:"1em","vertical-align":"-0.25em"}}),e("span",{class:"mop"},"min"),e("span",{class:"mspace",style:{"margin-right":"0.1667em"}}),e("span",{class:"mord"},[e("span",{class:"mord mathnormal",style:{"margin-right":"0.03588em"}},"v"),e("span",{class:"mopen"},"("),e("span",{class:"mord mathnormal"},"i"),e("span",{class:"mclose"},")"),e("span",{class:"mspace",style:{"margin-right":"0.2222em"}}),e("span",{class:"mbin"},"+"),e("span",{class:"mspace",style:{"margin-right":"0.2222em"}}),e("span",{class:"mord"},"1"),e("span",{class:"mpunct"},","),e("span",{class:"mspace",style:{"margin-right":"0.1667em"}}),e("span",{class:"mord"},[e("span",{class:"mord mathnormal",style:{"margin-right":"0.22222em"}},"V"),e("span",{class:"msupsub"},[e("span",{class:"vlist-t vlist-t2"},[e("span",{class:"vlist-r"},[e("span",{class:"vlist",style:{height:"0.1514em"}},[e("span",{style:{top:"-2.55em","margin-left":"-0.2222em","margin-right":"0.05em"}},[e("span",{class:"pstrut",style:{height:"2.7em"}}),e("span",{class:"sizing reset-size6 size3 mtight"},[e("span",{class:"mord mtight"},[e("span",{class:"mord text mtight"},[e("span",{class:"mord mtight"},"max")])])])])]),e("span",{class:"vlist-s"},"​")]),e("span",{class:"vlist-r"},[e("span",{class:"vlist",style:{height:"0.15em"}},[e("span")])])])])])])])])])])]),e("div",{style:{"text-align":"left"}},[e("p",null,"这反应了司机希望开得越快越好 reflect the desire of drivers to drive as fast as possible.")])],-1),u=e("ul",null,[e("li",null,[t("**Step 2: 减速 Safe Distance Judgment：**当汽车当前速度大于与前车的距离（前方的空元胞数），则汽车减速为安全距离，否则维持原速。"),e("br"),t(" If vehicle speed is larger than the number of empty cells in front of it, it velocity reduces to that empty cell amount. Otherwise, it keeps its speed.")])],-1),b=e("div",{style:{"text-align":"center"}},[e("p",{class:"katex-block"},[e("span",{class:"katex-display"},[e("span",{class:"katex"},[e("span",{class:"katex-mathml"},[e("math",{xmlns:"http://www.w3.org/1998/Math/MathML",display:"block"},[e("semantics",null,[e("mrow",null,[e("mi",null,"v"),e("mo",{stretchy:"false"},"("),e("mi",null,"i"),e("mo",{stretchy:"false"},")"),e("mo",null,"→"),e("mi",null,"min"),e("mo",null,"⁡"),e("mrow",null,[e("mi",null,"v"),e("mo",{stretchy:"false"},"("),e("mi",null,"i"),e("mo",{stretchy:"false"},")"),e("mo",{separator:"true"},","),e("mi",null,"d"),e("mo",{stretchy:"false"},"("),e("mi",null,"i"),e("mo",{stretchy:"false"},")")])]),e("annotation",{encoding:"application/x-tex"}," v(i) \\rightarrow \\min{v(i) , d(i)} ")])])]),e("span",{class:"katex-html","aria-hidden":"true"},[e("span",{class:"base"},[e("span",{class:"strut",style:{height:"1em","vertical-align":"-0.25em"}}),e("span",{class:"mord mathnormal",style:{"margin-right":"0.03588em"}},"v"),e("span",{class:"mopen"},"("),e("span",{class:"mord mathnormal"},"i"),e("span",{class:"mclose"},")"),e("span",{class:"mspace",style:{"margin-right":"0.2778em"}}),e("span",{class:"mrel"},"→"),e("span",{class:"mspace",style:{"margin-right":"0.2778em"}})]),e("span",{class:"base"},[e("span",{class:"strut",style:{height:"1em","vertical-align":"-0.25em"}}),e("span",{class:"mop"},"min"),e("span",{class:"mspace",style:{"margin-right":"0.1667em"}}),e("span",{class:"mord"},[e("span",{class:"mord mathnormal",style:{"margin-right":"0.03588em"}},"v"),e("span",{class:"mopen"},"("),e("span",{class:"mord mathnormal"},"i"),e("span",{class:"mclose"},")"),e("span",{class:"mpunct"},","),e("span",{class:"mspace",style:{"margin-right":"0.1667em"}}),e("span",{class:"mord mathnormal"},"d"),e("span",{class:"mopen"},"("),e("span",{class:"mord mathnormal"},"i"),e("span",{class:"mclose"},")")])])])])])]),e("div",{style:{"text-align":"left"}},[e("p",null,"It encodes the interaction between the vehicle. In this simple model, interactions only occur to avoid collision.")])],-1),y=a(`<ul><li>**Step 3：随机慢化 Randomization：**车辆以p的概率随机减速一个单位，p称为随机慢化概率。 The speed of vehicle reduces by one unit with slowdown probability p.</li></ul><div style="text-align:center;"><p class="katex-block"><span class="katex-error" title="ParseError: KaTeX parse error: Expected &#39;EOF&#39;, got &#39;}&#39; at position 36: …ax{v(i) - 1, 0}}̲ 
" style="color:#cc0000;"> v(i) \\rightarrow \\max{v(i) - 1, 0}} </span></p><div style="text-align:left;"><p>反映<strong>驾驶员的不完美驾驶行为（imperfect behavior of drivers）</strong>，比如在步骤2减速时刹车踩的过大。在现实场景，驾驶员不可能总是按照一定速度(constant speed)行驶，总会有一定的波动(fluctuations)。当车流量足够大，驾驶员的这一行为会引起交通系统的一系列反应，最终形成拥堵现象。这也是反映了拥堵总是在没有任何外部原因（external reasons ，如事故）就会发生的，因此称为幽灵拥堵（phantom jam）。</p><p>Randomization reflects the imperfect behavior of drivers like the overreations of braking in Step 2. In real-world scenario, drivers cannot always drive at a constant speed. There always has fluctuations of the velocity.</p></div></div><ul><li>**Step 4: 位置更新 Driving：**每个车辆前进当前速度的格数。 Every vehicle forward by v(i) cells.</li></ul><h2 id="改进ns模型-ns-model-for-inhomogenous-traffic-flow-in-a-single-lane" tabindex="-1"><a class="header-anchor" href="#改进ns模型-ns-model-for-inhomogenous-traffic-flow-in-a-single-lane"><span>改进NS模型 NS Model for Inhomogenous Traffic Flow in a Single Lane</span></a></h2><h3 id="改进点" tabindex="-1"><a class="header-anchor" href="#改进点"><span>改进点：</span></a></h3>`,5),f=e("ol",null,[e("li",null,[t("车辆以最大加速度 "),e("span",{class:"katex"},[e("span",{class:"katex-mathml"},[e("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[e("semantics",null,[e("mrow",null,[e("msub",null,[e("mi",null,"a"),e("mrow",null,[e("mi",null,"m"),e("mi",null,"a"),e("mi",null,"x")])])]),e("annotation",{encoding:"application/x-tex"},"a_{max}")])])]),e("span",{class:"katex-html","aria-hidden":"true"},[e("span",{class:"base"},[e("span",{class:"strut",style:{height:"0.5806em","vertical-align":"-0.15em"}}),e("span",{class:"mord"},[e("span",{class:"mord mathnormal"},"a"),e("span",{class:"msupsub"},[e("span",{class:"vlist-t vlist-t2"},[e("span",{class:"vlist-r"},[e("span",{class:"vlist",style:{height:"0.1514em"}},[e("span",{style:{top:"-2.55em","margin-left":"0em","margin-right":"0.05em"}},[e("span",{class:"pstrut",style:{height:"2.7em"}}),e("span",{class:"sizing reset-size6 size3 mtight"},[e("span",{class:"mord mtight"},[e("span",{class:"mord mathnormal mtight"},"ma"),e("span",{class:"mord mathnormal mtight"},"x")])])])]),e("span",{class:"vlist-s"},"​")]),e("span",{class:"vlist-r"},[e("span",{class:"vlist",style:{height:"0.15em"}},[e("span")])])])])])])])]),t(" 加减速而不是以1 Vehicle accelerates/decelerates with maximum acceleration not 1.")]),e("li",null,"引入慢启动系数s（反应静止车辆启动较慢） Introduce the Slow Start probability(short for s) to reflect the difficuty of stationary vehicles to start up."),e("li",null,"考虑异质(inhomogeneous)车流（反映在车长，最大速度，最大加速度） Consider the inhomogeneous flow like the vehicle length, maximum velocity and maximum acceleration.")],-1),x=a('<h3 id="模型信息" tabindex="-1"><a class="header-anchor" href="#模型信息"><span>模型信息</span></a></h3><figure><img src="https://github.com/RyanLee-ljx/RyanLee-ljx.github.io/blob/image/NS/model.png?raw=true" alt="模型信息" tabindex="0" loading="lazy"><figcaption>模型信息</figcaption></figure><h3 id="结果" tabindex="-1"><a class="header-anchor" href="#结果"><span>结果</span></a></h3><p>通过改变货车占比r(propotion of trucks)、随机慢化概率p以及慢启动系数s，分别做FD图以及时空位置图，分别分析其对于交通系统的影响影响。</p><p>如当s = 0.1, p = 0.3 条件下，分别做r=0,0.1,0.2,0.3的时空位置图(Time-Space Diagram)以及基本图（Fundemantal Diagram, FD）,红线为货车，黑线为小汽车。</p><figure><img src="https://github.com/RyanLee-ljx/RyanLee-ljx.github.io/blob/image/NS/r==0.png?raw=true" alt="r=0" tabindex="0" loading="lazy"><figcaption>r=0</figcaption></figure><figure><img src="https://github.com/RyanLee-ljx/RyanLee-ljx.github.io/blob/image/NS/r==0.1.png?raw=true" alt="r=0.1" tabindex="0" loading="lazy"><figcaption>r=0.1</figcaption></figure><figure><img src="https://github.com/RyanLee-ljx/RyanLee-ljx.github.io/blob/image/NS/r==0.2.png?raw=true" alt="r=0.2" tabindex="0" loading="lazy"><figcaption>r=0.2</figcaption></figure><figure><img src="https://github.com/RyanLee-ljx/RyanLee-ljx.github.io/blob/image/NS/r==0.3.png?raw=true" alt="r=0.3" tabindex="0" loading="lazy"><figcaption>r=0.3</figcaption></figure><figure><img src="https://github.com/RyanLee-ljx/RyanLee-ljx.github.io/blob/image/NS/r=0.png?raw=true" alt="r=0 含速度" tabindex="0" loading="lazy"><figcaption>r=0 含速度</figcaption></figure><figure><img src="https://github.com/RyanLee-ljx/RyanLee-ljx.github.io/blob/image/NS/r=0.1.png?raw=true" alt="r=0.1 含速度" tabindex="0" loading="lazy"><figcaption>r=0.1 含速度</figcaption></figure><figure><img src="https://github.com/RyanLee-ljx/RyanLee-ljx.github.io/blob/image/NS/r=0.2.png?raw=true" alt="r=0.2 含速度" tabindex="0" loading="lazy"><figcaption>r=0.2 含速度</figcaption></figure><figure><img src="https://github.com/RyanLee-ljx/RyanLee-ljx.github.io/blob/image/NS/r=0.3.png?raw=true" alt="r=0.3 含速度" tabindex="0" loading="lazy"><figcaption>r=0.3 含速度</figcaption></figure><p>可以看到随着货车比例的增加，wave speed逐渐降低，wave period也逐渐变小，反应交通系统越来越拥堵。</p><p>做FD图如下：</p><figure><img src="https://github.com/RyanLee-ljx/RyanLee-ljx.github.io/blob/image/NS/货车0，qkv.png?raw=true" alt="r=0" tabindex="0" loading="lazy"><figcaption>r=0</figcaption></figure><figure><img src="https://github.com/RyanLee-ljx/RyanLee-ljx.github.io/blob/image/NS/货车0.1,qkv.png?raw=true" alt="r=0.1" tabindex="0" loading="lazy"><figcaption>r=0.1</figcaption></figure><figure><img src="https://github.com/RyanLee-ljx/RyanLee-ljx.github.io/blob/image/NS/货车0.2，qkv.png?raw=true" alt="r=0.2" tabindex="0" loading="lazy"><figcaption>r=0.2</figcaption></figure><figure><img src="https://github.com/RyanLee-ljx/RyanLee-ljx.github.io/blob/image/NS/货车0.3，qkv.png?raw=true" alt="r=0.3" tabindex="0" loading="lazy"><figcaption>r=0.3</figcaption></figure><table><thead><tr><th style="text-align:center;">r</th><th style="text-align:center;">极大流率Qm</th><th style="text-align:center;">临界密度Kc</th><th style="text-align:center;">临界速度Vc</th><th style="text-align:center;">堵塞密度Kj</th><th style="text-align:center;">畅行速度Vf</th></tr></thead><tbody><tr><td style="text-align:center;">0</td><td style="text-align:center;">2326.9176</td><td style="text-align:center;">19</td><td style="text-align:center;">122.4693</td><td style="text-align:center;">140</td><td style="text-align:center;">126.7668</td></tr><tr><td style="text-align:center;">0.01</td><td style="text-align:center;">1782.0972</td><td style="text-align:center;">40</td><td style="text-align:center;">44.5524</td><td style="text-align:center;">138</td><td style="text-align:center;">126.8262</td></tr><tr><td style="text-align:center;">0.03</td><td style="text-align:center;">1702.6758</td><td style="text-align:center;">40</td><td style="text-align:center;">42.5669</td><td style="text-align:center;">131</td><td style="text-align:center;">126.9054</td></tr><tr><td style="text-align:center;">0.05</td><td style="text-align:center;">1647.4248</td><td style="text-align:center;">39</td><td style="text-align:center;">42.2417</td><td style="text-align:center;">127</td><td style="text-align:center;">46.3035</td></tr><tr><td style="text-align:center;">0.1</td><td style="text-align:center;">1534.3903</td><td style="text-align:center;">37</td><td style="text-align:center;">43.0448</td><td style="text-align:center;">115</td><td style="text-align:center;">46.4292</td></tr><tr><td style="text-align:center;">0.2</td><td style="text-align:center;">1377.4356</td><td style="text-align:center;">34</td><td style="text-align:center;">40.5128</td><td style="text-align:center;">99</td><td style="text-align:center;">46.0799</td></tr><tr><td style="text-align:center;">0.3</td><td style="text-align:center;">1241.7444</td><td style="text-align:center;">32</td><td style="text-align:center;">38.8045</td><td style="text-align:center;">86</td><td style="text-align:center;">42.9739</td></tr></tbody></table><p>随着货车比例r的增加，Qm逐渐减小，Kc先增加后减小，Vc先急剧减小后基本不变，Kj逐渐减小，Vf先不变后急剧减小。</p><p>通过改变s与p的大小，也可以同理做出上述图表，这里不一一展示。</p><h3 id="代码" tabindex="-1"><a class="header-anchor" href="#代码"><span>代码</span></a></h3>',23),v={href:"https://github.com/RyanLee-ljx/CA/tree/main/NS",target:"_blank",rel:"noopener noreferrer"},S=e("h3",{id:"进一步的改进点",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#进一步的改进点"},[e("span",null,"进一步的改进点")])],-1),w=e("ul",null,[e("li",null,"多车道，考虑换道。"),e("li",null,"Velocity-Dependent-Randomization（VDR）：NS模型中p是固定不变的，VDR中p是v的函数（与加入随机慢化概率s效果类似）。")],-1);function N(j,k){const l=s("ExternalLinkIcon");return r(),o("div",null,[m,e("p",null,[g,t("，简称NS model，最初由德国物理学家"),e("a",p,[t("Kai Nagel and Michael Schreckenberg"),i(l)]),t(",是一种基于CA模型的用于交通仿真的理论模型。")]),h,d,u,b,y,f,x,e("p",null,[e("a",v,[t("完整代码"),i(l)]),t("，内含动画演示。")]),S,w])}const _=n(c,[["render",N],["__file","ns.html.vue"]]),z=JSON.parse(`{"path":"/traffic/ns.html","title":"改进NS模型","lang":"zh-CN","frontmatter":{"icon":"chedao","date":"2024-06-03T00:00:00.000Z","category":"交通","isOriginal":true,"star":true,"tag":"traffic","description":"改进NS模型 本节介绍NS模型基本内容、改进NS模型以及对应代码的实现。 基本概念 Nagel–Schreckenberg model NS模型 Nagel–Schreckenberg model，简称NS model，最初由德国物理学家Kai Nagel and Michael Schreckenberg,是一种基于CA模型的用于交通仿真的理论模型。...","head":[["meta",{"property":"og:url","content":"https://ryanlee-ljx.github.io/traffic/ns.html"}],["meta",{"property":"og:site_name","content":"RyanLee's blog"}],["meta",{"property":"og:title","content":"改进NS模型"}],["meta",{"property":"og:description","content":"改进NS模型 本节介绍NS模型基本内容、改进NS模型以及对应代码的实现。 基本概念 Nagel–Schreckenberg model NS模型 Nagel–Schreckenberg model，简称NS model，最初由德国物理学家Kai Nagel and Michael Schreckenberg,是一种基于CA模型的用于交通仿真的理论模型。..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://github.com/RyanLee-ljx/RyanLee-ljx.github.io/blob/image/NS/184.png?raw=true"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-03T17:07:05.000Z"}],["meta",{"property":"article:author","content":"RyanLee_ljx"}],["meta",{"property":"article:tag","content":"traffic"}],["meta",{"property":"article:published_time","content":"2024-06-03T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-03T17:07:05.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"改进NS模型\\",\\"image\\":[\\"https://github.com/RyanLee-ljx/RyanLee-ljx.github.io/blob/image/NS/184.png?raw=true\\",\\"https://github.com/RyanLee-ljx/RyanLee-ljx.github.io/blob/image/NS/stg.png?raw=true\\",\\"https://github.com/RyanLee-ljx/RyanLee-ljx.github.io/blob/image/NS/fd.png?raw=true\\",\\"https://github.com/RyanLee-ljx/RyanLee-ljx.github.io/blob/image/NS/model.png?raw=true\\",\\"https://github.com/RyanLee-ljx/RyanLee-ljx.github.io/blob/image/NS/r==0.png?raw=true\\",\\"https://github.com/RyanLee-ljx/RyanLee-ljx.github.io/blob/image/NS/r==0.1.png?raw=true\\",\\"https://github.com/RyanLee-ljx/RyanLee-ljx.github.io/blob/image/NS/r==0.2.png?raw=true\\",\\"https://github.com/RyanLee-ljx/RyanLee-ljx.github.io/blob/image/NS/r==0.3.png?raw=true\\",\\"https://github.com/RyanLee-ljx/RyanLee-ljx.github.io/blob/image/NS/r=0.png?raw=true\\",\\"https://github.com/RyanLee-ljx/RyanLee-ljx.github.io/blob/image/NS/r=0.1.png?raw=true\\",\\"https://github.com/RyanLee-ljx/RyanLee-ljx.github.io/blob/image/NS/r=0.2.png?raw=true\\",\\"https://github.com/RyanLee-ljx/RyanLee-ljx.github.io/blob/image/NS/r=0.3.png?raw=true\\",\\"https://github.com/RyanLee-ljx/RyanLee-ljx.github.io/blob/image/NS/%E8%B4%A7%E8%BD%A60%EF%BC%8Cqkv.png?raw=true\\",\\"https://github.com/RyanLee-ljx/RyanLee-ljx.github.io/blob/image/NS/%E8%B4%A7%E8%BD%A60.1,qkv.png?raw=true\\",\\"https://github.com/RyanLee-ljx/RyanLee-ljx.github.io/blob/image/NS/%E8%B4%A7%E8%BD%A60.2%EF%BC%8Cqkv.png?raw=true\\",\\"https://github.com/RyanLee-ljx/RyanLee-ljx.github.io/blob/image/NS/%E8%B4%A7%E8%BD%A60.3%EF%BC%8Cqkv.png?raw=true\\"],\\"datePublished\\":\\"2024-06-03T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-03T17:07:05.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"RyanLee_ljx\\",\\"email\\":\\"2284771024@qq.com\\"}]}"]]},"headers":[{"level":2,"title":"基本概念","slug":"基本概念","link":"#基本概念","children":[{"level":3,"title":"Nagel–Schreckenberg model NS模型","slug":"nagel–schreckenberg-model-ns模型","link":"#nagel–schreckenberg-model-ns模型","children":[]},{"level":3,"title":"Rule 184","slug":"rule-184","link":"#rule-184","children":[]},{"level":3,"title":"Phantom traffic jam 幽灵拥堵","slug":"phantom-traffic-jam-幽灵拥堵","link":"#phantom-traffic-jam-幽灵拥堵","children":[]},{"level":3,"title":"基本图 Fundamental Diagram","slug":"基本图-fundamental-diagram","link":"#基本图-fundamental-diagram","children":[]}]},{"level":2,"title":"Model Description 模型描述","slug":"model-description-模型描述","link":"#model-description-模型描述","children":[{"level":3,"title":"Model Information 模型说明","slug":"model-information-模型说明","link":"#model-information-模型说明","children":[]},{"level":3,"title":"Model Step 更新规则","slug":"model-step-更新规则","link":"#model-step-更新规则","children":[]}]},{"level":2,"title":"改进NS模型 NS Model for Inhomogenous Traffic Flow in a Single Lane","slug":"改进ns模型-ns-model-for-inhomogenous-traffic-flow-in-a-single-lane","link":"#改进ns模型-ns-model-for-inhomogenous-traffic-flow-in-a-single-lane","children":[{"level":3,"title":"改进点：","slug":"改进点","link":"#改进点","children":[]},{"level":3,"title":"模型信息","slug":"模型信息","link":"#模型信息","children":[]},{"level":3,"title":"结果","slug":"结果","link":"#结果","children":[]},{"level":3,"title":"代码","slug":"代码","link":"#代码","children":[]},{"level":3,"title":"进一步的改进点","slug":"进一步的改进点","link":"#进一步的改进点","children":[]}]}],"git":{"createdTime":1714048806000,"updatedTime":1717434425000,"contributors":[{"name":"Flame","email":"2284771024@qq.com","commits":2}]},"readingTime":{"minutes":5.84,"words":1751},"filePathRelative":"traffic/ns.md","localizedDate":"2024年6月3日","excerpt":"\\n<p>本节介绍NS模型基本内容、改进NS模型以及对应代码的实现。</p>\\n<h2>基本概念</h2>\\n<h3>Nagel–Schreckenberg model NS模型</h3>\\n<p><strong>Nagel–Schreckenberg model</strong>，简称NS model，最初由德国物理学家<a href=\\"https://en.wikipedia.org/wiki/Nagel%E2%80%93Schreckenberg_model#cite_note-sn-1\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">Kai Nagel and Michael Schreckenberg</a>,是一种基于CA模型的用于交通仿真的理论模型。</p>","autoDesc":true}`);export{_ as comp,z as data};
