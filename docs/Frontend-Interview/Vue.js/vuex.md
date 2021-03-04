# Vuex

## 1. Vuex 有哪些屬性，請分別描述：
1. `actions`：將資料透過`commit`提交，若有額外參數(官方常用命名`payload`)也可以傳入。
2. `mutations`：接收到傳過來的資料後，賦值給`state`。
3. `state`：保存全域使用的變數狀態，方便`component`可以直接使用。
4. `getters`：可以理解為`vuex`的`computed`，只是將保存的值放在`vuex`計算。
5. `modules`：讓`vuex`可以更為結構化，需要聲明`namespaced: true`，讓路徑根據模組自動調整命名，但在應用上需要注意路徑名稱，譬如：`this.$store.dispatch('user/setCurrentChannel', this.isCurrentChannel)`，同時在根目錄上的`vuex`需要添加`modules: { user: user }`。

## 2. 請簡單解釋一下 Vuex 的運作
> 在`Vuex`當中，`state`會存放初始化的資料

1. 當`component`呼叫`vuex`中寫好的函式，首先會到`actions`找對應的函式，這時會去呼叫`api`的資料，當然如果`component`呼叫時有傳入參數，那這個參數就透過`payload`傳入函式。

2. 當`api`的資料取得後，除了回傳給`component`，也透過`commit`的方式來改變`mutations`內的函式，而`mutations`這時就會將傳來的資料賦值給`state`，進而改變狀態。

## 3. Vuex 適合存放怎樣的資料？
舉例來說，平台商可能接入多種遊戲商，每家遊戲商的做法不同，有些可能有開放試玩，有些可能沒有，因此在使用者帳號資訊中，就會存在三種狀態情境，登入、未登入、試玩，無論是遊戲商頁面、會員首頁的錢包顯示，這些頁面都要判斷登入顯示什麼，未登入顯示什麼。

如果每頁都呼叫一次使用者資訊的`API`，那就顯得太過缺乏效率，所以我們會把使用者帳號的資料狀態存放在`Vuex`，當用戶進行註冊登入時，則更新`Vuex`的狀態，這樣全域有調用該狀態的`component`也就自動隨之更新。

## 4. 什麼情境下，需使用 Vuex？
`Vue`的專案中，通常會有多個`component`組成，尤其專案越大組成結構就越複雜，有些資料會是多個頁面需要共用，這個時候不可能仰賴父子組件傳值，萬一組件和組件之間隔了好幾層，那效益就太差了，這時通常就會抽離到 `Vuex`進行狀態管理。

舉例來說，常見的使用者帳號資料`userInfo`，在`login`和`logout`兩種狀態下，頁面需要顯示的內容會有所差異，不可能在每一個需要使用`userInfo`的`component`都寫一遍呼叫`api`的函式，所以無論是初始的資料或是呼叫`api`的函式，這時候就會統一寫在`Vuex`，方便直接`commit`更新`state`，需要使用的`component`再透過 `mapState`去載入。