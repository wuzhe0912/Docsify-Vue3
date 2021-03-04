# 基礎語法
## DOM

### 抓取 DOM 物件(id)
```
<!-- index.html -->
<div id="btn">Hello</div>
```
```
<!-- index.js -->
const btn = document.getElementById('btn');

console.log(btn); 
<!-- 印出  -->
<div id=​"btn">​Hello​</div>​
```

### 抓取 DOM 物件(class)
因為`class`多為複數，因此透過`getElementsByClassName()`這個方法會拿到`array`形式：
```
<!-- index.html -->
<div class="btn">Hello</div>
```
```
<!-- index.js -->
const btn = document.getElementsByClassName('btn');

console.log(btn); // 拿到 HTMLCollection [div.btn]
```
因此可以透過比較粗淺的方式取得指定的`class`：
```
const btn = document.getElementsByClassName('btn')[0];

console.log(btn);
```

### 抓取 DOM 物件(tag)
直接抓`html`標籤本身，但因為標籤也可能是複數，所以取出來同樣是陣列形式：
```
<!-- index.html -->
<h2>Hello</h2>
```
```
<!-- index.js -->
const btn = document.getElementsByTagName('h2')[0];

console.log(btn);
```

### 操作 DOM 屬性

## Function
基礎`function`寫法：
```
function test() {
  console.log('Hello');
}

test(); // 印出 Hello
```

### onclick
```
<!-- index.html -->
<h2>Hello</h2>
<a id="text">JavaScript</a>
```
```
<!-- index.js -->
document.getElementById('text').addEventListener('click', check);

function check() {
  console.log('click method'); // 點擊時觸發印出 log
}
```

## 迴圈
### while
```
```
### for
```
for(let i = 0; i < 10; i++) {
  console.log(i);
}
```