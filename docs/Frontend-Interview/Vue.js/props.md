# 資料傳遞

## 1. 為什麼說 vue 是單向資料傳遞？
因為`vue`的父子組件傳值中，父組件可以送資料給子組件，但子組件只能接收不能傳資料給父組件，不過子組件可以透過`@emit`方法，促使父組件執行函式來改變狀態。

舉例來說，彈窗效果`(modal)`我們通常會封裝到`component`內，每個頁面需要顯示彈窗內容都會有差異，譬如 `title`可能就有落差，那`title`的資料就得透過父組件傳過去。但是如果我們想要關閉彈窗，代表我們想改變狀態，這時候`modal`就可以透過`@emit="boxSwitch"`往上傳，父組件拿到後就會執行`methods`內的`function`來改變當前的狀態，達到關閉彈窗的效果。

## 2. component 之間有哪些傳遞資料的方式？
狹義來說主要是父子組件傳值、同層級傳值、全域管理：
  - 父子組件，通過`props`接收父組件傳下來的資料，同時也能透過`@emit`來呼叫父組件執行函式。
  - 兄弟組件，同層級組件可以透過`EventBus`傳遞資料`(Vue 2.x)`。
  - `Vuex`是常見的專案狀態管理，如果有多個組件需要複用的狀態或是函式，可以統一由`Vuex`來管理。

廣義來說，我會認為還有兩種狀況也算是傳遞資料的方式：
  - `localStorage`或是`sessionStorage`存放的資料，組件間也是能調用。
  - `router.push`中例如`query`或是`params`也是可以帶入參數，等同是傳遞資料給進入的下一個組件。

## 3. 簡單說一下 slot 是什麼？
> 理解`slots`之前，需要先確認為什麼需要它？它解決什麼問題？

從表面上來看，`slot`似乎和`props`頗類似，都是可以將資料傳給`component`，那在同質性高的情況下，為什麼我要使用`slot`？因為`props`傳遞資料時，需要一定的書寫格式，但如果今日我只是想要將某個`component`在相同樣式的狀況下更改內容，使用`slot`會相對更輕量簡潔。使用方法上，接受傳值的子組件需要在`template`上使用`slot`標籤，這個標籤內的內容，則會渲染父組件傳過來的內容或節點。當然如果父組件沒有傳值，也可以直接使用子組件的資料來顯示。

### 實作
```
<!-- 父組件 -->
<template lang="pug">
.container
  slot-list {{ content }}
</template>

<script>
import slotList from '../components/list';

export default {
  name: 'Video',
  components: {
    slotList,
  },

  data: () => ({
    content: '傳遞內容',
  }),
};
</script>
```
```
<!-- 子組件 -->
<template lang="pug">
v-btn
  slot 預設內容
</template>

<script>
export default {
  name: 'list',
  data: () => ({}),
};
</script>
```
在上述中，`button`會顯示`傳遞內容`文字，但如果今天將父層的資料移除，則會顯示`預設內容`文字。額外需要注意一點，如果引入的`component`採用駝峰式命名，在`HTML`的`template`時需要改為`dash`的間隔形式。