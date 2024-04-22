import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/",
    lang: "zh-CN",
    title: "RyanLee's blog",
    description: "I am just a boy trying to find a place in this world",
    
  theme,

  // Enable it with pwa
  // shouldPrefetch: false,
});
