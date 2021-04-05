# 同步與非同步

## 1. 簡單說明 JavaScript 為何需要非同步？簡單聊一下對 call stack 跟 event loop 的理解。

`JS`的本質是單線程的語言，因為它的工作之一就是修改瀏覽器的`DOM`結構，如果多線程但同時修改同一個節點，會讓整體情況變得相當複雜，所以為了避免複雜的狀況發生，因此才會採用單線程。而非同步就是因應單線程的背景，假設某個動作需要等待 2 秒，瀏覽器當然不可能等在原地 2 秒，因此會先執行所有同步性的工作，而所有非同步性的工作則先放到`task queue(任務等待序列)`。瀏覽器先執行同步性工作的環境，可以理解為包在`call stack`區間，瀏覽器先依序把`call stack`內的工作執行完畢，當它檢查到`call stack`為空時，接著前往`task queue`中將等待序列的工作丟到`call stack`依序執行。

```
瀏覽器檢查 call stack 是否為空
=> 否 => 回到 call stack 繼續執行
=> 是 => 進入 task queue 開始將非同步工作丟到 call stack 執行
```

這樣不斷循環的過程就是`event loop`：

```
console.log(1);
setTimeout(function() { // => 這種非同步的函式就是 callback
  console.log(2);
}, 0);
console.log(3);

// 依序印出 1 3 2
```

## 2. 下面這段程式碼依序會印出什麼？

```
console.log(1);

setTimeout(function () {
  console.log(2);
}, 0);

console.log(3);
```

### 解法：

`JS`本身為單執行緒，遇到同步工作時會依序執行，但非同步工作則會先丟到`task queue(任務等待序列)`中，直到瀏覽器所有工作執行完，才會回頭來檢視`task queue`。

```
1
3
2
```

## 3. 試判斷下述程式碼依序執行的結果？

```
function a() {
  console.log("Warlock");
}

function b() {
  console.log("Druid");
  Promise.resolve().then(() => {
    console.log("Rogue");
  });
}

function c() {
  console.log("Mage");
}

function d() {
  setTimeout(c, 100);
  var temp = Promise.resolve().then(a);
  console.log("Warrior");
  setTimeout(b, 0);
}

d();
```

### 解法：

```
Warrior
Warlock
Druid
Rogue
Mage
```

先跑完同步的印出內容，接著執行`promise`的結果，最後才跑`setTimeout`，並依等待秒數順序執行。

## 4. What is the output sequence(輸出順序)?

```
setTimeout(funcB, 10);
setTimeout(funcD, 100);
funcA(funC);

// assume the below operation cost total 1 sec
var later = 0;
for (var i = 0; i < 1000; 1++) {
  later += i;
}
funE();

function funcA(item) {
  console.log('A');
  setTimeout(item, 0);
}

function funcB() {
  console.log('B');
}
function funcC() {
  console.log('C');
}
function funcD() {
  console.log('D');
}
function funcE() {
  console.log('E');
}
```

### 解法：

非同步考題，依順序先執行`funcA`，印出`A`，同時傳入的參數`funcC`因為`setTimeout`，暫時存入`task queue(任務等待列表)`，接著執行`funcE`印出`E`。同步執行工作執行完畢，回頭檢視非同步的部分，依等待秒數依序印出`C`、`B`、`D`。

```
A
E
C
B
D
```

## 5. 請寫出輸出結果

```
for (var i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i)
  }, 500)

  let j = i;

  setTimeout(() => {
    console.log(j);
  }, 1000)
}
```

### 解法：

會拿到如下結果：

```
3
3
3
0
1
2
```

雖然`setTimeout`是非同步任務，但對瀏覽器而言，本身還有一個`計時器模組(timer)`，當迴圈開始執行時，`setTimeout`就被交給計時器模組。因此當`500毫秒`過去，迴圈已跑完`i`已被更新為`3`。

使用`let`則是因為作用域的關係，每次迴圈的過程中，會重新宣告一次變數，並將上一次的結果，作為這一次的初始值。因此解法：也可以如下：

- example 1：

```
for (let i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i)
  }, i * 1000)
}
```

- example 2(將`i`傳入`IIFE`來隔離變數作用域)：

```
for (var i = 0; i < 3; i++) {
  (function(j) {
    setTimeout(function() {
      console.log(j);
    }, j * 1000)
  })(i);
}
```

## 6. 請問以下輸出結果為何？若僅在 plus 函式進行修改，如何調整為依序每隔一秒輸出一次？

```
const list = [7, 5, 3, 1];

const square = num => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(num * num);
    }, 1000);
  })
}

function plus() {
  list.forEach(async item => {
    const res = await square(item);
    console.log(res);
  });
}

plus();
```

### 解法：

輸出結果為：

```
49
25
9
1
```

依序每隔一秒輸出一次解法：

```
const list = [7, 5, 3, 1];

const square = num => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(num * num);
    }, 1000);
  })
}

function plus() {
  list.forEach((item, index) => {
    setTimeout(async () => {
      const res = await square(item);
      console.log(res);
    }, index * 1000)
  });
}

plus();
```

## 7. What is the output(待處理)？

```
var obj = function (item) {
  this.item = item;

  this.secondFunc = function () {
    console.log(this.item);
  };

  this.firstFunc = function () {
    setTimeout(this.secondFunc, 3);
  };
};

var newObj = new obj('Pitt');
newObj.firstFunc();
```

### 解法：

這題我還未能理解要問什麼，待處理：

```
undefined
```

## 8. 請列出下列 console.log() 結果

```
var name = '織田';
var obj = {
  subObj: {
    name: '羽柴',
    myName: function () {
      setTimeout(() => {
        console.log(3, this.name);
      }, 0);
      console.log(2, this.name);
    },
  },
  name: '德川',
};

console.log(1, this.name);
var newName = obj.subObj.myName();
```

### 解法：

```
1, 織田
2, 羽柴
3, 羽柴
```

在執行`newName`之前，已經先跑了第一個`console.log()`所以會先印出最上面宣告的變數，接著執行`myName()`，因為函式中有非同步的`setTimeout()`，所以先放入事件貯列中，優先執行下一步，等到全部完成，最後才回頭處理佇列。
