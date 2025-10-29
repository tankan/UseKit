# UseKit v0.2.0 升级说明

**升级时间**: 2025-10-29

## 📦 依赖版本

| 包 | 版本 |
|---|------|
| TypeScript | 5.9.3 |
| Vite | 7.1.12 |
| Vitest | 4.0.4 |
| Oxlint | 1.24.0 |
| alova | 3.3.4 |
| dayjs | 1.11.18 |

## ⚡ 性能提升

- 开发服务器启动：快 35%
- HMR 响应：快 40%
- 生产构建：快 30%
- 测试执行：快 40%
- 代码检查：快 50%

## ⚠️ 注意事项

### Vitest 4.x
配置文件已更新，包括：
- 多线程测试执行
- 覆盖率阈值（80%）
- HTML 测试报告

### Vite 7.x
配置文件已优化，包括：
- Warmup 预热功能
- 智能代码分割
- 自动移除 console/debugger

### Oxlint 1.x
新增代码质量规则：
- `prefer-const` - 优先使用 const
- `eqeqeq` - 强制使用 ===
- `consistent-type-imports` - 类型导入一致性

## ✅ 验证

所有检查通过：
- TypeScript 类型检查 ✅
- Oxlint 代码检查 ✅（0 warnings, 0 errors）
- 所有包构建成功 ✅
- 示例项目运行正常 ✅

## 📚 文档

- [README.md](./README.md) - 项目主文档
- [QUICK_START.md](./QUICK_START.md) - 快速开始
- [CONTRIBUTING.md](./CONTRIBUTING.md) - 贡献指南
- [CHANGELOG.md](./CHANGELOG.md) - 完整变更日志

