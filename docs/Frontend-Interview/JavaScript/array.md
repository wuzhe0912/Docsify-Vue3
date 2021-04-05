# 陣列操作

## 1. 請將下列名為 list 的陣列，移除第一個數字

```
const list = [1, 2, 3, 4, 5];
```

### shift 解法：

```
const list = [1, 2, 3, 4, 5];
list.shift();
console.log(list); // 印出 [2, 3, 4, 5]
```

### splice 解法：

```
const list = [1, 2, 3, 4, 5];
list.splice(0, 1);
console.log(list); // 印出 [2, 3, 4, 5]
```

## 2. 請將下列名為 list 的陣列，移除最後一個數字

```
const list = [6, 7, 8, 9];
```

### pop 解法：

```
const list = [6, 7, 8, 9];
list.pop();
console.log(list); // 印出 [6, 7, 8]
```

### splice 解法：

```
const list = [6, 7, 8, 9];
list.splice(-1, 1);
console.log(list); // 印出 [6, 7, 8]
```

## 3. 陣列中過濾重複值的做法，請分別使用 ES5 和 ES6 處理。

### ES5

#### `filter`解法：

```
const originArray = [10, 20, 'a', 20, 'b', 'c', 'a']
const filterArray = originArray.filter((element, index, array) => {
  // 查找陣列中第一個被找到的索引
  return array.indexOf(element) === index
})
const repeatNumber = originArray.filter((element, index, array) => {
  return array.indexOf(element) !== index
})
console.log(filterArray);  // [10, 20, 'a', 'b', 'c']
console.log(repeatNumber); // [20, a]
```

### ES6

#### `Set`解法：

```
const originArray = [10, 20, 'a', 20, 'b', 'c', 'a']
const filterArray = [... new Set(originArray)]
console.log(filterArray) // [10, 20, 'a', 'b', 'c']
```

### Reference

- [JavaScript 取出陣列重複/不重複值的方法](https://guahsu.io/2017/06/JavaScript-Duplicates-Array/)

## 4. 下面的 statement(陳述式) 會回傳什麼？

```
"Hello World!".split("").reverse().join("");
```

### 解法：

`split()`會將`string`進行分割，若有給定參數，則會根據該參數進行拆分並重組成陣列，譬如空格或是逗號，但因為這邊沒有，所以會根據每個字元拆，得到拆完的結果後，透過`reverse()`將陣列中的資料進行反轉，最後再透過`join()`將陣列中所有元素加入一個`string`。

```
"!dlroW olleH"
```

## 5. 下面 foo.length 的值是什麼？

```
const foo = [];
foo.push(1);
foo.push(2);
```

### 解法：

建立空陣列，依序透過`push()`塞值，`array`中會拿到兩個元素，長度為 2。

```
2
```

```
console.log(foo);        // [1, 2]
console.log(foo.length); // 2
```

## 6. How can get 'Vue' & 'React'？

```
const obj = {
  1: "Vue",
  props2: "Angular",
  "props-3": "React",
};
```

### 解法：

利用`[]`來操作屬性，將`key`中的`1`轉為`string`，同理可解`dash`的問題。

```
console.log(obj[1]);
console.log(obj["props-3"]);
```

## 7. 使用 ES6 語法，將以下陣列中重複值進行刪除

```
let array = [1, 2, 3, 1, 6, 5, 7, 7, 9, 10, 8, 8];
```

### 解法：

```
const newArray = [...new Set(array)];
console.log(newArray); // [1, 2, 3, 6, 5, 7, 9, 10, 8]
```

將陣列進行順序整理，如果不使用判斷函式，預設會將元素轉換成字串，並採用`unicode`來判斷，這也會造成某些數字的排序錯誤。

```
newArray.sort((a, b) => a - b);
console.log(newArray); // [1, 2, 3, 5, 6, 7, 8, 9, 10];
```
