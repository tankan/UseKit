# @usekit/core

UseKit 核心包 - 包含所有功能模块的聚合包。

## 安装

```bash
# 使用 pnpm
pnpm add @usekit/core

# 使用 npm
npm install @usekit/core

# 使用 yarn
yarn add @usekit/core
```

## 快速开始

```typescript
import { createHttpClient, format, today } from '@usekit/core'

// HTTP 请求
const client = createHttpClient({
  baseURL: 'https://api.example.com',
  retry: { enabled: true, maxRetries: 3 },
  cache: { enabled: true, mode: 'memory' }
})

const response = await client.get('/users')

// 日期处理
const formattedDate = format(today(), 'YYYY-MM-DD')
console.log(formattedDate) // 2025-10-29
```

## 功能模块

### HTTP 请求模块

基于 alova.js 的高级 HTTP 客户端，支持：
- 自动重试
- 请求缓存
- Token 刷新
- 并发控制

### 日期处理模块

基于 dayjs 的日期工具，支持：
- 日期格式化
- 时区转换
- 相对时间
- 多语言

### 共享工具

通用工具函数和类型定义。

## 文档

查看完整文档：[UseKit 文档](../../README.md)

## 许可证

MIT © 曾星旗

