# Demo(TypeScript)

> 建立一個`Reat with TypeScript`的實驗`demo`

## 基礎定義
- `TypeScript`是`JavaScript`的超集。
- 替原生的`JavaScript`添加靜態類別檢查。
- 目前仍無法被主流瀏覽器直接應用，需要重新編譯。

## 環境建立
```
npx create-react-app react-ts-app --template typescript
```

## tsconfig.json
記錄中間參數的設定目的：
- `"noImplicitAny": false,`

預設為 true，改為 false，代表若未聲明型別，則自動指派 any 型別，不跳提示，主要目的在於方便 JS 和 TS 混合開發的情境。

- `"esModuleInterop": true,`

允許使用 CommonJS 的格式 import 文件，若設為`false`，寫法需改為：
```
import * as React from 'react';
```
反之，設為`true`，則維持：
```
import React from 'react';
```