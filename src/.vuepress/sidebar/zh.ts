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
      prefix:"Basic_Knowledge/",
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
        prefix:"Model/",
        children: [
            'gnn.md',
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
      prefix:"RL/",
			children: [
        'B.md',
        'C1.md',
        'C2.md',
        'C3.md',
        'C4.md',
        'C5.md',
        'C6.md',
        'C7.md',
        'C8.md',
        'C9.md',
        'C10.md',
			],
		},
	],


	"/robotics/": [
    {
			text: "PLANNING ALGORITHMS",
			collapsible: true,
      prefix:"Planning_Algorithm/",
			children: [
        'chapter1.md',
        'chapter2.md'
			],
		},

    {
			text: "Paper Review",
			collapsible: true,
      prefix:"paper/",
			children: [
        'iMTSP.md',
        'TC-CBS-t.md',
			],
		},

    {
			text: "Modern Robotics",
			collapsible: true,
      prefix:"Moden_Robotics/",
			children: [
        'back.md',
        'content.md',
			],
		},

	],

	"/daily/": [
		{
			text: "English",
      collapsible: false,
      prefix:"english/",
			children: [
        'tec_1.md',
        'vocabulary.md',
			],
		},

    {
			text: "Guitar",
      collapsible: false,
      prefix:"guitar/",
			children: [
        'yinxiuzhifu.md',
        'jiezou.md',
        'pu.md',
        'yinjie.md',
			],
		},

	],

});
