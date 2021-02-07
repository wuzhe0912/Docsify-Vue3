# 初始化環境安裝

> 建立並準備 Vue 3 的開發環境

## 安裝指令`(Global)`
<!-- tabs:start -->
#### ** Yarn **
```
yarn global add @vue/cli
```
#### ** NPM **
```
npm install -g @vue/cli
```
<!-- tabs:end -->
## 檢查安裝版本是否正確
```
vue --version

# or

vue -V
```
## Init Project
```
vue create project-name
```
### 選擇手動配置
```
Manually select features
```
請依照自身需求，選擇需要的`sass`、`eslint`、`router`、`vuex`。
### 版本選擇
```
3.x (Preview)
```
## 運行
<!-- tabs:start -->
#### ** Yarn **
```
cd project-name

yarn serve
```
#### ** NPM **
```
cd project-name

npm run serve
```
<!-- tabs:end -->