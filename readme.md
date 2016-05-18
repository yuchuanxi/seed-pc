# Structure
```
seed-pc/
├── articles/
├── server/ 服务端代码
│   ├── controller/
│   ├── model/
│   ├── data/
│   ├── db/
│   └── index.js
├── client/ 客户端代码
│   ├── pages // 页面
│   │   ├── page1
│   │   │   ├── index.js
│   │   │   ├── index.css
│   │   │   └── index.jade
│   │   └── page2
│   ├── assets // 静态资源
│   │   ├── vendors // 第三方库
│   │   ├── kits // 小组件
│   │   ├── img
│   │   ├── less
│   │   └── js
│   │       ├── controller 协调model和views
│   │       └── model
│   ├── index.js 页面首页(对应views/index.jade)，SPA应用只需这一个
│   ├── home.js client目录下的js文件为entry,且必须要有viwes下对应的同名模版文件 
│   └── index.less
│
├── views/ HTML模版
│   ├── common/
│   ├── index.jade
│   ├── home.jade
│   ├── 
│   └──
└── dist/ 编译后的前端资源
```

## how to develop
1. npm install
2. npm run dev


## how to build
1. npm run build
you will find compiled file in ./dist

## how to deploy
1. npm run deploy





 