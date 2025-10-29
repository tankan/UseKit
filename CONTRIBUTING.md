# 贡献指南

感谢您对 UseKit 的关注！我们欢迎所有形式的贡献。

## 🤝 如何贡献

### 报告 Bug

如果您发现了 Bug，请：

1. 在 [Issues](../../issues) 中搜索是否已有相关问题
2. 如果没有，创建新的 Issue，包含：
   - Bug 的详细描述
   - 复现步骤
   - 预期行为
   - 实际行为
   - 您的环境信息（Node.js 版本、操作系统等）

### 提出新功能

如果您有新功能建议：

1. 在 [Discussions](../../discussions) 中讨论
2. 说明功能的用途和价值
3. 如果可能，提供示例代码或使用场景

### 提交代码

#### 准备工作

1. Fork 本仓库
2. 克隆您的 Fork：
```bash
git clone https://github.com/YOUR_USERNAME/UseKit.git
cd UseKit
```

3. 安装依赖：
```bash
pnpm install
```

4. 创建新分支：
```bash
git checkout -b feature/your-feature-name
```

#### 开发流程

1. **编写代码**
   - 遵循现有代码风格
   - 添加必要的注释
   - 确保代码可读性

2. **添加类型定义**
   - 所有公开 API 都需要完整的 TypeScript 类型
   - 导出的类型应放在 `types.ts` 文件中

3. **编写测试**（如适用）
   - 为新功能编写测试用例
   - 确保所有测试通过：`pnpm test`

4. **运行代码检查**
```bash
# 代码风格检查
pnpm lint

# 类型检查
pnpm type-check
```

5. **测试构建**
```bash
pnpm build
```

#### 提交规范

使用语义化的提交信息：

```
<type>(<scope>): <subject>

<body>

<footer>
```

**类型（type）：**
- `feat`: 新功能
- `fix`: Bug 修复
- `docs`: 文档更新
- `style`: 代码格式调整
- `refactor`: 重构
- `perf`: 性能优化
- `test`: 测试相关
- `chore`: 构建/工具链相关

**示例：**
```
feat(http): 添加请求超时配置

- 添加 timeout 配置选项
- 更新类型定义
- 添加相关测试

Closes #123
```

#### 提交 Pull Request

1. 推送到您的 Fork：
```bash
git push origin feature/your-feature-name
```

2. 在 GitHub 上创建 Pull Request

3. 在 PR 描述中说明：
   - 改动的内容
   - 解决的问题
   - 相关的 Issue（如有）

## 📋 代码规范

### TypeScript

- 使用严格的 TypeScript 配置
- 避免使用 `any` 类型
- 为所有公开 API 提供类型定义
- 使用接口（interface）定义复杂类型

### 命名规范

- **文件名**：使用小写 + 连字符（kebab-case）
  - `http-client.ts`
  - `date-utils.ts`

- **类型/接口**：使用 PascalCase
  - `HttpClientConfig`
  - `RequestOptions`

- **函数/变量**：使用 camelCase
  - `createHttpClient`
  - `formatDate`

- **常量**：使用 UPPER_SNAKE_CASE
  - `MAX_RETRIES`
  - `DEFAULT_TIMEOUT`

### 代码风格

- 使用 2 空格缩进
- 使用单引号（在 JSX 中使用双引号）
- 语句末尾不使用分号（除非必要）
- 函数参数过多时换行
- 合理使用空行分隔逻辑块

### 注释

- 为复杂逻辑添加注释
- 使用 JSDoc 注释公开 API
- 注释使用中文

```typescript
/**
 * 创建 HTTP 客户端
 * @param config - 客户端配置
 * @returns HTTP 客户端实例
 */
export function createHttpClient(config: HttpClientConfig): HttpClient {
  // 实现...
}
```

## 🧪 测试

### 运行测试

```bash
# 运行所有测试
pnpm test

# 运行特定包的测试
pnpm --filter @usekit/http test

# 运行测试 UI
pnpm test:ui
```

### 编写测试

使用 Vitest 编写测试：

```typescript
import { describe, it, expect } from 'vitest'
import { formatDate } from '../src/format'

describe('formatDate', () => {
  it('应该正确格式化日期', () => {
    const date = new Date('2025-10-29')
    const result = formatDate(date, 'YYYY-MM-DD')
    expect(result).toBe('2025-10-29')
  })
})
```

## 📦 发布流程

（仅维护者）

1. 更新版本号
2. 更新 CHANGELOG.md
3. 提交更改
4. 创建 Git 标签
5. 推送到 GitHub
6. 发布到 npm

## 🎯 优先级

我们特别欢迎以下方面的贡献：

- 🐛 Bug 修复
- 📚 文档改进
- ✨ 新功能实现
- ⚡ 性能优化
- 🌍 国际化支持
- 🧪 测试用例

## ❓ 需要帮助？

- 查看 [文档](./README.md)
- 查看 [快速开始](./QUICK_START.md)
- 在 [Discussions](../../discussions) 中提问
- 查看已有的 [Issues](../../issues)

## 📜 行为准则

- 尊重所有贡献者
- 保持友好和专业
- 接受建设性的批评
- 关注对社区最有利的事情

---

再次感谢您的贡献！🙏

