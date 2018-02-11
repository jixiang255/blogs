html5在以下几个方面新增了特性：

+ 语义：标签
+ 通信：网络通信
+ 离线&储存：本地储存数据、离线运行
+ 绘图：canvas、SVG
+ 性能&集成：Web Workers、History API等
+ 设备访问：地址位置、摄像头

## 语义
+ HTML5 中的节段和提纲
HTML5 中新的提纲和节段元素一览: &lt;section&gt;, &lt;article&gt;, &lt;nav&gt;, &lt;header&gt;, &lt;footer&gt;, &lt;aside&gt; 和 &lt;hgroup&gt;.

+ 使用 HTML5 的音频和视频
&lt;audio&gt; 和 &lt;video&gt; 元素嵌入和允许操作新的多媒体内容。

+ HTML5 的表单
看一下 HTML5 中对 web 表单的改进：强制验证 API，一些新的属性，&lt;input&gt; 属性type 的一些新值 ，新的 &lt;output&gt; 元素。

+ 新的语义元素
除了节段，媒体和表单元素之外，还有众多的新元素，例如 &lt;mark&gt;， &lt;figure&gt;， &lt;figcaption&gt;， &lt;data&gt;， &lt;time&gt;， &lt;output&gt;， &lt;progress&gt;， 或者 &lt;meter&gt;和&lt;main&gt;，这增加了有效的 HTML5 元素的数量。

+ &lt;iframe&gt; 的改进
使用 sandbox， seamless， 和 srcdoc 属性，作者们现在可以精确控制 &lt;iframe&gt; 元素的安全级别以及期望的渲染。

+ MathML
允许直接嵌入数学公式

## 通信

+ Web Sockets
允许在页面和服务器之间建立持久连接并通过这种方法来交换非 HTML 数据。

+ Server-sent events
允许服务器向客户端推送事件，而不是仅在响应客户端请求时服务器才能发送数据的传统范式。

+ WebRTC
这项技术，其中的 RTC 代表的是即时通信，允许连接到其他人，直接在浏览器中控制视频会议，而不需要一个插件或是外部的应用程序。

## 离线&储存

+ 在线和离线事件
Firefox 3 支持 WHATWG 在线和离线事件，这可以让应用程序和扩展检测是否存在可用的网络连接，以及在连接建立和断开时能感知到。

+ WHATWG 客户端会话和持久化存储 (又名 DOM 存储)
客户端会话和持久化存储让 web 应用程序能够在客户端存储结构化数据。

+ IndexedDB
是一个为了能够在浏览器中存储大量结构化数据，并且能够在这些数据上使用索引进行高性能检索的 Web 标准。

+ 自 web 应用程序中使用文件
对新的 HTML5 文件 API 的支持已经被添加到 Gecko 中，从而使 Web 应用程序可以访问由用户选择的本地文件。这包括使用 type file 的 &lt;input&gt;元素的新的 multiple 属性针对多文件选择的支持。 还有 FileReader。

## 绘图

+ HTML5 针对 &lt;canvas&gt; 元素的文本 API
HTML5 文本 API 现在由 &lt;canvas&gt; 元素支持。

+ WebGL
WebGL 通过引入了一套非常地符合 OpenGL ES 2.0 并且可以用在 HTML5 &lt;canvas&gt; 元素中的 API 给 Web 带来了 3D 图像功能。

+ SVG
一个基于 XML 的可以直接嵌入到 HTML 中的矢量图像格式。

## 性能 & 集成

+ Web Workers
能够把 JavaScript 计算委托给后台线程，通过允许这些活动以防止使交互型事件变得缓慢。

+ History API
允许对浏览器历史记录进行操作。这对于那些交互地加载新信息的页面尤其有用。

+ conentEditable 属性：把你的网站改变成 wiki !
HTML5 已经把 contentEditable 属性标准化了。了解更多关于这个特性的内容。
拖放

+ HTML5 的拖放 API 能够支持在网站内部和网站之间拖放项目。同时也提供了一个更简单的供扩展和基于 Mozilla 的应用程序使用的 API。

+ HTML 中的焦点管理
支持新的 HTML5 activeElement 和 hasFocus 属性。

+ 基于 Web 的协议处理程序
你现在可以使用 navigator.registerProtocolHandler() 方法把 web 应用程序注册成一个协议处理程序。

+ requestAnimationFrame
允许控制动画渲染以获得更优性能。

+ 全屏 API
为一个网页或者应用程序控制使用整个屏幕，而不显示浏览器界面。

+ 指针锁定 API
允许锁定到内容的指针，这样游戏或者类似的应用程序在指针到达窗口限制时也不会失去焦点。

## 设备访问

+ 使用 Camera API
允许使用和操作计算机的摄像头，并从中存取照片。

+ 触控事件
对用户按下触控屏的事件做出反应的处理程序。

+ 使用地理位置定位
让浏览器使用地理位置服务定位用户的位置。

+ 检测设备方向
让用户在运行浏览器的设备变更方向时能够得到信息。这可以被用作一种输入设备（例如制作能够对设备位置做出反应的游戏）或者使页面的布局跟屏幕的方向相适应（横向或纵向）。

+ 指针锁定 API
允许锁定到内容的指针，这样游戏或者类似的应用程序在指针到达窗口限制时也不会失去焦点。


# 参考链接
[MDN HTML5](https://developer.mozilla.org/zh-CN/docs/Web/Guide/HTML/HTML5)