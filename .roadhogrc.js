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
        ["import", { "libraryName": "antd-mobile", "libraryDirectory": "lib", "style": true }]
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
  "svgSpriteLoaderDirs": svgSpriteDirs
}
