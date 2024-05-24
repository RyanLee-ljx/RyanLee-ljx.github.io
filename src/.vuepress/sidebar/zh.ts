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
    {
			text: "交通流理论",
      link: "/traffic/",
			collapsible: true,
			children: [
				"traffic_theory_1.md",
			],
		},
		{
			text: "路径规划",
      link: "/traffic/",
      collapsible: true,
			children: [
				"dijkstra.md",
        'floyd.md',
        'planning.md',
        'Astar.md',
        'ad_Astar.md'
			],
		},
		{
			text: "交通规划原理",
      link: "/traffic/",
			collapsible: true,
			children: [
				"zengzhangxishu.md",
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


	"/shumo/": [
    {
			text: "基本内容",
			link: "/shumo/",
			children: [
        'math.md',
			],
		},
	],



	"/english/": [
		{
			text: "文献阅读",
      collapsible: true,
			link: "/paper/",
			children: [
        'paper_1.md',
			],
		},	

    {
			text: "专业术语",
      collapsible: true,
			link: "/shuyu/",
			children: [
        'terminology.md',
			],
		},	

    {
			text: "前沿技术",
      collapsible: true,
			link: "/tec/",
			children: [
        'tec_1.md',
			],
		},	

    {
			text: "交通工程",
      collapsible: true,
			link: "/traffic_en/",
			children: [
        'traffic_1.md',
			],
		},	

    {
			text: "交通规划",
      collapsible: true,
			link: "/traffic_planning/",
			children: [
        'planning_1.md',
			],
		},	

    {
			text: "交通流理论",
      collapsible: true,
			link: "/traffic_theory/",
			children: [
        'theory_1.md',
			],
		},	

	],

});