# flex 布局

**是一种用于构建响应式布局的 CSS 布局模型，旨在为容器内的元素提供灵活的排列方式。它能够适应各种屏幕尺寸和方向变化，简化了居中、对齐、分布空白空间的操作**

# flex 里面的属性

## 容器的属性

1. flex-direction

决定「主轴的方向」（即项目的排列方向）

row（「默认值」）：主轴为水平方向，起点在左端

row-reverse：主轴水平方向，起点在右端

column： 主轴为垂直方向，起点在上沿

column-reverse：主轴为垂直方向，起点在下沿

2. flex-wrap

flex-warp 属性定义，如果一条轴线排不下，如何换行

nowrap（「默认」）：默认不换行

wrap：换行，第一行在上方

wrap-reverse：换行，第一行在下方

3. flex-flow

flex-flow 属性是 flex-direction 属性和 flex-wrap 属性的简写，默认值为 row nowrap

4. justify-content

justify-content 属性定义了项目在主轴上的对齐方式

flex-start（「默认值」）：左对齐

flex-end：右对齐

center：居中

space-between：两端对其，项目之间的间隙都相等

space-around：每个项目两侧的间隙相等。所以「项目之间的间隔比项目与边框的间隔大一倍」

5. align-items

align-items 属性定义项目在交叉轴上如何对齐

stretch（「默认值」）：如果项目未设置高度或设置为 auto,将「占满整个容器的高度」

flex-start：交叉轴的起点对齐

flex-end：交叉轴的终点对齐

center：交叉轴的中心对齐

baseline：项目的第一行文字的基线对齐

6. align-content

align-content 属性定义了多根轴线的对齐方式

## 项目的属性

1. order

order 属性定义项目的排列顺序
数值越小越靠前，默认为 0

2. flex-grow

flex-grow 属性定义项目得「放大比例」

**默认为 0，即如果存在剩余空间，也不放大**

如果所有项目的 flex-grow 属性都为 1，则它们将**等分剩余空间**

3. flex-shrink

flex-shrink 属性定义了项目得「缩小比例」

**默认为 1，即如果空间不足，该项目将缩小**

如果所有项目的 flex-shrink 属性都为 1，当空间不足时，都将「等比例缩小」

4. flex-basis

flex-basis 属性定义了在「分配多余空间之前」项目占据的主轴空间

浏览器根据这个属性，计算主轴是否有多余空间

**它的默认值为 auto，即项目本来的大小**

5. flex

flex 属性时 flex-grow，flex-shrink 和 flex-basis 的缩写，「默认值为 0 1 auto」。

flex：1 = flex 1 1 0%

flex：auto = flex：1 1 auto

6. align-self

控制单个项目在交叉轴上的对齐方式

auto: 默认值，继承父容器的 align-items 设置
flex-start: 项目顶部对齐
flex-end: 项目底部对齐
center: 项目在交叉轴上居中对齐
baseline: 项目第一行文字的基线对齐
stretch: 项目在交叉轴上拉伸以填充容器的高度（默认值）

### flex:1 vs flex:auto

flex:1 和 flex:auto 的区别，可以归结于 flex-basis:0 和 flex-basis:auto 的区别

当设置为 0 时（「绝对弹性元素」），此时相当于告诉 flex-grow 和 flex-shrink 在伸缩的时候不需要考虑我的尺寸

当设置为 auto 时（「相对弹性元素」），此时则需要在伸缩时将元素尺寸纳入考虑

### Flex 如何实现三栏布局

左右设置 flex: 0 1 200px;中间设置 flex：1 父元素设置 flex 布局
