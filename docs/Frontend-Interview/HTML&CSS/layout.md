# Layout

## 1. 試用 flex 語法寫一個 Layout
```
<!-- pug -->
.wrap
  .header__wrap headerText
  main.main__wrap
    .left 1
    .content 2
    .right 3
  .footer__wrap footerText
```
```
<!-- scss -->
.wrap {
  display: flex;
  flex-direction: column;
  width: 400px;
  color: white;
  text-align: center;
}

.header__wrap,
.footer__wrap {
  width: 100%;
  background: red;
}

.main__wrap {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 300px;
}

.sidebar,
.right__content {
  width: 50px;
  background: blue;
}

.main__content {
  width: calc(100% - 100px);
  background: green;
}
```