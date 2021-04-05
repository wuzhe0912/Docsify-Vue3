# Clousure(閉包)

## 1. 請說明什麼是閉包？

簡單說，就是當`JS`的`function`因為`GC(垃圾回收)`機制觸發，導致函式執行完後，內部作用域內容會被銷毀。這時可以透過子函式來保存我們需要的變數或內容：

```
function deposit() {
  let cash = 100;
  return function (coin) {
    cash = cash + coin;
    return cash;
  };
}
```

因為子函式沒有被銷毀，加上範圍鍊的原則，子函式調用外面父函式的變數`cash`，因此父函式作用域在閉包的狀況下被保存下來，同時後續宣告不同變數時，也可以獨立調用這一組函式而不用擔心互相污染。另外，變數宣告在父函式時，又可以避免變數宣告在全域的污染問題。

```
function deposit() {
  let cash = 10;
  return function (coin) {
    cash = cash + coin;
    return cash;
  };
}

const PittPay = deposit();
console.log(PittPay(10)); // 20
console.log(PittPay(20)); // 40
console.log(PittPay(30)); // 70
```

## 2. 濫用閉包會造成的問題？

原本`JS`提供的垃圾回收機制，就是希望函式結束後銷毀變數，釋放出記憶體資源。但從上題可以看到，因為閉包的特性，變數被保存下來，並且持續累加，自然記憶體也就一直存著變數，記憶體消耗變大，網頁效能也就越來越差。

## 3. 實作符合下面的 function

```
plus(2, 5);  // output 7
plus(2)(5);  // output 7
```

### 第一種解法：

普通函式計算：

```
function plus(value, subValue) {
  return value + subValue;
}

console.log(plus(2, 5));
```

閉包問題，利用子函式可以保存變數的特性進行`return`。

```
function plus(value) {
  return function (subValue) {
    return value + subValue;
  };
}

console.log(plus(2)(5));
```

### 第二種解法：

上面一種解法：是相對偷吃步的，應該考慮將條件判斷引入，使用一個函式解決兩個問題：

```
function plus(value, subValue) {
  if (arguments.length > 1) {
    return value + subValue;
  } else {
    return function (item) {
      return value + item;
    };
  }
}

console.log(plus(2, 5));
console.log(plus(2)(5));
```

使用`arguments`來檢測傳入參數的數量，作為條件判斷依據。

## 4. Please implement a counter

```
function plus() {
  // code
}

var obj = plus();
obj.add() // 印出 1
obj.add() // 印出 2
```

### 第一種解法：

```
function plus() {
  var cash = 0;
  var newAdd = {
    add() {
      cash += 1;
      console.log(cash);
    }
  }
  return newAdd
}

var obj = plus();
obj.add();
obj.add();
```

透過閉包的特性來保留變數，讓下一次使用該函式時，可以繼續使用該變數。

### 第二種解法：

```
function plus() {
  var cash = 0;
  return {
    add: function() {
      cash += 1;
      console.log(cash);
    }
  }
}

var obj = plus();
obj.add();
obj.add();
```

因為沒有宣告新的物件，所以透過物件包裹的形式來`return`。
