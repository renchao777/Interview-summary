# nextTick

**是 vue 的一个内部方法，它的核心作用是在数据更新后，确保获取到更新后的 DOM**

## nextTick 的内部机制

**nextTick 内部采用了异步任务进行了包装，（多个 nextTick 调用，会被合并成一次，内部会合并回调）最后在异步任务中批处理**

## 内部工作流程

1. 数据变更：当 Vue 组件中的响应式数据发生变更时，Vue 不会立即对 DOM 进行更新。相反，这些变更会被添加到一个队列中
2. 异步队列：在同一个事件循环（Event Loop）中，Vue 将所有的数据变更合并到一个异步队列中。这使得多个 nextTick 调用不会触发多次 DOM 更新，而是合并为一次更新
3. 批处理更新：队列中的 DOM 更新任务将批处理执行。当所有数据变更处理完后，nextTick 的回调才会被调用。此时，你可以安全地访问已更新的 DOM

## 应用场景

1. 等待 DOM 完成更新后再执行操作
   在某些情况下，操作需要基于更新后的 DOM 进行，比如获取 DOM 元素的高度或宽度，进行动画处理，或者在新的 DOM 节点上执行第三方插件。这时，可以将相应的逻辑放到 nextTick 中，确保操作时 DOM 已更新完毕。

2. 防止重复渲染
   通过异步队列机制，Vue 会避免重复渲染 DOM，提升性能。因此，在需要等待所有数据变更处理完成之后，再获取最新的 DOM 结构或状态时，可以使用 nextTick

异步更新，Vue 默认会在数据变更时，自动安排一个 nextTick 任务。用户若希望在 Vue 内部的任务执行完毕后，进行某些逻辑操作，就可以将这些操作放入 nextTick 的回调中

## 在 Vue 内部，$nextTick 主要在以下几种情况被调用

1. 数据变更后：当组件的响应式数据发生变化时，Vue 会在下一个 DOM 更新循环中异步更新视图。这时，如果你需要在视图更新后执行某些操作，可以使用 $nextTick

2. 生命周期钩子：在某些生命周期钩子（如 mounted，updated）中，可能需要在组件挂载到 DOM 后执行特定逻辑，这时可以调用 $nextTick

3. 计算属性：计算属性的更新也会使用 $nextTick 来确保在依赖变化后的 DOM 更新完成后再执行计算结果的使用

4. vue3 异步组件：在异步组件的加载过程中，Vue 会使用 $nextTick 确保在组件完成加载后，相关的 DOM 更新被应用

```js
<template>
  <AsyncComponent />
</template>;
import { defineAsyncComponent } from "vue";
const AsyncComponent = defineAsyncComponent(() => import("./MyComponent.vue"));
function loadComponent() {
  // 触发异步加载
  const componentPromise = import("./MyComponent.vue");

  componentPromise.then((component) => {
    // 组件加载完成后
    this.$nextTick(() => {
      this.currentComponent = component; // 更新当前组件
    });
  });
}
```
