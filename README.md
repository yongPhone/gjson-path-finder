# 🔗 GJSON Path Finder

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/gjson-path-finder)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

一个交互式的 GJSON 路径生成工具，让你通过点击 JSON 数据来轻松生成对应的 GJSON 路径表达式。

[🌐 在线体验](https://gjson-path-finder.vercel.app) | [📖 GJSON 文档](https://github.com/tidwall/gjson)

## ✨ 功能特性

- 🎯 **交互式路径生成**：点击 JSON 树中的任意节点，自动生成对应的 GJSON 路径
- 🔄 **多种路径模式**：支持直接路径、通配符路径、查询路径等多种表达式
- 📱 **响应式设计**：适配桌面和移动设备
- 🚀 **即时预览**：实时显示路径结果，无需刷新
- 💡 **智能排序**：按照路径复杂度和实用性智能排序结果

## 🚀 快速开始

### 在线使用

直接访问 [https://gjson-path-finder.vercel.app](https://gjson-path-finder.vercel.app) 开始使用。

### 本地运行

**前置要求：** Node.js 16+

1. 克隆仓库：
   ```bash
   git clone https://github.com/your-username/gjson-path-finder.git
   cd gjson-path-finder
   ```

2. 安装依赖：
   ```bash
   npm install
   ```

3. 启动开发服务器：
   ```bash
   npm run dev
   ```

4. 打开浏览器访问 `http://localhost:5173`

## 🛠️ 技术栈

- **前端框架**：React 19 + TypeScript
- **构建工具**：Vite
- **样式**：Tailwind CSS
- **部署平台**：Vercel

## 📖 使用指南

1. **输入 JSON 数据**：在左侧面板输入或粘贴你的 JSON 数据
2. **浏览 JSON 树**：右侧会显示可交互的 JSON 树状结构
3. **点击节点**：点击任意键或值来选择目标节点
4. **获取路径**：底部面板会显示所有可能的 GJSON 路径表达式
5. **复制使用**：点击复制按钮将路径复制到剪贴板

## 🎯 GJSON 路径类型

本工具支持生成以下类型的 GJSON 路径：

- **直接路径**：`users.0.name`
- **通配符路径**：`users.*.name`（所有匹配）、`users.?.name`（第一个匹配）
- **查询路径**：`users.#(age>18).name`（条件查询）
- **数组查询**：`users.#(name=="John")`（精确匹配）

## 🤝 贡献指南

欢迎贡献代码！请阅读 [CONTRIBUTING.md](CONTRIBUTING.md) 了解详细的贡献指南。

### 开发流程

1. Fork 本仓库
2. 创建特性分支：`git checkout -b feature/amazing-feature`
3. 提交更改：`git commit -m 'Add some amazing feature'`
4. 推送到分支：`git push origin feature/amazing-feature`
5. 提交 Pull Request

## 📄 许可证

本项目采用 [MIT 许可证](LICENSE)。

## 🙏 致谢

- [GJSON](https://github.com/tidwall/gjson) - 强大的 JSON 路径查询库
- [React](https://reactjs.org/) - 用户界面构建库
- [Tailwind CSS](https://tailwindcss.com/) - 实用优先的 CSS 框架

## 📞 联系方式

如有问题或建议，欢迎：
- 提交 [Issue](https://github.com/your-username/gjson-path-finder/issues)
- 发起 [Discussion](https://github.com/your-username/gjson-path-finder/discussions)

---

⭐ 如果这个项目对你有帮助，请给个 Star 支持一下！
