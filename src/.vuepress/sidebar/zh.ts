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
			text: "基本知识",
      collapsible: false,
			link: "/ML/",
			children: [
        'question.md',
			],
		},

    {
			text: "卷积",
      collapsible: false,
			link: "/ML/",
			children: [
        'convolution.md',
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
        'TC-CBS-t.md',
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
        'guitar/C.md',
			],
		},	

	],

});