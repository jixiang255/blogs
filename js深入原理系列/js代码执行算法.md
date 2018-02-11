# js深入原理系列之js代码执行算法

## 疑问与目的
阅读该文章后，需要明白以下疑问：
1. js引擎如何寻找变量？
2. 执行代码流程产生哪些状态量？
3. 函数执行分有几个阶段，各阶段做了什么处理？
4. js引擎执行代码的流程是怎样的？

## 执行代码流程
承接[《js运行环境标准》](js%e8%bf%90%e8%a1%8c%e7%8e%af%e5%a2%83%e6%a0%87%e5%87%86.md)文章，本文将描述执行代码过程中，js引擎如何处理代码、产生什么状态变量。

### 重要概念

在[《variable object》](http://dmitrysoshnikov.com/ecmascript/chapter-2-variable-object/)中，有以下原话：
```
how and where the interpreter finds our data (functions, variable)? What occurs, when we reference to needed objects?

A variable object (in abbreviated form — VO) is a special object related with an execution context and which stores:
	· variables (var, VariableDeclaration);
	· function declarations (FunctionDeclaration, in abbreviated form FD);
	· function formal parameters

Global object is the object which is created before entering any execution context; this object exists in the single copy, its properties are accessible from any place of the program, the life cycle of the global object ends with program end.

Regarding the execution context of functions — there VO is inaccessible directly, and its role plays so-called an activation object (in abbreviated form — AO).

An activation object is created on entering the context of a function and initialized by property arguments which value is the Arguments object.

Arguments object is a property of the activation object. It contains the following properties:
	· callee — the reference to the current function;
	· length — quantity of real passed arguments;
	· properties-indexes (integer, converted to string) which values are the values of function’s arguments (from left to right in the list of arguments). Quantity of these properties-indexes == arguments.length. Values of properties-indexes of the arguments object and present (really passed) formal parameters are shared.

Phases of processing the context code
    Entering the execution context;
    Code execution.

Entering the execution context
On entering the execution context (but before the code execution), VO is filled with the following properties (they have already been described at the beginning):

	· for each formal parameter of a function (if we are in function execution context)
	— a property of the variable object with a name and value of formal parameter is created; for not passed parameters — property of VO with a name of formal parameter and value undefined is created;

	· for each function declaration (FunctionDeclaration, FD)
	— a property of the variable object with a name and value of a function-object is created; if the variable object already contains a property with the same name, replace its value and attributes;

	· for each variable declaration (var, VariableDeclaration)
	— a property of the variable object with a variable name and value undefined is created; if the variable name is the same as a name of already declared formal parameter or a function, the variable declaration does not disturb the existing property.

Code execution
By this moment, AO/VO is already filled by properties (though, not all of them have the real values passed by us, most of them yet still have initial value undefined)
```
从上述所示：
1. 执行代码中，Global object存在于整个执行代码的生命周期中，而某个execution context产生与之关联的variable object，用来保存该execution context下的变量、函数、函数参数等
2. 由于函数的execution context不能直接访问variable object，而需要借助于activation object，它含有被callee、length、properties-indexes等信息
3. 执行代码分有两阶段：进入execution context前阶段，执行阶段
4. 进入execution context前阶段,VO含有调用function execution context信息、函数声明、变量
5. 执行阶段，AO/VO数据已准备完毕

在[《scope chain》](http://dmitrysoshnikov.com/ecmascript/chapter-4-scope-chain/)中，有以下原话：
```
Thus, is known that every context has its own variables object: for the global context it is global object itself, for functions it is the activation object.

And the scope chain is exactly this list of all (parent) variable objects for the inner contexts. This chain is used for variables lookup

Scope chain is related with an execution context a chain of variable objects which is used for variables lookup at identifier resolution.The scope chain of a function context is created at function call and consists of the activation object and the internal [[Scope]] property of this function.

Scope by definition is: Scope = AO + [[Scope]],or

var VO1 = {__parent__: null, ... other data};
var VO2 = {__parent__: VO1, ... other data};

Function life cycle is divided into a stage of creation and a stage of activation 

[[Scope]] is a hierarchical chain of all parent variable objects, which are above the current function context; the chain is saved to the function at its creation.Notice the important point — [[Scope]] is saved at function creation — statically (invariably), once and forever — until function destruction.Another moment which should be considered is that [[Scope]] in contrast with Scope (Scope chain) is the property of a function instead of a context.

As it has been said in definition, on entering the context and after creation of AO/VO, Scope property of the context (which is a scope chain for variables lookup) is defined as follows:

Scope = AO|VO + [[Scope]]

High light here is that the activation object is the first element of the Scope array, i.e. added to the front of scope chain:

Scope = [AO].concat([[Scope]]);

This feature is very important for the process of identifier resolution.

Identifier resolution is a process of determination to which variable object in scope chain the variable (or the function declaration) belongs.

On return from this algorithm we have always a value of type Reference, which base component is the corresponding variable object (or null if variable is not found), and a property name component is the name of the looked up (resolved) identifier. In detail Reference type is discussed in the Chapter 3. This.

Process of identifier resolution includes lookup of the property corresponding to the name of the variable, i.e. there is a consecutive examination of variable objects in the scope chain, starting from the deepest context and up to the top of the scope chain.

Thus, local variables of a context at lookup have higher priority than variables from parent contexts, and in case of two variables with the same name but from different contexts, the first is found the variable of deeper context.

Two-dimensional Scope chain lookup：scope chain、prototype chain

Affecting on Scope chain during code execution
In ECMAScript there are two statements which can modify scope chain at runtime code execution phase. These are with statement and catch clause. Both of them add to the front of scope chain the object required for lookup identifiers appearing within these statements. I.e., if one of these case takes place, scope chain is schematically modified as follows:
Scope = withObject|catchObject + AO|VO + [[Scope]]
```
如上述所示，scope chain用来解决变量id问题，当函数使用某变量时，将沿着scope chain查找。寻找变量id有两种路径：scope chain、prototype chain。scope chain会受到with、catch语句影响。

### 闭包
在[《scope chain》](http://dmitrysoshnikov.com/ecmascript/chapter-4-scope-chain/)中，有以下原话：
```
Closures in ECMAScript are directly related with the [[Scope]] property of functions. As it has been noted, [[Scope]] is saved at function creation and exists until the function object is destroyed. Actually, a closure is exactly a combination of a function code and its [[Scope]] property. Thus, [[Scope]] contains that lexical environment (the parent variable object) in which function is created. Variables from higher contexts at the further function activation will be searched in this lexical (statically saved at creation) chain of variable objects.
```
上述表明，闭包函数拥有[[Scope]]属性，它含有指向parent variable object。

### 实例分析

示例代码
```
var a = 10;
eval('var x = 10');
fucntion test(){
	var x = 30;
	var b = 20;
}
test()
```
结合上述描述的js引擎处理js代码流程，得出以下对应的数据结构模型、算法流程模型：

数据结构模型
```
// Execution Context stack
ECStack = [
  globalContext
];

// Execution Context内容
activeExecutionContext = {
    VO: {...}, // or AO
    this: thisValue,
    Scope: [ // Scope chain：Scope = AO|VO + [[Scope]]
      // list of all variable objects
      // for identifiers lookup
    ] 
};

// Variable object of the global context
VO(globalContext) = {
  a: 10,
  test: <reference to function>
};
  
// Variable object of the "test" function context
VO(test functionContext) = {
  x: 30,
  b: 20
};

// activation object of the "test" function context
AO(test) = {
  a: 10,
  b: 30,
  c: 20
};
```

算法流程模型
```
// 执行代码 eval('var x = 10');
ECStack.push({
  context: evalContext,
  callingContext: globalContext
});
evalContext成为activeExecutionContext

// eval exited context
ECStack.pop();
 
// 执行test函数
ECStack.push(<test> functionContext);
testContext成为activeExecutionContext

// return from test
ECStack.pop();
```

## 回顾与结论
综上所述，js引擎借助variable object、activation object保存变量、函数引用，scope chain解决寻找变量id问题;其中，提及了this、闭包概念，this影响函数Execution Context中variable object、activation object，而闭包概念引用scope，将分为《this指向算法》《闭包》文章详细描述。

## 参考
+ http://dmitrysoshnikov.com/ecmascript/chapter-2-variable-object/
+ http://dmitrysoshnikov.com/ecmascript/chapter-4-scope-chain/