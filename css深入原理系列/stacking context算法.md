# css深入理解系列之stacking context算法

## 疑问与目的

1. 



## stacking context概念


The stacking context算法

1.定义
```
The stacking context is a three-dimensional conceptualization of HTML elements along an imaginary z-axis relative to the user, who is assumed to be facing the viewport or the webpage. HTML elements occupy this space in priority order based on element attributes.
```

2.产生的算法
```
Root element of document (HTML).
Element with a position value "absolute" or "relative" and z-index value other than "auto".
Element with a position value "fixed" or "sticky" (sticky for all mobile browsers, but not older desktop).
Element that is a child of a flex (flexbox) container, with z-index value other than "auto".
Element with a opacity value less than 1 (See the specification for opacity).
Element with a mix-blend-mode value other than "normal".
Element with any of the following properties with value other than "none":
transform
filter
perspective
clip-path
mask / mask-image / mask-border
Element with a isolation value "isolate".
Element with a -webkit-overflow-scrolling value "touch".
Element with a will-change value specifying any property that would create a stacking context on non-initial value (see this post).
```

## 结论

## 参考
+ https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context
