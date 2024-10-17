# keep-alive

**keep-alive 是 Vue 的一个内置组件，主要用于缓存组件实例,从而避免不必要的销毁和重建**
keep-alive 仅影响组件的生命周期管理和缓存行为

```js
{
  tag: "keep-alive", // 表示这是一个 keep-alive 组件
  data: null, // 组件的属性，这里可以包含 props、事件等
  children: [ // 存储子组件的 VNode
    {
      tag: "component-a", // 当前渲染的组件
      data: {
        attrs: {
          // 组件的属性，比如 props
        }
      },
      children: [], // 子组件的子元素
      componentOptions: {
        Ctor: ComponentA, // 组件的构造函数
        propsData: {
          // 传递给组件的 props
        }
      }
    }
  ]
}
先创建 keep-alive 组件实例，再渲染其 children 中的组件。这种设计使得 keep-alive 能够有效地管理被包裹组件的生命周期和缓存
```

## 主要用途

1. keep-alive 在路由中使用
2. 在 component:is 中使用(缓存)

## 工作原理

keep-alive 是 Vue 提供的一个内置组件，用于缓存动态组件实例。
它采用了 LRU（最近最少使用）算法来管理缓存的组件，当组件切换时，会缓存已加载的组件实例，而不是销毁它们，从而提高性能

1. 初次渲染
   keep-alive 实例创建：在使用 keep-alive 包裹组件时，Vue 会首先创建一个 keep-alive 实例。这个实例负责管理其内部的缓存机制。
   组件实例创建：当用户第一次切换到被 keep-alive 包裹的组件时，Vue 会创建该组件的实例

2. 组件切换与缓存
   切换组件：当用户切换到其他组件时，keep-alive 会将当前组件的实例缓存，而不是销毁它。
   此时，deactivated 钩子会被调用，表示组件已被停用，但其状态和 DOM 节点仍然保留。

3. 组件重新激活
   激活组件：当用户切换回之前的组件时，keep-alive 会从缓存中恢复该组件的实例。此时，activated 钩子被调用，表示组件被重新激活。

复用组件实例：Vue 会直接复用之前的组件实例，而不会重新创建。组件的状态（如 data、computed 等）保持不变，这样用户在切换时可以无缝体验。

4. 视图更新
   即使组件处于缓存状态，组件的视图仍然可以根据数据变化进行更新。以下是更新的过程：

数据变化：如果组件的 props 或 data 发生变化，Vue 会重新计算组件的虚拟节点（VNode）。即使组件实例是缓存的，数据的变化依然会触发视图更新。

虚拟 DOM 更新：在数据变化时，Vue 会生成一个新的 VNode，表示更新后的组件结构。此时，组件的 render 函数被调用，生成新的虚拟节点。

patch 函数：接下来，Vue 使用 patch 函数对比新旧 VNode，通过 diff 算法找出变化的部分。patch 会根据变化更新真实的 DOM，仅更新需要改变的部分，确保 DOM 操作最小化

### keep-alive 源码

```js
import { isFunction, isObject } from 'shared/util'
import { defineComponent } from 'core/vdom/create-element'

// KeepAlive component definition
export default defineComponent({
  name: 'keep-alive', // 组件名称
  abstract: true, // 表示这是一个抽象组件，不会在 DOM 中渲染出一个实际的节点

  props: {
    include: { // 仅缓存包含在该列表中的组件
      type: [String, Array],
      default: null
    },
    exclude: { // 不缓存包含在该列表中的组件
      type: [String, Array],
      default: null
    },
    max: { // 最大缓存数
      type: [String, Number],
      default: null
    }
  },

  data() {
    return {
      cache: Object.create(null), // 存储已缓存的组件实例
      keys: [] // 记录当前活跃的组件的 key
    }
  },

  created() {
    // 组件创建时初始化 cache 和 keys
    this.cache = Object.create(null)
    this.keys = []
  },

  deactivated() {
    // 当组件被切换到其他组件时调用
    const key = this.getKey(this.$options) // 获取当前组件的 key
    const cached = this.cache[key] // 获取缓存的组件
    if (cached) {
      cached.deactivated() // 调用缓存组件的 deactivated 钩子
    }
  },

  activated() {
    // 当恢复之前的组件时调用
    const key = this.getKey(this.$options) // 获取当前组件的 key
    const cached = this.cache[key] // 获取缓存的组件
    if (cached) {
      cached.activated() // 调用缓存组件的 activated 钩子
    }
  },

  render() {
    const vnode = this.$slots.default[0] // 获取默认插槽中的第一个 VNode
    const key = this.getKey(vnode.componentOptions) // 获取组件的 key

    // 如果该组件已经在缓存中，则直接返回缓存的 VNode
    if (key in this.cache) {
      return this.cache[key].vnode
    }

    // 否则，缓存该组件实例
    this.cacheComponent(key, vnode.componentInstance)
    return vnode // 返回当前的 VNode
  },

  methods: {
    getKey(child) {
      // 生成组件的唯一 key，若没有 key 则使用标签名
      return child.key == null ? child.tag : child.key
    },

    cacheComponent(key, component) {
      // 将组件实例缓存到 cache 中
      if (!(key in this.cache)) {
        this.keys.push(key) // 如果不在缓存中，添加到 keys 数组
      }
      this.cache[key] = component // 将组件实例缓存

      // 限制缓存的最大数量
      if (this.max && this.keys.length > this.max) {
        this.pruneCache() // 移除最久未使用的缓存
      }
    }
  }
}

```
