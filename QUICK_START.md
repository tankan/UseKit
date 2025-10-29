# UseKit 快速开始指南

## 📋 前置要求

- **Node.js**: >= 18.0.0
- **pnpm**: >= 8.0.0（推荐）

## 🚀 快速安装

### 1. 安装依赖

```bash
# 在项目根目录执行
pnpm install
```

这将安装所有包的依赖。

### 2. 构建所有包

```bash
pnpm build
```

这将构建以下包：
- `@usekit/shared` - 共享工具
- `@usekit/http` - HTTP 请求模块
- `@usekit/date` - 日期处理模块
- `@usekit/core` - 核心包（聚合所有功能）

### 3. 运行示例

```bash
cd examples/basic
pnpm install
pnpm dev
```

浏览器将自动打开 http://localhost:3000，您可以看到各种功能的演示。

## 📦 在您的项目中使用

### 安装到您的项目

```bash
# 在您的项目中
pnpm add @usekit/core
```

### 基础使用示例

```typescript
import { createHttpClient, format, today } from '@usekit/core'

// HTTP 请求
const client = createHttpClient({
  baseURL: 'https://api.example.com',
  retry: { enabled: true },
})

const response = await client.get('/users')

// 日期处理
console.log(format(today(), 'YYYY-MM-DD'))
```

## 🛠️ 开发工作流

### 开发模式（热重载）

```bash
# 所有包并行开发模式
pnpm dev

# 仅开发特定包
pnpm --filter @usekit/http dev
```

### 代码检查

```bash
# 运行 Oxlint
pnpm lint

# 自动修复问题
pnpm lint:fix

# TypeScript 类型检查
pnpm type-check
```

### 测试

```bash
# 运行所有测试
pnpm test

# 运行测试 UI
pnpm test:ui
```

## 📁 项目结构说明

```
UseKit/
├── packages/
│   ├── shared/              # 共享工具和类型
│   │   ├── src/
│   │   │   ├── types.ts     # 类型定义
│   │   │   └── utils.ts     # 工具函数
│   │   └── package.json
│   │
│   ├── http/                # HTTP 模块
│   │   ├── src/
│   │   │   ├── client.ts    # HTTP 客户端
│   │   │   ├── types.ts     # 类型定义
│   │   │   ├── hooks.ts     # Hooks
│   │   │   └── interceptors/ # 拦截器
│   │   │       ├── retry.ts
│   │   │       ├── cache.ts
│   │   │       ├── token.ts
│   │   │       └── concurrency.ts
│   │   └── package.json
│   │
│   ├── date/                # 日期模块
│   │   ├── src/
│   │   │   ├── date.ts      # 核心日期功能
│   │   │   ├── format.ts    # 格式化
│   │   │   ├── timezone.ts  # 时区处理
│   │   │   ├── locale.ts    # 语言环境
│   │   │   └── relative.ts  # 相对时间
│   │   └── package.json
│   │
│   └── core/                # 核心包（聚合）
│       ├── src/
│       │   └── index.ts     # 导出所有功能
│       └── package.json
│
├── examples/
│   └── basic/               # 基础示例
│       ├── src/main.ts      # 示例代码
│       ├── index.html       # 演示页面
│       └── package.json
│
├── pnpm-workspace.yaml      # Workspace 配置
├── tsconfig.json            # TypeScript 配置
├── oxlint.json              # Oxlint 配置
└── vitest.config.ts         # 测试配置
```

## 🔧 常用命令

| 命令 | 说明 |
|------|------|
| `pnpm install` | 安装所有依赖 |
| `pnpm build` | 构建所有包 |
| `pnpm dev` | 开发模式（所有包） |
| `pnpm lint` | 运行 Oxlint 检查 |
| `pnpm lint:fix` | 自动修复代码问题 |
| `pnpm type-check` | TypeScript 类型检查 |
| `pnpm test` | 运行测试 |
| `pnpm clean` | 清理构建产物和依赖 |

### 针对特定包的命令

```bash
# 为特定包安装依赖
pnpm --filter @usekit/http add axios

# 为特定包运行脚本
pnpm --filter @usekit/http build

# 为特定包运行开发模式
pnpm --filter @usekit/date dev
```

## 📖 更多资源

- [完整文档](./README.md)
- [核心包文档](./packages/core/README.md)
- [示例代码](./examples/basic/src/main.ts)

## ❓ 常见问题

### 1. 如何只安装特定模块？

```bash
# 只安装 HTTP 模块
pnpm add @usekit/http

# 只安装日期模块
pnpm add @usekit/date
```

### 2. 如何在 Vue/React/Svelte 中使用？

UseKit 的核心功能是框架无关的，可以直接在任何框架中使用：

```typescript
// Vue 3
import { createHttpClient } from '@usekit/core'

export default {
  setup() {
    const client = createHttpClient({ /* config */ })
    // 使用 client...
  }
}

// React
import { createHttpClient } from '@usekit/core'

function App() {
  const client = useMemo(() => 
    createHttpClient({ /* config */ }), 
    []
  )
  // 使用 client...
}

// Svelte
<script>
  import { createHttpClient } from '@usekit/core'
  const client = createHttpClient({ /* config */ })
  // 使用 client...
</script>
```

### 3. 构建失败怎么办？

确保：
1. Node.js 版本 >= 18.0.0
2. pnpm 版本 >= 8.0.0
3. 已运行 `pnpm install`
4. 清理后重新构建：`pnpm clean && pnpm install && pnpm build`

### 4. 如何贡献代码？

1. Fork 本仓库
2. 创建新分支
3. 提交代码
4. 运行 `pnpm lint` 和 `pnpm type-check`
5. 提交 Pull Request

---

🎉 现在您已准备好使用 UseKit！

