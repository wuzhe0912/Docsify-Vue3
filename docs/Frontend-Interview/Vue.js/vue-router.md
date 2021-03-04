# Vue Router

## 1. Vue Router 如何達到 SPA 效果？
`SPA`的重點就在於由前端來模擬路由，讓使用者看似在切換頁面，實際上只是切換組件。而`Vue Router`就是透過 `router-view`的方法來包裝顯示組件，再透過`router-link`或是`router.push()`等方法來進出頁面。看起來雖然像是從 A 頁面進入 B 頁面，但實際上卻是將 A 組件改為顯示 B 組件。

## 2. 常用哪些 api？
> 僅列出部分常用的，較少使用的`api`，則是需要時才做查詢
- 前往某個頁面：
  1. `router-link`，本質上就是`a`標籤，在`template`中使用這個方式，寫法：`router-link(:to="")`。
  2. `router.push()`，主要透過`function`來執行跳轉到對應頁面，同時也可以在其中的`query`埋下參數，方便跳轉後的頁面直接調用。

- `router.go()`，根據填入的參數，決定前進後退的頁面：
  - `router.go(-1)`：最常使用的函式，返回上一頁

- `router.replace()`：替換掉目前這一頁

### Navigation Guards(導航守衛)
- `router.beforeEach`：常見的用法，譬如檢查目前前往的頁面是否需要登入狀態，若是已登入帶有`token`，則正常進入`next()`，反之則退到需求要求的頁面，譬如`login`。

- `beforeEnter`：在特定的`route`內，依照需求決定是否要觸發`function`，或前往指定的頁面。

## 3. hash mode 和 history mode 的差異
當設置`hash`模式時，網址會多出一個`#`，而`history`則沒有，從畫面上來看，設置`history`比較合理，畢竟除了網址比較美化外，對`SEO爬蟲`也有影響，但設置`history`模式需要後端配合設定`url rewrite`，具體的設定方式附在[官網 HTML5 History Mode](https://router.vuejs.org/guide/essentials/history-mode.html#example-server-configurations)，換言之，如果後端不願意配合，那就只能退而求其次使用`hash`模式。

當後端沒有配合設置的狀況下，為什麼使用`hash`模式可行？因為網址列中的`#`，在它後面的內容不會經過`server`端，單純只會在`client`處理，因此不受影響。

使用情境：倘若專案本身是用來搭建`後台CMS`，其實`hash`模式亦不受影響，因為網址美醜不影響使用者。反之，如果今天是產品網頁，會面向一般使用者，則需要配合使用`history`模式。

## 4. vue-router 總共有幾種模式？
除了前述的兩種模式外，還有一種`abstract`模式，主要使用在`node.js`，當發現環境沒有瀏覽器支援時，會被強制切換到這個模式，所以總共是`3`種模式。


## 5. route 和 router 有何不同？
- `route`：
本身是一個物件，這個物件內容包含了路由本身的所有資訊，諸如`name、meta、path、query`，所以可以印出參數或是路徑，我們可以透過進入這個頁面時拿到資料參數，決定是否觸發`function`。

- `router`：
我的理解是，他是一個可以使用的`api`，可以透過呼叫一些函式來決定要做什麼事情，譬如`this.$router.push()`前往某個頁面，`go()`選擇前進或後退，`replace()`替換目前的頁面，也因為如此，他本身就帶有全域性質，而`route`則會根據不同的頁面呈現不同的資訊。