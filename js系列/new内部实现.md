# new 内部实现

**new 内部做三件事：创建新对象并继承构造函数原型，调用构造函数绑定 this，返回新对象**

```js
function myNew(Constructor, ...args) {
    // 1. 创建一个新对象，并继承构造函数的原型
    const obj = Object.create(Constructor.prototype);

    // 2. 调用构造函数，绑定 this
    Constructor.apply(obj, args);

    // 3. 返回新对象
    return obj
}
```