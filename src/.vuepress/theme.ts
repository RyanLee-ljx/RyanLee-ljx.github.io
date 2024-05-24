import { hopeTheme } from "vuepress-theme-hope";
import navbar from "./navbar/zh.js";
import sidebar from "./sidebar/zh.js";


export default hopeTheme({
  hostname: "https://ryanlee-ljx.github.io/",

  author: {
    name: "RyanLee_ljx",
    email: "2284771024@qq.com",
  },
  
  favicon: '/logo11.png',

  darkmode:'toggle',

  iconAssets: "//at.alicdn.com/t/c/font_4520209_juzdw5l02pm.css",

  blog: {
    medias: {
      BiliBili: "https://space.bilibili.com/451282775?spm_id_from=333.1007.0.0",
      GitHub: "https://github.com/RyanLee-ljx",
    },
  },

  logo: "/logo1.png",

  repo: "https://ryanlee-ljx.github.io/",

  docsDir: "src",

  locales: {
    "/": {
      // navbar
      navbar: navbar,

      // sidebar
      sidebar:sidebar,

      footer: "RyanLee's Blog",

      displayFooter: true,

      blog: {
        description: "A Little Boy",
        intro: "/intro.html",
      },

      metaLocales: {
        editLink: "Edit this page on GitHub",
      },
    },

  },


  plugins: {
    blog: true,
    searchPro: {
			indexContent: true,
			autoSuggestions: true,
		},
		comment: {
			provider: "Waline",
			serverURL: "https://sveltekit-1-btzrzhchs-ryanlee-ljxs-projects.vercel.app",
		},

    mdEnhance: {
      katex:true,
      alert:true,
      align: true,
      attrs: true,
      codetabs: true,
      component: true,
      demo: true,
      figure: true,
      imgLazyload: true,
      imgSize: true,
      include: true,
      mark: true,
      

      stylize: [
        {
          matcher: "Recommended",
          replacer: ({ tag }) => {
            if (tag === "em")
              return {
                tag: "Badge",
                attrs: { type: "tip" },
                content: "Recommended",
              };
          },
        },
      ],
      sub: true,
      sup: true,
      tabs: true,
      tasklist: true,
      vPre: true,
      chart: true,
      echarts: true,

  },
}
});
