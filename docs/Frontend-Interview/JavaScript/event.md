# 事件捕獲與冒泡

## 1. 如何理解事件傳遞機制？

舉個 🌰 子：

```
<!-- HTML -->
<div class="wrapper">
  <div class="box">
    <button class="btn">Click</button>
  </div>
</div>

<!-- JavaScript -->
addEvent('.wrapper');
addEvent('.box');
addEvent('.btn');

function addEvent(className) {
  document.querySelector(className).addEventListener('click', function () {
    console.log(className);
  });
}
```

在這個案例中，可以看到`console.log()`依序印出`btn`、`box`、`wrapper`，這是因為在`addEventListener()`中，預設的第三組參數為`false`，即只會顯示冒泡階段，但在事件傳遞機制中，先捕獲後冒泡，所以若是將參數改為`true`，我們可以看到捕獲階段傳遞的`DOM`：

```
function addEvent(className) {
  document.querySelector(className).addEventListener(
    'click',
    function () {
      console.log('捕獲階段', className);
    },
    true
  );
  document.querySelector(className).addEventListener('click', function () {
    console.log('冒泡階段', className);
  });
}

// 印出
捕獲階段 .wrapper
捕獲階段 .box
捕獲階段 .btn
冒泡階段 .btn
冒泡階段 .box
冒泡階段 .wrapper
```
