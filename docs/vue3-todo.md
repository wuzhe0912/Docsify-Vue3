# Vue 3 Todo App

> 練手實作一個 Todo App

## 靜態頁面
這邊我們切換到初始化專案中的`about`頁面實驗，先準備一個`template`：
```
<template lang="pug">
.about-container
  form.todo-form
    label New Todo List
    .btn-wrap
      input(name="newTodo")
      button Add
</template>
```
然後簡單寫一些樣式：
```
<style lang="scss" scoped>
.about-container {
  display: flex;
  justify-content: center;
}

.todo-form {
  display: flex;
  flex-direction: column;
  width: 400px;
}

.btn-wrap {
  display: flex;
  justify-content: center;
  input {
    width: 100%;
  }
  button {
    margin-left: 10px;
    width: 80px;
  }
}
</style>
```

## 觸發事件
我們在這邊因為使用了`form`(表單)，所以此處不使用`@click`事件，改採用`submit`，但是`submit`本身的特性會自動提交，頁面也就自動刷新了，這不是我們需要的，所以需要添加`prevent`來做阻擋。
```
<!-- template -->
form.todo-form(@submit.prevent="handleAdd")
```
另一邊，我們在`script`中撰寫我們要使用的`function`來達到點擊時觸發的效果：
```
<script>
export default {
  name: 'About',

  setup() {
    const handleAdd = () => {
      console.log('handle');
    };

    return {
      handleAdd,
    };
  },
};
</script>
```
現在當我們點擊頁面上的`button`時，可以看到`console.log`正常運作了。
## 雙向綁定
在實作新增資料之前，我們需要先將`input`輸入的內容，先同步渲染到頁面上，按照邏輯我們輸入什麼，那理論上頁面就要渲染什麼，所以在這邊我們要使用`ref()`:
```
<!-- template -->
<template lang="pug">
.about-container
  form.todo-form(@submit.prevent="handleAdd")
    label New Todo List
    .btn-wrap
      input(v-model="newTodo" name="newTodo")
      button Add
    div.list-wrap {{ newTodo }}
</template>
```
```
<!-- script -->
<script>
import { ref } from 'vue';

export default {
  name: 'About',

  setup() {
    const newTodo = ref('');

    const handleAdd = () => {
      console.log('handle');
    };

    return {
      newTodo,
      handleAdd,
    };
  },
};
</script>
```
起手式，先引入`ref()`，接著我們聲明一個變數`newTodo`，預設為空，接著回傳出去。在`template`上，我們先對`input`綁定`v-model`，並在頁面上寫一個`div`用來渲染`newTodo`，現在試著在`input`上輸入些東西，可以看到頁面上也同步出現對應的資料。
## 待辦列表
既然是待辦事項，那就可能會是複數項目，因此可以預期會是一個列表，也就是陣列的形式，另外，除了待辦事項的內容，我們還需要一個狀態，來確定這個事項是否完成，以及一個不重複的`id`，方便我們在`v-for`渲染時使用在`key`上面：
```
<!-- template -->
<template lang="pug">
.about-container
  form.todo-form(@submit.prevent="handleAdd")
    label New Todo List
    .btn-wrap
      input(v-model="newTodo" name="newTodo")
      button Add
    .list-wrap
      .list-container(v-for="todo in todos" :key="todo.id") {{ todo.text }}
</template>
```
```
<!-- script -->
<script>
import { ref } from 'vue';

export default {
  name: 'About',

  setup() {
    const newTodo = ref('');
    const todos = ref([]);

    const handleAdd = () => {
      todos.value.push({
        id: Date.now(),
        status: false,
        text: newTodo.value,
      });
      newTodo.value = '';
    };

    return {
      newTodo,
      todos,
      handleAdd,
    };
  },
};
</script>
```
在上面的程式碼中，我們首先先做將輸入的內容，以列表的形式呈現。所以我們同樣使用`ref()`先建立一個空的陣列`todos`，接著當我們每輸入完一次內容並進行點擊時，我們要將這個內容，也就是`newTodo`推進陣列中，所以使用常見的陣列操作`push()`。

陣列中，每一個物件包含了`id、status、text`，`id`我們使用`JS`獲取的當下時間的毫秒數來當作時間戳，`status`則是這筆資料是否已完成，預設為未完成，`text`則是事項的內容，當陣列完成新增資料後，我們需要將`input`清空，方便下一次輸入，所以會將`newTodo`重新指派為空。至於`template`的部分就是過往的`v-for`，這邊就不多做說明。

