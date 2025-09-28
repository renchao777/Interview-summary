# CSS 选择器种类

1. 元素选择器：直接写元素名，比如 div

2. 子选择器：ul > li

3. 后代选择器：div p

4. 伪类选择器：:hover, :focus, :first-child, :last-child, :nth-of-type(n)

5. 伪元素选择器：:after, :before（通常使用双冒号，如 ::after, ::before）

6. 属性选择器：input[type='text']

# CSS 选择器优先级

!important > 内联样式 > ID 选择器 > 类选择器 > 伪类选择器 > 属性选择器 > 标签选择器 > 通配符选择器

类选择器和伪类选择器在同一优先级

# CSS 哪些属性可以继承

继承特性主要涉及以下几个方面：
文本相关属性：如 font-family, font-size, color, line-height, text-align
对于盒模型相关属性（如 margin, padding, border），确实没有继承特性
