# 環境安裝

## 安裝流程(Mac)
> [MySQL 官網下載](https://dev.mysql.com/downloads/)

選擇`MySQL Community Server`，下載`DMG`版本。運行下載的應用程式，一路`next`，需要記住自己登入`database`的密碼。安裝完成後，進入系統偏好設定，下方會出現`MySQL`的應用程式，打開後確認正常運行，代表安裝成功。
## MySQL Workbench
> [MySQL Workbench 下載網址](https://dev.mysql.com/downloads/workbench/)

> 2021/2/5，MySQL Workbench 8.0.23 版本在 Mac 系統存在衝突，導致無法正常開啟，建議使用 8.0.20 版本
## 基本觀念
- Connection => 資料庫連結
- Schema, Database => 資料庫
- Table => 資料表
- Data row => 資料列
- Query => 搜尋語法
- Dump => 匯出資料庫
## table 資料表
打開一個`tables`，裡面會看到資料中有多個欄位，譬如`id、rank、win`，這些前端都可以理解的語意化欄位，但每個欄位的後面則有所謂的`PK、NN`之類不知所云的簡寫，這邊進行備註：
- PK：`Primary Key`(唯一值，通常用於`id`)
- NN：`Not Null`(不可為`null`，譬如`id` 為索引，自然不能是`null`)
- UQ：不可重複
- AI：當資料新增時，替`id`加1
- Default：預設值，譬如會員等級
- DataType：欄位資料類型
  - INT(11)：括號的數字，代表可以塞入多少數字
  - VARCHAR(45)：括號內的數字，則是字元限制