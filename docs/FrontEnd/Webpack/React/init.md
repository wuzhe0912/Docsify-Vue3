# 從零搭建環境(React)

## 安裝
```
mkdir project-name

cd project-name

yarn init -y

yarn add webpack webpack-cli --dev
```

## 設定檔
建立一個檔案`webpack.config.js`
```
const path = require('path');

module.exports = {
  entry: './src/index.js', // 進入點
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist/'),
  }
}
```
回到根目錄建立`src/index.js`，並撰寫一些程式碼：
```
const profile = {
  name: "Pitt",
};

console.log(`name：${profile.name}`);
```
切到`package.json`，建立`script`：
```
"scripts": {
  "dev": "webpack --mode development",
  "build": "webpack --mode production"
}
```
運行一次打包，可以看到`dist/`底下已正常出現打包後的`js`文件：
```
yarn build
```

## Babel
安裝三個`plugins`：
- `@babel/core`
- `@babel/preset-env`
- `babel-loader`

### 編譯設定
```
<!-- webpack.config.js -->
module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
};
```
接著回到`src/index.js`，嘗試寫入一個`array function`：
```
const list = [7, 8, 9];

list.map((node) => {
  return node + 1;
});

console.log(list);
```
再來透過打包後，可以看到編譯出來的語法使用`ES5`格式書寫，具有更好的瀏覽器兼容性。

## 導入 React
```
yarn add react react-dom

yarn add @babel/preset-react --dev
```
### 編譯設定
```
<!-- webpack.config.js -->
module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react", "@babel/preset-env"], // 在此行添加
          },
        },
      },
    ],
  },
};
```
### 建立文件
首先建立一個`src/components/Header.js`組件，內容填上：
```
import React from "react";

const Header = () => {
  return <div>Hello this is Header</div>;
};

export default Header;
```
接著導入到`index.js`：
```
import React from "react";
import ReactDom from "react-dom";
import Header from "./components/Header";

ReactDom.render(<Header />, document.getElementById("root"));
```
從`index.js`中可以看到，我們預計將所有`js`渲染到`HTML`上，所以我建立`dist/index.html`:
```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <div id="root"></div>
    <script src="./bundle.js"></script>
  </body>
</html>
```
到這邊基本完成，重新運行`yarn build`，在瀏覽器上跑`index.html`，可以看到`Header`組件被渲染到頁面上，同時`jsx`的寫法可以正常運作。
## 導入 SCSS
```
yarn add sass node-sass css-loader sass-loader --dev

yarn add mini-css-extract-plugin --dev //當 webpack 打包時分離出 css 文件
```
### 編譯設定
```
<!-- webpack.config.js -->
const MinCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  // ...
  module: {
    rules: [
      // ...
      {
        test: /\.(scss)$/,
        use: [
          {
            loader: MinCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[path][local]__[hash:base64:5]",
              },
            },
          },
          {
            loader: "sass-loader",
          },
        ],
      },
    ],
  },
  plugins: [
    new MinCssExtractPlugin({
      filename: "style.css",
    }),
  ],
};
```
### 建立樣式文件
建立`src/styles/main.scss`：
```
.title {
  color: green;
}
```
導入樣式：
```
<!-- src/components/Header.js -->
import React from "react";
import styles from "../styles/main.scss";

const Header = () => {
  return <header className={styles.title}>Hello this is Header</header>;
};

export default Header;
```
回到`dist/index.html`，導入`link`，因為剛剛在編譯設定那邊，我已經要求生成的`css`文件名稱為`style.css`，所以這邊導入時也要使用相同名稱：
```
<link rel="stylesheet" href="./style.css" />
```
執行打包`yarn build`，運行`dist/index.html`，可以看到文字已變成綠色，同時打開`F12`，也能看到剛剛設定的`hash`已被添加到`class name`上面，這樣可以避免樣式互相污染的問題。
## webpack-dev-server(Hot Reload)
```
yarn add webpack-dev-server --dev
```
### 編譯設定
```
<!-- webpack.config.js -->
module.exports = {
  // 進入點
  entry: "./src/index.js",
  // ...
  devServer: {
    contentBase: "./dist",
    port: 3002,
  },
};
```
### script 調整
```
<!-- package.json -->
"scripts": {
  "dev": "webpack serve --mode development",
},
```
執行`yarn dev`即可在本地運行開發環境，並且當我調整`js`或`scss`文件，會自動熱更新。