import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as t,c as n,e as i}from"./app-Ck1LVpr8.js";const a={},o=i('<h1 id="chapter-1-introduction" tabindex="-1"><a class="header-anchor" href="#chapter-1-introduction"><span>Chapter 1 Introduction</span></a></h1><p>PLANNING ALGORITHMS</p><p>Steven M. LaValle</p><p>University of Illinois</p><p>Copyright Steven M. LaValle 2006</p><p>Available for downloading at [http://planning.cs.uiuc.edu/]</p><p>Published by Cambridge University Press</p><h2 id="_1-1-what-is-planning" tabindex="-1"><a class="header-anchor" href="#_1-1-what-is-planning"><span>1.1 What is planning?</span></a></h2><p>Planning is a branch of algorithms.</p><p>The user of the plan can be referred as robot or decision maker (robot, agent, controller are interchangeable)</p><h2 id="_1-2-basic-ingredients-of-planning" tabindex="-1"><a class="header-anchor" href="#_1-2-basic-ingredients-of-planning"><span>1.2 Basic Ingredients of Planning</span></a></h2><ol><li><strong>State</strong></li></ol><ul><li><p>State can represent the position and orientation of a robot, the locations of tiles in a puzzle, or the position and velocity of a helicopter.</p></li><li><p>The collection of state: <strong>state space</strong>.</p></li><li><p>Can be both discrete (finite, or countably infinite) and continuous (uncountably infinite).</p></li><li><p>Can be explicitly represented or implicitly.</p></li></ul><ol start="2"><li><strong>Time</strong></li></ol><ul><li><p>All planning problems involve a sequence of decisions that must be applied over time.</p></li><li><p>Can be explicitly modeled or implicitly.</p></li></ul><ol start="3"><li><strong>Action</strong></li></ol><ul><li><p>A plan generates actions that manipulate the state.</p></li><li><p>States changes when actions applied (through state-valued function under discrete time or differential equation under continuous time)</p></li></ul><ol start="4"><li><strong>Initial and goal states</strong></li></ol><ul><li>Planning problems involve starting from the initial state, finally arriving at the goal states (a set of)</li></ul><ol start="5"><li><strong>Criterion</strong></li></ol><ul><li>Feasiblity or Optimality</li></ul><ol start="6"><li><strong>Plan</strong></li></ol><ul><li>A plan can specify a sequence of actions to be taken or specify actions as a function of state.</li></ul><div class="hint-container info"><p class="hint-container-title">相关信息</p><p>Once a plan is determined, there are three ways to use it.</p><ol><li><p>Execution: Execute it either in simulation or in a mechanical device (robot) connected to the physical world.</p></li><li><p>Refinement: Refine it into a better plan. The new plan may take more problem aspects into account, or it may simply be more efficient (see at the following picture). Refinement can be executed repeatedly until the final one.</p></li></ol><figure><img src="https://github.com/RyanLee-ljx/RyanLee-ljx.github.io/blob/image/Pla/refinement.png?raw=true" alt="A refinement approach that has been used for decades in robotics" tabindex="0" loading="lazy"><figcaption>A refinement approach that has been used for decades in robotics</figcaption></figure><p>The first plan yields a collision-free path through the building. The second plan transforms the route into one that satisfies differential constraints based on wheel motions (recall Figure 1.11). The third plan considers how to move the robot along the path at various speeds while satisfying momentum considerations. The fourth plan incorporates feedback to ensure that the robot stays as close as possible to the planned path in spite of unpredictable behavior.</p><ol start="3"><li>Hierarchical inclusion: Under hierarchical inclusion, a plan is incorporated as an action in a larger plan. The original plan can be imagined as a subroutine in the larger plan.Hierarchical inclusion can be performed any number of times, resulting in a <em>rooted tree of plans</em>. This leads to a general model of hierarchical planning. Each vertex in the tree is a plan. The root vertex represents the master plan. The children of any vertex are plans that are incorporated as actions in the plan of the vertex. There is no limit to the tree depth or number of children per vertex.</li></ol></div><h2 id="_1-3-organization-of-this-book" tabindex="-1"><a class="header-anchor" href="#_1-3-organization-of-this-book"><span>1.3 Organization of this book</span></a></h2><p>PART 1 Intro: Chapter 1-2</p><p>PART 2 Motion planning: Chapter 3-8</p><p>PART 3 Decision-Theoretic Planning: Chapter 9-12</p><p>PART 4 Planning Under Differential Constraint: Chapter 13-15</p>',29),r=[o];function l(s,p){return t(),n("div",null,r)}const d=e(a,[["render",l],["__file","chapter1.html.vue"]]),g=JSON.parse(`{"path":"/path/chapter1.html","title":"Chapter 1 Introduction","lang":"zh-CN","frontmatter":{"icon":"lujingguihua","ReadingTime":true,"cover":"/newcover3.jpg","date":"2024-09-03T00:00:00.000Z","Word":true,"PageView":true,"category":"PR","description":"Chapter 1 Introduction PLANNING ALGORITHMS Steven M. LaValle University of Illinois Copyright Steven M. LaValle 2006 Available for downloading at [http://planning.cs.uiuc.edu/] ...","head":[["meta",{"property":"og:url","content":"https://ryanlee-ljx.github.io/path/chapter1.html"}],["meta",{"property":"og:site_name","content":"RyanLee's blog"}],["meta",{"property":"og:title","content":"Chapter 1 Introduction"}],["meta",{"property":"og:description","content":"Chapter 1 Introduction PLANNING ALGORITHMS Steven M. LaValle University of Illinois Copyright Steven M. LaValle 2006 Available for downloading at [http://planning.cs.uiuc.edu/] ..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://ryanlee-ljx.github.io/newcover3.jpg"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-09-05T03:32:37.000Z"}],["meta",{"name":"twitter:card","content":"summary_large_image"}],["meta",{"name":"twitter:image:src","content":"https://ryanlee-ljx.github.io/newcover3.jpg"}],["meta",{"name":"twitter:image:alt","content":"Chapter 1 Introduction"}],["meta",{"property":"article:author","content":"RyanLee_ljx"}],["meta",{"property":"article:published_time","content":"2024-09-03T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-09-05T03:32:37.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Chapter 1 Introduction\\",\\"image\\":[\\"https://github.com/RyanLee-ljx/RyanLee-ljx.github.io/blob/image/Pla/refinement.png?raw=true\\"],\\"datePublished\\":\\"2024-09-03T00:00:00.000Z\\",\\"dateModified\\":\\"2024-09-05T03:32:37.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"RyanLee_ljx\\",\\"email\\":\\"2284771024@qq.com\\"}]}"]]},"headers":[{"level":2,"title":"1.1 What is planning?","slug":"_1-1-what-is-planning","link":"#_1-1-what-is-planning","children":[]},{"level":2,"title":"1.2 Basic Ingredients of Planning","slug":"_1-2-basic-ingredients-of-planning","link":"#_1-2-basic-ingredients-of-planning","children":[]},{"level":2,"title":"1.3 Organization of this book","slug":"_1-3-organization-of-this-book","link":"#_1-3-organization-of-this-book","children":[]}],"git":{"createdTime":1725345384000,"updatedTime":1725507157000,"contributors":[{"name":"Flame","email":"2284771024@qq.com","commits":5}]},"readingTime":{"minutes":1.75,"words":526},"filePathRelative":"path/chapter1.md","localizedDate":"2024年9月3日","excerpt":"\\n<p>PLANNING ALGORITHMS</p>\\n<p>Steven M. LaValle</p>\\n<p>University of Illinois</p>\\n<p>Copyright Steven M. LaValle 2006</p>\\n<p>Available for downloading at [http://planning.cs.uiuc.edu/]</p>\\n<p>Published by Cambridge University Press</p>\\n<h2>1.1 What is planning?</h2>\\n<p>Planning is a branch of algorithms.</p>","autoDesc":true}`);export{d as comp,g as data};