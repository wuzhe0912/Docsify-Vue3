# Tailwind CSS 基本應用

> utility 類型工具

## 安裝
> require node.js >= v.12.13.0(2021/2/17)

- [Tailwind CSS 官網](https://tailwindcss.com/)
```
cd project-folder
yarn init
```
```
yarn add tailwindcss
mkdir src
cd src
touch styles.css
```
## 匯入 CSS
```
<!-- styles.css -->
@tailwind base;
@tailwind components;
@tailwind utilities;
```
## 設定配置文件
### 安裝基礎依賴包
```
yarn add tailwindcss@latest postcss@latest autoprefixer@latest
```
### 建立 config 文件
```
yarn tailwindcss init
```
完成後會看一個新生成的`tailwind.config.js`。
## 編譯
但是`tailwindcss`自身的內容無法直接被解析為`css`，因此需要透過指令來處理：
```
yarn tailwindcss build styles.css -o src/css/styles.css
```
現在我們可以看到`src/css/`底下生成一個新的`styles.css`檔案，而且`tailwindcss`預設的樣式已經被轉成`css`內容。另外注意的是，`tailwindcss`的`css reset`，採用`normalize`。
## Hello Tailwind CSS
回到`src/`底下，我們建立一個`index.html`，並且寫入基本的`html:5`格式內容，記得，因為待會要使用`tailwindcss`的樣式，所以需要使用`link`引入：
```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Hello Tailwind CSS</title>
  <link rel="stylesheet" href="./css/styles.css">
</head>
<body>
  <h1 class="text-blue-500 ml-4 text-xl">Hello Tailwind CSS</h1>
</body>
</html>
```
接著使用`Live Server`打開`index.html`，可以看到頁面上的文字，除了出現對應的藍色，同時也出現對應的`margin-left`和字體大小。
## Extensions
- [Tailwind CSS IntelliSense(語法提示)](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
## 斷點設定
在`tailwindcss`中，使用`sm、md、lg、xl、2xl`等作為斷點：
```
<div class="
  ml-4
  w-40 md:w-60 lg:w-80
  h-20 md:h-40 lg:h-60
  bg-red-500 md:bg-blue-500 lg:bg-green-500"
></div>
```
從上面可以看到，基於`mobile first`的原理，所以初始的樣式先從小尺寸開始，接著隨著裝置螢幕大小的改變，當來到`768px`也就是`md:`尺寸時換成藍色並且加大，接著來到`1024px`時也是同理。
- [Responsive Design](https://tailwindcss.com/docs/responsive-design)