# props

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

直接修改 props 的值不会触发 Vue 的响应式更新，因为 Vue 的响应式系统只监控在初始化时定义的属性。
始终遵循单向数据流和 Vue 的设计原则会使你的应用更加健壮和易于维护
