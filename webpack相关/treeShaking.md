# 摇树机制

1. ES6 模块：摇树优化主要依赖于 ES6 的 import 和 export 语法，这些语法是静态的，便于分析。

1. 静态分析：构建工具（如 Webpack）分析代码，生成模块之间的依赖图，识别哪些模块和导出是实际使用的，哪些是未使用的。

1. 标记未使用的代码：通过分析，工具会标记未被引用的导出，这些可以安全移除的代码。

1. 优化阶段：在构建过程中，工具会去掉未使用的代码，生成更小的最终输出文件。

1. 副作用处理：如果某些模块会影响全局状态，即使未被使用，也可能不会被移除。需要在配置中说明哪些模块有副作用

## 配置摇树

```js
const path = require("path");

module.exports = {
  mode: "production", // 设置为生产模式以启用摇树优化
  entry: "./src/main.js", // 入口文件
  output: {
    path: path.resolve(__dirname, "dist"), // 输出目录
    filename: "bundle.js", // 输出文件名
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      // 其他 loader 配置
    ],
  },
  resolve: {
    alias: {
      vue$: "vue/dist/vue.esm.js", // 使用完整版的 Vue
    },
    extensions: ["*", ".js", ".vue", ".json"],
  },
  optimization: {
    usedExports: true, // 启用摇树优化
  },
};
```
