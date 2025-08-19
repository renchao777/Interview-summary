### Vue.set 是如何实现的

**Vue.set 方法是 vue2 中的一个补丁方法（正常我们给对象添加属性是不会触发更新的，数组无法监听索引和长度）**

#### 实现原理

1. 数组的响应式处理：当我们使用 Vue.set(arr, index, value) 时，Vue 会调用数组的 splice 方法，因为 Vue 已经对数组的方法（如 push, splice 等）做了代理，这样就可以确保修改数组时依旧可以触发更新
2. 对象的响应式处理：Vue.set(target, key, value) 方法用于为已有的响应式对象添加新属性，并使其变为响应式，
    1.检查目标对象是否响应式（通过 __ob__ 属性）
    2.使用 defineReactive 为新属性设置响应式 getter 和 setter使其能够被 Vue 的响应式系统监控
    3.调用 dep.notify() 手动触发依赖更新，确保视图能够反映新属性的变化

// 实现部分伪代码
```js
Vue.set = function (target, key, value) {
  // 检查目标对象是否响应式
  if (target.__ob__) {
    // 如果是响应式对象，使用 defineReactive 设置新属性
    defineReactive(target, key, value);
    // 手动触发更新
    target.__ob__.dep.notify();
  } else {
    // 如果不是响应式对象，直接添加新属性
    target[key] = value;
  }
};
```