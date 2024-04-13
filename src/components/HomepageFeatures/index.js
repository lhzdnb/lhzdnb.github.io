import clsx from "clsx";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";

const FeatureList = [
  {
    title: "前端基础知识",
    Svg: require("@site/static/img/undraw_docusaurus_mountain.svg").default,
    description: (
      <>
        我主要梳理了408以及前端三件套的相关知识点。408主要包括操作系统、计算机网络、数据库以及计算机组成原理。这是我们成为一个合格的软件工程师的必备知识，因为要成为前端开发工程师，你首先需要成为一名软件工程师。前端三件套包含了{" "}
        <code>HTML</code>, <code>CSS</code> 以及 <code>JavaScript</code>。
      </>
    ),
  },
  {
    title: "前端框架知识",
    Svg: require("@site/static/img/undraw_docusaurus_react.svg").default,
    description: (
      <>
        现在主流的前端框架包括了 <code>React</code>，<code>Vue</code> 和{" "}
        <code>Angular</code>。我现在主要使用的是 <code>React</code>
        ，所以近期主要梳理的就是 <code>React</code>{" "}
        的相关知识。我也会继续学习其他框架，在学习的时候会同步进行知识的梳理。
      </>
    ),
  },
  {
    title: "LeetCode题解",
    Svg: require("@site/static/img/undraw_docusaurus_tree.svg").default,
    description: (
      <>
        算法是面试和笔试中必不可少的环节，因此刷Leetcode是必须的。每做完一道题我就会将我的答案放上来，如果我觉得某道题目比较好或者我掌握的不好，我会写一个详细的题解。
      </>
    ),
  },
];

function Feature({ Svg, title, description }) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props) => (
            <Feature key={props.title} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
