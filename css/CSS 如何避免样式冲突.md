# CSS 如何避免样式冲突

1. css Scoped

scoped css 会对当前组件（scope）下所有的元素生成唯一的属性或类名，对所有 CSS 规则将携带唯一属性实现作用域的命名保护

2. CSS Module

module css 会对类名进行 hash 化

3. 增加样式的命名空间

在类名前添加一个命名空间，确保类名的唯一性

```js
.myApp__component__button {
  /* 样式 */
}
```
