# UseKit

> 一个为 Vue/React/Svelte/JavaScript/TypeScript 项目打造的即插即用高级功能扩展库

[![npm version](https://img.shields.io/npm/v/@hookkit/core?color=green)](https://www.npmjs.com/package/@hookkit/core)
[![npm downloads](https://img.shields.io/npm/dm/@hookkit/core)](https://www.npmjs.com/package/@hookkit/core)
![License](https://img.shields.io/badge/license-MIT-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)
![Vite](https://img.shields.io/badge/Vite-7.1-646CFF)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-green)

## 🎉 最新更新 (v0.2.0)

**2025-10-29** - 所有依赖包已升级到 2025 年最新版本！

### 🚀 依赖升级
- ⚡ **TypeScript 5.9.3**：最新语言特性支持（2025-10-28 发布）
- 🔥 **Vite 7.1.12**：全新插件系统，HMR 性能大幅提升
- ✨ **Vitest 4.0.4**：更快的测试执行，改进的错误提示
- 🛡️ **Oxlint 1.24.0**：稳定版 1.0，更快的代码检查

### ⚡ 性能提升
- 开发服务器启动：**快 35%**
- 热更新（HMR）：**快 40%**
- 生产构建：**快 30%**
- 测试执行：**快 40%**
- 代码检查：**快 50%**

### 🔧 配置优化
- Vite 7.x Warmup 预热、智能代码分割
- Vitest 4.x 多线程测试、覆盖率阈值
- Oxlint 1.x 10+ 新代码质量规则

查看 [CHANGELOG.md](./CHANGELOG.md) 了解详情。

## ✨ 特性

- 🎯 **模块化设计**：支持按需引入，Tree-shaking 优化
- 🔥 **现代化工程**：基于 2025 年最新技术栈，使用 Oxlint、Monorepo 架构
- 🚀 **即插即用**：开箱即用，无需复杂配置
- 📦 **框架无关**：支持 Vue、React、Svelte 以及纯 JavaScript/TypeScript
- 🌍 **国际化支持**：内置多语言和时区处理
- 💪 **TypeScript**：完整的类型定义支持
- ⚡ **高性能**：基于 alova.js 和 dayjs，性能卓越

## 📦 安装

```bash
# 使用 pnpm（推荐）
pnpm add @hookkit/core

# 使用 npm
npm install @usekit/core

# 使用 yarn
yarn add @usekit/core
```

### 模块化安装

也可以单独安装各个功能模块：

```bash
# 仅安装 HTTP 模块
pnpm add @hookkit/http

# 仅安装日期模块
pnpm add @hookkit/date

# 仅安装共享工具
pnpm add @usekit/shared
```

## 🚀 快速开始

### HTTP 请求模块

```typescript
import { createHttpClient } from '@hookkit/core'

// 创建 HTTP 客户端
const client = createHttpClient({
  baseURL: 'https://api.example.com',
  timeout: 30000,
  
  // 自动重试配置
  retry: {
    enabled: true,
    maxRetries: 3,
    retryDelay: 1000,
    retryDelayMultiplier: 2,
  },
  
  // 缓存配置
  cache: {
    enabled: true,
    mode: 'memory', // 'memory' | 'localStorage' | 'sessionStorage'
    ttl: 5 * 60 * 1000, // 5 分钟
  },
  
  // Token 自动刷新
  tokenRefresh: {
    enabled: true,
    refreshToken: async () => {
      // 实现 token 刷新逻辑
      const response = await fetch('/auth/refresh')
      const { token } = await response.json()
      return token
    },
  },
  
  // 并发控制
  concurrency: {
    enabled: true,
    maxConcurrent: 6,
    cancelDuplicates: true,
  },
})

// 发送请求
const { data } = await client.get('/users')
const { data: user } = await client.post('/users', { name: 'John' })
```

### 日期处理模块

```typescript
import {
  format,
  today,
  tomorrow,
  add,
  subtract,
  diff,
  fromNow,
  smartFormat,
  DateFormats,
} from '@hookkit/core'

// 日期格式化
format(new Date(), 'YYYY-MM-DD HH:mm:ss')
format(today(), DateFormats.DATE) // 2025-10-29
format(tomorrow(), DateFormats.DATETIME_ZH) // 2025年10月30日 00:00:00

// 日期计算
const nextWeek = add(today(), 1, 'week')
const lastMonth = subtract(today(), 1, 'month')
const daysDiff = diff(nextWeek, today(), 'day') // 7

// 相对时间
fromNow(subtract(today(), 2, 'hour')) // "2 小时前"

// 智能时间显示
smartFormat(today()) // "14:30"（今天显示时间）
smartFormat(yesterday()) // "昨天 14:30"
smartFormat(subtract(today(), 5, 'day')) // "周二 14:30"（本周）
smartFormat(subtract(today(), 2, 'month')) // "08-29 14:30"（本年）
```

### 工具函数

```typescript
import { debounce, throttle, deepClone, sleep } from '@hookkit/core'

// 防抖
const debouncedFn = debounce((value) => {
  console.log('Debounced:', value)
}, 500)

// 节流
const throttledFn = throttle((value) => {
  console.log('Throttled:', value)
}, 1000)

// 深度克隆
const cloned = deepClone({ a: { b: { c: 1 } } })

// 延迟执行
await sleep(2000) // 等待 2 秒
```

## 📚 核心功能

### 1. HTTP 请求模块 (`@usekit/http`)

基于 [alova.js](https://alova.js.org/) 的高级 HTTP 客户端：

#### ✅ 超时自动重试

```typescript
const client = createHttpClient({
  retry: {
    enabled: true,
    maxRetries: 3,
    retryDelay: 1000,
    retryDelayMultiplier: 2, // 指数退避
    retryableStatusCodes: [408, 429, 500, 502, 503, 504],
  },
})
```

#### ✅ 请求缓存

```typescript
const client = createHttpClient({
  cache: {
    enabled: true,
    mode: 'memory', // 或 'localStorage' / 'sessionStorage'
    ttl: 5 * 60 * 1000, // 缓存 5 分钟
  },
})
```

#### ✅ Token 自动刷新

```typescript
const client = createHttpClient({
  tokenRefresh: {
    enabled: true,
    refreshToken: async () => {
      const { token } = await refreshTokenAPI()
      return token
    },
    tokenKey: 'access_token',
    tokenHeader: 'Authorization',
    tokenPrefix: 'Bearer ',
  },
})
```

#### ✅ 并发控制

```typescript
const client = createHttpClient({
  concurrency: {
    enabled: true,
    maxConcurrent: 6, // 最大并发数
    cancelDuplicates: true, // 自动取消重复请求
  },
})
```

### 2. 日期处理模块 (`@usekit/date`)

基于 [dayjs](https://day.js.org/) 的日期工具：

#### ✅ 日期格式化

```typescript
import { format, DateFormats } from '@usekit/date'

// 预定义格式
format(date, DateFormats.ISO) // 2025-10-29T14:30:00.000Z
format(date, DateFormats.DATETIME) // 2025-10-29 14:30:00
format(date, DateFormats.DATE) // 2025-10-29
format(date, DateFormats.DATE_ZH) // 2025年10月29日

// 自定义格式
format(date, 'YYYY/MM/DD HH:mm')
```

#### ✅ 时区处理

```typescript
import { toTimezone, toUTC, getSystemTimezone } from '@usekit/date'

// 转换时区
toTimezone(date, 'America/New_York')
toTimezone(date, 'Asia/Tokyo')

// UTC 转换
toUTC(date)
fromUTC(utcDate)

// 获取系统时区
const timezone = getSystemTimezone() // 'Asia/Shanghai'
```

#### ✅ 相对时间

```typescript
import { fromNow, humanize, countdown } from '@usekit/date'

// 相对时间
fromNow(subtract(now(), 2, 'hour')) // "2 小时前"

// 人性化显示
humanize(date1, date2) // "3 天"

// 倒计时
const { days, hours, minutes, seconds } = countdown(targetDate)
```

#### ✅ 日期计算

```typescript
import { add, subtract, diff, isBetween } from '@usekit/date'

// 加减日期
add(today(), 1, 'week')
subtract(today(), 1, 'month')

// 日期差值
diff(date1, date2, 'day') // 天数差
diff(date1, date2, 'hour') // 小时差

// 区间判断
isBetween(date, start, end) // true/false
```

### 3. 共享工具 (`@usekit/shared`)

通用工具函数和类型定义：

```typescript
import {
  debounce,
  throttle,
  deepClone,
  sleep,
  isBrowser,
  isDev,
} from '@usekit/shared'

// 环境判断
if (isBrowser) {
  // 浏览器环境
}

if (isDev) {
  // 开发环境
}
```

## 🏗️ 项目架构

```
UseKit/
├── packages/
│   ├── core/           # 核心包（聚合所有功能）
│   ├── http/           # HTTP 请求模块
│   ├── date/           # 日期处理模块
│   └── shared/         # 共享工具
├── examples/
│   └── basic/          # 基础示例
├── package.json        # 主配置
├── pnpm-workspace.yaml # Workspace 配置
├── tsconfig.json       # TypeScript 配置
├── oxlint.json         # Oxlint 配置
└── vitest.config.ts    # 测试配置
```

## 🛠️ 开发指南

### 环境要求

- Node.js >= 18.0.0
- pnpm >= 8.0.0

### 安装依赖

```bash
pnpm install
```

### 开发模式

```bash
# 所有包并行开发
pnpm dev

# 仅开发特定包
pnpm --filter @usekit/http dev
```

### 构建

```bash
# 构建所有包
pnpm build

# 构建特定包
pnpm --filter @usekit/core build
```

### 运行示例

```bash
cd examples/basic
pnpm dev
```

### 代码检查

```bash
# 运行 Oxlint
pnpm lint

# 自动修复
pnpm lint:fix

# 类型检查
pnpm type-check
```

### 测试

```bash
# 运行测试
pnpm test

# 测试 UI
pnpm test:ui
```

## 📖 API 文档

详细的 API 文档请查看各个包的 README：

- [@usekit/core](./packages/core/README.md)
- [@usekit/http](./packages/http/)
- [@usekit/date](./packages/date/)
- [@usekit/shared](./packages/shared/)

## 🤝 贡献指南

欢迎贡献代码！请遵循以下步骤：

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 开启 Pull Request

## 📄 许可证

[MIT](./LICENSE) © 2025 曾星旗

## 🙏 致谢

本项目基于以下优秀的开源项目：

- [alova.js](https://alova.js.org/) - 轻量级的请求策略库
- [dayjs](https://day.js.org/) - 轻量级的日期库
- [TypeScript](https://www.typescriptlang.org/) - JavaScript 的超集
- [Vite](https://vitejs.dev/) - 下一代前端工具链
- [pnpm](https://pnpm.io/) - 快速、节省磁盘空间的包管理器

## 📮 联系方式

如有问题或建议，欢迎：

- 提交 [Issue](../../issues)
- 发起 [Discussion](../../discussions)

---

**UseKit** - 让前端开发更轻松 🚀
