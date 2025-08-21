# Vue 3 与 Vue2 的区别

- 从底层机制上来讲
  vue3 重写了 dom-diff 算法，只是比较动态节点，跳过静态节点（内容不会变化的标签），大大提高了视图编译的速度
  利用了 webpack 中的 tree shaking 机制，只打包用到的模块（按需打包），降低了打包后的文件体积
  响应式操作原理，放弃了 vue2 中的 Object.defineproperty,采用了 es6 的 Proxy 进行数据劫持

  - 更加方便：不用区分数组对象，都基于 Proxy 做处理即可
  - 性能更高：无需迭代每一项分别劫持，直接对整个对象做劫持
  - 功能更强：除了传统的 get/set 劫持
    get：拦截对对象属性的访问。
    set：拦截对对象属性的赋值。
    deleteProperty：拦截属性的删除操作。
    has：拦截 in 操作符的调用，检查属性是否存在。
    defineProperty：拦截对属性的定义。
    ownKeys：拦截获取对象所有键的操作，如 Object.keys()

- 从语法上来讲
  vue3 完全兼容 vue2 的语法，只不过不在具备 vue 这个类，[每个组件不再是 vue 的子类，组件的 this 不再是 vue 的实例]
  把之前 vue.Prototype 上的属性方法，作为 this 私有的属性方法
  vue3 也提供了几乎完全不同于 vue2 的语法[推荐]
  - 基于 composition API（聚合式 API） 替代 options API（配置项 API） 所有代码都写在<script setup>脚本中
  - 全面采用函数式编程，需要实现什么样的效果都从 vue 中解构出来 例如：
    ref、reactive、computed、watch、watchEffect、provide/inject
  - 重新定义钩子函数: onBeforeMount/onMount/onBeforeUpdate/onUpdate/onBeforeUnmount/onUnmount
  - 自定义指令内部的钩子函数也改为和周期函数相匹配的名字

reactive 是基于 Proxy 做的数据劫持

ref 是基于 Object.defineproperty 做的数据劫持
