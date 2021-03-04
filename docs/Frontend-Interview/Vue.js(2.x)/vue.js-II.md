# Vue.js - II


## 14. keep-alive 的用法
可以理解為一種暫存資料的方式，假設後台有一些表單需要填寫時，可能使用者會需要來回切換不同區塊，這時候會導致原先填寫到一半的資料消失，透過`keep-alive`去包裹，可以暫時存放資料，優化使用體驗。


## 17. component 之間有哪些傳遞資料的方式？
狹義來說主要是父子組件傳值、同層級傳值、全域管理：
  - 父子組件，通過`props`接收父組件傳下來的資料，同時也能透過`@emit`來呼叫父組件執行函式。
  - 兄弟組件，同層級組件可以透過`EventBus`傳遞資料。
  - `Vuex`是常見的專案狀態管理，如果有多個組件需要複用的狀態或是函式，可以統一由`Vuex`來管理。

廣義來說，我會認為還有兩種狀況也算是傳遞資料的方式：
  - `localStorage`或是`sessionStorage`存放的資料，組件間也是能調用。
  - `router.push`中例如`query`或是`params`也是可以帶入參數，等同是傳遞資料給進入的下一個組件。

## 18. 什麼是 Vue.use()?
如果我們有安裝依賴在`Vue`的套件，可以透過`Vue.use()`的方法，把套件註冊到全域環境，讓其他`component` 可以直接使用，而不需要每頁都`import`該插件。

## 19. Vue 有幾種導航守衛？
- `router.beforeEach`：註冊在全域的`router`檢測，`to`代表要前往的`router`，`from`則是來自哪裡？`next`選擇調用的方法，常見是選擇前往某頁面或是選擇中斷。
- `router.beforeEnter`：參數同`router.beforeEach`相同，但使用在單一的`router`內。
- 下述守衛則較少使用：
  - `router.beforeResolve`
  - `router.beforeRouteEnter`
  - `router.beforeRouteUpdate`
  - `router.beforeRouteLeave`
