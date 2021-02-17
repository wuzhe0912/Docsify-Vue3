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
## 同步讀取檔案
在`node`當中的`fs module`是用來操作實體檔案，譬如讀取或寫入等等：
```
<!-- 我建立一個 markdown 文件，並在文件手動寫入一段文字 -->
mkdir text.md
```
```
<!-- text.md -->
Hello this is text!
```
我可以透過`fs`來操作並讀取這段文字：
```
<!-- index.js -->
const fs = require('fs');

const textMarkdown = fs.readFileSync('./text.md', 'utf-8');
console.log(textMarkdown); // 印出 Hello this is text!
```
## 非同步讀取檔案
非同步的寫法：
```
const fs = require('fs');

fs.readFile('./text.md', (err, data) => {
  if (err) throw err;
  else console.log(data.toString());
});
```
## 寫入檔案
寫入檔案時，若檔案已存在則覆寫，不存在則建立：
```
const fs = require('fs');

const textOut = `This is replace text.\nCreated on ${Date.now()}`;
fs.writeFile('./text.md', textOut, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Write is complete!');
  }
});
```
可以看到`text.md`的內容已經被我們複寫了：
```
This is replace text.
Created on 161285xxxxxx
```
## create server
透過`http`模組，我們可以搭建一個本地的`web server`：
```
<!-- index.js -->
const http = require('http');

// SERVER
const server = http.createServer((req, res) => {
  res.end('This message from server.');
})
server.listen(8000, '127.0.0.1', () => {
  console.log('Listening to request on port 8000');
});
```
我透過`http`回傳一串訊息，並且在`8000`這個端口進行監聽，所以接著回到終端機，輸入`node index.js`，可以看到終端機頁面印出`Listening to request on port 8000`，再來我們到瀏覽器輸入`http://127.0.0.1:8000/`，就可以看到頁面出現剛剛我們寫死的回傳訊息`This message from server.`。
## route
```
const server = http.createServer((req, res) => {
  console.log(req.url);
  res.end('This message from server.');
})
```
當我們在網址輸入`http://127.0.0.1:8000/products`，可以在終端機看到我們印出`/products`。