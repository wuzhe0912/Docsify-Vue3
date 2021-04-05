# API

## 1. 請描述 v-model / v-show / v-if / v-html / v-bind 的用途
-  `v-model`：資料雙向綁定，當改變資料的同時，隨即驅動改變`template`上渲染的內容。
-  `v-if` & `v-show`：兩者都是條件渲染，透過判斷條件決定是否顯示，不過差別在於`v-if`的判斷會銷毀節點，整個`DOM`在`false`狀態下會被移除，但`v-show`則僅是使用`css`的`display: none;`屬性來隱藏元素。
-  `v-html`：如果資料回傳的內容中帶有`HTML`的`tag`時，可以透過`v-html`這個指令來渲染，例如顯示`Markdown`語法又或是對方直接回傳含有`img`標籤的圖片路徑。
-  `v-bind`：動態綁定，常見於綁定`class`或連結、圖片等。當通過`v-bind`綁定`class`後，可以透過資料變動，來決定該`class`樣式是否被綁定，同理`api`回傳的圖片路徑、連結網址，也能透過綁定的形式來維持動態更新。

## 2. 如果在 v-for 中不設 key 會發生什麼問題？
因為對於程式來說，它們的思考是很死板的，如果沒有設定唯一值的`Key`，當我們對陣列進行操作時，就會造成實際結果和預期結果完全不同。

譬如說：A陣列中有三種水果，依序為蘋果、西瓜、葡萄，我刪除了西瓜的位置，`index`上固然是改成`1、3`，但對`vue`來說，在遍歷中它只會認為是目錄`2`被改成`3`，同時元素又因為沒有被刪除，在就地複用的原則下，就變成`1: 蘋果`、`3: 西瓜`。所以透過唯一值的`Key`，讓`v-for`在遍歷中，若要進行操作可以正常執行。

另外，`key`作為唯一值時，對`vue`的底層虛擬`DOM`渲染也有幫助(涉及`diff`演算法)，當擁有唯一值時，即便陣列或物件中加入新的資料，也可以避免重複渲染的問題，對效能提升有幫助。

## 3. 如何實作 v-model？

### `2.x`版本
```
<!-- template -->
<template lang="pug">
  .container
    input(type="text" placeholder="type something" v-model="text")
    div {{ text }}
</template>
```
```
<!-- script -->
<script>
export default {
  data: () => ({
    text: '',
  }),
};
</script>
```

### `3.x`版本
#### `ref()`寫法：
```
<!-- template -->
<template lang="pug">
.container
  input(type="text" placeholder="type something" v-model="todo")
  div {{ todo }}
</template>
```
```
<!-- script -->
<script>
import { ref } from 'vue';

export default {
  name: 'Demo',
  setup() {
    const todo = ref('');

    return { todo };
  },
};
</script>
```
#### `reactive()`寫法：
```
<!-- template -->
<template lang="pug">
.container
  input(type="text" placeholder="type something" v-model="state.todo")
  div {{ state.todo }}
</template>
```
```
<script>
<!-- script -->
import { reactive } from 'vue';

export default {
  name: 'Demo',
  setup() {
    const state = reactive({
      todo: '',
    });

    return { state };
  },
};
</script>
```
#### 使用`toRefs()`優化`reactive()`寫法：
```
<!-- template -->
<template lang="pug">
.container
  input(type="text" placeholder="type something" v-model="todo")
  div {{ todo }}
</template>
```
```
<!-- script -->
<script>
import { reactive, toRefs } from 'vue';

export default {
  name: 'Demo',
  setup() {
    const state = reactive({
      todo: '',
    });

    return { ...toRefs(state) };
  },
};
</script>
```

## 4. computed 和 watch 的差異？
`computed`除了計算屬性的特性外，其主要目的是為了在目前已有的資料上進行更新，所以本身帶有緩存的特性。相反的`watch`則是監聽資料的變化，因此每次監聽時都是初始化的狀況。如果某筆資料必須相依另外一筆資料的話，則使用`computed`，但如果只是要監聽資料變化時，則使用`watch`。

## 5. 什麼是 Vue.use()?
如果我們有安裝依賴在`Vue`的套件，可以透過`Vue.use()`的方法，把套件註冊到全域環境，讓其他`component` 可以直接使用，而不需要每頁都`import`該插件。

## 6. keep-alive 的用法
可以理解為一種暫存資料的方式，假設後台有一些表單需要填寫時，可能使用者會需要來回切換不同區塊，這時候會導致原先填寫到一半的資料消失，透過`keep-alive`去包裹，可以暫時存放資料，優化使用體驗。

### 實作
準備兩個組件，一個組件單純顯示列表，另一個組件則顯示`textarea`，並在引入組件時進行動態渲染，接著使用`keep-alive`進行包裹，現在我們點擊兩個`button`進行切換，可以看到組件正常來回切換顯示。

接著我們在`textarea`中輸入一些內容，並再次進行切換，依然可以我們看到剛剛輸入的內容被暫存下來，這就是`keep-alive`用法。
```
<!-- template -->
<template lang="pug">
.container
  v-btn(@click="handle('List')") List
  v-btn(@click="handle('Form')") Form
  keep-alive
    component(:is="content") 
</template>
```
```
<!-- script -->
<script>
import List from '../components/list';
import Form from '../components/form';

export default {
  name: 'Video',
  components: {
    List,
    Form,
  },

  data: () => ({
    content: 'List',
  }),

  methods: {
    handle(value) {
      this.content = value;
    },
  },
};
</script>
```