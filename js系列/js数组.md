# js 数组方法

1.  reduce 不改变原数组,有返回值

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

2. filter 不会改变原数组, 有返回值

```js
const users = [
  { name: '哥', active: true },
  { name: '幻方', active: false },
  { name: '程序员', active: true }
]

const activeUsers = users.filter(user => user.active)
```

### 数组和map的区别

map

{'a' => 1, 'b' => 2, 3 => '数字键', {…} => '对象键'}

set

{1, 2, 'hello', {…}}

1. 键和索引：数组是通过整数索引访问元素，Map 可以用任意类型的键访问值，而 Set 没有键，只有值。

2. 唯一性：数组可以有重复元素，Map 的键唯一但值可以重复，Set 中的值是唯一的，重复值会被自动去重。

3. 顺序：三者都保持插入顺序，但数组按索引，Map 和 Set 按插入顺序遍历。

4. 访问和查找效率：数组按索引访问是 O(1)，查找值是 O(n)，Map 和 Set 按键或按值查找平均是 O(1)。

5. 操作方法：数组用 push 添加、splice 删除，Map 用 set 添加、delete 删除，Set 用 add 添加、delete 删除。

6. 获取大小：数组用 .length，Map 和 Set 用 .size