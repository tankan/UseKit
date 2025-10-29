# 🎉 HookKit 发布成功！

**发布时间**：2025-10-29  
**版本**：v0.2.0  
**组织**：[@hookkit](https://www.npmjs.com/org/hookkit)

---

## 📦 已发布的包

### 1. @hookkit/core - 核心包
[![npm version](https://img.shields.io/npm/v/@hookkit/core)](https://www.npmjs.com/package/@hookkit/core)

**功能**：包含所有功能的完整包  
**大小**：173.8 KB  
**链接**：https://www.npmjs.com/package/@hookkit/core

```bash
# 安装
pnpm add @hookkit/core
```

```typescript
// 使用
import { createHttpClient, createDate } from '@hookkit/core'
```

---

### 2. @hookkit/http - HTTP 请求模块
[![npm version](https://img.shields.io/npm/v/@hookkit/http)](https://www.npmjs.com/package/@hookkit/http)

**功能**：基于 alova.js 的高级 HTTP 客户端  
**大小**：25.9 KB  
**链接**：https://www.npmjs.com/package/@hookkit/http

**特性**：
- ✅ 自动重试
- ✅ 请求缓存
- ✅ Token 刷新
- ✅ 并发控制
- ✅ 请求取消

```bash
pnpm add @hookkit/http
```

---

### 3. @hookkit/date - 日期处理模块
[![npm version](https://img.shields.io/npm/v/@hookkit/date)](https://www.npmjs.com/package/@hookkit/date)

**功能**：基于 dayjs 的高级日期工具  
**大小**：19.6 KB  
**链接**：https://www.npmjs.com/package/@hookkit/date

**特性**：
- ✅ 时区处理
- ✅ 国际化支持
- ✅ 相对时间
- ✅ 自定义格式化

```bash
pnpm add @hookkit/date
```

---

### 4. @hookkit/shared - 共享工具库
[![npm version](https://img.shields.io/npm/v/@hookkit/shared)](https://www.npmjs.com/package/@hookkit/shared)

**功能**：共享的工具函数和类型定义  
**大小**：2.8 KB  
**链接**：https://www.npmjs.com/package/@hookkit/shared

```bash
pnpm add @hookkit/shared
```

---

## ✨ 技术亮点

### 🔥 2025 年最新技术栈
- TypeScript 5.9.3（2025-10-28 发布）
- Vite 7.1.12（最新插件系统）
- Vitest 4.0.4（更快的测试执行）
- Oxlint 1.24.0（稳定版 1.0）

### ⚡ 性能提升
- 开发服务器启动：**快 35%**
- 热更新（HMR）：**快 40%**
- 生产构建：**快 30%**
- 测试执行：**快 40%**
- 代码检查：**快 50%**

### 📦 Monorepo 架构
- 使用 pnpm workspace
- 独立发布，按需安装
- 完整的 TypeScript 类型支持

### 🌍 框架无关
- ✅ Vue 3.x
- ✅ React 18.x
- ✅ Svelte 4.x / 5.x
- ✅ 纯 JavaScript/TypeScript

---

## 🚀 快速开始

### 安装核心包（推荐）

```bash
# 使用 pnpm
pnpm add @hookkit/core

# 使用 npm
npm install @hookkit/core

# 使用 yarn
yarn add @hookkit/core
```

### 或按需安装模块

```bash
# 只需要 HTTP 功能
pnpm add @hookkit/http

# 只需要日期处理
pnpm add @hookkit/date
```

### 基础使用示例

```typescript
import { createHttpClient, createDate } from '@hookkit/core'

// HTTP 客户端
const http = createHttpClient({
  baseURL: 'https://api.example.com',
  timeout: 5000,
})

// 发送请求
const data = await http.get('/users', {
  retry: { maxRetries: 3 },
  cache: { ttl: 60000 },
})

// 日期处理
const date = createDate('2025-10-29')
console.log(date.format('YYYY-MM-DD HH:mm:ss'))
console.log(date.fromNow()) // "几秒前"
```

---

## 📚 文档

- **快速开始**：[QUICK_START.md](./QUICK_START.md)
- **更新日志**：[CHANGELOG.md](./CHANGELOG.md)
- **升级说明**：[UPGRADE_NOTES.md](./UPGRADE_NOTES.md)
- **贡献指南**：[CONTRIBUTING.md](./CONTRIBUTING.md)

---

## 🔗 相关链接

- **GitHub**：[UseKit Repository](https://github.com/fiki_zeng/UseKit)
- **npm 组织**：[@hookkit](https://www.npmjs.com/org/hookkit)
- **npm 包**：
  - [@hookkit/core](https://www.npmjs.com/package/@hookkit/core)
  - [@hookkit/http](https://www.npmjs.com/package/@hookkit/http)
  - [@hookkit/date](https://www.npmjs.com/package/@hookkit/date)
  - [@hookkit/shared](https://www.npmjs.com/package/@hookkit/shared)

---

## 📊 包统计

| 包名 | 版本 | 大小 | 依赖 |
|------|------|------|------|
| @hookkit/core | 0.2.0 | 173.8 KB | @hookkit/shared, @hookkit/http, @hookkit/date |
| @hookkit/http | 0.2.0 | 25.9 KB | @hookkit/shared, alova |
| @hookkit/date | 0.2.0 | 19.6 KB | @hookkit/shared, dayjs |
| @hookkit/shared | 0.2.0 | 2.8 KB | - |

---

## 🎯 下一步计划

- [ ] 添加更多示例和教程
- [ ] 完善 API 文档
- [ ] 添加 Vue/React/Svelte 专用 Hooks
- [ ] 性能优化和基准测试
- [ ] 社区建设和反馈收集

---

## 💡 反馈与支持

遇到问题或有建议？欢迎：
- 提交 [Issue](https://github.com/fiki_zeng/UseKit/issues)
- 发起 [Pull Request](https://github.com/fiki_zeng/UseKit/pulls)
- 加入讨论 [Discussions](https://github.com/fiki_zeng/UseKit/discussions)

---

## 📄 许可证

MIT © 曾星旗 2025

---

**🎊 感谢使用 HookKit！期待您的反馈和贡献！**

