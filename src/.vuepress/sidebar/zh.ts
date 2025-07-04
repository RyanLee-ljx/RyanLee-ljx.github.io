import { sidebar } from "vuepress-theme-hope";

export default sidebar({
	"/traffic/": [
		{
			text: "元胞自动机仿真",
      collapsible: true,
			link: "/traffic/",
			children: [
        'CA.md',
        "pedestrian.md",
				"ns.md",
			],
		},
	],

	"/ML/": [
		{
			text: "Knowledge",
      collapsible: false,
			link: "/ML/",
			children: [
        'question.md',
        'document.md'
			],
		},

    {
			text: "Convolution",
      collapsible: false,
			link: "/ML/",
			children: [
        'convolution.md',
			],
		},

    {
			text: "Tricks in ML",
      collapsible: false,
			link: "/ML/",
			children: [
        'control_variate.md',
        'log.md',
			],
		},

    {
			text: "Attention mechanism",
      collapsible: false,
			link: "/ML/",
			children: [
        'attention.md',
			],
		},
  
    {
			text: "Graph Neural Network",
      collapsible: false,
			link: "/ML/",
			children: [
        'gnn.md',
			],
		},

    {
			text: "Reinforcement Learning",
      collapsible: false,
			link: "/ML/RL/",
			children: [
        'B.md',
        'C1.md',
        'C2.md',
			],
		},
	],


	"/path/": [
    {
			text: "PLANNING ALGORITHMS",
			link: "/path/",
			children: [
        'pla/chapter1.md',
        'pla/chapter2.md'
			],
		},

    {
			text: "文献阅读",
			link: "/path/",
			children: [
        'paper/iMTSP.md',
        'paper/TC-CBS-t.md',
			],
		},

	],



	"/daily/": [
		{
			text: "英语",
      collapsible: false,
			link: "/daily/",
			children: [
        'english/tec_1.md',
        'english/vocabulary.md',
			],
		},	

    {
			text: "吉他",
      collapsible: false,
			link: "/daily/",
			children: [
        'guitar/yinxiuzhifu.md',
        'guitar/jiezou.md',
        'guitar/pu.md',
        'guitar/yinjie.md',
			],
		},	

	],

});