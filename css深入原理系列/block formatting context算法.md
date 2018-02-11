# css深入理解系列之block formatting context算法(未完待续)

承接《渲染页面及盒子模型生成算法》文章，本文介绍block类型的盒子模型。

## 疑问与目的

1. block类型的盒子模型的表现是怎样的？
2. block类型有什么特性？

## block类型的盒子模型

在[css2.1 block-level boxes](https://www.w3.org/TR/2011/REC-CSS2-20110607/visuren.html#block-boxes)中，有如下原话：
```
Block-level elements are those elements of the source document that are formatted visually as blocks (e.g., paragraphs). The following values of the 'display' property make an element block-level: 'block', 'list-item', and 'table'.

Block-level boxes are boxes that participate in a block formatting context. Each block-level element generates a principal block-level box that contains descendant boxes and generated content and is also the box involved in any positioning scheme. Some block-level elements may generate additional boxes in addition to the principal box: 'list-item' elements. These additional boxes are placed with respect to the principal box.

Except for table boxes, which are described in a later chapter, and replaced elements, a block-level box is also a block container box. A block container box either contains only block-level boxes or establishes an inline formatting context and thus contains only inline-level boxes. Not all block container boxes are block-level boxes: non-replaced inline blocks and non-replaced table cells are block containers but not block-level boxes. Block-level boxes that are also block containers are called block boxes.

The three terms "block-level box," "block container box," and "block box" are sometimes abbreviated as "block" where unambiguous.
```

上述阐述了block类型元素将产生一个`block formatting context`,而这名词，在[css2.1 block formatting context](https://www.w3.org/TR/2011/REC-CSS2-20110607/visuren.html#block-formatting)中，有如下原话：
```
Floats, absolutely positioned elements, block containers (such as inline-blocks, table-cells, and table-captions) that are not block boxes, and block boxes with 'overflow' other than 'visible' (except when that value has been propagated to the viewport) establish new block formatting contexts for their contents.

In a block formatting context, boxes are laid out one after the other, vertically, beginning at the top of a containing block. The vertical distance between two sibling boxes is determined by the 'margin' properties. Vertical margins between adjacent block-level boxes in a block formatting context collapse.

In a block formatting context, each box's left outer edge touches the left edge of the containing block (for right-to-left formatting, right edges touch). This is true even in the presence of floats (although a box's line boxes may shrink due to the floats), unless the box establishes a new block formatting context (in which case the box itself may become narrower due to the floats).

For information about page breaks in paged media, please consult the section on allowed page breaks.
```
结合两段官方定义，可知block类型元素的表现是元素占用一行，竖直排放。那么`block formatting context`具体作用是什么呢？另外，定义中还提及了`margins collapse`概念，这又是有什么需要注意的？

### bfc作用
在
```
Block formatting contexts are important for the positioning (see float) and clearing (see clear) of floats. The rules for positioning and clearing of floats apply only to things within the same block formatting context. Floats do not affect the layout of the content inside other block formatting contexts, and clear only clears past floats in the same block formatting context. Margin collapsing also occurs only between blocks that belong to the same block formatting context.
```

2.建立block formatting context算法
```
the root element or something that contains it
floats (elements where float is not none)
absolutely positioned elements (elements where position is absolute or fixed)
inline-blocks (elements with display: inline-block)
table cells (elements with display: table-cell, which is the default for HTML table cells)
table captions (elements with display: table-caption, which is the default for HTML table captions)
anonymous table cells implicitly created by the elements with display: table, table-row, table-row-group, table-header-group, table-footer-group (which is the default for HTML tables, table rows, table bodies, table headers and table footers, respectively), or inline-table 
block elements where overflow has a value other than visible
display: flow-root
elements with contain: layout, content, or strict
flex items (direct children of the element with display: flex or inline-flex)
grid items (direct children of the element with display: grid or inline-grid)
multicol containers (elements where column-count or column-width is not auto, including elements with column-count: 1)
column-span: all should always create a new formatting context, even when the column-span: all element isn't contained by a multicol container (Spec change, Chrome bug).
```



官方定义


### margin collapsing
解释了困惑

## 参考链接
+ https://www.w3.org/TR/2011/REC-CSS2-20110607/visuren.html#block-formatting
+ https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Block_formatting_context
