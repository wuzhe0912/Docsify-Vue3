# 串接 API 實作(axios)

> 使用 Vue 3 語法實作串接 API

## Install axios
首先要安裝`axios`這個常用的`plugin`，方便我們用於串接`API`。
```
yarn add axios
```
至於`api`的部分，我們這邊使用免費的 [Dog API](https://dog.ceo/dog-api/)。
## 準備頁面
同樣的，我們先準備一個靜態`component`頁面`DogImage.vue`：
```
<template lang="pug">
.dog-container
  div Dog
</template>

<script>
export default {
  name: 'DogImage',
};
</script>

<style scoped lang="scss"></style>
```
## 呼叫資料
接著我們準備一個`call api`用的`function`，我們同樣建立在`src/hooks`底下：
```
<!-- src/hooks/useURLLoader.js -->
import { reactive, toRefs } from 'vue';
import axios from 'axios';

const getDogImage = async (url) => {
  const state = reactive({
    loading: true,
    formData: [],
  });

  await axios
    .get(url)
    .then((response) => {
      state.formData = response.data;
      state.loading = false;
    })
    .catch((error) => {
      console.log(error);
      state.loading = false;
    });

  return { ...toRefs(state) };
};

export { getDogImage };
```
這邊嘗試改用`reactive()`，另外，為了方便使用時解構，所以我們同時也用了`toRefs()`，`axios`這邊考慮到只有`call api`的`js`檔會用到，所以就不特別註冊到全域。

現在我們來改寫`DogImage.vue`，確保我們從`api`中拿到的圖片，可以正常渲染到畫面：
```
<!-- template -->
<template lang="pug">
.dog-container
  .list-loading(v-if="loading") Loading...
  .list-wrap(v-else)
    .list(v-for="node in data" :key="node")
      img(:src="node")
</template>
```
```
<!-- script -->
<script>
import { reactive, toRefs, onMounted } from 'vue';
import { getDogImage } from '../hooks/useURLLoader.js';

export default {
  name: 'DogImage',

  setup() {
    const list = reactive({
      loading: true,
      data: [],
    });

    onMounted(async () => {
      const { formData, loading } = await getDogImage(
        'https://dog.ceo/api/breed/hound/images/random/8'
      );
      list.data = formData.value.message;
      list.loading = loading;
    });

    return { ...toRefs(list) };
  },
};
</script>
```
在`template`中我們預設兩種狀況，拿到資料前，我們會保持`loading`的狀態，當資料取得後，我們改變`loading`為`false`，從而渲染整個圖片列表。同樣的，這邊嘗試使用`reactive()`而非`ref()`。至於`call api`的格式，則根據官網的文件，視個人需求調整。
## 前後切換
再來，雖然我拿到一組圖片列表，但我不希望他們一次全部顯示出來，而是用上一張下一張的方式，依序切換圖片，那麼我該怎麼做呢？
```
<!-- template -->
.dog-container
  .list-loading(v-if="loading") Loading...
  .list-wrap(v-else)
    .list-image(
      v-for="(node, index) in data"
      :key="node"
      v-show="index === imageIndex"
    )
      img(:src="node")
  .list-btn
    button.btn-prev(@click="imagePrev") Prev
    button.btn-next(@click="imageNext") Next
```
```
<!-- script -->
const state = reactive({
  loading: true,
  data: [],
  imageIndex: 0,
});

const imagePrev = () => {
  state.imageIndex--;
};

const imageNext = () => {
  state.imageIndex++;
};

return {
  imagePrev,
  imageNext,
};
```
```
<!-- style -->
<style lang="scss" scoped>
.list-wrap {
  display: flex;
  justify-content: center;
}

.list-image {
  width: 400px;
  height: 300px;
  margin-bottom: 12px;
  border: 4px solid #42b983;

  img {
    width: 100%;
    height: 100%;
  }
}

.list-btn {
  button {
    cursor: pointer;
    margin-right: 12px;
  }
}
</style>
```
這邊我們需要透過`index、v-show`來達到切換頁面的效果，首先在原本的`state`中多增加一個變數`imageIndex`，預設值為`0`，意思是我預設取列表中的第一張圖片。另外準備好`imagePrev()、imageNext()`兩個函式，他們的功能在於觸發時，將`imageIndex`進行增減。回到`template`上，我們可以看到列表渲染中，每一筆資料都會有其對應的`index`，透過改變`imageIndex`的值來告訴頁面需要渲染列表中的第幾張圖。
## 循環切換
但是這個頁面切換機制，存在明顯的漏洞，當我切換到最後一頁和第一頁時，繼續往下走，必然會無法顯示圖片，因為增減的`imageIndex`已經超出列表本身，所以我們需要調整一下`function`，讓它可以無限循環：
```
const imagePrev = () => {
  state.imageIndex--;
  if (state.imageIndex < 0) {
    state.imageIndex = state.data.length - 1;
  }
};

const imageNext = () => {
  state.imageIndex++;
  if (state.imageIndex === state.data.length) {
    state.imageIndex = 0;
  }
};
```
當已經到第一張時，繼續往上一張，代表此時`imageIndex`已經`< 0`，所以我們要讓它列表中的最後一張，因為列表第一張的`index`為`0`，所以最後一張的`index`必然是列表長度 - 1。相反的，如果已經超出最後一張，那我們則將`imageIndex`重新指派為第`0`張。這樣一來，不管是往前或往後，都可以達到無限循環的效果。
## Reference
- [Source Code](https://github.com/wuzhe0912/vue3-components-demo)
- [Demo](https://vue3-demo.netlify.app/)