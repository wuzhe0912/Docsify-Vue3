# JavaScript

> 記錄面試遇到的`JavaScript`題目

## 1. JS apply 和 call 的差異？

- `call`可以傳入任何參數，包含物件或陣列，同時不限制傳述的參數數量，只是參數間需用逗號隔開。

```
function solve(a, b) {
  console.log(this);
  console.log(a, b);
}

solve.call([1, 2, 3], 10, 'string');
```

- `apply`只接受兩個參數，第二個必須為`array`，陣列中的值則會變成參數的形式。
- 需要特別注意這兩者的第一個參數，因為該參數會改變`function()`中`this`的值。

## 2. 請列出下列 console.log() 結果

```
var num = 10;

function showNumber() {
  console.log(this.num);
}

var player = {
  num: 20,
  showNumber: function() {
    console.log(this.num);
  }
}

var oldPlayer = {
  num: 25
}

showNumber();
showNumber(player);
player.showNumber = player.showNumber.bind(oldPlayer);
player.showNumber();
```

### 解法：

```
10
10
25
```

第一個函式執行，向外找`num`這個變數，印出`10`。第二個函式執行時，看似傳入`player`這個物件，但實際上`console`印的內容仍是尋找`this.num`而非`player.num`，故仍印出`10`。第三個函式執行前，已被`bind`綁在`oldPlayer`這個物件上，因此被強制指定為`25`。若希望印出`20`，則改寫為：

```
function showNumber(value) {
  console.log(this.num);
  if (value) console.log(value.num)
}
```

## 3. 淺拷貝和深拷貝的做法？

- 為了避免物件型別中傳址的問題，導致都指向記憶體同一個位置，所以可以透過淺拷貝先複製出來：

```
// slice 會從括號內的索引位置開始進行 copy

var array1 = [1, 2, 3]
var array2 = array1.slice(0)
console.log(array2) // [1, 2, 3]

array1[1] = 4
console.log(array1) // [1, 4, 3]
console.log(array2) // [1, 2, 3]

// 展開運算符

var array1 = [10, 20, 30]
var array3 = [...array1]
console.log(array3) // [10, 20, 30]

array1[2] = 50
console.log(array1) // [10, 20, 50]
console.log(array3) // [10, 20, 30]
```

- 面對深層資料時，淺拷貝無法處理，需使用深拷貝的形式，這邊建議使用`Lodash`：

```
var object1 = {
  name: 'Amy',
  player: {
    name: 'Betty'
  }
}
var object2 = _.cloneDeep(object1)

object1.player.name = 'Alisa'
console.log(object1.player.name) // 'Alisa'
console.log(object2.player.name) // 'Betty'
```

### Object.assign

承前面的情境，操作物件資料時，不建議直接操作原始資料，建議先複製出來再進行操作：

```
var object1 = { num: 10 }
var object2 = Object.assign({}, object1)
console.log(object2) // { num: 10 }

object1.num = 100
console.log(object1) // { num: 100 }
console.log(object2) // { num: 10 }
```

## 4. 簡單說一些陣列操作 API

- 移出第一個，`shift()`、`splice`：

```
let array = [1, 2, 3]
let newArray = array.shift()
console.log(array) // [2, 3]
console.log(newArray) // 1
```

```
let array = [1, 2, 3]
let newArray = array.splice(0, 1)
console.log(array) // [2, 3]
console.log(newArray) // 1
```

- 移出最後一個，`pop()`、`splice`：

```
let array = [1, 2, 3]
let newArray = array.pop()
console.log(array) // [1, 2]
console.log(newArray) // 3
```

```
let array = [1, 2, 3]
let newArray = array.splice(-1, 1)
console.log(array) // [1, 2]
console.log(newArray) // 3
```

## 5.
