### this

#### this 几种情况说明

1. 我们研究的 this 都是函数私有上下文的 this，因为全局上下文的 this 指向 windows

2. 块级上下文中没有自己的 this，在此上下文中遇到的 this，都是其所处环境（上级上下文）中的 this

3. ES6 中的箭头函数和块级上下文类似，也是没有自己的 this,遇到的 this 也是其上级上下文的

**this 是执行主体: 通俗来讲，谁把它执行的 this 就是谁，而不是在哪执行，也不是在哪定义的**

1. 给 dom 元素进行事件绑定，当事件行为触发，绑定的方法执行，方法中的 this 是当前 dom 元素本身

document.onclick=function(){
    console.log(this);//document
};
document.addEventListener('click',function(){
    console.log(this);//document
})
