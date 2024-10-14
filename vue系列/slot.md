### slot

**允许开发者在 Vue 组件中灵活地分发和自定义内容，提高组件的复用性和可定制性**

1. 普通插槽 （普通插槽的渲染作用域是在父组件中）
   <my-component>
      <div>hello</div>
   </my-component>

- 在解析组件时，Vue 会将组件的子节点（children）放入组件选项（componentOptions）上，作为虚拟节点的一个属性。

```js
{
  tag: 'my',
  componentOptions: {
    children: [
      {
        tag: 'div',
        text: 'hello'
      }
    ]
  }
}

```

- 当 Vue 解析这个组件时，插槽内容会被放入组件的 componentOptions.children 中。
  这意味着父组件的插槽内容（例如 <div>hello</div>）实际上是存储在父组件的上下文中
  当子组件 MyComponent 被创建时，Vue 会将父组件中定义的插槽内容存储在 $slots 对象中。子组件可以通过 $slots.default 来访问这些插槽内容
- 渲染插槽内容： Vue 会将 $slots.default 中的虚拟节点转换为实际的 DOM 元素，并插入到子组件模板中 <slot> 标签的位置

```js
Vue.extend = function (options) {
  const Super = this; // 当前 Vue 构造函数
  const Sub = function VueComponent(options) {
    // 组件的初始化逻辑
    this._init(options); // 调用 init 方法
  };

  // 继承父类的原型
  Sub.prototype = Object.create(Super.prototype);
  Sub.prototype.constructor = Sub;

  // 合并选项，设置组件的名称、混入等
  Sub.options = mergeOptions(Super.options, options);

  return Sub; // 返回构造器
};

// 组件的初始化逻辑
function init(vm, options) {
  vm.$options = options; // 设置选项
  initState(vm); // 初始化状态
  initRender(vm); // 初始化渲染
}

// 渲染相关的初始化
function initRender(vm) {
  const options = vm.$options;

  // 初始化插槽
  vm.$slots = resolveSlots(options._renderChildren, vm);

  // 创建渲染函数
  vm._vnode = null; // 组件的虚拟节点
  vm._staticTrees = null; // 静态树
}

// 解析插槽的函数
function resolveSlots(children, context) {
  const slots = Object.create(null); // 创建一个空对象来存储插槽内容

  if (!children) {
    return slots; // 如果没有子节点，返回空插槽
  }

  // 遍历子节点并分类
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    const slotName = child.data && child.data.slot; // 获取插槽名称

    if (slotName) {
      // 如果有命名插槽，将其添加到 slots 对象中
      if (!slots[slotName]) {
        slots[slotName] = [];
      }
      slots[slotName].push(child);
    } else {
      // 默认插槽
      if (!slots.default) {
        slots.default = [];
      }
      slots.default.push(child);
    }
  }
  return slots; // 返回插槽对象
}
```

<div>
    <slot :msg="msg"></slot>
</div>

2. 具名插槽 多了个名字
   <my-component>
   <template v-slot:header>
   <h1>Header Content</h1>
   </template>
      <template v-slot:footer>
   <h1>Footer Content</h1>
      </template>
   </my-component>

```js
{
  tag: 'my',
  componentOptions: {
    children: [
      {
        tag: 'div',
        children: [
          {
            tag: 'template',
            attrs: { slot: 'header' },
            children: [
              {
                tag: 'h1',
                text: 'Header Content'
              }
            ]
          }
        ]
      },
      {
        tag: 'div',
        children: [
          {
            tag: 'template',
            attrs: { slot: 'footer' },
            children: [
              {
                tag: 'h1',
                text: 'Footer Content'
              }
            ]
          }
        ]
      }
    ]
  }
}

```

3. 作用域插槽 （渲染插槽的作用域在子组件中）

<my-component v-slot="{ msg }">
    <div>{{ msg }}</div>
</my-component>

- 作用域插糟渲染的时候不会作为 children，将作用域插槽做成了一个属性 scopedslots

```js
{
  tag: 'my',
  componentOptions: {
    scopedSlots: {
      default: function ({ msg }) {
        return {
          tag: 'div',
          children: [
            {
              tag: 'div',
              text: msg // 这里的 msg 是 'Hello from scoped slot'
            }
          ]
        };
      }
    },
    children: [] // children 为空，因为插槽内容是通过 scopedSlots 渲染的
  }
}

```

- 制作一个映射关系

```js
    $scopedSlots = {
        default: function ({ msg }) {
            return c('div', {}, [v(_s(msg))]);
        }
    }
    在这个映射中，default 是插槽的名称，function ({ msg }) 是一个函数，接收一个包含 msg 的对象并返回一个虚拟节点（Virtual Node）

```

- 当渲染组件的模板时，Vue 会根据插槽的名称找到对应的渲染函数，并将数据传递给这个函数。生成的虚拟节点会替换插槽的默认内容
<div>
    <slot :msg="msg"></slot>
</div>
