# 運算式與運算子

## 1. 請列出下列 console.log() 結果

```
var a = 2;
console.log(++a * a)
a = 2;
console.log(--a * a)
```

### 解法：

```
3 * 3 = 9
1 * 1 = 1
```

`a`為 2，`++a`將會回傳`a`運算後的結果，即`2 + 1`，同時`a`的值會被賦值為`3`，變成`3 * 3`。

相反的，如果是`a++`則運算完之後，僅回傳運算前的數值，即是`2`，`a`的值不會被重新賦值，所以如果今天變更題目如下：

```
var a = 2;
console.log(a++ * a)
a = 2;
console.log(a-- * a)
```

那解法則是：

```
3 * 2 = 6
1 * 2 = 2
```

- [MDN 運算式與運算子](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Guide/Expressions_and_Operators)
