# Hoisting(變量提升)

## 1. 請簡單說明什麼是 Hoisting(變量提升)？

`JS`的運行可以拆解為兩階段，分別是創造與執行：

```
var name = 'Pitt'
console.log(name) // 印出 Pitt
```

在變數中，上面這段在實際運作上，需要理解為

```
// 創造
var name

// 執行
name = 'Pitt'
console.log(name)
```

而函式又和變數不同，在創造階段就會指給記憶體，陳述式如下：

```
getName()
function getName () {
  console.log('string') // 印出 string
}
```

上面這段之所以能正常運行印出`console.log`，而不會報錯，在於以下邏輯

```
// 創造
function getName () {
  console.log('string')
}

// 執行
getName()
```

但需要注意的是，這種`JS`提升的性質，在表達式時需要注意撰寫順序問題
創造階段 => 函式優先，其次才是變數

### 正確寫法

```
name = 'Pitt'
console.log(name) // 印出 Pitt
var name

相等於

// 創造
var name

// 執行
name = 'Pitt'
console.log(name) // 印出 Pitt
```

### 錯誤寫法

```
console.log(name) // 印出 undefined
var name = 'Pitt'

相等於

// 創造
var name

// 執行
console.log(name) // 印出 undefined，還未拿到賦值，只拿到預設的 undefined
name = 'Pitt'
```

### 案例

```
whoseName()
function whoseName () {
  if (name) {
    name = 'Nini'
  }
}
var name = 'Pitt'
console.log(name)

相等於

// 創造
function whoseName () {
  console.log(1, name) // => 拿到預設的 undefined，因此不往下走判斷
  if (name) {
    name = 'Nini'
  }
}
var name

// 執行
whoseName()
name = 'Pitt'
console.log(name) // 印出 Pitt
```

## 2. 下述中，變數會依序印出什麼？

```
myName = "global";

function func() {
  console.log(myName); // output？
  var myName = "local";
  console.log(myName); // output？
}

func();
```

### 解法：

```
undefined
local
```

這同樣是一個`Hoisting`問題，上面的`function`實際運行的狀況如下：

```
function func() {
  var myName;
  console.log(myName); // 印出 undefined (myName 已宣告但未賦值)
  myName = "local"; // 執行賦值
  console.log(myName); // 印出 local
}

// 函式結束，變數銷毀
myName = "global";

func();
```

## 3. 請依序填寫輸出的判斷結果

```
a = undefined;
console.log(a === b);

var a = null;
console.log(a === b);

b = null;
console.log(a === b);

var b = undefined;
console.log(a === b);
```

### 解法：

上面的題目，探討變數被提升後的狀況，可以理解為下述的結果。

```
<!-- 創造 -->
var a
var b
<!-- 執行 -->
a = undefined;
console.log(a === b); // true

a = null;
console.log(a === b); // false

b = null;
console.log(a === b); // true

b = undefined;
console.log(a === b); // false
```

第一階段中，宣告變數但尚未賦值時，預設皆為`undefined`，因此這時兩者相等，結果為`true`。

第二階段時，`a`被賦值為`null`，而`b`仍是`undefined`，因此兩者不相等，結果為`false`。

第三階段，`b`也被賦值為`null`，兩者相等，結果為`true`。

第四階段，`b`被更改為`undefined`，兩者再次不相符，結果為`false`。
