# PHP 環境安裝 & 基礎語法

## 環境安裝(Mac)
- [Homebrew](https://brew.sh/index_zh-tw)
終端機`(iTerm2)`先安裝好`Homebrew`，再使用指令：
```
brew install php
```
確認`PHP`是否安裝成功，版本檢查：
```
php -v
php --version
```
## 基礎語法
先建立一個`Demo`資料夾，然後建立一個`hello.php`的檔案，並在檔案中輸入以下內容：
```
<?php
  echo('Hello PHP!');
```
接著回到終端機，執行以下指令：
```
php hello.php
```
這時候就會看到終端機印出`Hello PHP%`
## 變數與資料型別
四種資料型別：
```
string   字串    'text'
interger 整數     15
float    浮點數   10.2
bolean   布林值   true or false
```
`php`中，變數前方採用`$`符號宣告，句尾需添加`;`：
```
$people = 'pitt';
$number = 100;
$boolean = true;
$float = 12.7;
```
在我的理解中，`php`的`echo();`近似於`js`的`cosole.log();`，所以我如果想要知自己變數的值為多少，可以這樣寫：
```
<?php
  $people = 'pitt';
  $number = 100;
  $boolean = true;
  $float = 12.7;
  echo($number);
```
執行指令`php hello.php`，可以看到終端機印出`100`。
## 轉型
透過轉型可以將原先的變數進行型別轉換：
```
$people = (int) $people; // 0
$number = (float) $number; // 100.0
$boolean = (string) $boolean; // ''
$float = (integer) $float; // 12
```
再配合`var_dump`可以印出資料的型別：
```
<?php
  $number = (string) 100;
  var_dump($number);
```
印出`string`類型，以及幾個字元，並印出結果`'100'`。此外，也能做四則運算：
```
<?php
  $number1 = 12;
  $number2 = 4;
  $ans = $number1 + $number2;
  echo($ans."\r\n"); // 16
  $ans = $number1 - $number2;
  echo($ans."\r\n"); // 8
  $ans = $number1 * $number2;
  echo($ans."\r\n"); // 48
  $ans = $number1 / $number2;
  echo($ans."\r\n"); // 3
  $ans = $number1 % $number2;
  echo($ans."\r\n"); // 0
```
計算一組跳錶收費，並在`echo()`輸出時包含有變數和字串：
```
<?php
  $initPrice = 80; // 起跳價格
  $perKilometerPrice = 16; // 每公里價格
  $kilometer = 12; // 跑了多少公里
  $calculatePrice = $perKilometerPrice * $kilometer;
  $finalPrice = $initPrice + $calculatePrice; // 最終價格
  echo("起跳價：{$initPrice}"."\r\n");
  echo("公里數：{$kilometer}"."\r\n");
  echo("最終收費：{$finalPrice}");

  // 起跳價：80
  // 公里數：12
  // 最終收費：272
```
## if / else
和`js`雷同，基本的條件判斷：
```
<?php
  $number = 9;
  if ($number > 10) {
    echo('大於');
  } elseif ($number === 10) {
    echo('等於');
  } else {
    echo('小於');
  }
```
```
<!-- 增加判斷條件 -->
<?php
  $number = 8;
  if ($number > 10 && $number > 12) {
    echo('大於');
  } elseif ($number === 10 || $number === 8) {
    echo('等於');
  } else {
    echo('小於');
  }
```
四季判斷：
```
<?php
  $month = 9;
  if ($month > 2 && $month <= 5) {
    echo('台灣春季');
  } elseif ($month > 5 && $month <= 10) {
    echo('台灣夏季');
  } elseif ($month === 11) {
    echo('台灣秋季');
  } else {
    echo('台灣冬季');
  }
```
## 迴圈
### while
印出數字`0 ~ 8`：
```
<?php
  $count = 0;
  while ($count < 10) {
    echo($count."\n\r");
    $count ++;
  }
```
### for
印出數字`1 ~ 12`：
```
<?php
  for ($count = 1; $count < 13; $count++) {
    echo($count."\n\r");
  }
```
將指定數字內，奇數加總總和：
```
<?php
  $totalNumber = 0;
  for ($number = 1; $number < 151; $number ++) {
    if ($number % 2 !== 0) {
      $totalNumber = $totalNumber + $number;
    }
  }
  echo($totalNumber); // 5625
```
## 資料結構
### Array(陣列)
在`php`中，呈現陣列的格式寫法有下列兩種：
```
<?php
  $list = ['player', 'wow', 'apple'];
  $numberList = array(1, 2, 3);
```
而當我想要印出陣列時，不再使用`echo()`，而是改用`print_r()`：
```
<?php
  $list = ['player', 'wow', 'apple'];
  $numberList = array(1, 2, 3);
  print_r($list);
  print_r($numberList);
```
可以在終端機上看到印出的結果：
```
Array
(
    [0] => player
    [1] => wow
    [2] => apple
)
Array
(
    [0] => 1
    [1] => 2
    [2] => 3
)
```
字典陣列，我理解為類似帶有欄位屬性：
```
<?php
  $player = [
    'name' => 'Pitt',
    'defence' => 100
  ];
  print_r($player);
```
在陣列操作上，和`js`也是相當雷同：
```
<?php
  $numberList = array(1, 2, 3);
  $player = [
    'name' => 'Pitt',
    'defence' => 100
  ];
  $numberList[0] = $player['defence'];
  print_r($numberList); // [0] => 100
  print_r($numberList[1] + $player['defence']); // 102
```
### 使用迴圈操作陣列
使用`foreach`跑迴圈：
```
<?php
  $list = ['Ragnarok', 'Black Desert', 'League of Legends', 'Lineage'];
  foreach ($list as $index => $game) {
    echo("第{$index}個遊戲：{$game}"."\n\r");
  }
```
如果陣列改為字典式陣列，則寫法調整為對應欄位：
```
<?php
  $list = [
    ['name' => 'Ragnarok'],
    ['name' => 'Black Desert'],
    ['name' => 'League of Legends'],
    ['name' => 'Lineage']
  ];
  foreach ($list as $index => $game) {
    echo("第{$index}個遊戲：{$game['name']}"."\n\r");
  }
```