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
      collapsible: true,
			link: "/traffic/",
			children: [
        'question.md',
			],
		},
	],


	"/shumo/": [

	],



	"/english/": [
		{
			text: "文献阅读",
      collapsible: true,
			link: "/traffic/",
			children: [
        'paper_1.md',
			],
		},	

    {
			text: "交通流理论",
      collapsible: true,
			link: "/traffic/",
			children: [
        'theory_1.md',
			],
		},	

    {
			text: "交通规划",
      collapsible: true,
			link: "/traffic/",
			children: [
        'planning_1.md',
			],
		},	

    {
			text: "交通工程",
      collapsible: true,
			link: "/traffic/",
			children: [
        'traffic_1.md',
			],
		},	

	],



	"/Myself/": [
    {
			text: "交通工程",
      collapsible: false,
			link: "/traffic/",
			children: [
        'traffic_1.md',
			],
		},	
	],


});