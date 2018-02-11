# css深入理解系列之containing block算法

## 疑问与目的

通过该文章的阅读，希望你能够明白以下几点：

1. 元素宽高百分比数值的依据算法
2. containing block的确定算法
3. 解答《开篇》的疑问6

## containing block概念及其算法

**containing block作用**
在[mdn containing-block](https://developer.mozilla.org/en-US/docs/Web/CSS/All_About_The_Containing_Block),有以下原话：
```
the size and position of an element are often impacted by its containing block. Percentage values that are applied to the width, height, padding, margin, and offset properties of an absolutely positioned element (i.e., which has its position set to absolute or fixed) are computed from the element's containing block.
```
上述表明，containing block影响position、fixed定位元素的left、right、top、bottom的属性；另外，也将影响元素以百分比形式width, height, padding, margin, offset的形式。


**containing block算法**
在[css2.1 containing-block-details](https://www.w3.org/TR/2011/REC-CSS2-20110607/visudet.html#containing-block-details),有如下原话：
```
The position and size of an element's box(es) are sometimes calculated relative to a certain rectangle, called the containing block of the element. The containing block of an element is defined as follows:

The containing block in which the root element lives is a rectangle called the initial containing block. For continuous media, it has the dimensions of the viewport and is anchored at the canvas origin; it is the page area for paged media. The 'direction' property of the initial containing block is the same as for the root element.
For other elements, if the element's position is 'relative' or 'static', the containing block is formed by the content edge of the nearest block container ancestor box.
If the element has 'position: fixed', the containing block is established by the viewport in the case of continuous media or the page area in the case of paged media.
If the element has 'position: absolute', the containing block is established by the nearest ancestor with a 'position' of 'absolute', 'relative' or 'fixed', in the following way:
In the case that the ancestor is an inline element, the containing block is the bounding box around the padding boxes of the first and the last inline boxes generated for that element. In CSS 2.1, if the inline element is split across multiple lines, the containing block is undefined.
Otherwise, the containing block is formed by the padding edge of the ancestor.
If there is no such ancestor, the containing block is the initial containing block.

In paged media, an absolutely positioned element is positioned relative to its containing block ignoring any page breaks (as if the document were continuous). The element may subsequently be broken over several pages.

For absolutely positioned content that resolves to a position on a page other than the page being laid out (the current page), or resolves to a position on the current page which has already been rendered for printing, printers may place the content

· on another location on the current page,
· on a subsequent page, or
· may omit it.
```

另外在[mdn containing-block](https://developer.mozilla.org/en-US/docs/Web/CSS/All_About_The_Containing_Block),有以下原话：
```
If the positionproperty is absolute or fixed, the containing block may also be formed by the edge of the padding box of the nearest ancestor element that has the following:
· A transformor perspectivevalue other than none
· A will-change value of transform or perspective
· A filter value other than none or a will-change value of filter (only works on Firefox).
```

上述表明，寻找元素的container block算法是根据元素的position决定的，有以下几个方面：
    + 元素的position是static、relative，则container block是最近的block container父节点，以父节点内容宽度计算
    + 元素的position是absolute，则container block是最近的'absolute', 'relative' or 'fixed'定位的父节点，以父节点内容宽度 + padding计算；另外也有可能是最近的父节点拥有transformor perspective属性，或者will-change属性的是transform or perspective。
    + 元素的position是fixed，则container block是viewport或者the page area

**示例**
```
body {
  background: beige;
}

section {
  position: absolute;
  left: 30px;
  top: 30px;
  width: 400px;
  height: 160px;
  padding: 30px 20px;
  background: lightgray;
}

p {
  position: absolute;
  width: 50%;   /* == (400px + 20px + 20px) * .5 = 220px */
  height: 25%;  /* == (160px + 30px + 30px) * .25 = 55px */
  margin: 5%;   /* == (400px + 20px + 20px) * .05 = 22px */
  padding: 5%;  /* == (400px + 20px + 20px) * .05 = 22px */
  background: cyan;
}
```
![](images/ocntainer_ex1.png)
根据上述计算元素百分比的算法,p元素的宽高、margin、padding的计算，是依据container block元素的内容宽度+padding数值。

**疑问**
根据上述描述的计算规则，那么在IE低版本中，是如何计算的呢？因为IE低版本，元素的宽度=内容宽度+padding

# 参考链接

https://www.w3.org/TR/2011/REC-CSS2-20110607/visudet.html#containing-block-details

https://developer.mozilla.org/en-US/docs/Web/CSS/All_About_The_Containing_Block
