### ES6 迭代器

**迭代器顾名思义就是从一个集合中把元素一个个取出来，其实 es6 的迭代器是 es6 出的一个迭代器规范，在 ES6 引入迭代器之前，我们可以使用 ES5 的方法实现一个迭代器。按照这个规范，我们可以创建一个函数，并在其中实现一个 next 方法，该方法返回一个包含当前值和迭代是否完成状态的对象,value（当前迭代的值）和 done（一个布尔值，指示迭代是否完成）**

```js
function createIterator(array) {
  var index = 0; // 迭代器的索引
  return {
    next: function () {
      if (index < array.length) {
        return { value: array[index++], done: false };
      } else {
        return { done: true };
      }
    },
  };
}
```

// 创建一个数组的迭代器
var iterator = createIterator([1, 2, 3]);

console.log(iterator.next()); // { value: 1, done: false }
console.log(iterator.next()); // { value: 2, done: false }
console.log(iterator.next()); // { value: 3, done: false }
console.log(iterator.next()); // { done: true }

- 其实很多的原生 JavaScript 中的字符串、数组、Set、Map 以及 DOM 元素的集合（如 NodeList、HTMLCollection）都实现了 Symbol.iterator 接口，因此它们可以用于构建迭代器，我们可以在控制台输出一个原生对象，比如 array 他的原型属性里面就有一个 Symbol.iterator 迭代器方法，我们可以用这个方法来构造迭代器，从而逐步访问数组中的元素，当然我们可以利用 es6 提供了一个方法叫生成器，generator 来构建一个迭代器 就是 funcutin \* 一个普通的函数，里面通过 yield 来暂停某一行代码，那么会得到一个迭代器，我们可以用 next 来执行这个迭代器

内置迭代器

```js
const array = [1, 2, 3];
for (const item of array) {
  console.log(item); // 输出: 1, 2, 3
}
```

```js
const array = [10, 20, 30];

// 使用 Symbol.iterator 创建迭代器
const iterator = array[Symbol.iterator]();

console.log(iterator.next()); // { value: 10, done: false }
console.log(iterator.next()); // { value: 20, done: false }
console.log(iterator.next()); // { value: 30, done: false }
console.log(iterator.next()); // { value: undefined, done: true }
```

// generator 生成器函数实现迭代器

```js

function\* generator() {
yield 1;
yield 2;
yield 3;
}

const gen = generator();
console.log(gen.next()); // { value: 1, done: false }
console.log(gen.next()); // { value: 2, done: false }
console.log(gen.next()); // { value: 3, done: false }
console.log(gen.next()); // { value: undefined, done: true }

```

其实我们平时用到的，async/await，其实它里面就用到了一些迭代器的实现， 提供了一种让异步代码看起来像同步代码的语法。虽然它背后依赖的是 Promise，但它的行为与迭代器有一些相似之处。await 会暂停函数的执行，直到 Promise 完成后才继续执行，类似于迭代器调用 next 方法
