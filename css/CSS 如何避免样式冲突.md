# CSS 如何避免样式冲突

1. css Scoped

Vue 在 <style scoped> 下，会为组件生成一个唯一的 scopeId，并在模板元素和对应的 CSS 选择器上都附加这个 scopeId，从而保证样式只作用于当前组件

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
