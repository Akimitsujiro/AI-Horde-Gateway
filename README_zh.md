<div align="center">
  <h1>🌉 AI Horde 到 JanitorAI 网关 (Gateway)</h1>
  <p>一个强大且轻量级的 Node.js 代理服务器，无缝连接 JanitorAI 与基于众包的 AI Horde 网络。</p>

  [English](README.md) | [Tiếng Việt](README_vn.md) | [中文](README_zh.md)
</div>

---

## 📖 简介

[JanitorAI](https://janitorai.com) 是一个令人难以置信的 AI 角色扮演和聊天前端，但它原生依赖于兼容 OpenAI 的同步 (synchronous) API。另一方面，**[AI Horde](https://stablehorde.net/)** 是一个出色的社区驱动网络，提供对顶级 LLM 的免费访问，但它使用的是独特的异步轮询 (asynchronous) API 架构。

**此网关解决了这种不兼容性。** 它在您的本地机器上充当中间人：
1. 它拦截 JanitorAI 发送的标准 OpenAI 聊天请求。
2. 它将对话历史记录转换为统一的提示词，并作为异步任务提交给 AI Horde。
3. 它在后台静默轮询 AI Horde 网络以获取生成状态。
4. 一旦完成，它将结果重新打包为 JanitorAI 期望的 OpenAI 格式。

使用此网关，您可以完全**免费**享受数百个强大的 AI 模型！

## ✨ 核心特性

- 🚀 **即插即用 (Plug & Play):** 零复杂配置。只需运行批处理文件即可开始。
- 🛡️ **自动验证修正:** 自动纠正来自客户端的无效请求（例如，强制最小 `max_tokens` 为 16，以绕过 AI Horde 的严格验证）。
- 🔄 **智能 URL 处理:** 自动捕获并路由 JanitorAI 代理端点的各种变体（`/`, `/v1`, `/chat/completions`, `/v1/chat/completions`）。
- 🤖 **模型路由:** 将“Any”映射到随机的空闲工作节点，或指定确切的模型 ID（例如 `koboldcpp/Artemis-31B-v1b`）。
- 🕒 **异步轮询:** 在本地管理 AI Horde 等待队列，而不会导致 JanitorAI 界面崩溃或超时。

## ⚙️ 运行前提

- **[Node.js](https://nodejs.org/en/download/)** (推荐 v18 或更新版本)。
- **Git** (可选，用于轻松克隆和更新)。

## 🚀 安装与设置

1. **下载项目代码库**
   使用 Git:
   ```bash
   git clone https://github.com/YOUR_GITHUB_USERNAME/aihorde-janitor-gateway.git
   cd aihorde-janitor-gateway
   ```
   *（或者，也可以从 GitHub 将代码库下载为 ZIP 文件并解压）。*

2. **首次运行 (Windows)**
   只需双击 `start.bat` 文件。
   它将自动安装必要的依赖项 (`express`, `axios`, `cors`, `dotenv`) 并启动服务器。
   您将看到一个控制台窗口显示：`AI Horde JanitorAI Gateway running on http://localhost:3000`。

## 🎮 如何在 JanitorAI 中使用

保持网关在后台运行，然后设置 JanitorAI：

1. 在 JanitorAI 中打开一个聊天，然后单击 **API Settings**（右上角）。
2. 选择 **Proxy** -> **New**。
3. **Proxy URL:** 
   ```text
   http://localhost:3000/v1/chat/completions
   ```
4. **API Key:** 
   ```text
   0000000000
   ```
   > **注意:** 这是 AI Horde 需要的默认匿名密钥。如果此字段为空，JanitorAI 会在前端阻止发送请求。为了获得更快的响应时间，请在 [AI Horde](https://stablehorde.net/) 注册以获取您自己的 API 密钥并赚取 Kudos！
5. **Model:** 
   - 输入 `Any` 让网络选择最快的可用模型。
   - 或者，指定 [AI Horde 网络](https://aihorde.net/details/models/text) 中确切的模型 ID（例如 `koboldcpp/Artemis-31B-v1b`）。
6. 点击 **Add** 然后 **Save**，开始聊天！

*（⚠️ **严重警告:** 确保在 JanitorAI 设置中将“Stream”转为 **OFF**，因为 AI Horde 依赖于全文异步返回）。*

## 🔄 更新

获取最新功能和错误修复：
- **Windows:** 双击 `update.bat` 文件。它会自动从 GitHub 拉取最新代码并更新您的依赖项。
- **手动:** 运行 `git pull origin main` 然后运行 `npm install`。

## 🛠️ 高级配置

您可以在根文件夹中创建一个 `.env` 文件来自定义服务器：
```env
PORT=3000
AI_HORDE_API_KEY=your_personal_api_key_here
```
如果您在此处设置了个人 API 密钥，无论您在 JanitorAI 界面中输入什么，网关都会使用该密钥。

## 💡 致谢 (Credits)

- 👨‍💻 **作者与开发者:** AkimitsujiroVN | 📧 [**Email (邮箱)**](mailto:ebisudakk20607@gmail.com) | 🌐 [**Facebook**](https://www.facebook.com/akimitsujirovn/)
- 由 [AI Horde](https://stablehorde.net/) 令人惊叹的志愿者网络提供支持。
- 专为提升 [JanitorAI](https://janitorai.com) 体验而构建。

## 📄 许可证
本项目采用 MIT 许可证。
