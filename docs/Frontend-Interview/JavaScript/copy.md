# 深淺拷貝

> 在考慮解決深淺拷貝問題時，必須先思考`JS`在記憶體中傳值還是傳址的問題。

## 1. What is the output?

```
var obj = {
  a1: 10,
  a2: [2, 4, 9],
};

var item = obj.a1;
var subItem = obj.a2;

obj.a1 = 5;
obj.a2[0] = 3;

console.log(item);
console.log(subItem);
```

### 解法：

```
10
[3, 4, 9]
```

這是傳值和傳址的問題，也就是`JS`在面對不同型別時，對記憶體的做法差異。

`obj.a1`是`number`型別，因此他賦值給`item`時，此時是採用複製的方式`Pass by value(傳值)`，因此`obj.a1`和變數`item`都已成為獨自的個體，改變一方不影響另一方。

但是對`Object`和`Array`這兩個型別來說，卻是採用`Pass by reference(傳址)`，同樣指到記憶體上同一個位置，因此改變的同時也會影響。

```
console.log(item)     // 10
console.log(subItem)  // [3, 4, 9]
```

## 2. 請解釋淺拷貝和深拷貝的差異。

為了避免物件型別中傳址的問題，導致都指向記憶體同一個位置，所以可以透過淺拷貝先複製出來：

```
// slice 會從括號內的索引位置開始進行 copy

var array1 = [1, 2, 3]
var array2 = array1.slice(0)
console.log(array2) // [1, 2, 3]

array1[1] = 4
console.log(array1) // [1, 4, 3]
console.log(array2) // [1, 2, 3]

// 展開運算符

var array1 = [10, 20, 30]
var array3 = [...array1]
console.log(array3) // [10, 20, 30]

array1[2] = 50
console.log(array1) // [10, 20, 50]
console.log(array3) // [10, 20, 30]
```

面對深層資料時，淺拷貝無法處理，需使用深拷貝的形式，這邊建議使用`Lodash`：

```
var object1 = {
  name: 'Amy',
  player: {
    name: 'Betty'
  }
}
var object2 = _.cloneDeep(object1)

object1.player.name = 'Alisa'
console.log(object1.player.name) // 'Alisa'
console.log(object2.player.name) // 'Betty'
```

### Object.assign

承前面的情境，操作物件資料時，不建議直接操作原始資料，建議先複製出來再進行操作：

```
var object1 = { num: 10 }
var object2 = Object.assign({}, object1)
console.log(object2) // { num: 10 }

object1.num = 100
console.log(object1) // { num: 100 }
console.log(object2) // { num: 10 }
```

## 3. 請列出下列 console.log() 結果

```
var a = {};
var b = a;
var c = b = { num: 10 };
c.location = 'tokyo';
console.log(b);
```

### 解法：

```
{
  location: "tokyo",
  num: 10
}
```

物件型別在`Pass by reference(傳址)`的特性下，記憶體中都會指向同一個位置，改變任一方都會導致，其他兩邊被影響。

## 4. 請列出下列 console.log() 結果

```
var list = [{
  name: '日本',
  locations: {
    honshu: '京都',
    shikoku: '土佐',
    kyushu: '福岡'
  }
}]

var array = [];

list.forEach(item => {
  array.push(item);
})

array[0].name = '美國';
array[0].locations.kyushu = '北九州';

console.log(list[0].name);
console.log(list[0].locations.kyushu);
console.log(array[0].locations.kyushu);
```

### 解法：

```
美國
北九州
北九州
```

承前一題，同樣是`Pass by reference(傳址)`的考題，即使是在陣列中，改變`array`這個陣列時，同時影響`list`這個陣列。

## 5. 請列出下列 console.log() 結果

```
var player = 'Rogue';
var newPlayer = player;
newPlayer = 'Mage';

console.log(player);
```

### 解法：

```
Rogue
```

在原始型別中，記憶體採用`Pass by value(傳值)`的方式，也就是複製的形式。兩者自然都是獨立個體，不會受到後面賦值的影響。但如果今天改為物件型別，則會因為記憶體都指向同一個位址，導致前後互相影響。例如以下：

```
var player = {
  name: 'Rogue',
};
var newPlayer = player;
console.log(1, newPlayer.name); // Rogue

player.name = 'Rogue2';
console.log(2, newPlayer.name); // Rogue2
```

## 6. 如果要複製一個物件(object or array)可以使用哪些方法？

因為要避免傳址的問題，導致記憶體中相同位址的內容互相覆蓋影響，因此可以根據資料結構決定使用淺拷貝或是深拷貝：

- 資料結構為一層時，使用淺拷貝：
- 使用`slice()`：

```
var array = [2, 4, 6]
var newArray = array.slice(0) // 括號中參數決定從第幾個 index 開始複製
console.log(newArray) // [2, 4, 6]

array[1] = 40
console.log(array) // [2, 40, 6]
console.log(newArray) // [2, 4, 6]
```

- 展開運算符：

```
var array = [5, 10, 15]
var newArray = [...array]
console.log(newArray) // [5, 10, 15]

array[2] = 50
console.log(array) // [5, 10, 50]
console.log(newArray) // [5, 10, 15]
```

- 資料結構為多層時，使用深拷貝：
- 使用`Lodash`套件：

```
var object = {
  name: 'Amy',
  player: {
    name: 'Betty'
  }
}
var newObject = _.cloneDeep(object)

object.player.name = 'Alisa'
console.log(object.player.name) // 'Alisa'
console.log(newObject.player.name) // 'Betty'
```
