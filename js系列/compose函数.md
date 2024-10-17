# compose 函数

**在函数编程当中有一个很重要的概念就是组合函数，实际上就是把处理数据的函数像管道一样连接起来，然后让数据穿过管道得到最终的结果。**

简而言之:compose 可以把类似于 f(g(h(x)))这种写法简化成 compose(f，g，h)(x)

```js
const mul3 = x => x * 3;
const div2 = x => x / 2;
const add1 = x => x + 1; // 定义 add1 函数

const compose = function compose(...funcs) {
    let len = funcs.length;
    if (len === 0) return x => x;
    if (len === 1) return funcs[0];
     return function operate(x) {
        // 使用 reduceRight 从右到左应用函数
        return funcs.reduceRight((x, func) => func(x), x);
    };
    };
};

const operate = compose(div2, mul3, add1);
console.log(operate(0)); // 输出 3
console.log(operate(2)); // 输出 6

```

## 实际运用

1. 在处理数据时，通常会有多个步骤的转换和处理，compose 可以将这些步骤组合成一个函数链条，使代码更加清晰

```js
const toUpperCase = (str) => str.toUpperCase();
const exclaim = (str) => `${str}!`;
const repeat = (str) => `${str} ${str}`;

const compose =
  (...functions) =>
  (input) =>
    functions.reduceRight((acc, fn) => fn(acc), input);

const shout = compose(repeat, exclaim, toUpperCase);
console.log(shout("hello")); // 输出 "HELLO! HELLO!"
```
