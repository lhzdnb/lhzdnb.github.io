// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import { themes as prismThemes } from "prism-react-renderer";

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "lhzdnb Blog",
  tagline:
    "欢迎访问我的前端开发技术博客，这里记录了一些我整理的知识点和学习心得，尽量保证每天更新！",
  favicon: "img/logo-color.svg",

  // Set the production url of your site here
  url: "https://lhzdnb.com",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/lhzdnbBlog/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "lhzdnb", // Usually your GitHub org/user name.
  projectName: "lhzdnbBlog", // Usually your repo name.
  trailingSlash: false,

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "zh",
    locales: ["en", "zh"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: "./sidebars.js",
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          //   'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          //   'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: "img/docusaurus-social-card.jpg",
      navbar: {
        title: "lhzdnb Blog",
        logo: {
          alt: "My Site Logo",
          src: "img/logo-color.svg",
        },
        items: [
          {
            type: "docSidebar",
            sidebarId: "fundamentalSidebar",
            position: "left",
            label: "前端基础知识",
          },
          {
            type: "docSidebar",
            sidebarId: "frameSidebar",
            position: "left",
            label: "前端框架知识",
          },
          {
            type: "docSidebar",
            sidebarId: "leetcodeSidebar",
            position: "left",
            label: "LeetCode题解",
          },
          { to: "/blog", label: "Blog", position: "left" },
          {
            href: "https://github.com/lhzdnb/",
            position: "right",
            className: "header-github-link",
            "aria-label": "GitHub repository",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Docs",
            items: [
              {
                label: "前端基础知识",
                to: "/docs/fundamental/intro",
              },
              {
                label: "前端框架知识",
                to: "/docs/framework/intro",
              },
              {
                label: "LeetCode题解",
                to: "/docs/LeetCode/intro",
              },
            ],
          },
          {
            title: "Link",
            items: [
              {
                label: "Leetcode",
                href: "https://leetcode.cn/",
              },
              {
                label: "React",
                href: "https://react.dev/reference/react",
              },
              {
                label: "ChatGPT",
                href: "https://chat.openai.com/",
              },
            ],
          },
          {
            title: "More",
            items: [
              {
                label: "个人主页",
                href: "https://haoliang.website/",
              },
              {
                label: "GitHub",
                href: "https://github.com/lhzdnb/",
              },
              {
                label: "Blog",
                to: "/blog",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} lhzdnb Blog.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
