# bind、call、apply

## 1. 請列出下列 console.log() 結果

```
function sayPlayerName() {
  console.log(this.name);
}

var player = {
  name: 'Warlock',
  sayPlayerName: sayPlayerName,
  watch: {
    name: 'Warrior',
    sayPlayerName: sayPlayerName
  }
}

player.sayPlayerName();
player.watch.sayPlayerName();
```

### 解法：

```
Warlock
Warrior
```

## 2. 請列出下列 console.log() 結果

```
var num = 10;

function showNumber() {
  console.log(this.num);
}

var player = {
  num: 20,
  showNumber: function() {
    console.log(this.num);
  }
}

var oldPlayer = {
  num: 25
}

showNumber();
showNumber(player);
player.showNumber = player.showNumber.bind(oldPlayer);
player.showNumber();
```

### 解法：

```
10
10
25
```

第一個函式執行，向外找`num`這個變數，印出`10`。第二個函式執行時，看似傳入`player`這個物件，但實際上`console`印的內容仍是尋找`this.num`而非`player.num`，故仍印出`10`。第三個函式執行前，已被`bind`綁在`oldPlayer`這個物件上，因此被強制指定為`25`。若希望印出`20`，則改寫為：

```
function showNumber(value) {
  console.log(this.num);
  if (value) console.log(value.num)
}
```
