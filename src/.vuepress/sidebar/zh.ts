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
			link: "/Basic Knowledge/",
			children: [
        'question.md',
        'document.md',
        'convolution.md',
        'attention.md',
			],
		},

  
    {
        text: "Basic Models",
        collapsible: true,
        link: "/Model/",
        children: [
            '/gnn.md',
            {
                text: 'Diffusion Model',
                collapsible: true,
                children: [
                    'Diffusion/diffusion_start.md',
                    'Diffusion/diffusion_1.md',
                ],
            },
        ],
    },

    {
			text: "Reinforcement Learning",
      collapsible: true,
			link: "/RL/",
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
			link: "/Planning Algorithms/",
			children: [
        '/Planning Algorithms/chapter1.md',
        'chapter2.md'
			],
		},

    {
			text: "Paper Review",
			link: "/Paper/",
			children: [
        '/Paper/iMTSP.md',
        '/Paper/TC-CBS-t.md',
			],
		},

    {
			text: "Modern Robotics",
			link: "/Modern Robotics/",
			children: [
        '/Modern Robotics/back.md',
        '/Modern Robotics/content.md',
			],
		},

	],

	"/daily/": [
		{
			text: "English",
      collapsible: false,
			link: "/English/",
			children: [
        'tec_1.md',
        'vocabulary.md',
			],
		},	

    {
			text: "Guitar",
      collapsible: false,
			link: "/Guitar/",
			children: [
        'yinxiuzhifu.md',
        'jiezou.md',
        'pu.md',
        'yinjie.md',
			],
		},	

	],

});