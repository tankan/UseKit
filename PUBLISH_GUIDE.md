# UseKit 发布指南

## 📦 发布前准备

### 1. 所有包已成功构建 ✅

所有包已完成构建并生成 dist 文件：
- ✅ `@usekit/shared@0.2.0`
- ✅ `@usekit/http@0.2.0`
- ✅ `@usekit/date@0.2.0`
- ✅ `@usekit/core@0.2.0`

## 🚀 发布步骤

### 第一步：登录 npm

由于包名使用了 `@usekit` 作为 scope（作用域），您需要先在 npm 上创建一个组织或使用个人账户。

#### 方式 1：浏览器登录（推荐）

```bash
npm login
```

系统会提示您打开浏览器登录链接，按照提示完成登录即可。

#### 方式 2：命令行登录

```bash
npm adduser
```

然后按照提示输入：
- Username（用户名）
- Password（密码）
- Email（邮箱）
- One-time password（如果启用了 2FA）

### 第二步：检查登录状态

```bash
npm whoami
```

如果显示您的用户名，说明登录成功。

### 第三步：发布包

由于是 Monorepo，需要按依赖顺序发布各个包：

#### 1. 发布 shared 包（无依赖）

```bash
cd packages/shared
npm publish --access public
cd ../..
```

#### 2. 发布 http 和 date 包（依赖 shared）

```bash
# 发布 http 包
cd packages/http
npm publish --access public
cd ../..

# 发布 date 包
cd packages/date
npm publish --access public
cd ../..
```

#### 3. 发布 core 包（依赖所有包）

```bash
cd packages/core
npm publish --access public
cd ../..
```

## ⚠️ 注意事项

### 关于 @usekit scope

如果您是第一次发布 `@usekit` scope 的包，需要：

1. **使用个人 scope**：将所有包名改为 `@yourname/xxx`
   
   例如：`@usekit/core` → `@zengxingqi/core`

2. **创建 npm 组织**：
   
   访问 https://www.npmjs.com/org/create 创建 `usekit` 组织（免费）

### 关于 workspace 依赖

在发布前，pnpm 会自动将 `workspace:*` 转换为实际的版本号，所以不用担心依赖问题。

### 关于包的访问权限

使用 `--access public` 是因为：
- Scoped 包默认是私有的
- 私有包需要付费订阅
- Public 包可以免费发布

## 🎯 快速发布脚本

您也可以使用以下命令一次性发布所有包：

```bash
# 回到项目根目录
cd C:\Users\USER\Documents\UseKit

# 发布所有包（按顺序）
pnpm -r --filter @usekit/shared publish --access public
pnpm -r --filter @usekit/http publish --access public
pnpm -r --filter @usekit/date publish --access public
pnpm -r --filter @usekit/core publish --access public
```

## ✅ 发布后验证

发布成功后，您可以：

1. **查看包信息**：
   ```bash
   npm info @usekit/core
   ```

2. **在新项目中安装测试**：
   ```bash
   npm install @usekit/core
   ```

3. **访问 npm 网站查看**：
   https://www.npmjs.com/package/@usekit/core

## 📝 版本管理

后续版本更新时：

1. **更新版本号**（在各个 package.json 中）
2. **更新 CHANGELOG.md**
3. **重新构建**：`pnpm build`
4. **提交代码**：`git commit -am "chore: release v0.x.x"`
5. **打标签**：`git tag v0.x.x`
6. **发布包**：按上述步骤发布
7. **推送到 GitHub**：`git push --tags`

## 🔧 常见问题

### Q: 提示包名已存在？

A: `@usekit` 可能已被占用，请更换 scope 或联系现有所有者。

### Q: 发布失败？

A: 检查：
- 是否已登录（`npm whoami`）
- 包名是否符合规范
- 版本号是否重复
- 是否有 `.npmignore` 或 `package.json` 的 `files` 字段

### Q: 如何取消发布的包？

A: 
```bash
npm unpublish @usekit/core@0.2.0
```

注意：只能在发布后 72 小时内取消。

---

**准备好了吗？现在可以开始发布了！** 🚀

