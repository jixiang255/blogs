# css深入理解系列之position定位算法(未完待续)

## 疑问与目的

1. 


## position定位



1.position类型
```
A positioned element is an element whose computed position value is either relative, absolute, fixed, or sticky. (In other words, it's anything except static.)
A relatively positioned element is an element whose computed position value is relative. The top and bottom properties specify the vertical offset from its normal position; the left and right properties specify the horizontal offset.
An absolutely positioned element is an element whose computed position value is absolute or fixed. The top, right, bottom, and left properties specify offsets from the edges of the element's containing block. (The containing block is the ancestor to which the element is relatively positioned.) If the element has margins, they are added to the offset.
A stickily positioned element is an element whose computed position value is sticky. It's treated as relatively positioned until its containing block crosses a specified threshold, at which point it is treated as fixed.
Most of the time, absolutely positioned elements that have height and width set to auto are sized so as to fit their contents. However, non-replaced, absolutely positioned elements can be made to fill the available vertical space by specifying both top and bottom and leaving height unspecified (that is, auto). They can likewise be made to fill the available horizontal space by specifying both left and right and leaving width as auto.

Except for the case just described (of absolutely positioned elements filling the available space):

If both top and bottom are specified (technically, not auto), top wins.
If both left and right are specified, left wins when direction is ltr (English, horizontal Japanese, etc.) and right wins when direction is rtl (Persian, Arabic, Hebrew, etc.).
```



2.position属性值
```
static
The element is positioned according to the normal flow of the document. The top, right, bottom, left, and z-index properties have no effect. This is the default value.
relative
The element is positioned according to the normal flow of the document, and then offset relative to itself based on the values of top, right, bottom, and left. The offset does not affect the position of any other elements; thus, the space given for the element in the page layout is the same as if position were static. This value creates a new stacking context when the value of z-index is not auto. The effect of relative on table-*-group, table-row, table-column, table-cell, and table-caption elements is undefined.
absolute
The element is removed from the normal document flow; no space is created for the element in the page layout. Instead, it is positioned relative to its closest positioned ancestor if any; otherwise, it is placed relative to the initial containing block. Its final position is determined by the values of top, right, bottom, and left. This value creates a new stacking context when the value of z-index is not auto. Absolutely positioned boxes can have margins, and they do not collapse with any other margins.
fixed
The element is removed from the normal document flow; no space is created for the element in the page layout. Instead, it is positioned relative to the screen's viewport and doesn't move when scrolled. Its final position is determined by the values of top, right, bottom, and left. This value always creates a new stacking context. When an ancestor has the transform or perspective property set to something other than none, that ancestor is used as the container instead of the viewport (see CSS Transforms Spec). In printed documents, the element is placed in the same position on every page.
sticky
The element is positioned according to the normal flow of the document, and then offset relative to its flow root and containing block, including table-related elements, based on the values of top,  right, bottom, and left. The offset does not affect the position of any other elements. This value always creates a new stacking context. Note that sticky, by specification, will not work inside element with overflow: hidden or auto. (ref: Github issue on W3C CSSWG)
```


## 结论



## 参考
+ http://devdocs.io/css/position