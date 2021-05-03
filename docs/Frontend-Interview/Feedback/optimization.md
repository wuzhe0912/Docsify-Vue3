# 前端性能優化

> 記錄面試遇到的性能優化考題

## 1. 前端有哪些方式可以優化網頁效能，提升使用體驗？

### 減少資源量

> 程式內容最小化(minify)、程式碼醜化(uglify)

最小化常見於縮排、換行等書寫格式，這些是對開發者而言，易於閱讀，但對瀏覽器解析沒有差別，醜化也是同理，除了壓縮程式內容，甚至連變數名稱都會被換掉，透過這些動作，可以大幅壓縮程式碼的體積。

> 靜態資源壓縮

常見於圖片，透過壓縮圖片大小，也可以使被打包的內容輕量化。當然若需求可以透過`CSS`處理，就不要使用圖片，小圖示譬如`icon`之類的，能使用`SVG`就優先使用，因為`SVG`本身是向量圖，放大縮小都不會影響圖片呈現，而且和`PNG、JPG`相比，檔案更小。執行動畫時，使用`requestAnimationFrame`取代`setTimeout和setInterval`。

### 優化 Render

> 盡可能減少 Reflow

- `Layout`在設計上，要盡可能提高複用性，避免整個頁面都要重新`render`。
- 某些`CSS`屬性替換可以加減優化`Reflow`，譬如使用`translate`取代`top`、`right`。
- 可以使用`keep-alive`來暫存一些表單內容。
- 除非是後台頁面，前台頁面應避免使用`table`排版，因為`table`屬性下，改動一格的樣式，就會重新`render`整張表格。
- 執行動畫時，使用`requestAnimationFrame`取代`setTimeout`和`setInterval`。

> Tree-shaking

將專案內如果有`commonJS`的語法改寫為`ES Module`的`import/export`寫法，然後需要針對`css`設定`sideEffects`：

```
"sideEffects": [
  "*.css",
  "*.scss"
]
```

### 函數防抖和節流

> `Lodash 套件`：`lodash.debounce`

> 這兩個面向都是專注在前端性能優化這一塊

當一個`input`輸入文字時，可能會因為綁定某些事件，導致不斷觸發判斷條件，這在效能上蠻浪費的，所以為了降低這種資源浪費，透過一些類似計時器的方式，這樣可以讓像是`onChange()`之類的事件，從每次觸發改為間隔`1s`觸發，多少能達到節約效能的目的。防抖和節流本質是類似的，但應用場景可能會有落差，防抖可能應用在搜索，而節流則因為調整間隔執行，可能應用在滑鼠點擊或滾動之類的事件。

### 其他

> 使用 CDN 服務來加速網頁，免費 CDN 服務，Cloudflare

> 透過 Lighthouse 插件來檢查網站需改善的方向

## 2. 以 Nuxt.js 為例，可以透過哪些方式來改善網頁效能？

1. 避免打包後所有檔案塞入同一支`JS`，可以`webpack`的設定進行自動切分`chunk`，設定上在`optimization`的`splitChunks`，讓`webpack`依照各檔案間的引用關係拆成獨立`chunk`，同一檔案最多只引入三個。
2. `Vue Router`改成非同步的語法，也是為了讓`webpack`本身方便自動作業，可以針對頁面內容進行單獨區分。
3. 針對`JS`進行醜化，使用` UglifyJS Webpack Plugin`(設定內容很簡單，使用快取、平行處理、移除註解)。
4. 按照`Nuxt`官網設定，將`HTML & CSS Minify`(內容包含移除註解、移除空的屬性、移除無效的屬性、收合布林值的屬性)。
5. `CSS`使用`cssnano`，讓樣式打包後的體積盡可能小(因為會有`autoprefixer`所以需要透過`order`將其指定為最後執行)。
6. 如果有可更換，且功能相同的套件，也可以透過換成輕量化套件，譬如`Moment.js` -> `Day.js`。
7. UI/UX 提供的素材需要注意檔案大小和尺寸。

## 3. 前端可以優化哪些 SEO 的部分？

1. 透過`SEO`檢測網站先確認一些問題的方向，譬如[woorank](https://www.woorank.com/)、[seotesteronline](https://www.seotesteronline.com/)。
2. `HTML`使用語意化標籤，來建立專案結構。
3. `Title`、`meta`都必須填寫對應內容。
4. `img`標籤的`alt`針對圖片內容描述必寫，除了是對無障礙網頁友善外，對爬蟲也有幫助。
5. 配合`Google Console Search(GCS)`來確認網站流量走向。
6. 其他更深層的做法還有`Robot.txt`、`反向連結`、`Sitemap`。

<!-- ## 2. 常見前端性能優化的方法？

- `minify(最小化與醜化)`，直接透過打包處理
- 資源壓縮與合併，圖片能夠壓縮就壓縮
- 能用`css`處理就不使用圖片，使用圖片多採用`svg`
- 執行動畫時，使用`requestAnimationFrame`取代`setTimeout`和`setInterval`
- `webpack`設定上，盡可能減輕套件的體積，譬如：

```
config.plugin('lodash-replace').use(
  new LodashModuleReplacementPlugin({
    collections: true,
    paths: true,
  }),
);
```

- 緩存一些資料到本地的`localStorage`，例如用戶資料或是`token`
- `Layout`設計盡量增加複用性，減少大面積重新渲染的狀況
- 打開`LightHouse`，檢查問題方向，再加以處理 -->
