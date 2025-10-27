# grid 布局

**Grid 是 CSS 的 二维布局，能同时控制行和列，比 flex 更适合做整体布局**

## 实际运用

卡片网格：比如电商的商品列表、图片墙

## 核心属性(在父容器上定义网格)

display: grid
grid-template-columns: ...;
grid-template-rows: ...;
gap: ...;

## 例子

```cs
.container {
  display: grid;
  /* 自动生成列，每列最小200px，最大占满空间 */ fr 可分配空间的一份
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-template-columns: repeat(3, 1fr); /* 三列等宽 */
  gap: 16px; /* 行列间距 */
  padding: 16px;
}

.item {
  background: #f2f2f2;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
}
```