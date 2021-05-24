# art-html

![](https://img.shields.io/github/issues/bigshans/art-html) ![](https://img.shields.io/github/forks/bigshans/art-html) ![](https://img.shields.io/github/stars/bigshans/art-html) ![](https://img.shields.io/github/license/bigshans/art-html)

English Version | [中文版](./README-ZH.md)

art-html is a minimalist framework for generating static web pages based on art-template which is a simple template engine. You only need to clone the code and develop it in the `src` directory.

## Project structure

```
.
├── dists
│   ├── hello.html
│   ├── index.html
│   └── title.html
├── index.js
├── package.json
├── parser.js
├── README.md
├── README-ZH.md
├── server.js
├── src
│   ├── index.html
│   └── title.art
├── static
│   └── hello.html
├── utils
│   └── index.js
├── watch.js
└── yarn.lock
```

This repository is a demo. After dependencies installed, you can run `yarn run dev` or `npm run dev`. The webpage can be viewed under the corresponding address under `htp://localhost:3000`.

Run `yarn run build` to directly compile without starting the web service.

The compiled website is located in the `dists` directory.

Besides, the main pages that need to be compiled are put in `src`, and the content that does not need to be compiled is put and stored in `static`. When compiling, the program will merge `static` and `src`, and the file of `src` will overwrite the file of `static`.

## License

MIT License

## Change Log

### 1.0.0 (2021-5-24)

* Build the basic structure of the project 
* Basic code parser
* Basic hmr
