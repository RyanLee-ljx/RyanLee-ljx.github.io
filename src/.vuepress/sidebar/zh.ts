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
      collapsible: true,
			link: "/ML/",
			children: [
        'question.md',
        'document.md'
			],
		},

    {
			text: "Convolution",
      collapsible: true,
			link: "/ML/",
			children: [
        'convolution.md',
			],
		},

    {
			text: "Tricks in ML",
      collapsible: true,
			link: "/ML/",
			children: [
        'control_variate.md',
        'log.md',
			],
		},

    {
			text: "Attention mechanism",
      collapsible: true,
			link: "/ML/",
			children: [
        'attention.md',
			],
		},
  
    {
			text: "Graph Neural Network",
      collapsible: true,
			link: "/ML/",
			children: [
        'gnn.md',
			],
		},

    {
			text: "Diffusion Model",
      collapsible: true,
			link: "/ML/",
			children: [
        'diffusion_start.md',
        'diffusion_1.md',
			],
		},

    {
			text: "Reinforcement Learning",
      collapsible: true,
			link: "/ML/",
			children: [
        'B.md',
        'C1.md',
        'C2.md',
        'C3.md',
        'C4.md',
        'C5.md',
        'C6.md',
        'C7.md',
			],
		},
	],


	"/robotics/": [
    {
			text: "PLANNING ALGORITHMS",
			link: "/robotics/",
			children: [
        'pla/chapter1.md',
        'pla/chapter2.md'
			],
		},

    {
			text: "Paper Review",
			link: "/robotics/",
			children: [
        'paper/iMTSP.md',
        'paper/TC-CBS-t.md',
			],
		},

    {
			text: "Modern Robotics",
			link: "/robotics/",
			children: [
        'book/back.md',
        'book/content.md',
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