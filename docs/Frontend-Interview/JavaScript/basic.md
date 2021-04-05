# JavaScript 基礎觀念

## 1. 什麼是 DOM ?

我們所撰寫的`HTML`文件，瀏覽器會解析成樹狀結構，父層包覆子層形成一個`document`文件，每一個元素都可以理解為物件，`DOM`操作就是透過`JS`去操作這些物件去執行行為。同時為了避免操作過程中，污染相同屬性的元素，譬如兩個`p`標籤，所以我們會透過`id`或`class`來指定操作：

```
document.getElementById(id)
document.querySelector(.className)
```

## 2. 為什麼我們要將 JS 檔案放在 body 尾端？

瀏覽器在解析`HTML`文件時，如果遇到`script`標籤，會先將`JS`檔案執行完畢才繼續執行解析`HTML`。

如果`JS`內容龐大，那對頁面來說載入時間就相對拉長，這是很不利於使用體驗的，更糟的是，如果`JS`執行過程中出錯，有很大機率會卡住呈現空白頁面。

基於瀏覽者的使用體驗，我們必須確保最低使用體驗，優先讓靜態`HTML`結構搭建完成，再執行動態的`JS`。

## 3. foo 的值是什麼？

### 問題一：

```
const foo = 10 + "20";

console.log(foo); // output？
```

### 問題一解法：

當`string`和`number`相加時，會變成`string`形式，相反`number`則會正常計算。

```
1020
```

### 問題二：

```
const foo = 1 + 2 + "3";

console.log(foo); // output？
```

### 問題二解法：

1 和 2 相加後，再和`"3"`一起轉成`string`。

```
33
```

### 問題三：

```
const foo = "5" + 6 + 8;

console.log(foo); // output？
```

### 問題三解法：

因為`6`已經被`"5"`轉成`string`，後面`8`也自然同樣被轉成`string`。

```
568
```

## 4. window.foo 的值是什麼？

```
window.foo || (window.foo = "bar");

console.log(foo); // output？
```

### 解法：

在問題中，可以看到`window.foo`在邏輯運算中，僅有一側被賦值，自然使用`bar`，除非兩側都賦值，`||`判斷才會使用第一組。

```
bar
```

## 5. 下面的兩個 console.log 的結果會是什麼？

```
var foo = "Hello";

(function () {
  var bar = " World";
  console.log(foo + bar);
})();

console.log(foo + bar);
```

### 解法：

```
Hello World
error => bar is not defined
```

在第一個`console.log`時，`foo`可以使用全域變數，而`bar`則使用函式內的變數，結果正常。

但在第二個`console.log`時，函式已經結束了，啟動`GC機制(垃圾銷毀)`，`bar`這個變數已經被銷毀的情況下，也就變成`not defined`。

```
var foo = "Hello";

(function() {
  var bar = " World";
  console.log(foo + bar); // 印出 Hello World
})();

console.log(foo + bar);   // 印出 bar is not defined
```

## 6. 請列出下列 console.log() 結果

```
var a = '2';
console.log(2 == a);
console.log(2 === a);
```

### 解法：

```
true
false
```

`==`：為不嚴謹判斷，除了會盡量讓兩側相等外，僅做`值`的比對，因此上面的案例就會變成`2 == 2`。

`===`：相反則是嚴謹判斷，除了`值`的比對，還會做出型別比對，因此`number`不等於`string`。

## 7. JS 有幾種資料型別？

> 總共七種：

原始型別`(primitive type)`有六種：

1. `null` => 需注意`null`型別無法透過`typeof`檢測，所以會拿到`object` => `歷史性 bug`
2. `undefined`
3. `string`
4. `number`
5. `boolean`
6. `symbol(ES6)`

物件型別`(object type)`一種，包含`object`、`array`、`function`...等等。
另外，`function`透過`typeof` => `function`。

> 另一種檢驗型別方式，Object.prototype.toString.call()

```
console.log(Object.prototype.toString.call({})); => object
console.log(Object.prototype.toString.call([])); => array
```

## 8. 請列出下列各型別結果

```
var a = NaN;
var b = undefined;
var c = false;
var d = 2;
var e = null;
var f = 'Object';

console.log(typeof a);
console.log(typeof b);
console.log(typeof c);
console.log(typeof d);
console.log(typeof e);
console.log(typeof f);
```

### 解法：

```
number
undefined
boolean
number
object
string
```

雖然有`null`型別，但`type of()`沒辦法檢測。

`JS`原始型別有六種：

```
Boolean
String
Null
Undefined
BigInt
Symbol
```

另一種則是`Object`。

## 9. 網址中取特定的值

```
// const url = location.href
console.log(url)
// 假設拿到 http://127.0.0.1:5501/index.html?uid=9487&name=qwert

// 若我要取 uid 和 name
// 使用第一個參數作為分割起始點
const target = url.split('?uid=')[1]
// 將起始點後的值，再用第二個參數進行分割，塞入陣列
const subTarget = url.split('?uid=')[1].split('&name=')

console.log(subTarget)
```

## 10. 請列出下列 console.log() 結果

```
function deposit(value) {
  this.money = value || 10000;
  return function() {
    return {
      count: function(price) {
        if (money < price) {
          return console.log(`售價：${price}，當前存款不足`);
        } else {
          return money = money - price;
        }
      },
      amount: function() {
        return console.log(`目前剩餘存款：${money}`);
      }
    }
  }
}

var wallet = deposit(9000);
wallet().count(3000);
wallet().amount();
```

### 解法：

```
目前剩餘存款：6000
```
