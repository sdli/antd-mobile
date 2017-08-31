const path = require("path");
const svgSpriteDirs = [
    require.resolve('antd-mobile').replace(/warn\.js$/, ''), // antd-mobile 内置svg
    path.resolve(__dirname,"src/assets/svgs"),
];
const pxtorem = require('postcss-pxtorem');

export default {
  "entry": "src/index.js",
  "env": {
    "development": {
      "extraBabelPlugins": [
        "dva-hmr",
        "transform-runtime",
        ["import", { "libraryName": "antd-mobile", "libraryDirectory": "lib", "style": true }],
        ["import", { "libraryName": "nprogress", "style": "css" }]
      ],
      "extraPostCSSPlugins": [
        pxtorem({
          rootValue: 100,
          propWhiteList: []
        })
      ]
    },
    "production": {
      "extraBabelPlugins": [
        "transform-runtime",
        ["import", { "libraryName": "antd-mobile", "libraryDirectory": "lib", "style": true }]
      ],
      "extraPostCSSPlugins": [
        pxtorem({
          rootValue: 100,
          propWhiteList: []
        })
      ]
    }
  },
  "svgSpriteLoaderDirs": svgSpriteDirs,
  "proxy": {
    "/api": {
      "target": "http://localhost:3060/",
      "changeOrigin": false,
      "pathRewrite": { "^/api" : "" }
    }
  }
}
