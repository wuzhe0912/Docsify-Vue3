# NVM 安裝
> `NVM` 如其名就是 `Node.js` 的版本管理工具

## 安裝
- [Github nvm](https://github.com/nvm-sh/nvm)

終端機安裝指令(2021/2/6)：
```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash
```
接著重新啟動`iTerm2`，檢查`nvm`版本是否安裝成功：
```
nvm --version
```
## nvm 指令
透過`nvm`指令可以查詢或操作切換`Node.js`版本
查詢遠端可安裝的`node`版本：
```
nvm ls-remote
```
安裝所需要的`node`版本環境(LTS)：
```
nvm install v14.15.4
```
切換所需要使用的`node`版本：
```
nvm use v14.15.4
```
設定預設使用的`node`版本：
```
nvm alias default v14.15.4
```
檢查`node`版本是否安裝成功：
```
node -v
npm -v
```