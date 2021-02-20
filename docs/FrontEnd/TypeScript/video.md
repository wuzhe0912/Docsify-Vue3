# TypeScript Video

> 使用 TypeScript 語法實作播放器

## 專案位置
[https://github.com/wuzhe0912/stahleckeria](https://github.com/wuzhe0912/stahleckeria)

## 開發環境
- `node v14.15.1`
- `npm v6.14.8`
- `webpack v5.22.0`

## 安裝 webpack
> 統一裝在開發環境
1. `cd project-folder`
2. `npm init -y`
3. `npm install webpack webpack-cli --save --dev`

## 目錄結構
```
- src
  - assets
  - images
  - js
  - scss
- package.json
- README.md
- webpack.config.js
```

## webpack.config.js

### default
```
module.exports = {
  entry: '',
  output: '',
  module: {
    rules: []
  },
  plugins: []
};
```

### entry
這邊的`context`是用來指定入口所處目錄的絕對路徑，考慮到專案的主要內容放在`src`下面，因此透過`path.resolve`來指定`src`目錄：
```
const path = require('path');

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    index: './js/index.js'
  },
  // ...
};
```

### output
打包後輸出，同樣是透過`path`來指定絕對路徑：
```
module.exports = {
  // ...
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: './js/[name].js?[hash:8]'
  },
  // ...
};
```

### DevServer
開發時需要在本地運行一個`local server`，亦即透過熱更新實時查看改動結果，先安裝對應的插件：
- `npm i -D webpack-dev-server`

```
module.exports = {
  // ...
  devServer: {
    contentBase: path.join(__dirname, 'dist'), // root
    open: true, // auto open browsers
    compress: true,
    port: 3002
  },
  // ...
};
```

### scss
```
npm install sass-loader node-sass css-loader mini-css-extract-plugin --save-dev
```
```
devtool: "source-map",
module: {
  rules: [{
    test: /\.(scss|sass)$/,
    use: [
      MiniCssExtractPlugin.loader,
      {
        loader: "css-loader",
        options: {
          sourceMap: true
        }
      },
      {
        loader: "sass-loader",
        options: {
          sourceMap: true
        }
      }
    ]
  }]
},
```

### Babel
```
npm i -D babel-loader @babel/core @babel/preset-env
```
```
{
  test: /\.m?js$/,
  exclude: /(node_modules|bower_components)/,
  use: {
    loader: 'babel-loader',
    options: {
      presets: ['@babel/preset-env'],
    }
  }
}
```

### pug
```
npm i -D --save-dev pug pug-html-loader raw-loader
```
```
{
  test: /\.pug$/,
  use: [
    {
      loader: 'html-loader'
    },
    {
      loader: 'pug-html-loader'
    }
  ]
}
```

### clean
```
npm i -D clean-webpack-plugin
```
```
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

plugins: [
  new CleanWebpackPlugin(),
  // ...
]
```

### 壓縮 css
```
npm install css-minimizer-webpack-plugin --save-dev
```
```
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
  module: {
    loaders: [
      {
        test: /.s?css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
      // `...`,
      new CssMinimizerPlugin(),
    ],
  },
};
```

## Support TypeScript
安裝插件：
```
npm i -D ts-loader typescript
```
設定：
```
{
  test: /\.ts$/,
  use: ['ts-loader'],
  exclude: /node_modules/
}
```
建立`tsconfig.json`
```
{
  "compilerOptions": {
    "module": "ES6",
    "target": "ES5"
  }
}
```
匯入`ts`文件時，不寫副檔名，但這樣會導致`webpack`無法識別非`js、json`的文件，因此需要在`resolve`設定：
```

```