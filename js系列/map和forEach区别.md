# map 和 forEach 区别

forEach：遍历数组、执行副作用，无返回值；回调中修改会改变原数组。

map：纯函数，不改原数组，返回新数组；不需新数组时，用 forEach 更高效