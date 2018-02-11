# js深入原理系列之浏览器、js的交互

## 疑问与目的

1. 浏览器如何与js引擎交互？
2. js事件模型？

## js事件模型

在[《Understanding Javascript Function Executions 》](https://medium.com/@gaurav.pandvia/understanding-javascript-function-executions-tasks-event-loop-call-stack-more-part-1-5683dea1f5ec)中，有以下原话：
```
2-This is where browser APIs kicks in and call its APIs, which are basically threads created by browser implemented in C++ to handle async events like DOM events, http request, setTimeout, etc.
Now these WebAPIs can’t themselves put the execution code on to the stack, if it did, then it would randomly appear in the middle of your code. The message callback queue discussed above shows the way. 
3-Any of the WebAPI pushes the callback onto this queue when it’s done executing. The Event Loop now is responsible for the execution of these callbacks in the queue and pushing it in the stack, when it is empty 
4-Event loop basic job is to look both at the stack and the task queue, pushing the first thing on the queue to the stack when it see stack as empty. Each message or callback is processed completely before any other message is processed.
```
![images/js_event_loop.png]

结合上述描述及图片，浏览器对web事件处理流程如下：
1. 收集用户交互、代码交互事件，也有个事件队列
2. 执行js事件处理
3. 如若有异步事件(webapi、settimeout、ajax、work service)，则将保存js运行环境、回调函数
4. 当异步事件完成，将保存js运行环境、回调函数放入事件队列，等待恢复执行

另外，在没有引入Web Workers技术前，JS代码执行时是单线程，依据上述的理论，浏览器响应交互的事件应当也是放在某个队列中，一一排队处理分发。

上述是浏览器中的event loop模型，另外类似的模型还有nodejs、electron，具体查看《nodejs event loop原理》

## 参考
+ https://medium.com/@gaurav.pandvia/understanding-javascript-function-executions-tasks-event-loop-call-stack-more-part-1-5683dea1f5ec
+ http://www.ruanyifeng.com/blog/2014/10/event-loop.html
+ https://www.youtube.com/watch?v=8aGhZQkoFbQ&feature=youtu.be
+ https://blog.sessionstack.com/how-does-javascript-actually-work-part-1-b0bacc073cf