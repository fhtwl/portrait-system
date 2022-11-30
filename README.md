# 画像管理系统

## 一、前言

略

## 二、技术栈

**vue3**: 核心框架 <br/>
**pinia**: 状态管理 <br/>
**less**: css 预编译器 <br/>
**ant design**: 组件库 <br/>
**ts/tsx**: 开发和模板语言 <br/>
**vite3**: 前端构建工具 <br/>

# 三、功能

- ts、tsx 支持

- antdv 按需引入

- 基于 eslint、prettier、husky 的完整的校验和格式化支持

- 环境变量支持

- vue-router 路由支持

- pinia 状态管理

- 自定义 icon 引入

- less 支持

- 表单封装

- 图片预览封装

- 常见 筛选表单 + 按钮组 + 表格页面封装

- axios 请求封装和全局拦截

- gzip

## 四、目录结构

```
├── .husky husky # 脚本
├── .vscode vscode # 配置
├── public
│ └── favicon.ico # 网站图标
├── src
│ ├── api # Api ajax 等
│ ├── assets # 本地静态资源
│ ├── config # 项目全局设置
│ ├── components # 通用组件
│ ├── core # 自定义指令等
│ ├── lib # 依赖包引入
│ ├── router # Vue-Router
│ ├── store # Pinia
│ ├── typings # .d.ts 描述文件
│ ├── utils # 工具库
│ ├── views # 业务页面入口和常用模板
│ └── App.vue # Vue 模板入口
│ └── env.d.ts # 环境变量定义文件
│ └── main.ts # Vue 入口 ts
│ └── permission.ts # 路由守卫(路由权限控制)
└── .env # 环境变量
└── .env.development # 开发环境变量
└── .env.production # 生产环境变量
└── .eslintrc.json # eslint 配置
└── .prettierrc.json # prettier 配置
└── index.html # Vue 入口模板
└── README.md
└── package.json
└── tsconfig.json
└── tsconfig.node.json
└── vite.config.ts
```

## 五、已知 bug

无
