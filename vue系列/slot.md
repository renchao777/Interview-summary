### slot

**允许开发者在 Vue 组件中灵活地分发和自定义内容，提高组件的复用性和可定制性**

1. 普通插槽 （普通插槽的渲染作用域是在父组件中）
<my-component>
    <div>hello</div>
</my-component>

- 在解析组件时，Vue 会将组件的子节点（children）放入组件选项（componentOptions）上，作为虚拟节点的一个属性。
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

- v.$options.renderChildren 中，同时创建一个映射表，将这些子节点放入 v.$slots 中。最终的结果会被赋值到 vm.$scopedSlots 中，形如 vm.$scopedSlots = { fa: fn, b: fn, default: fn }，其中 fn 是渲染函数。
- 在渲染组件时，Vue 会调用 \_t 方法，此时它会在 vm.$scopedSlots 中查找对应的渲染函数并调用，来生成插槽的内容。
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

3. 作用域插槽 （渲染插槽的作用域在子组件中）

<my-component v-slot="{ msg }">
    <div>{{ msg }}</div>
</my-component>

- 作用域插糟渲染的时候不会作为children，将作用域插槽做成了一个属性scopedslots
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
- 制作一个映射关系 
    $scopedSlots = {
        default: function ({ msg }) {
            return c('div', {}, [v(_s(msg))]);
        }
    }
    在这个映射中，default 是插槽的名称，function ({ msg }) 是一个函数，接收一个包含 msg 的对象并返回一个虚拟节点（Virtual Node）
- 当渲染组件的模板时，Vue 会根据插槽的名称找到对应的渲染函数，并将数据传递给这个函数。生成的虚拟节点会替换插槽的默认内容
<div>
    <slot :msg="msg"></slot>
</div>


