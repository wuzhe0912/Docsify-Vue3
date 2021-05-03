# CSS

> 記錄面試遇到的`CSS`題目

## 1. SASS 的 &、>、+ 這些符號的意義？

- `&`：

```
// 代表連結符號，引用父選擇器，使用在偽類或偽元素，譬如 hover、active

.wrapper {
  color: red;

  &:hover {
    color: blue;
  }
}
```

- `>`：

```
// 嵌套元素使用，和傳統 CSS 類似，都是指稱父元素底下一層的元素

<!-- HTML -->
<div class="wrapper">
  <span class="container">Test</span>
</div>

<!-- SASS -->
.wrapper {
  > .container {
    color: red;
  }
}
```

- `+`：

```
<!-- 相鄰選擇器，改變 + 號之後的元素樣式 -->

ul + div {
  color: red;
}

// 同層級，ul 後面的 div 樣式被改變
```
