# css3 新特性

1. 选择器：CSS3 引入了更多的选择器，如 :nth-child(), :nth-of-type(), :not(), :first-of-type, :last-of-type 等，增强了对元素选择的灵活性和精确度。

2. 圆角（border-radius）：通过 border-radius 属性，可以轻松为元素添加圆角效果，支持单个角或四个角分别设置。

3. 阴影（box-shadow 和 text-shadow）：提供了文本阴影（text-shadow）和盒子阴影（box-shadow）的功能，增加视觉层次感，可以用于实现多种视觉效果，如浮动、嵌入、内凹等。

4. 2D 和 3D 变换（transform）：transform 属性不仅支持旋转（rotate）、缩放（scale）、倾斜（skew）等 2D 变换，还支持 3D 变换（rotateX, rotateZ 等），结合 transition 和 animation 可以创建平滑的动画效果。

5. 媒体查询（@media）：可以根据设备的宽度、高度、分辨率等条件来应用不同的样式，从而实现响应式设计。

6. 颜色和透明度：引入 rgba() 和 hsla() 颜色模式，可设置颜色的透明度。此外，opacity 属性也可以调整元素的整体透明度。

7. 混合模式（mix-blend-mode）：控制元素如何与其背景元素混合，从而实现叠加效果。常用模式有 multiply, screen, overlay 等。

8. 滤镜（filter）：支持图像滤镜效果，如模糊（blur）、灰度（grayscale）、对比度（contrast）等。

9. 性能优化（will-change）：属性用于提示浏览器某个属性或内容即将发生变化，从而提前优化渲染性能。浏览器在接收到这个提示后，可能会将对应的元素提升为合成层，直接在 GPU 上进行渲染合成。这样可以避免触发不必要的回流和重绘，提高动画或过渡的流畅性
