# vue 组件的渲染流程

1. 调用 Vue.component：定义全局组件，传递组件名称和定义对象，组件定义添加到 Vue.options.components 中
   Vue.options.components[组件名]=包装成构造函数(定义)
2. 内部使用 Vue.extend：创建一个继承自 Vue 的子类，返回组件构造函数
3. 创建虚拟节点 在父组件的渲染过程中，根据标签生成组件的虚拟节点，生成组件的虚拟节点 componentOptions 里面包含 Ctor

```js
const vnode = {
  tag: "div",
  children: [
    { tag: "h1", text: "父组件标题" },
    {
      tag: "ChildComponent", // 子组件的虚拟节点
      componentOptions: {
        props: {},
        Ctor: MyComponentConstructor, // 组件的构造函数
      },
    },
  ],
};
组件实例是一个 JS 对象 存储组件的状态和方法，它通过 render() 生成虚拟 DOM
```

组件实例存储数据和逻辑，模板会被编译成 render 函数；Vue 会保证组件实例有 _render() 方法，它调用 render 生成虚拟 DOM；挂载时通过 patch 把虚拟 DOM 转成真实 DOM 并插入页面，同时触发挂载相关的生命周期钩子

4. 创建子类实例：调用父类的 \_init 方法，初始化 Vue 组件 实例（数据观测、模板编译、生命周期钩子）
5. 组件的初始化就是 new 这个组件的构造函数并且调用$mount 方法

6. 组件创建真实 dom 时 （先渲染的是父组件） 遇到是组件的虚拟节点时，去调用 init 方法，让组件初始化并挂载
   （ccomponentInstance 是指组件的实例。当你调用 $mount() 方法无参数时，Vue 会创建该组件的实例，
   并将渲染后的 DOM 元素存储在 componentInstance.$el 中。
   为了进行渲染，你可以通过 vnode.componentInstance.$el 来访问这个 DOM 元素）

```js
{
  tag: 'div',
  children: [
    { tag: 'h1', text: '父组件标题' },
    {
      tag: 'ChildComponent', // 子组件的虚拟节点
      componentInstance: childComponentInstance // 指向子组件的实例
    }
  ]
}
```
