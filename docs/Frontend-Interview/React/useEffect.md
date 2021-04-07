# useEffect

## 1. 請簡述你所理解的 useEffect

`useEffect`可以理解為在`function component`的設計下，對元件生命週期的控制，針對不同階段去決定是否要執行某些效果或改變狀態。

在`class component`的時代，生命週期可以劃分為三個階段：

1. `componentDidMount` => 元件渲染完成後
2. `componentDidUpdate` => 當元件的`state`的值有改變，進行更新
3. `componentWillUnmount` => 當元件被移除時

因此我們可以透過相同概念來理解`useEffect()`，當我想要每次`render`時就觸發一次，那就不需要填入參數，這包括當`state`改變時若造成畫面也重新渲染時也會觸發：

```
useEffect(() => {
  console.log(1);
});
```

如果我只想要進入頁面時，只觸發一次，則填入參數`[]`：

```
useEffect(() => {
  console.log(2);
}, []);
```

反之，如果我有一個列表已經用`useState`保存起來，但我希望若列表出現變化時就監聽一次`useEffect`，則可以將變動的變數作為參數填入：

```
useEffect(() => {
  console.log(3);
}, [state]);
```

最後，如果希望能拿到`state`改變前的值，可以透過回傳的方式：

```
useEffect(() => {
  return () => {
    conosle.log(`舊值：${state}`);
  };
}, [state]);
```
