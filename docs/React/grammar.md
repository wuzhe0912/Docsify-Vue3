# React 基礎語法與操作

> 了解並實作`React`語法與應用

## 環境搭建
```
npx create-react-app react-project-name

cd react-project-name
```
```
npm start

# or

yarn start
```
## JSX
在`cli`搭建的環境中，預設已經使用`JSX`語法，所以可以看到在`src/App.js`中有`HTML`的標籤語法雜揉在`.js`文件：
```
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Hello,React!</h1>
      </header>
    </div>
  );
}
```
`h1`標籤的`Hello React!`這時候就會渲染在頁面上。
## 變數與表達式
也因為在`.js`文件中，可以透過變數來改變渲染內容：
```
function App() {
  const text = 'World';

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Hello,{text}!</h1>
      </header>
    </div>
  );
}
```
可以看到頁面的內容被換成`Hello,World!`。同理`{}`除了可以塞入變數，也可以用於計算，譬如：
```
<div>{ 1 + 2 }</div>
```
頁面會渲染出計算後的結果`3`。
## 移植計數器
現在我們要透過`React`的`JSX`語法來修改原生語法撰寫的計數器，先準備好靜態結構：
```
<!-- App.js -->
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="counter__container">
          <i className="cheveron cheveron__up" />
          <span className="number">10</span>
          <i className="cheveron cheveron__down" />
        </div>
      </header>
    </div>
  );
}

export default App;
```
在`JSX`中`class`是關鍵字，所以被換成`className`，另外標籤中若無內容，可以在後方添加` /`來自動閉合。
### 行內樣式
`JSX`也可以透過宣告變數的方式來插入樣式，但`css`屬性欄位的名稱需要換成小駝峰，同時帶數字的值須添加`''`，結尾則換成`,`：
```
const number = {
  fontSize: '28px',
};

<span style={number}>10</span>
```
### Component 的格式
在`React`中，`component`的書寫格式採用大寫駝峰，即若有兩個單字組成，則首字皆為大寫，譬如`MyApp`。但是`HTML`、`CSS`的屬性則遵循小駝峰，譬如`<input type="text" maxLength="10">`。
### click 事件的寫法
```
function App() {
  const number = {
    fontSize: '28px',
  };
  const count = 12;

  const addNumber = () => {
    console.log('text');
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="counter__container">
          <i
            className="cheveron cheveron__up"
            onClick={ addNumber }
          />
          <span style={ number }>{ count }</span>
          <i className="cheveron cheveron__down" />
        </div>
      </header>
    </div>
  );
}
```
在上面，我們可以看到，先將原本的靜態數字轉為變數形式，同時我們加入了`click`事件，在這邊的寫法是`onClick={}`，現在我們點擊向上的箭頭，可以看到`console`印出`text`。
## React Hooks - useState
目前的寫法，並不會監聽到重新編譯的結果，因此我需要使用`Hooks`提供的方法來確保資料正常更新：
```
<!-- App.js -->
import './App.css';
import React from 'react';
const { useState } = React;

function App() {
  const number = {
    fontSize: '28px',
  };
  const [count, setCount] = useState(12);

  const addNumber = () => {
    setCount(count + 1);
  };

  const cutNumber = () => {
    setCount(count - 1);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="counter__container">
          <i
            className="cheveron cheveron__up"
            onClick={ addNumber }
          />
          <span style={ number }>{ count }</span>
          <i
            className="cheveron cheveron__down"
            onClick={ cutNumber }
          />
        </div>
      </header>
    </div>
  );
}

export default App;
```
假設我若想添加一些限制條件，譬如我希望當數值超過`8`時，向上箭頭清除，小於`0`時，則清除向下箭頭，這種判斷條件同樣也能寫在`JSX`中：
```
<!-- 調整預設值為4 -->
const [count, setCount] = useState(4);

<div className="counter__container">
  {
    count < 8 && (
      <i className="cheveron cheveron__up" onClick={ addNumber } />
    )
  }
  <span style={ number }>{ count }</span>
  {
    count > 0 && (
      <i className="cheveron cheveron__down" onClick={ cutNumber } />
    )
  }
</div>
```
除了上面這種清除`DOM`元素作法，還有使用`CSS`來隱藏也是可行：
```
<div className="counter__container">
  <i
    className="cheveron cheveron__up"
    style={{
      visibility: count >= 8 && 'hidden',
    }}
    onClick={ addNumber }
  />
  <span style={ number }>{ count }</span>
  <i
    className="cheveron cheveron__down"
    style={{
      display: count <= 0 && 'none',
    }}
    onClick={ cutNumber }
  />
</div>
```
此外，也可以改成綁定`class`的方式：
```
<!-- css -->
.visibility-hidden {
  visibility: hidden;
}
.display-none {
  display: none;
}
```
```
<!-- js -->
<div className="counter__container">
  <i
    className={`cheveron cheveron__up ${count >= 8 && 'display-none'}`}
    onClick={ addNumber }
  />
  <span style={ number }>{ count }</span>
  <i
    className={`cheveron cheveron__down ${count <= 0 && 'visibility-hidden'}`}
    onClick={ cutNumber }
  />
</div>
```
再來，因為我們現在有兩組`click`事件，假設我們需要合併在一起，透過傳參的方式來決定觸發的內容。在`JSX`這邊不可以直接寫`{function()}`會造成無窮迴圈，所以必須用一個`function`去包：
```
const handleClick = (type) =>
  setCount(type === 'increment' ? count + 1 : count - 1);
```
```
<i
  className={`cheveron cheveron__up ${count >= 8 && 'display-none'}`}
  onClick={ () => handleClick('increment') }
/>
```
## JSX 中使用迴圈
建立一個帶有多元素的陣列：
```
<!-- 回到 index.js -->
const couters = Array.from({ length: 3 });

ReactDOM.render(
  <React.StrictMode>
    {
      couters.map((item, index) => {
        return <App key={index} />
      })
    }
  </React.StrictMode>,
  document.getElementById('root')
);
```
雖然理論上，不應該使用`index`當作`key`值，但考慮這邊僅是練習，就不這麼嚴謹設定了。