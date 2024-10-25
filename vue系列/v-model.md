# v-model 概述

**v-model 是 Vue 的语法糖，简化了表单和组件之间的双向绑定实现**。具体来说，它是对以下两个指令的封装：

```js
v-bind:value="inputValue"
v-on:input="inputValue = $event"
<ChildComponent v-bind:value="inputValue" v-on:input="inputValue = $event" />
```

# 工作原理

1. 双向绑定的机制：v-model 不仅在父组件和子组件之间传递数据，还能自动更新父组件中的数据。
   每当子组件内部的输入改变时，触发 input 事件，父组件接收到更新并相应地修改其数据

```js
<template>
  <input class="input" :value="value" @input="updateValue"></input>
</template>

<script>
export default {
  // 1. 接受父级传递的值
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  methods: {
    updateValue(event) {
      this.$emit('input', event.target.value); // 触发 input 事件并传递新值
    }
  }

}
</script>
```
