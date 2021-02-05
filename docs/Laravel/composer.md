# 套件工具 Composer
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