現在我們可以在頁面上進行基礎的操作了，每次輸入完內容，都可以自動新增到下方。不過樣式的部分，我們進行些許的調整，針對`.list-container`這個`class`進行補充，讓每筆資料靠左，且對上保留一些空隙。
```
<!-- style -->
.list-container {
  text-align: left;
  margin-top: 6px;
}
```
## 狀態改變
再來，我們希望在每個事項前增加一個`checkbox`來改變待辦事項的狀態，已完成或未完：
```
<!-- template -->
<template lang="pug">
.about-container
  form.todo-form(@submit.prevent="handleAdd")
    label New Todo List
    .btn-wrap
      input(v-model="newTodo" name="newTodo")
      button Add
    .list-wrap
      .list-container(v-for="todo in todos" :key="todo.id")
        input(type="checkbox" @click="handleCheck(todo)")
        .list-text(:class="{ 'list-done': todo.status }") {{ todo.text }}
</template>
```
```
<!-- script -->
<script>
import { ref } from 'vue';

export default {
  name: 'About',

  setup() {
    const newTodo = ref('');
    const todos = ref([]);

    const handleAdd = () => {
      todos.value.push({
        id: Date.now(),
        status: false,
        text: newTodo.value,
      });
      newTodo.value = '';
    };

    const handleCheck = (todo) => {
      todo.status = !todo.status;
    };

    return {
      newTodo,
      todos,
      handleAdd,
      handleCheck,
    };
  },
};
</script>
```
```
<!-- style -->
.list-container {
  display: flex;
  text-align: left;
  margin-top: 6px;
}

.list-done {
  text-decoration: line-through;
}
```
我們在每個事項中，都添加一個`checkbox`來執行`handleCheck()`事件，傳入對應的物件資料，將其中的狀態欄位進行反轉，再配合`v-bind`綁定的樣式，達到勾選和反勾選的效果。
## 刪除待辦
有了勾選完成的功能，接下來就要有刪除的功能：
```
<!-- template -->
.list-wrap
  .list-container(v-for="(todo, index) in todos" :key="todo.id")
    div {{ index }}
    input(type="checkbox" @click="handleCheck(todo)")
    .list-text(:class="{ 'list-done': todo.status }") {{ todo.text }}
    button(@click="handleDelete(index)") X
```
```
<!-- script -->
const handleDelete = (index) => {
  todos.value.splice(index, 1);
};

return {
  handleDelete,
};
```
這邊我簡化了呈現的程式碼，主要側重幾點，`template`上我們新增一個`handleDelete()`事件，並在`v-for`渲染時增加`index`，將`index`傳入函式中。再透過`splice`的陣列操作方法刪除對應的資料。
### 修復 bug
但前面的`handleAdd()`這個函式有一個問題，當我`input`為空時依然會送出資料，顯然這不是我們需要的，所以需要添加一個判斷來阻擋為空的狀況：
```
const handleAdd = () => {
  if (newTodo.value !== '') {
    todos.value.push({
      id: Date.now(),
      status: false,
      text: newTodo.value,
    });
    newTodo.value = '';
  }
};
```
### 調整樣式
刪除的`button`我希望能置右，所以我需要調整一下結構和樣式：
```
<!-- template -->
.list-wrap
  .list-container(v-for="(todo, index) in todos" :key="todo.id")
    .list-content
      input(type="checkbox" @click="handleCheck(todo)")
      .list-text(:class="{ 'list-done': todo.status }") {{ todo.text }}
    button.list-btn(@click="handleDelete(index)") X
```
```
<!-- style -->
.list-container {
  display: flex;
  justify-content: space-between;
  margin-top: 6px;
}

.list-content {
  display: flex;
}

.list-btn {
  color: red;
  cursor: pointer;
}
```
## 全部反選
這是個蠻常見的功能，方便使用者可以直接將全部項目進行反選：
```
<!-- template -->
.list-select(v-if="todos.length > 0")
  input(type="checkbox" @click="handleAll")
  span Select All
```
```
<!-- script -->
const handleAll = () => {
  todos.value.forEach((item) => {
    item.status = !item.status;
  });
};

return {
  handleAll,
};
```
```
<!-- style -->
.list-select {
  text-align: left;
  margin-top: 6px;
}
```
準備一個全選使用的`input`，但因為我們希望他在有資料的狀況下才做顯示，因此這邊添加一個`v-if`檢查資料長度，當`length > 0`時才做渲染。接著我們添加一個`handleAll()`的函式，透過`forEach()`的方法遍歷整個陣列，將陣列中所有資料的狀態都做反轉，這樣我們就可以做正反選的切換。到這邊，會發現一個小問題，雖然一鍵反選的功能正常，但只有文字的部分吃到`v-bind`的狀態綁定，我們的事項`input`沒有切換成對應的選中狀態，所以我們需要進行調整：
```
<!-- template -->
input(type="checkbox" @click="handleCheck(todo)" :checked="todo.status")
```
我們在`input`中將`checked`進行狀態綁定，這樣當全部項目正反切換時，也就會隨之改變勾選狀態。
## 全部刪除
雖然一次全部刪除所有待辦事項，這個功能看似可有可無，但因為實現起來也蠻簡單的，就順手寫一下：
```
<!-- template -->
.list-select(v-if="todos.length > 0")
  div
    input(type="checkbox" @click="handleAll")
    span Select All
  button(@click="handleClear") All Clear
```
```
<!-- script -->
const handleClear = () => {
  todos.value = [];
};

return {
  handleClear,
};
```
```
<!-- style -->
.list-select {
  display: flex;
  justify-content: space-between;
  margin-top: 6px;

  button {
    cursor: pointer;
  }
}
```
簡單調整一下`template`結構再加上些許樣式，最後透過`handleClear()`函式清除陣列，就達到想要的目的。

## Reference
- [Source Code](https://github.com/wuzhe0912/vue3-components-demo)
- [Demo](https://vue3-demo.netlify.app/)