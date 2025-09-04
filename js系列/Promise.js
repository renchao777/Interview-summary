class AlleyPromise {
  // 1、Promise三种状态
  static PENDING = "PENDING";
  static FULFILED = "FULFILED";
  static REJECTED = "REJECTED";

  // 注意：不是then函数在状态改变后执行，而是then中的回调函数在状态改变后执行。
  // then方法会将其中的回调放入执行队列，promise的状态改变后再将队列中的函数一一执行

  constructor(callback) {
    // 容错处理
    if (typeof callback !== "function") {
      throw new TypeError("Promise resolver undefined is not a function");
    }

    // 初始状态
    this.promiseStatus = AlleyPromise.PENDING;

    // 定义resolve函数队列 reject函数队列
    this.resolveQueues = [];
    this.rejectQueues = [];

    //定义初始值
    this.value;

    //调用callback函数
    callback(this._resolve.bind(this), this._reject.bind(this));
  }
  // 规范中要求then中注册的回调以异步方式执行，保证在resolve执行所有的回调之前，
  // 所有回调已经通过then注册完成
  _resolve(val) {
    if (this.promiseStatus !== AlleyPromise.PENDING) return;
  
    this.promiseStatus = AlleyPromise.FULFILED;
    this.value = val;
  
    // 遍历回调队列，使用微任务执行
    while (this.resolveQueues.length) {
      const handler = this.resolveQueues.shift();
      queueMicrotask(() => handler(this.value));
    }
  }
  
  _reject(val) {
    if (this.promiseStatus !== AlleyPromise.PENDING) return;
  
    this.promiseStatus = AlleyPromise.REJECTED;
    this.value = val;
  
    while (this.rejectQueues.length) {
      const handler = this.rejectQueues.shift();
      queueMicrotask(() => handler(this.value));
    }
  }
  then(resolveHandler, rejectHandler) {
    return new AlleyPromise((resolve, reject) => {
      function newResolveHandler(val) {
        // 首先判断 resolveHandler是否是一个函数
        if (typeof resolveHandler === "function") {
          /*
             获取resolveHandler 函数的返回值进行判断
             如果是promise则继续.then，不是则直接将结果返回
             */
          let result = resolveHandler(val);
          if (result instanceof AlleyPromise) {
            result.then(resolve, reject);
          } else {
            resolve(result);
          }
        } else {
          resolve(val);
        }
      }

      function newRejectHandler(val) {
        if (typeof rejectHandler === "function") {
          let result = rejectHandler(val);
          if (result instanceof AlleyPromise) {
            result.then(resolve, reject);
          } else {
            reject(result);
          }
        } else {
          reject(val);
        }
      }

      this.resolveQueues.push(newResolveHandler);
      this.rejectQueues.push(newRejectHandler);
    });
  }
  catch(rejectHandler) {
    return this.then(undefined, rejectHandler);
  }
  static all(iterable) {
    const promises = Array.from(iterable);
    const len = promises.length;
    let n = 0;
    const results = new Array(len);
  
    return new AlleyPromise((resolve, reject) => {
      if (len === 0) return resolve([]);
  
      promises.forEach((item, index) => {
        AlleyPromise.resolve(item)
          .then(val => {
            results[index] = val;
            n++;
            if (n === len) resolve(results);
          })
          .catch(reject)
      })
    })
  }
  static race(iterator) {
    return new AlleyPromise((resolve, reject) => {
      iterator.forEach((item) => {
        AlleyPromise.resolve(item)
          .then((val) => {
            resolve(val);
          })
          .catch((e) => {
            reject(e);
          });
      });
    });
  }
  static resolve(val) {
    return new AlleyPromise((resolve) => {
      resolve(val);
    });
  }
  static reject(val) {
    return new AlleyPromise((resolve, reject) => {
      reject(val);
    });
  }
}

// promise.all 原理

接收一个请求数组,返回一个新的promise,内部会循环这个数据,把每个请求都包装成promise并执行.
每个请求成功后把结果存储到数组中,同时计数器累加,当计数器等于请求数组长度时就统一resolve结果数组
如果过程中有一个请求失败立刻reject;