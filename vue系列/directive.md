# directive

允许开发者为 DOM 元素定义特定的行为，以便在特定条件下进行操作

**自定义指令就是用户定义好对应的钩子，当元素在不同的状态时会调用对应的钩子(所有的钩子会被合并到 cbs 对应的方法上， 到时候依次调用)**

## 1.注册全局指令

- 当您使用 Vue.directive 注册一个自定义指令时，它会将该指令添加到 Vue.options.directives 中。
  这样做使得该指令可以在应用程序的任何组件中被访问和使用

## 2. 模板编译

- Vue 在编译组件模板时，会解析模板字符串，生成对应的虚拟 DOM（VNode），生成会将指令解析并存储在 data.directives 中

```js
<template>
  <div v-background="'red'">This is a div with a red background.</div>
</template>
```

创建虚拟 DOM

```js
{
  tag: 'div',
  data: {
    directives: [
      {
        name: 'background',
        value: "'red'", // 绑定的值
        inserted: directiveHooks.inserted,
        update: directiveHooks.update,
      },
    ],
  },
  children: [],
}
```

## 3. 从全局属性中获取指令

- Vue 会在虚拟 DOM 中查找指令数组，并根据指令名称查找其定义

```js

解析后的虚拟 dom
{
  tag: 'div',
  data: {
    directives: [
      {
        name: 'background',
        value: "'red'", // 初始绑定的值
        inserted: [Function], // 指令的插入钩子
        update: [Function]   // 指令的更新钩子
      }
    ],
  },
  children: [],
}
```

## 4.执行指令钩子

- 在获取到指令定义后，元素在不同的状态下会调用对应的钩子（如 inserted 或 update），以执行相关的钩子函数

  插入阶段
  钩子：当一个元素被插入到 DOM 中时，Vue 会调用 inserted 钩子。
  更新阶段
  当元素重新渲染时，update 钩子会被触发，调用指令的更新钩子，更新背景颜色

```js
function patch(vnode, parentElm) {
  // 创建实际的 DOM 元素
  const el = document.createElement(vnode.tag); // 创建对应的元素

  // 处理指令
  invokeDirectiveHook("inserted", vnode); // 调用 inserted 钩子

  // 设置元素的其他属性和内容
  el.innerHTML = vnode.children.join(""); // 如果有子节点，设置内容

  // 将创建的元素添加到父元素中
  parentElm.appendChild(el);
}

function invokeDirectiveHook(hook, vnode) {
  const directives = vnode.data.directives; // 获取指令数组
  const cbs = {}; // 存储钩子函数

  if (directives) {
    for (let i = 0; i < directives.length; i++) {
      const { name, value } = directives[i];
      const dirDef = Vue.options.directives[name]; // 从全局属性中获取指令定义

      if (dirDef && dirDef[hook]) {
        if (!cbs[hook]) {
          cbs[hook] = []; // 确保 cbs 对象中有对应的钩子数组
        }
        cbs[hook].push((el) => {
          dirDef[hook](el, { value }); // 调用指令钩子
        });
      }
    }
  }

  // 执行钩子函数
  if (cbs[hook]) {
    for (let i = 0; i < cbs[hook].length; i++) {
      cbs[hook][i](/* 这里传入需要操作的 DOM 元素 */);
    }
  }
}
```
