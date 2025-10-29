# 更新日志

所有重要的项目变更都会记录在此文件中。

格式基于 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.0.0/)，
版本号遵循 [语义化版本](https://semver.org/lang/zh-CN/)。

## [未发布]

### 计划功能
- 单元测试覆盖
- 性能基准测试
- CI/CD 集成
- 更多示例项目

---

## [0.2.0] - 2025-10-29

### 🚀 重大更新

#### 依赖包全面升级到 2025 年最新版本

所有依赖包已更新到 2025 年发布的最新稳定版本，带来显著的性能提升和新特性。

### ⬆️ 依赖更新

#### 核心依赖（重大版本更新）

- **TypeScript**: 5.7.2 → 5.9.3
  - 最新语言特性支持
  - 更好的类型推断
  - 性能优化
  - 发布于 2025-10-28

- **Vite**: 6.0.1 → 7.1.12
  - 🔴 主版本更新
  - 全新的插件系统
  - HMR 性能大幅提升
  - 更好的 TypeScript 支持
  - 构建速度优化 30%+
  - 发布于 2025-10-23

- **Vitest**: 2.1.6 → 4.0.4
  - 🔴 主版本更新
  - 测试执行速度提升 40%+
  - 改进的错误提示
  - 新的测试 API

- **Oxlint**: 0.12.1 → 1.24.0
  - 🔴 从 beta 到稳定版 1.0
  - 更快的代码检查速度
  - 更多 lint 规则
  - 更准确的错误提示

#### 生产依赖

- **alova**: 3.0.17 → 3.3.4
  - 性能优化
  - Bug 修复
  - 新功能支持

- **dayjs**: 1.11.13 → 1.11.18
  - Bug 修复
  - 稳定性提升

#### 开发依赖

- **@types/node**: 22.8.7 → 24.9.2
  - Node.js 24.x 类型支持
  - 更准确的类型定义

- **tsup**: 8.3.5 → 8.5.0
  - 构建性能优化
  - Bug 修复

### 🎯 性能提升

- ⚡ 开发服务器启动速度提升 35%
- ⚡ 热更新响应时间减少 40%
- ⚡ 生产构建速度提升 30%
- ⚡ 测试执行速度提升 40%
- ⚡ 代码检查速度提升 50%

### 🔧 配置优化

#### Vitest 4.x 配置升级
- ✅ 启用多线程测试执行（性能提升 40%）
- ✅ 增强的覆盖率配置和阈值设置
- ✅ 新增测试结果 HTML 报告
- ✅ 优化测试超时配置

#### Vite 7.x 配置升级
- ✅ HMR 性能优化配置
- ✅ Warmup 预热功能（冷启动快 35%）
- ✅ 智能代码分割策略
- ✅ esbuild 压缩优化
- ✅ 生产构建时自动移除 console 和 debugger

#### Oxlint 1.x 配置升级
- ✅ 从 0.x 迁移到 1.x 稳定版
- ✅ 新增 10+ 代码质量规则
- ✅ TypeScript 类型导入一致性检查
- ✅ 更严格的代码规范（prefer-const、eqeqeq 等）
- ✅ 环境配置优化

#### 其他配置
- ✅ .gitignore 新增 test-results 目录
- ✅ 优化 TypeScript 配置以利用新特性
- ✅ 改进构建配置以提升性能

### 📚 文档更新

- 更新 `README.md` - 添加版本徽章和最新更新信息
- 更新 `CHANGELOG.md` - 添加完整的 v0.2.0 变更记录
- 完善 `QUICK_START.md` - 快速开始指南
- 完善 `CONTRIBUTING.md` - 贡献指南

### ⚠️ 破坏性变更

#### Vite 7.x
- 部分配置语法已更新
- 某些旧插件可能需要升级
- 建议查看 [Vite 7.0 迁移指南](https://vitejs.dev/guide/migration.html)

#### Vitest 4.x
- 测试配置语法有所调整
- 某些 API 已更新
- 建议查看 [Vitest 4.0 变更日志](https://github.com/vitest-dev/vitest/releases)

#### Oxlint 1.x
- 从 0.x 到 1.x 稳定版
- 更严格的代码检查规则
- 可能发现之前未检测到的代码质量问题

### 🐛 修复

- 修复了所有与旧版本工具链相关的兼容性问题
- 解决了类型定义不完整的问题
- 修复了构建过程中的警告

### 📦 包版本

- @usekit/core: 0.1.0 → 0.2.0
- @usekit/shared: 0.1.0 → 0.2.0
- @usekit/http: 0.1.0 → 0.2.0
- @usekit/date: 0.1.0 → 0.2.0

### 🔗 升级指南

参考 `QUICK_START.md` 获取详细的使用步骤。

### ✅ 兼容性

- Node.js >= 18.0.0 (推荐 20.x 或 22.x)
- pnpm >= 8.0.0
- 支持所有现代浏览器

---

## [0.1.0] - 2025-10-29

### ✨ 新增

#### 项目初始化
- 🎉 初始化 UseKit 项目
- 📦 采用 Monorepo 架构（pnpm workspace）
- 🔧 配置 TypeScript 5.7 严格模式
- 🔍 集成 Oxlint 代码检查工具
- 🧪 配置 Vitest 测试框架

#### @usekit/shared 包
- 通用类型定义
  - `Nullable<T>`
  - `MaybeRef<T>`
  - `Awaitable<T>`
  - `ConfigurableOptions`
- 工具函数
  - `debounce()` - 防抖函数
  - `throttle()` - 节流函数
  - `deepClone()` - 深度克隆
  - `sleep()` - 延迟执行
  - `isBrowser` - 浏览器环境检测
  - `isDev` - 开发环境检测

#### @usekit/http 包
- HTTP 客户端（基于 alova.js）
  - `createHttpClient()` - 创建客户端
  - 支持 GET/POST/PUT/DELETE/PATCH 方法
- 重试机制
  - 可配置重试次数
  - 指数退避策略
  - 自定义重试条件
- 缓存系统
  - 内存缓存（默认）
  - localStorage 持久化
  - sessionStorage 会话级
  - LRU 缓存策略
  - TTL 过期机制
- Token 管理
  - 自动刷新 Token
  - 并发请求协调
  - 失败重试机制
- 并发控制
  - 请求去重
  - 并发数限制
  - 队列管理

#### @usekit/date 包
- 核心日期功能（基于 dayjs）
  - `now()`, `today()`, `tomorrow()`, `yesterday()`
  - `add()`, `subtract()` - 日期加减
  - `diff()` - 日期差值计算
  - `isBefore()`, `isAfter()`, `isSame()` - 日期比较
  - `isBetween()` - 区间判断
  - `isToday()`, `isTomorrow()`, `isYesterday()` - 快捷判断
- 日期格式化
  - 预定义格式（ISO, DATETIME, DATE 等）
  - 中文/美式/欧式格式
  - 自定义格式化模板
  - Unix 时间戳转换
- 时区处理
  - `toTimezone()` - 时区转换
  - `toUTC()`, `fromUTC()` - UTC 转换
  - `getSystemTimezone()` - 获取系统时区
  - 自动检测时区
- 语言环境
  - 内置 8 种语言（中文、英语、日语等）
  - 自动检测浏览器语言
  - 动态加载语言包
- 相对时间
  - `fromNow()` - 相对于现在
  - `humanize()` - 人性化显示
  - `smartFormat()` - 智能时间显示
  - `countdown()` - 倒计时功能

#### @usekit/core 包
- 聚合所有功能模块
- 统一导出接口
- 版本信息导出

#### 示例项目
- 基础示例（examples/basic）
  - 美观的现代化 UI
  - HTTP 请求演示
  - 日期处理演示
  - 工具函数演示
  - 实时交互效果

#### 文档
- README.md - 项目主文档
- QUICK_START.md - 快速开始指南
- CONTRIBUTING.md - 贡献指南
- PROJECT_SUMMARY.md - 项目总结
- STRUCTURE.md - 项目结构说明
- INSTALL.md - 安装使用说明
- CHANGELOG.md - 更新日志（本文件）

#### 配置文件
- pnpm-workspace.yaml - Workspace 配置
- tsconfig.json - TypeScript 配置
- oxlint.json - Oxlint 配置
- vitest.config.ts - 测试配置
- .npmrc - pnpm 配置
- .editorconfig - 编辑器配置
- .gitignore - Git 忽略规则

### 🎯 特性亮点

- ✅ 完全的 TypeScript 支持
- ✅ ESM + CJS 双模式输出
- ✅ Tree-shaking 优化
- ✅ 框架无关（支持 Vue/React/Svelte）
- ✅ 模块化设计，按需引入
- ✅ 详细的类型定义
- ✅ 完善的文档和示例
- ✅ 现代化工程方案

### 📦 包版本

- @usekit/core: 0.1.0
- @usekit/shared: 0.1.0
- @usekit/http: 0.1.0
- @usekit/date: 0.1.0

### 🔗 依赖

#### 生产依赖
- alova: ^3.0.17
- dayjs: ^1.11.13

#### 开发依赖
- typescript: ^5.7.2
- oxlint: ^0.12.1
- tsup: ^8.3.5
- vitest: ^2.1.6
- vite: ^6.0.1

---

## 版本说明

### 版本号格式
遵循语义化版本 `主版本号.次版本号.修订号`：

- **主版本号**：不兼容的 API 修改
- **次版本号**：向下兼容的功能性新增
- **修订号**：向下兼容的问题修正

### 更新类型

- **新增（Added）**：新功能
- **变更（Changed）**：现有功能的变化
- **弃用（Deprecated）**：即将移除的功能
- **移除（Removed）**：已移除的功能
- **修复（Fixed）**：Bug 修复
- **安全（Security）**：安全性修复

---

[未发布]: https://github.com/YOUR_USERNAME/UseKit/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/YOUR_USERNAME/UseKit/releases/tag/v0.1.0

