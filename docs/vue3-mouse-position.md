# 取得網頁座標

> 使用`function`取得滑鼠點擊時的網頁座標

## 頁面建立
取得網頁座標雖然只是個小功能，但畢竟這邊僅是做`demo`練習，所以我們還是獨立搭建一個`compenent`：
```
<template lang="pug">
.position-container
  div 網頁X座標：{{ x }} - 網頁Y座標：{{ y }}
</template>

<script>
export default {
  name: 'MousePosition',
};
</script>

<style scoped lang="scss"></style>
```
上面雖然完成一個靜態頁面，但我們觸發用的`function`，打算抽離出去，這個動作看起來有點多餘，但如果是在`typescript`的專案，就會盡可能要求`function`的通用性與抽離，雖然這邊沒有使用，但就假掰一下：
```
<!-- mkdir src/hooks/useMousePosition.js -->
import { ref } from 'vue';

const useMousePosition = () => {
  const x = ref(1);
  const y = ref(2);

  return {
    x,
    y,
  };
};

export { useMousePosition };
```
接著我們回到`MousePosition.vue`做引入和渲染的動作：
```
<script>
import { useMousePosition } from '../hooks/useMousePosition.js';

export default {
  name: 'MousePosition',

  setup() {
    const { x, y } = useMousePosition();

    return {
      x,
      y,
    };
  },
};
</script>
```
如此一來，剛剛在`function`建立的`x、y`假資料就會出現在頁面上，分別是`1、２`。
## 事件觸發
回到`useMousePosition.js`，我們要開始監聽滑鼠的點擊位置，並將點到的座標渲染到頁面上：
```
import { ref, onMounted } from 'vue';

const useMousePosition = () => {
  const x = ref(0);
  const y = ref(0);
  const trackingMouse = (node) => {
    x.value = node.pageX;
    y.value = node.pageY;
  };

  onMounted(() => {
    document.addEventListener('click', trackingMouse);
  });

  return { x, y };
};

export { useMousePosition };
```
我們引入`onMounted`，意思是我們要在`DOM`渲染完成才做監聽觸發，現在我們可以在頁面上四處點擊，發現渲染出來的座標也會隨之更換。不過，如果這邊使用`typescript`的話，需要添加型別判斷`(MouseEvent)`：
```
const trackingMouse = (node: MouseEvent) => {
  x.value = node.pageX;
  y.value = node.pageY;
};
```
## Reference
- [MDN：MouseEvent](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent)
- [Source Code](https://github.com/wuzhe0912/vue3-components-demo)
- [Demo](https://vue3-demo.netlify.app/)