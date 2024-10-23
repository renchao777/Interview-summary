# js 数组方法

1.  reduce

    array.reduce(callback(accumulator, currentValue)[, initialValue])
    callback: 必需。一个函数，接收以下参数：

    accumulator: 累加器，保存上一次调用回调函数的返回值。
    currentValue: 当前正在处理的数组元素。
    initialValue: 初始值

## 数组去重

```js
const data = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 1, name: "Alice" },
  { id: 3, name: "Charlie" },
];

const uniqueData = data.reduce((acc, curr) => {
  const exists = acc.find((item) => item.id === curr.id);
  if (!exists) {
    acc.push(curr);
  }
  return acc;
}, []);

console.log(uniqueData);
```

## 扁平化

```js
const flattenArray = (arr) => {
  return arr.reduce((acc, item) => {
    return acc.concat(Array.isArray(item) ? flattenArray(item) : item);
  }, []);
};

const nestedArray = [1, [2, [3, 4]], 5];
const flattened = flattenArray(nestedArray);
console.log(flattened);
```
