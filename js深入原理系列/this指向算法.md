# js深入原理系列之this指向算法

## 疑问与目的

1. 引用类型什么作用？
2. this指向算法？
3. this的特殊情况？

## this概念

在[《this》](http://dmitrysoshnikov.com/ecmascript/chapter-3-this/)中，有以下原话：
```
this is a property of the execution context. It’s a special object in which context a code is executed.

this is directly related to the type of executable code of the context. The value is determined on entering the context and is immutable while the code is running in the context.

So how does the form of the call expression influences this value? In order to fully understand the determination of the this value, it’s necessary to consider in detail one of the internal types — the Reference type.

Reference type
Using pseudo-code the value of Reference type can be represented as an object with two properties: base (i.e. object to which a property belongs) and a propertyName in this base:

var valueOfReferenceType = {
  base: <base object>,
  propertyName: <property name>
};

how a value of Reference type is related with this value of a function context? — in the most important sense. The given moment is the main of this article. The general rule of determination of this value in a function context sounds as follows:

	The value of this in a function context is provided by the caller and determined by the current form of a call expression (how the function call is written syntactically).

	If on the left hand side from the call parentheses ( ... ), there is a value of Reference type then this value is set to the base object of this value of Reference type.

	In all other cases (i.e. with any other value type which is distinct from the Reference type), this value is always set to null. But since there is no any sense in null for this value, it is implicitly converted to global object.

Function call and non-Reference type
So, as we have noted, in case when on the left hand side of call parentheses there is a value not of Reference type but any another type, this value is automatically set to null and, as consequence, to the global object.

Reference type and null this value
There is a case when call expression determines on the left hand side of call parentheses the value of Reference type, however this value is set to null and, as consequence, to global. It is related to the case when the base object of Reference type value is the activation object.
```
基于上面的描述，this的值，由调用者提供，且由调用函数的方式决定。如果调用括号()的左边是引用类型的值，this将设为这个引用类型值的base对象；在其他情况下（与引用类型不同的任何其它属性），this的值都为null，并最终指向global object。

非引用类型的函数调用，遵守上述决定this的算法，则this指向null。

引用类型但this是null的情况，该情况出现在base是activation object。

## 示例
示例1
```
function foo() {
  return this;
}
foo(); // this指向global

var foo1 = {
  bar: function () {
    return this;
  }
};
foo1.bar(); // this指向foo1

var test = foo.bar;
test(); // this指向global
```
运用this指向算法，示例中foo的引用类型的base属性指向null -> global；bar的引用类型的base属性指向foo1；ftest的引用类型的base属性指向null -> global。

示例2
```
var foo = {
  bar: function () {
    console.log(this);
  }
};
 
foo.bar(); // Reference, OK => foo
(foo.bar)(); // Reference, OK => foo
 
(foo.bar = foo.bar)(); // global?
(false || foo.bar)(); // global?
(foo.bar, foo.bar)(); // global?
```
第三个例子中，返回的结果已经是函数对象（不是引用类型），这意味着this的值被设为null，实际最终结果是被设置为global对象。

第四个和第五个也是一样——逗号操作符和逻辑操作符（OR）调用了GetValue 方法，相应地，我们失去了引用类型的值而得到了函数类型的值，所以this的值再次被设为global对象。

示例3
```
function foo() {
  function bar() {
    alert(this); // this指向global
  }
  bar(); // the same as AO.bar()
}
```
激活对象总是作为this的值返回——null（即伪代码AO.bar()相当于null.bar()）

## 参考
+ http://goddyzhao.tumblr.com/post/11218727474/this
+ http://dmitrysoshnikov.com/ecmascript/chapter-3-this/