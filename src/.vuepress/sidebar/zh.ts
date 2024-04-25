import { sidebar } from "vuepress-theme-hope";

export default sidebar({
	"/traffic/": [
		{
			text: "元胞自动机仿真",
      collapsible: true,
			link: "/traffic/",
			children: [
        "pedestrain.md",
				"ns.md",
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

	],


	"/shumo/": [

	],



	"/english/": [
	

	],



	"/Myself/": [

	],


});