# CSS 架构：ITCSS + BEM + ACSS

ITCSS：样式按层级分离，从全局到具体，层级越低越抽象，越高越具体。

BEM：组件命名规范，方便复用和维护。

    BEM = Block（块） + Element（元素） + Modifier（修饰符）

ACSS（Atomic CSS）：原子类，一个类只负责一个样式属性。

    m-10 → margin: 10px;

## ITCSS 分层结构

- Settings（设置层）存放项目全局变量、主题色、基础字号等

```cs
$primary-color: #1e90ff;
$secondary-color: #ff6347;
$font-size-base: 14px;
$border-radius-base: 4px;
```
- Generic（全局样式层）重置浏览器默认样式、设置 box-sizing、全局字体
```cs
* {
  box-sizing: border-box;
}
body {
  margin: 0;
  font-family: 'Helvetica', sans-serif;
}
```
- base 层 整个 css 结构最基础的层级
- tool 层，提供工具类函数
间距工具（Margin / Padding）
```cs
/* Margin */
.margin(@top:0, @right:@top, @bottom:@top, @left:@right) {
  margin-top: @top;
  margin-right: @right;
  margin-bottom: @bottom;
  margin-left: @left;
}

/* 快捷用法 */
.m(@value) { .margin(@value); }        // 所有方向
.mt(@value) { margin-top: @value; }
.mr(@value) { margin-right: @value; }
.mb(@value) { margin-bottom: @value; }
.ml(@value) { margin-left: @value; }


.card {
  .m(20px);       // 所有方向 margin:20px
  .mt(10px);      // margin-top:10px
}

/* Padding */
.padding(@top:0, @right:@top, @bottom:@top, @left:@right) {
  padding-top: @top;
  padding-right: @right;
  padding-bottom: @bottom;
  padding-left: @left;
}

/* 快捷用法 */
.p(@value) { .padding(@value); }
.pt(@value) { padding-top: @value; }
.pr(@value) { padding-right: @value; }
.pb(@value) { padding-bottom: @value; }
.pl(@value) { padding-left: @value; }

.flex(@justify:center, @align:center, @dir:row) {
  display: flex;
  flex-direction: @dir;
  justify-content: @justify;
  align-items: @align;
}
.header {
  .flex(space-between, center);   // display:flex; justify-content:space-between; align-items:center;
}

.w(@value) { width: @value; }
.h(@value) { height: @value; }
.min-w(@value) { min-width: @value; }
.max-w(@value) { max-width: @value; }


.img-box {
  .w(100px);
  .h(150px);
}
```
- acss 层 定义原子类 如 margin padding flex

/* 原子类 ACSS */
.m-10 { margin: 10px; }
.mt-5 { margin-top: 5px; }
.text-center { text-align: center; }

- components 各个组件的样式
