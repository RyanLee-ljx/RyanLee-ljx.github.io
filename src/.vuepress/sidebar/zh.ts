import { sidebar } from "vuepress-theme-hope";

export default sidebar({
	"/traffic/": [
		{
			text: "Cellular Automata",
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
			link: "/ML/",
			children: [
        'B.md',
        'C1.md',
        'C2.md',
        'C3.md',
        'C4.md',
        'C5.md',
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
			text: "Paper Review",
			link: "/path/",
			children: [
        'paper/iMTSP.md',
        'paper/TC-CBS-t.md',
			],
		},

	],



	"/daily/": [
		{
			text: "English",
      collapsible: false,
			link: "/daily/",
			children: [
        'english/tec_1.md',
        'english/vocabulary.md',
			],
		},	

    {
			text: "Guitar",
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