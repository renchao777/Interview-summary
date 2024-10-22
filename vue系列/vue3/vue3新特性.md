# Vue 3 相较于 Vue 2 引入了多个新特性和改进

1. Composition API
   引入 Composition API，用于代替 Options API 进行组件逻辑的组织。通过 setup 函数，可以更灵活地组合和复用逻辑，增强代码的可维护性。
   提供的功能包括 reactive、ref、computed、watch、watchEffect、provide/inject 等。
2. 响应式系统的改进
   Vue 3 使用 Proxy 代替 Vue 2 的 Object.defineProperty 实现响应式系统，从而能够更好地支持对数组和对象属性的追踪。
   解决了 Vue 2 无法检测到属性添加或删除的局限性。
3. 更快的性能
   渲染性能提升，编译器针对静态内容和动态内容进行了优化。
   缩小了打包体积，并提升了组件更新的速度。
   支持片段（Fragment），允许组件返回多个根节点，从而避免不必要的 DOM 包装。
4. Teleport
   Teleport 组件可以将模板的一部分渲染到 DOM 中的任何位置，不受组件树的层级限制，适用于模态框、弹窗等场景。
5. 更好的 TypeScript 支持
   Vue 3 的 API 设计更贴近 TypeScript，提供了更好的类型推断和类型检查支持，提升了开发体验。
6. 树摇优化（Tree-Shaking）
   通过更细粒度的模块拆分，实现更好的树摇优化，减少打包后的文件体积
