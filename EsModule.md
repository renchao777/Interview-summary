# Es Module 和 CommonJs 的区别

### 语法

ES Module：使用了 import 和 export 语句

CommonJS: 使用 require() 和 module.exports

### 加载方式

CommonJS 模块的加载是运行时的。每当代码执行到 require() 时，Node.js 会读取文件，加载模块，并执行导出的内容。

ES Module 的模块依赖是在编译时确定的，JavaScript 引擎会在代码运行之前分析所有的模块依赖，确保它们在执行之前已经准备好

### 执行顺序

CommonJS：采用同步加载模块，在导入时会立即执行整个模块代码，且会阻塞后续代码的执行。

ES Module：采用异步加载模块，会在所有模块加载完成后执行代，因此，导入语句不会阻塞代码的执行。

1. require()：同步加载模块，所有依赖在构建时被静态解析并打包进主 bundle 中。即使你没有访问某个功能模块，它也会在初始加载时被打包进来，无法实现按需加载。
2. import()：异步加载模块，Webpack 可以在构建时将模块拆分为多个 chunk，并且在运行时按需加载，只有在真正使用时才会加载对应的 chunk 文件，从而优化应用的初始加载性能。
