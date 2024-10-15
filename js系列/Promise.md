# Promise

**Promise 是 JavaScript 中用于处理异步操作的一种机制。它可以让我们更加优雅地管理异步任务，而不用依赖传统的回调函数**

Promise 有三种状态

Pending（待定）：表示 Promise 尚未完成
Fulfilled（已完成）：异步操作成功，返回了一个值
Rejected（已失败）：异步操作失败，返回了一个错误

状态一旦改变，就不可再变（即从 Pending 转换为 Fulfilled 或 Rejected 后就不会再改变）

## Promise 解决了什么问题

回调地狱：当多个异步操作嵌套时，回调函数会变得层层嵌套，导致代码难以维护，称为“回调地狱”

错误处理分散：传统回调函数的错误处理通常需要在每个回调函数里单独处理，代码容易冗长

通过 Promise，异步操作可以通过链式调用进行处理，每一步异步操作的结果可以传递到下一个 then() 中，并且错误可以统一使用 catch() 处理

## 原理

**Promise 机制的核心在于事件循环（Event Loop）和微任务队列（Microtask Queue），它们一起构成了 JavaScript 的异步执行模型**

1. 在创建一个 Promise 实例时，我们传入一个执行器函数（executor），该函数会立即执行，并接受两个参数：resolve 和 reject。这两个参数都是函数，分别用于处理成功和失败的结果

   状态转换：
   当异步操作成功时，调用 resolve(value)，Promise 的状态从 Pending 转为 Fulfilled。
   当异步操作失败时，调用 reject(error)，Promise 的状态从 Pending 转为 Rejected。

2. 在 Promise 的实现中，通常会维护两个队列：

   成功回调队列（resolve queue）：存储所有 then() 中注册的成功回调
   失败回调队列（reject queue）：存储所有 catch() 中注册的失败回调

3. 当 Promise 的状态发生变化时，并不会立即执行注册的回调，而是将这些回调放入微任务队列。微任务队列中的任务会在当前执行栈清空后立即执行，因此确保在下一个事件循环迭代之前处理。

   注意：不是 then() 方法直接在状态改变后执行，而是 then() 中的回调函数在状态改变后执行。即，then() 注册的回调会在 Promise 状态改变时被放入微任务队列

4. then() 和 catch()
   then() 和 catch() 方法都会返回一个新的 Promise。这意味着我们可以链式调用 then() 和 catch()，而且每个 then() 和 catch() 的返回值都将被传递到下一个 then() 中

   每次调用 then() 或 catch() 时，内部会收集成功和失败的回调，并将它们放入微任务队列中。这使得 Promise 链可以灵活处理多个异步操作的结果
