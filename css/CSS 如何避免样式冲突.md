# CSS 如何避免样式冲突

1. css Scoped

在 Vue 单文件组件中，通过在 <style> 标签上添加 scoped 属性，Vue 会为每个 CSS 规则生成唯一的属性选择器，确保样式只作用于当前组件内的元素

```cs
.component[data-v-123456] {
  color: red;
}

```

2. CSS Module

module css 会对类名进行 hash 化

```js
{
  test: /\.module\.css$/,
  use: [
    'style-loader',
    {
      loader: 'css-loader',
      options: {
        modules: {
          localIdentName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  ]
}
```
3. 增加样式的命名空间

在类名前添加一个命名空间，确保类名的唯一性

```cs
.myApp__component__button {
  /* 样式 */
}
```
