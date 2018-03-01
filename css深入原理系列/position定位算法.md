# css深入理解系列之position定位算法

## 疑问与目的
1. position与floats有何不同？

## position定位

在[css2.1 visuren](https://www.w3.org/TR/CSS21/visuren.html)文章中，从9.3章节到9.8章节，主要描述position属性概念，有如下原话：
```
In CSS 2.1, a box may be laid out according to three positioning schemes:

Normal flow. In CSS 2.1, normal flow includes block formatting of block-level boxes, inline formatting of inline-level boxes, and relative positioning of block-level and inline-level boxes.
Floats. In the float model, a box is first laid out according to the normal flow, then taken out of the flow and shifted to the left or right as far as possible. Content may flow along the side of a float.
Absolute positioning. In the absolute positioning model, a box is removed from the normal flow entirely (it has no impact on later siblings) and assigned a position with respect to a containing block.
An element is called out of flow if it is floated, absolutely positioned, or is the root element. An element is called in-flow if it is not out-of-flow. The flow of an element A is the set consisting of A and all in-flow elements whose nearest out-of-flow ancestor is A.

static
The box is a normal box, laid out according to the normal flow. The 'top', 'right', 'bottom', and 'left' properties do not apply.
relative
The box's position is calculated according to the normal flow (this is called the position in normal flow). Then the box is offset relative to its normal position. When a box B is relatively positioned, the position of the following box is calculated as though B were not offset. The effect of 'position:relative' on table-row-group, table-header-group, table-footer-group, table-row, table-column-group, table-column, table-cell, and table-caption elements is undefined.
absolute
The box's position (and possibly size) is specified with the 'top', 'right', 'bottom', and 'left' properties. These properties specify offsets with respect to the box's containing block. Absolutely positioned boxes are taken out of the normal flow. This means they have no impact on the layout of later siblings. Also, though absolutely positioned boxes have margins, they do not collapse with any other margins.
fixed
The box's position is calculated according to the 'absolute' model, but in addition, the box is fixed with respect to some reference. As with the 'absolute' model, the box's margins do not collapse with any other margins. In the case of handheld, projection, screen, tty, and tv media types, the box is fixed with respect to the viewport and does not move when scrolled. In the case of the print media type, the box is rendered on every page, and is fixed with respect to the page box, even if the page is seen through a viewport (in the case of a print-preview, for example). For other media types, the presentation is undefined. Authors may wish to specify 'fixed' in a media-dependent way. For instance, an author may want a box to remain at the top of the viewport on the screen, but not at the top of each printed page. 
```
上述大体描述是元素定位类型分为正常流、浮动型、绝对定位，static、relative属于正常流，float元素优先处于正常流中，但尽可能移动到左边或右边。

在[devdocs position](http://devdocs.io/css/position)中，有以下原话：
```
relative
This value creates a new stacking context when the value of z-index is not auto. 
absolute
This value creates a new stacking context when the value of z-index is not auto.
fixed
This value always creates a new stacking context.
sticky
This value always creates a new stacking context.
```
上述描述fixed、sticky将产生stacking context，而relative、absolute产生stacking context是当z-index不为零时

## 参考
+ http://devdocs.io/css/position
+ https://www.w3.org/TR/CSS21/visuren.html