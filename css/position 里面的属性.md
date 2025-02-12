# position 里面的属性

**position 属性规定元素的定位类型**
说明：这个属性定义建立元素布局所用

任何元素都可以定位

1. 「绝对或固定元素会生成一个块级框」而不论该元素本身是什么类型
2. 「相对定位元素」会相对于它的正常流中的「默认位置」偏移

## 可选值如下

1. static 默认值）没有定位，元素出现在正常流中（忽略 left,top,right,bottom 或者 z-index 声明）

2. relative 定位（相对定位）position：relative

**相对本元素的左上角进行定位**，top，left，bottom，right 都可以有值。虽然经过定位后，位置可能会移动，
**但是本元素并没有脱离文档流**，还占有原来的页面空间。可以设置 z-index。使本元素相对于文档流中的元素，
或者脱离文档流但是 z-index 的值比本元素的值要小的元素更加靠近用户视线。

相对定位最大的作用是为了实现某个元素相对于本元素的左上角绝对定位，本元素需要设置 position: relative.

3. absolute 定位（绝对定位）position：absoute

**相对于最近的具有非 static 定位（即 relative、absolute、fixed 或 sticky）的祖先元素进行定位**。
如果没有这样的祖先元素，则会相对于初始包含块

是指该祖先元素的 position 属性被设置为 relative、absolute、fixed 或 sticky 之一

**绝对定位是脱离文档流的，与浮动定位一样的效果，会压在非定位元素的上方**。可以设置 z-index 属性。

4. fixed 生成绝对定位，相对于浏览器窗口

5. sticky 粘性定位

**相对于最近的一个拥有滚动机制的祖先上（前提是祖先的 overflow 属性不是 visible）**。
在没有达到粘性偏移量时，表现类似于 position: relative；一旦页面滚动超出设定的偏移量时，
元素就会固定在目标位置，类似于 position: fixed

### 块级框

块级框是由块级元素（block-level elements）生成的布局框

1. 独占一行

2. 可以设置宽度和高度

3. 可以使用内边距和外边距

块级框可以设置上下左右的内边距（padding）和外边距（margin），这些属性会影响块级框在页面上的位置和大小。

4. 可以包含其他块级或行内元素
