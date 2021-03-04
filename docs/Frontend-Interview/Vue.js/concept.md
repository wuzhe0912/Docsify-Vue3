# Vue.js 基礎觀念

## 1. 請詳述生命週期

### 2.x 版本
- `beforeCreate`&`created`：
  - `beforeCreated`：`initial`整個`vue`的生命週期，目前個人經驗上，還沒有在這個階段處理過資料。
  - `created`：這個階段，會先進行`initial data`，這個時候`data`內的初始化資料已經可以調用了，如果有需要這個階段也可以呼叫`API`。
  - 在進入`mounted`階段前，其實`Vue`會有一個觀察動作，確認`template`上的`el`是否有正確設置好，但因為目前開發都是基於`vue-cli`的基底，所以這部分不太需要擔心。

- `beforeMount`&`mounted`：
  - `beforeMount`：位於資料渲染前，但我個人幾乎沒有在這個階段使用。
  - `mounted`：頁面已經渲染完成，同時`$el`已經掛載上去了，呼叫`API`的`function`常見於此處。

- `beforeUpdate`&`updated`：
  - 簡單說就是更新`data`的資料，促使頁面重新渲染`DOM`，案例如，透過`@click`事件去執行函式來改變`true` 或`false`，進而影響`v-bind`綁定的`class`增加或移除，達到樣式改變的目的。

- `beforeDestroy`&`destroyed`：
  - `vue`生命週期的尾聲，準備要銷毀節點，常見於`v-if`。舉例來說，當我們執行`methods`的函式時，可能會將某些資料進行狀態改變，當資料在`true`或`false`間轉換時，同時`template`上的`DOM`也會隨之出現或消失，但和`v-show`不同，`v-show`的消失，僅是元素採用`css`的`display: none`來隱藏，而`v-if`則是將該元素整個移除，所以被稱為銷毀。不過一般來說，我們不會直接使用`destroyed`，官方也不建議我們使用。

- 相對冷門：
  - `activated`、`deactivated`，僅有在`keep-alive`時被使用。
  - `errorCaptured`：如果獲取子組件時若產生錯誤，則會觸發這個`api`。

### 3.x 版本
> 主要分三個面向：更換、新增、重新命名
- 更換：
  - `beforeCreate`&`created`統一更換為`setup()`。

- 新增：
  - `onRenderTracked`&`onRenderTriggered`，依照官方的說法，主要`debug`使用的`api`。

- 重新命名，使名稱更為語意化：
  - `beforeMount` => `onBeforeMount`
  - `mounted` => `onMounted`
  - `beforeUpdate` => `onBeforeUpdate`
  - `updated` => `onUpdated`
  - `beforeDestroy` => `onBeforeUnmount`
  - `destroyed` => `onUnmounted`
  - `errorCaptured` => `onErrorCaptured`

## 3. 雙向綁定原理是如何實現的(2.x)？
> 主要拆解為四個步驟：

1. 首先`vue`會先通過`document.createDocumentFragment()`的方法來建立虛擬`DOM`。
2. 隨著`vue`所監聽的數據出現改變時，會再透過`Object.defineProperty`來進行數據攔截，在`Vue 3.0`版本已改用`ES6`的`proxy`方式。
3. 根據數據的變化，再透過訂閱-發布者模式，來觸發`watch`，進而改變虛擬`DOM`。
4. 最後，再根據已經改變的虛擬`DOM`，重新渲染頁面的`DOM`結構，達到雙向綁定的目的。

## 4. created 和 mounted 的差異？
> 兩者的最大的差異，還是在於掛載的順序，以及在各階段資料的狀態。

- `beforeCreate`：在這個階段`$el`和`$data`都尚未掛載 => `undefined`。
- `created`：`$data`初始資料已載入，`$el`尚未掛載成功 => `undefined`。
- `beforeMount`：`$el`依然為空 => `undefined`。
- `mounted`：`$el`掛載完成，渲染出現資料。

## 5. 為什麼說 vue 是單向資料傳遞？
因為`vue`的父子組件傳值中，父組件可以送資料給子組件，但子組件只能接收不能傳資料給父組件，不過子組件可以透過`@emit`方法，促使父組件執行函式來改變狀態。

舉例來說，彈窗效果`(modal)`我們通常會封裝到`component`內，每個頁面需要顯示彈窗內容都會有差異，譬如 `title`可能就有落差，那`title`的資料就得透過父組件傳過去。但是如果我們想要關閉彈窗，代表我們想改變狀態，這時候`modal`就可以透過`@emit="boxSwitch"`往上傳，父組件拿到後就會執行`methods`內的`function`來改變當前的狀態，達到關閉彈窗的效果。