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
        'chapter1.md',
        'chapter2.md'
			],
		},
	],



	"/daily/": [
		{
			text: "英语",
      collapsible: true,
			link: "/english/",
			children: [
        'tec_1.md',
        'vocabulary.md',
			],
		},	

    {
			text: "吉他",
      collapsible: true,
			link: "/mujita/",
			children: [
        'yinxiuzhifu.md'
			],
		},	

	],

});