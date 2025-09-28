# CSS 伪类和伪元素有哪些，它们的区别和实际应用

1. 伪类

伪类用于描述元素的特殊状态，它们通常用于选择在特定状态下的元素，比如被用户交互后改变的状态。

常见的伪类： 伪类以冒号 : 开头

```cs
a:hover {
    color: blue;
}
input:focus {
    border-color: green;
}
button:active { // 元素正被用户激活
    background-color: red;
}
```

()：选择特定的子元素

```cs
li:nth-child(2) {
    color: orange;
}
p:first-child {
    font-weight: bold;
}
```

2. 伪元素

伪元素用于创建元素的部分或插入内容。它们允许对元素的某一部分进行样式化，伪元素以 :: 开头

常见的伪元素

::before：在元素的内容之前插入内容。

```cs
h1::before {
    content: "Prefix: ";
}
```

::after：在元素的内容之后插入内容

```cs
p::after {
    content: " (Read more)";
}
```
