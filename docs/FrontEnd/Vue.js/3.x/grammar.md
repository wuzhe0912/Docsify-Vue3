# Vue 3 基礎語法

> 了解如何應用 Vue 3 語法

## Install Plugin
在開始前，個人習慣將`template`改為`pug`，更為方便閱讀與書寫。
#### 插件安裝
```
yarn add vue-cli-plugin-pug --dev
```
改寫，以`HelloWorld.vue`為例：
```
<!-- Template -->
<template lang="pug">
.wrap
  h1 {{ msg }}
</template>
```
## setup()
在`Vue 3`中不再使用過往的`data()`，而是改用`setup()`函式來進行包裹，並在末尾透過`return`的方式，丟出需要的資料，讓`template`可以使用，書寫格式如下：
```
<script>
export default {
  name: 'Home',

  setup() {
    return {};
  },
};
</script>
```
但如果你的專案使用到`TypeScript`，希望對型別有正確的推斷，需要再加入`defineComponent`：
```
<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Home',

  setup(props) {
    return {};
  },
});
</script>
```
## ref()
為了讓資料可以成功渲染在`template`上，達到雙向綁定的需求，`Vue 3`推出兩個新的語法，其一就是`ref()`：
```
<!-- template -->
<template lang="pug">
.wrap {{ text }}
</template>
```
```
<!-- script -->
<script>
import { ref } from 'vue';

export default {
  name: 'Home',

  setup() {
    const text = ref('Hello World!');
    return {
      text,
    };
  },
};
</script>
```
從上述的`code`中，我們可以看到，使用`ref()`這個函式前，需要先做引入的動作，接著我們透過`const`聲明變數，並將初始資料包裹在`ref()`中，並`return{}`到`template`上。

但如果我們希望在一定的條件下，重新指派這個變數新的值，該怎麼做呢？
```
<!-- template -->
<template lang="pug">
.wrap {{ text }}
</template>
```
```
<!-- script -->
<script>
import { ref } from 'vue';

export default {
  name: 'Home',

  console.log(text);
  setTimeout(() => {
    text.value = 'Hello Vue3!';
  }, 1500);

  setup() {
    const text = ref('Hello World!');
    return {
      text,
    };
  },
};
</script>
```
印出`text`這個變數，可以看到當它被`ref()`包裹後，已經被轉變成`object`的形式，因此若我們從取到正確的值，需要加上`.value`，這樣才可以重新指派新的值。
## reactive()
和`ref()`與之相對的另一個語法，則是`reactive()`，假設今天有一個情境，在多筆資料的狀況下，`ref()`的寫法，在`return{}`時會顯得過於冗余，因此可以透過`reactive()`來改寫：
```
<!-- template -->
<template lang="pug">
.wrap
  div {{ state.text }}
  div {{ state.number }}
  div {{ state.name }}
</template>
```
```
<!-- script -->
<script>
import { reactive } from "vue";

export default {
  name: 'Home',

  setup() {
    const state = reactive({
      text: 'Game!',
      number: 100,
      name: 'Player',
    });

    return {
      state,
    };
  },
};
</script>
```
和`ref()`相同，都必須先引入語法名稱，再透過`const`聲明變數，不同的是，`reactive()`聲明的變數，僅接受`object`或`array`的格式，而在`return{}`時，則是回傳變數即可，渲染時才使用物件的形式書寫。那如果我要重新指派值該怎麼做呢？
```
<!-- template -->
<template lang="pug">
.wrap
  div {{ state.text }}
  div {{ state.number }}
  div {{ state.name }}
</template>
```
```
<!-- script -->
<script>
import { reactive } from "vue";

export default {
  name: 'Home',

  setup() {
    const state = reactive({
      text: 'Game!',
      number: 100,
      name: 'Player',
    });

    setTimeout(() => {
      state.text = 'New Game!';
      state.number = 200;
      state.name = 'New Player';
    }, 1500);

    return {
      state,
    };
  },
};
</script>
```
在`setTimeout()`這個`function`中可以看到，不同於`ref()`需要加上`.value`，在`reactive()`可以直接從物件中取出來。
## toRefs()
再來，如果我們希望`template`上可以更精簡一些，不要使用物件取值的方式，我們可以怎麼做？
```
<!-- template -->
<template lang="pug">
.wrap
  div {{ text }}
  div {{ number }}
  div {{ name }}
</template>
```
```
<!-- script -->
<script>
import { reactive, toRefs } from "vue";

export default {
  name: 'Home',

  setup() {
    const state = reactive({
      text: 'Game!',
      number: 100,
      name: 'Player',
    });

    setTimeout(() => {
      state.text = 'New Game!';
      state.number = 200;
      state.name = 'New Player';
    }, 1500);

    return {
      ...toRefs(state),
    };
  },
};
</script>
```
我們引入`toRefs()`這個函式，再透過解構的形式，將物件中的值，直接`return`到`template`。
