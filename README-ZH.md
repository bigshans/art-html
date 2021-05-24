# art-html

![](https://img.shields.io/github/issues/bigshans/art-html) ![](https://img.shields.io/github/forks/bigshans/art-html) ![](https://img.shields.io/github/stars/bigshans/art-html) ![](https://img.shields.io/github/license/bigshans/art-html)

[English Version](./README.md) | 中文版

art-html 是一个基于 art-template 开发的、极简的静态网页生成框架。你只需要 clone 下代码，在 `src` 目录下开发即可。

## 项目结构

```
.
├── dists
│   ├── hello.html
│   ├── index.html
│   └── title.html
├── index.js
├── package.json
├── parser.js
├── README.md
├── README-ZH.md
├── server.js
├── src
│   ├── index.html
│   └── title.art
├── static
│   └── hello.html
├── utils
│   └── index.js
├── watch.js
└── yarn.lock
```

本仓库是一个 Demo 。完成相关模块代码安装，再运行 `yarn run dev` 或 `npm run dev` ，网页可以在 `htp://localhost:3000` 下的相应地址下查看。

运行 `yarn run build` 可以直接编译而不启动服务。

编译后的网站位于 `dists` 目录下。

除此之外，在 `src` 内编写主要的、需要编译的页面，在 `static` 内编写和存放无需编译的内容。编译时程序将会将 `static` 和 `src` 合并，`src` 的文件会覆盖 `static` 的文件。

## License

MIT License

## Change Log

### 1.0.0 (2021-5-24)

* 完成项目基本架构搭建
* 完成基本的编译能力
* 实现简单的网页修改之后热加载
