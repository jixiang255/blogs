vue响应式原理

## 疑问与目的
1. 为什么要有双向绑定？有什么好处？
2. 双向绑定在性能方面是否有提升？


## vue源码目录
为啥总感觉没有考虑dom元素的绘制？
假设使用virtual dom技术，通过比较得出改变的dom元素样式及内容，再将该结果去渲染；
那么直接通过js检测数据变化，再反馈到真实的dom元素上有什么区别？
先看常用的例子：

1.改变数据项
2.改变元素样式

应该说，在样式方面也需要有数据检测机制

vue的粒度是到那个地方，渲染列表的话



阅读vue源码
那么cb回调如何与vdom结合？

遍历update事件处理函数，发送update事件通知


dep.js-notify() -> watcher.js-update() -> scheduler.js-queueWatcher()-flushSchedulerQueue()-callUpdatedHooks() -> lifecycle.js-callHook() 
hook:updated

lifecycle.js -> lifecycleMixin()-_update()
init.js -> initMixin()-_init()



http://jiongks.name/blog/vue-code-review/
https://github.com/aooy/blog/issues/2
https://github.com/Matt-Esch/virtual-dom
https://calendar.perfplanet.com/2013/diff/
https://github.com/liutao/vue2.0-source