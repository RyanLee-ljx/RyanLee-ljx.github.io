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
			link: "/ML/Basic Knowledge/",
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
        link: "/ML/Model/",
        children: [
            'gnn.md',
            {
                text: 'Diffusion Model',
                collapsible: true,
                children: [
                    'diffusion_start.md',
                    'diffusion_1.md',
                ],
            },
        ],
    },

    {
			text: "Reinforcement Learning",
      collapsible: true,
			link: "/ML/RL/",
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
        'Planning Algorithms/chapter1.md',
        'Planning Algorithms/chapter2.md'
			],
		},

    {
			text: "Paper Review",
			link: "/robotics/",
			children: [
        'Paper/iMTSP.md',
        'Paper/TC-CBS-t.md',
			],
		},

    {
			text: "Modern Robotics",
			link: "/robotics/",
			children: [
        'Modern Robotics/back.md',
        'Modern Robotics/content.md',
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