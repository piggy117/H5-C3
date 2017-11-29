# QQ   TIM

### 视差滚动

- 原理：

  利用background-attachment属性实现

  ###### *如何设置固定的背景图像* 

- | 参数      | 含义                                    |
  | ------- | ------------------------------------- |
  | scroll  | 默认值：背景图像会随着页面其余部分的滚动而滚动，              |
  | fixed   | 当页面的其余部分滚动时，背景图像不会移动                  |
  | inherit | 规定应该从父元素继承，background-attachment属性的设置 |

### 图片自适应

当图片放到屏幕上时，大小不合适时，可以设置100%，自适应，缩放比例

### 伪类选择器：first-child

是不分类型的，一般我们都是用于ul里面的li，

````javascript
<div class="contain">
            <p>无论何时何地</p>
            <p>沟通，是跨越</p>
            <div class="iphone"></div>
</div>
            
像这样的，想选择最后一个p 
.contain p:last-child  是选不上的，但是用nth-child(2),就可以选中，所以，说明，这是一种 `不分类型的选择器`；
````

### first-of-type

和first-child不一样的是，first-child 是无类型的查找元素，而first-of-type 是有类型的查找元素

