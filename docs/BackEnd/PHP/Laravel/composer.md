# Composer
## 安裝(Mac)
```
brew install composer
```
檢查版本
```
composer -V
```
## 安裝 Laravel
```
composer create-project laravel/laravel example-app
```
啟動專案
```
cd example-app
php artisan serve
```
## 建立 Controller
透過指令檢查`route`列表：
```
php artisan route:list
```
建立`controller`指令，命名則依需求，這邊建立一個產品的`controller`：
```
php artisan make:controller ProductController
```
現在可以在`app/Http/Controllers/`底下看到生成一個`ProductController.php`檔案，但這個指令生成的檔案，只是很簡易的內容，因此可以透過另一個指令，生成涵蓋有增刪查改的`php`檔案：
```
php artisan make:controller ProductController --resource
```
### Update Server
有時候開發會新增一些檔案或路由，造成`server`沒抓到最新的檔案內容，可以透過重啟指令來重跑一次：
```
composer dump-autoload
```
## Request
首先我們來看一下，如果使用者打參數到後端時，`request`運作機制是如何運行的，先切到專案路徑下`app/Http/Controllers/ProductController.php`，在`index`這個函式中添加：
```
public function index(Request $request)
{
  dump('Hello Venus');
}
```
透過檢查`route`列表：
```
php artisan route:list
```
可以看到，當頁面進入`/products`時，會執行`ProductController`底下的`function`，因此剛剛寫在`index()`的內容也就會被渲染到頁面上，因此回到我們運行的頁面，在網址上加入`/products`，可以看到`'Hello Venus'`。當然也不只是單純印出內容，如果我們調整`request`，也可以印出各種方法提供的對應內容，譬如印出網址路徑：
```
public function index(Request $request)
{
  dump($request->path());
}
```
## Response
後端回傳給前端的內容，譬如回傳`string`：
```
public function index(Request $request)
{
  return 'EXID';
}
```
又或者是回傳陣列：
```
public function index(Request $request)
{
  return [1, 2, 3, 4];
}
```
但通常我們會使用`response`去包裝要回傳的資料：
```
public function index(Request $request)
{
  return response('Relax Music');
}
```
而之所以要使用`response`，主要原因在於，在開發的複雜度提升的狀況下，我們可能會複用之前的`component`，來達到動態的效果，譬如我引入首頁的`view()`：
```
public function index(Request $request)
{
  return response()->view('welcome');
}
```
### Http status code
除了資料之外，當然也少不了狀態碼，畢竟要讓前端確認，這次取得資料是否成功，又或者是否可能出現參數錯誤或是`serve`掛了之類的狀況：
```
public function index(Request $request)
{
  return response('Hello', 200);
}
```
## redirect
導頁，將使用者轉到我們希望他們在這個`function`下要前往的頁面：
```
public function index(Request $request)
{
  return redirect('/');
}
```
現在我們在網址同樣帶上`/products`，則會被自動轉回首頁。
## Postman
> 測試 API 工具
因為前端和後端合作時，也會使用到[`Postman`](https://www.postman.com/downloads/)，所以這個工具並不陌生。這邊使用[`Dog API`](https://dog.ceo/dog-api/)，先在`Postman`左側建立`Collections`，接著底下建立一個`request`，這邊用`get`方法，並將剛剛拿到的`api`網址複製到上方欄位內，點選`Send`送出，當資料回傳成功後，可以看到下方拿到圖片資料。
## 本地搭建 Mock 資料測試 API
因為目前還沒有串接資料庫，所以我們先透過假資料來測試`Postman`是否能正常戳到我們建立的`api`。首先我在`ProductController`底下建立一個`data`：
```
// Mock Data
public function getMockData()
{
    return [
        [
            'title' => '健身環大冒險',
            'content' => '一邊冒險一邊健身',
            'price' => 9999
        ],
        [
            'title' => '拳擊有氧',
            'content' => '減重拳擊、健身拳擊',
            'price' => 7777
        ]
    ];
}
```
接著我回到`index()`，當我進入到`products`頁面時，我需要觸發拿到資料，所以我需要先透過`$this`指到`ProductController`，並拿到剛剛建立的變數，並存在變數中，最後將變數包在`response`內回傳出去：
```
public function index(Request $request)
{
    $data = $this->getMockData();
    return response($data);
}
```
最後我們回到`Postman`，建立一個新的`request`，並填入`localhost:8000/products`，可以看到送出後，可以戳到我們的假資料。