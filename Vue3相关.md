### Vue3 相关

#### 与 Vue2 的区别

1.Composition API

Vue 3 引入了 Composition API，这是一种新的方式来组织和复用逻辑。它允许开发者使用 setup() 函数来声明组件的状态和行为，而不是使用 Vue 2 的 Options API

Vue 2 主要依赖于 Options API，使用 data、methods、computed 等选项来定义组件

2.响应式实现原理

Vue 2 的响应式系统基于 Object.defineProperty，通过 getter 和 setter 来实现数据变化的监听和依赖收集，但对新增属性的处理有限

Vue 3 则采用了 Proxy，提供了更灵活和高效的响应式实现，能够直接监听对象和数组的操作，同时也解决了 Vue 2 中存在的一些限制和性能问题。

3.mixin 和 hooks 在逻辑复用上的区别

在 Vue 3 中，组合 API （Hooks）提供了更为灵活和高效的方式来复用逻辑，相比于 Vue 2 的 mixins，组合 API 减少了潜在的命名冲突和上下文不明确的问题，使得代码更容易理解和维护
