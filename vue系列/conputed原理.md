# computed 原理

**在 Vue.js 中，computed 属性（计算属性）是一种根据响应式依赖自动计算其值的属性。计算属性的核心原理包括依赖追踪、懒执行、缓存机制、Watcher 机制**

```js
computed: {
   xxx () {
      return this.xx + 1
   }
}
xxx:{
   //getter
   get:function(){
      return this.xx + 1
   },
   //setter
   set:function(newValue){
      this.xx = 16
   }
}

```

## 1. 创建 Computed 计算属性

- 计算属性的实现基于 Object.defineProperty。
  在初始化计算属性时，Vue 会通过 initComputed 函数为每个计算属性创建一个独立的 Watcher

## 2. 依赖追踪

- 当计算属性被定义时，Vue 会执行计算属性的 getter 方法，并在执行过程中追踪所有用到的响应式数据（即依赖）。
  这些依赖的数据会将计算属性的 Watcher 注册到它们的依赖列表中（dep），以便当依赖的数据发生变化时，Vue 知道需要重新计算该计算属性的值

## 3. 计算属性的懒执行

- Vue 中的计算属性是惰性求值的，即懒执行。计算属性的 getter 只有在依赖的 data 属性发生变化，
  并且计算属性的值被视图或其他代码访问时，才会重新执行。如果计算属性的值没有被视图层或其他代码访问，
  则即使依赖的数据发生了变化，计算属性也不会立即重新计算

## 4. 缓存 Computed 值

- 为了优化性能，Vue 对计算属性的值进行缓存管理，避免不必要的重复计算。其缓存机制如下：
  首次访问：计算属性第一次被访问时，Vue 会执行其 getter 方法，计算结果并缓存，同时将 dirty 状态设为 false
  依赖变化：当计算属性的依赖发生变化时，计算属性的 Watcher 会被触发，将 dirty 状态设为 true，表示缓存已失效

  再次访问：在计算属性再次被访问时，Vue 会检查 dirty 状态：
  如果 dirty 为 false，直接返回缓存值
  如果 dirty 为 true，重新执行 getter 方法计算新的值并更新缓存

## 5. 更新 Computed 值

- 当响应式数据发生变化时，两个 Watcher 会配合工作：

  数据变化：当依赖的响应式数据变化时，计算属性的 Watcher 被标记为“脏”，普通渲染 Watcher 被触发
  异步渲染：在异步渲染过程中，如果在组件中取值计算属性，它会被重新计算并更新缓存值
  视图更新：这时，Vue 会根据计算属性的新值更新 DOM，确保视图反映最新状态
