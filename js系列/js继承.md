### js 继承

**复制父类的属性和方法来重写子类原型对象**

#### 实现方式

1. 原型链继承

function Parent() {
this.colors = ['red', 'blue'];
}

Parent.prototype.sayName = function() {
console.log('Parent');
};

function Child() {}

Child.prototype = new Parent(); // 继承父类
const child1 = new Child();
const child2 = new Child();

child1.colors.push('green');
console.log(child2.colors); // ['red', 'blue', 'green']，共享属性

优点：所有子类实例都可以共享父类的方法，不必每次创建实例时都重新创建父类的方法

缺点：共享引用类型的问题：如果父类的属性是引用类型（如数组或对象），子类实例会共享这个属性。修改一个实例的引用类型属性，会影响所有实例。

2. 构造函数继承
   借助 call 调用 Parent 函数

function Parent(){
this.name = 'parent1';
}

Parent.prototype.getName = function () {
return this.name;
}

function Child(){
Parent1.call(this);
this.type = 'child'
}

let child = new Child();
console.log(child); // 没问题
console.log(child.getName()); // 会报错

相比第一种原型链继承方式，父类的引用属性不会被共享，优化了第一种继承方式的弊端，但是只能继承父类的实例属性和方法，不能继承原型属性或者方法

3. 组合继承

前面我们讲到两种继承方式，各有优缺点。组合继承则将前两种方式继承起来

function Parent3 () {
this.name = 'parent3';
this.play = [1, 2, 3];
}

Parent3.prototype.getName = function () {
return this.name;
}
function Child3() {
// 第二次调用 Parent3()
Parent3.call(this);
this.type = 'child3';
}

// 第一次调用 Parent3()
Child3.prototype = new Parent3();
// 手动挂上构造器，指向自己的构造函数
Child3.prototype.constructor = Child3;
var s3 = new Child3();
var s4 = new Child3();
s3.play.push(4);
console.log(s3.play, s4.play); // 不互相影响
console.log(s3.getName()); // 正常输出'parent3'
console.log(s4.getName()); // 正常输出'parent3'

这种方式看起来就没什么问题，方式一和方式二的问题都解决了，但是从上面代码我们也可以看到 Parent3 执行了两次，造成了多构造一次的性能开销

4. 原型式继承

这里主要借助 Object.create 方法实现普通对象的继承

let parent4 = {
name: "parent4",
friends: ["p1", "p2", "p3"],
getName: function() {
return this.name;
}
};

let person4 = Object.create(parent4);
person4.name = "tom";
person4.friends.push("jerry");

let person5 = Object.create(parent4);
person5.friends.push("lucy");

console.log(person4.name); // tom
console.log(person4.name === person4.getName()); // true
console.log(person5.name); // parent4
console.log(person4.friends); // ["p1", "p2", "p3","jerry","lucy"]
console.log(person5.friends); // ["p1", "p2", "p3","jerry","lucy"]

这种继承方式的缺点也很明显，因为 Object.create 方法实现的是浅拷贝，多个实例的引用类型属性指向相同的内存，存在篡改的可能

5. 寄生式继承

每次调用构造函数时都要创建新对象和方法，无法重用父类的原型方法，性能较差

function createChild(original) {
const clone = Object.create(original); // 原型继承
clone.sayHi = function() {
console.log('Hi from child');
};
return clone;
}

const parent = { name: 'parent' };
const child = createChild(parent);
child.sayHi(); // 'Hi from child'

6. 寄生组合式继承

避免两次调用父类构造函数：通过寄生的方式组合构造函数继承和原型链继承，效率更高。
这是现代 JavaScript 中最常用、性能最佳的继承方式，避免了组合继承中的性能浪费问题。

```js
function Parent(name) {
  this.name = name;
  this.colors = ["red", "blue"];
}

Parent.prototype.sayName = function () {
  console.log(this.name);
};

function Child(name, age) {
  Parent.call(this, name); // 借用构造函数
  this.age = age;
}

Child.prototype = Object.create(Parent.prototype); // 原型链继承父类原型
Child.prototype.constructor = Child;

const child1 = new Child("child1", 18);
child1.sayName(); // 'child1'
```

7. ES6 中的 extends

class Person {
constructor(name) {
this.name = name
}
// 原型方法
// 即 Person.prototype.getName = function() { }
// 下面可以简写为 getName() {...}
getName = function () {
console.log('Person:', this.name)
}
}
class Gamer extends Person {
constructor(name, age) {
// 子类中存在构造函数，则需要在使用“this”之前首先调用 super()。
super(name)
this.age = age
}
}
const asuna = new Gamer('Asuna', 20)
asuna.getName() // 成功访问到父类的方法

我们会发现 extends 实际采用的也是寄生组合继承方式，因此也证明了这种方式是较优的解决继承的方式

### 总结

原型链继承：简单但有共享属性问题，适合轻量使用。
构造函数继承：独立属性，但无法继承方法，适合处理引用类型。
组合继承：全面但有性能浪费，适合常见继承场景。
原型式继承：轻量但有共享问题，适合简单对象继承。
寄生式继承：灵活但性能较差，适合增强对象功能。
寄生组合式继承：性能最佳，推荐使用，适合复杂的继承需求
