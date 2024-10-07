### directive

允许开发者为 DOM 元素定义特定的行为，以便在特定条件下进行操作

- 自定义指令就是用户定义好对应的钩子，当元素在不同的状态时会调用对应的钩子(所有的钩子会被合并到 cbs 对应的方法上， 到时候
  依次调用)

创建的虚拟dom
{
  tag: 'div',
  data: {
    directives: [
      {
        name: 'background',
        value: "'red'",
        inserted: [Function], // 指令的钩子函数
        update: [Function] // 指令的更新钩子函数
      }
    ],
    // 其他属性...
  },
  children: [],
  // ...
}

// src/core/vdom/patch.js

function invokeDirectiveHook(hook, vnode) {
  const directives = vnode.data.directives; // 从 VNode 中获取指令
  const cbs = {}; // 确保 cbs 对象的存在

  if (directives) {
    for (let i = 0; i < directives.length; i++) {
      const { name, value } = directives[i];
      const dirDef = Vue.options.directives[name]; // 获取指令定义

      if (dirDef && dirDef[hook]) {
        // 将指令钩子合并到 cbs 对象
        if (!cbs[hook]) {
          cbs[hook] = []; // 确保 cbs 对象中有对应的钩子数组
        }
        cbs[hook].push((el) => {
          dirDef[hook](el, { value }); // 调用指令钩子
        });
      }
    }
  }

  // 这里可以添加代码来执行 cbs 中的钩子
  if (cbs[hook]) {
    for (let i = 0; i < cbs[hook].length; i++) {
      cbs[hook][i](/* 这里传入需要操作的 DOM 元素 */);
    }
  }
}
