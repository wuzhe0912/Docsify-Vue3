# Node.js 基本語法
## Hello Node.js
起步自然是印出`Hello World`之類的文字，在`node.js`也很簡單。
```
mkdir demo

cd demo

touch index.js data.js
```
接著在`demo/index.js`輸入以下內容：
```
const hello = 'Hello Node.js!';
console.log(hello);
```
換到終端機輸入`node index.js`，就可以看到終端機上印出`Hello Node.js!`。
## 匯出匯入
將剛剛準備的兩個`js`檔分別填入內容：
```
<!-- data.js -->
function add(a, b) {
  return a + b;
};

function mul(a, b) {
  return a * b;
};

module.exports = {
  add,
  mul,
};
```
```
<!-- index.js -->
const { add, mul } = require('./data');

console.log(add(2, 3));
console.log(mul(10, 2));
```
可以在終端機看到`5、20`。
## npm
使用`npm`初始化環境，並安裝`lodash`：
```
npm init -y

npm i lodash --save
```
這邊測試一下`lodash`：
```
<!-- index.js -->
const _ = require('lodash');

const list = _.concat([10, 20, 30], 50, 60);
console.log(list); // 印出 [ 10, 20, 30, 50, 60 ]
```