# props

**属性的原理是将解析后的 props 验证后定义在组件实例的 vm.\_props 对象上，这些属性通过 defineReactive 方法实现响应式。在组件渲染过程中，模板可以直接访问这些 props 的值，而这些属性会被代理到 vm 上，确保当父组件的数据变化时，子组件能够自动更新**

1. 初始化阶段：当一个组件被创建时，会通过虚拟节点的 componentOptions 中的 propsData 传入属性值

```js
<div>
    <child-component :message="parentMessage" :count="parentCount" />
</div>
const virtualNode = {
  tag: 'child-component',
  componentOptions: {
    Ctor: MyComponentConstructor, // 组件的构造函数
    propsData: {
      message: '你好，子组件！', // 从父组件传入的属性
      count: 0,                 // 从父组件传入的属性
    }
  },
  children: [] // 如果子组件有子元素，这里定义它们
};
```

2. 挂载到 vm.$options.propsData：这些 propsData 会被挂载到组件实例的选项上，即 vm.$options.propsData，以便在组件内部访问

```js
const childComponentInstance = new MyComponentConstructor({
  propsData: {
    message: "你好，子组件！",
    count: 0,
  },
  data: {},
});
// 通过this.$options.propsData拿到
this.$options.propsData = {
  message: "你好，子组件！",
  count: 0,
};
```

3. 创建 vm.props：在组件实例中，vm.props 类似于 vm.data，用于访问传入的属性

```js
const MyComponent = {
  props: ["message", "count"],
  created() {
    console.log(this.message); // "你好，子组件！"
    console.log(this.count); // 0
  },
};
```

4. 对 props 的劫持
   Vue 如何使用 Object.defineProperty 或 Proxy 来劫持这些属性，使得组件能够响应父组件的变化

```js
object.defineProperty(childComponentInstance, "message", {
  get() {
    // 返回传入的属性值
    return this.$options.propsData.message;
  },
  set(newValue) {
    // 自定义 setter 可以触发更新逻辑
    console.warn("props cannot be mutated directly");
  },
});
```

5. 观测机制
   只有根属性（直接定义在 props 中的属性）会被 Vue 的响应式系统观测(其他没有接收的属性就 attrs 就不是响应式的)

   在 props 中定义的 message 和 count 会被 Vue 的响应式系统监测。
   如果这些属性的值在父组件中变化，子组件会自动更新

而子组件中的 props 劫持则是为了使子组件能够安全且有效地访问这些数据，从而渲染页面

### 如果强行修改呢 props 中的值呢

1. 如果 props 是对象/数组，子组件仍然能改内部属性，这就会污染父组件的数据

2. 在 Vue2 里，props 是通过 Object.defineProperty 包装成只读的，外层赋值直接被拦截，Vue 只给你一个警告


```js
Object.defineProperty(vm, key, {
  get: function () {
    return this.$options.propsData[key];
  },
  set: function (value) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(`Do not mutate prop directly: ${key}`);
    }
  },
});
```
