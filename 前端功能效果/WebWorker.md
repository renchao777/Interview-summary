# Web Worker

**是一种在网页中创建多线程处理的技术，允许开发者将一些计算密集型的任务分离到后台线程中运行，从而避免阻塞主线程。主线程（GUI 线程）主要负责用户交互，DOM 操作等，如果执行复杂的 javaScript 代码，主线程可能会卡顿，导致页面响应慢。web worker 则可以将这些复杂任务放到后台独立运行，不影响页面性能。**

## web worker 的特点

1. 独立线程: web worker 运行在浏览器的独立线程中，与主线程（GUI 线程）分离

2. 无访问权限: worker 无法直接访问 DOM 元素，也无法操作主线程中的全局变量，但可以通过消息传递（message passing）与主线程通信

3. 数据传递：主线程与 worker 通过 postMessage() 和 onmessage 事件机制进行通信。数据的传递时通过消息序列化的方式，不能直接共享内存 （SharedArrayBuffer 除外）避免了数据冲突和数据竞争

4. 适合任务：适合用于执行大数据处理，复杂计算等不会直接影响用户界面的任务

## 实现步骤

1. 创建 web worker 文件，将数据处理逻辑放入独立的文件中，例如 dataWorker.js

```js
self.onmessage = function (e) {
  const data = e.data
  // 执行数据处理逻辑
  const processedData = processData(data)

  // 返回处理后的数据
  self.postMessage(processedData)
}

function processData(data) {
  // 模拟数据处理逻辑
  return data.map((item) => ({
    ...item,
    processedField: item.someField * 2 // 例如双倍某个字段
  }))
}
```

2. 主线程启动 Web Worker

```js
export default {
  data() {
    return {
      largeDataSet: [], // 存放原始数据
      processedData: [] // 存放处理后的数据
    }
  },
  methods: {
    fetchData() {
      // 模拟接口获取数据
      fetch('/api/your-endpoint')
        .then((response) => response.json())
        .then((data) => {
          this.largeDataSet = data
          this.processDataInWorker(data)
        })
    },
    processDataInWorker(data) {
      // 创建 Web Worker 实例
      const worker = new Worker('path/to/dataWorker.js')

      // 使用结构化克隆，传递数据
      const clonedData = structuredClone(data) // 深拷贝数据
      // 将数据传递给 worker
      worker.postMessage(clonedData)

      // 处理 worker 返回的数据
      worker.onmessage = (e) => {
        this.processedData = e.data
        worker.terminate() // 处理完毕后终止 worker
      }
    }
  },
  created() {
    this.fetchData() // 组件创建时获取数据
  }
}
```

3. 组件中渲染处理后的数据

`<template>
  <el-table :data="processedData">
    <el-table-column prop="processedField" label="Processed Field"></el-table-column>
  </el-table>
</template>`

## 使用 webworker 与主线程通信传数据时，会有大量数据，同时数据反复传递的情况会造成消耗，要怎么优化

structuredClone 可以深度克隆对象，而不需要手动处理引用或循环引用。对于复杂数据结构，它可以避免额外的序列化和反序列化开销

