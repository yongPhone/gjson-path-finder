# 贡献指南

感谢你对 GJSON Path Finder 的贡献兴趣！我们欢迎各种形式的贡献，无论是 bug 报告、功能请求、文档改进还是代码贡献。

## 🤝 贡献方式

### 报告 Bug

如果发现 bug，请：

1. 检查 [Issues](https://github.com/yongPhone/gjson-path-finder/issues) 确保该问题尚未被报告
2. 创建新的 Issue，包含：
   - 清晰的标题和描述
   - 复现步骤
   - 预期行为 vs 实际行为
   - 屏幕截图（如适用）
   - 浏览器和版本信息

### 功能请求

对于新功能建议：

1. 在 [Discussions](https://github.com/yongPhone/gjson-path-finder/discussions) 中讨论想法
2. 如获得正面反馈，创建详细的 Feature Request Issue

### 代码贡献

#### 开发环境设置

1. Fork 仓库
2. 克隆到本地：
   ```bash
   git clone https://github.com/yongPhone/gjson-path-finder.git
   cd gjson-path-finder
   ```
3. 安装依赖：
   ```bash
   npm install
   ```
4. 创建特性分支：
   ```bash
   git checkout -b feature/your-feature-name
   ```

#### 开发流程

1. **编码标准**：
   - 使用 TypeScript
   - 遵循现有的代码风格
   - 添加必要的类型定义
   - 确保代码通过 ESLint 检查

2. **提交规范**：
   - 使用清晰的提交信息
   - 每个提交应该是一个逻辑单元
   - 格式：`type(scope): description`
   - 类型：`feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

3. **测试**：
   - 确保现有功能正常工作
   - 手动测试新功能
   - 在不同浏览器中测试

#### Pull Request 流程

1. 确保你的分支基于最新的 `main` 分支
2. 推送到你的 fork：
   ```bash
   git push origin feature/your-feature-name
   ```
3. 创建 Pull Request，包含：
   - 清晰的标题和描述
   - 更改的详细说明
   - 相关 Issue 的链接（如适用）
   - 测试说明

## 🛠️ 项目结构

```
src/
├── components/          # React 组件
│   ├── JsonInput.tsx   # JSON 输入组件
│   ├── JsonViewer.tsx  # JSON 查看器组件
│   └── PathDisplay.tsx # 路径显示组件
├── services/           # 业务逻辑
│   └── gjsonPathfinder.ts # GJSON 路径生成逻辑
├── types.ts           # TypeScript 类型定义
├── constants.ts       # 常量定义
└── App.tsx           # 主应用组件
```

## 📋 开发任务

我们欢迎以下类型的贡献：

### 🐛 Bug 修复
- 修复现有功能的问题
- 改进错误处理
- 提升性能

### ✨ 新功能
- 支持更多 GJSON 路径模式
- 添加导入/导出功能
- 改进用户界面
- 添加键盘快捷键

### 📚 文档
- 改进 README
- 添加代码注释
- 创建使用教程
- 翻译文档

### 🎨 设计
- 改进 UI/UX
- 添加主题支持
- 优化移动端体验

## 🔍 代码审查

所有贡献都会经过代码审查。审查者会检查：

- 代码质量和可读性
- 功能正确性
- 性能影响
- 安全考虑
- 文档完整性

## 📞 联系我们

- GitHub Issues: 报告 bug 和功能请求
- GitHub Discussions: 一般讨论和问题
- Email: [your-email@example.com]

## 🙏 致谢

感谢所有贡献者！你们的努力让这个项目变得更好。

---

再次感谢你的贡献！🎉