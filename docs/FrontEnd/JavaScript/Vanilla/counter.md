# Counter(計數器)

> 使用原生語法實現小功能

## Template
先準備基本樣式與結構：
```
<!-- index.pug -->

h2 Counter(計數器)
.counter__container
  i.cheveron.cheveron__up
  .number 10
  i.cheveron.cheveron__down
```
```
<!-- style.scss -->
.counter__container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 200px;
}
.number {
  font-size: 28px;
}
.cheveron {
  border: solid red;
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: 6px;
  cursor: pointer;

  &.cheveron__up {
    transform: rotate(-135deg);
  }

  &.cheveron__down {
    transform: rotate(45deg);
  }
}
```
## 開始操作 DOM 結構
先抓到上下箭頭按鈕還有數字這三個元素：
```
const upElement = document.querySelector('.cheveron__up');
const downElement = document.querySelector('.cheveron__down');
const numberElement = document.querySelector('.number');
```
點擊到按鈕時，監聽觸發`click`事件：
```
upElement.addEventListener('click', (e) => {
  console.log('up', e);
});

downElement.addEventListener('click', (e) => {
  console.log('down', e);
});
```
因為抓到的數字的元素，本身是一個標籤，但我們需要改變的是標籤中的內容，所以使用`textContent`來獲取內容文字，但又因為獲取出來的內容會是`string`，所以我們必須透過`Number()`方法將其轉為`number`，這樣才能進行加減計算：
```
upElement.addEventListener('click', () => {
  const currentNumber = Number(numberElement.textContent);
  numberElement.textContent = currentNumber + 1;
});

downElement.addEventListener('click', () => {
  const currentNumber = Number(numberElement.textContent);
  numberElement.textContent = currentNumber - 1;
});
```
## Reference
- [Demo](https://javascript-demo.netlify.app/)