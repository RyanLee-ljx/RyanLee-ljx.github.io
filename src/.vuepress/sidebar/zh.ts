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
        '/Basic Knowledge/question.md',
        '/Basic Knowledge/document.md',
        '/Basic Knowledge/convolution.md',
        '/Basic Knowledge/attention.md',
			],
		},

  
    {
        text: "Basic Models",
        collapsible: true,
        link: "/Model/",
        children: [
            '/Model/gnn.md',
            {
                text: 'Diffusion Model',
                collapsible: true,
                children: [
                    '/Model/Diffusion/diffusion_start.md',
                    '/Model/Diffusion/diffusion_1.md',
                ],
            },
        ],
    },

    {
			text: "Reinforcement Learning",
      collapsible: true,
			link: "/RL/",
			children: [
        '/RL/B.md',
        '/RL/C1.md',
        '/RL/C2.md',
        '/RL/C3.md',
        '/RL/C4.md',
        '/RL/C5.md',
        '/RL/C6.md',
        '/RL/C7.md',
			],
		},
	],


	"/robotics/": [
    {
			text: "PLANNING ALGORITHMS",
			link: "/Planning Algorithms/",
			children: [
        '/Planning Algorithms/chapter1.md',
        '/Planning Algorithms/chapter2.md'
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
        '/English/tec_1.md',
        '/English/vocabulary.md',
			],
		},	

    {
			text: "Guitar",
      collapsible: false,
			link: "/Guitar/",
			children: [
        '/Guitar/yinxiuzhifu.md',
        '/Guitar/jiezou.md',
        '/Guitar/pu.md',
        '/Guitar/yinjie.md',
			],
		},	

	],

});