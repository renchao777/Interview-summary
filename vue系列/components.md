### vue 组件的渲染流程

Vue.componet 作用是全局定义，id 和对应的 definition，会被定义在 Vue 静态方法 options 上面
Vue.options.components[组件名]=包装成构造函数(定义)

vue.extend 返回一个子类 ，而且会在子类上记录自己的选项

1. 调用 Vue.component
   这是定义全局组件的方式。你传递组件名称和组件定义对象。组件定义会被添加到 Vue.options.components 中
2. 内部用的是 Vue.extend 就是产生一个子类来继承父类
   Vue.extend 方法用于创建一个子类，它会返回一个构造函数。这个构造函数会继承 Vue 的实例属性和方法，并在其上附加自定义的选项
3. 等会创建子类实例时会调用父类的\_init 方法，在$mount 即可
   当创建子类的实例时，会调用父类的 \_init 方法。这个方法是 Vue 实例的初始化逻辑，包括设置数据观测、生命周期钩子等
4. 组件的初始化就是 new 这个组件的构造函数并且调用$mount 方法
5. 创建虚拟节点 根据标签晒出组件对应，生成组件的虚拟节点 componentOptions 里面包含 Ctor,就是组件的构造函数
const vnode = {
  tag: 'div',
  children: [
    { tag: 'h1', text: '父组件标题' },
    {
      tag: 'ChildComponent', // 子组件的虚拟节点
      componentOptions: {
        Ctor: MyComponentConstructor, // 组件的构造函数
      }
    }
  ]
}
6. 组件船舰真实的 dom（先渲染的是父组件）遇到子组件的虚拟节点时，调用子组件的 init 方法，让组件初始化并挂载，渲染成真实的 dom 插入父组件中，
   （组件的$mount无参数会把渲染后的dom放到 vnode.componentInstance 中）这样渲染时就 获取这个对象的vnode.componentInstance.$el 属性来渲染
   `
{
  tag: 'div',
  children: [
    { tag: 'h1', text: '父组件标题' },
    {
      tag: 'ChildComponent', // 子组件的虚拟节点
      componentInstance: childComponentInstance // 指向子组件的实例
    }
  ]
}`
