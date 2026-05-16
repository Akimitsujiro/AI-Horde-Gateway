<div align="center">
  <h1>🌉 AI Horde to JanitorAI Gateway</h1>
  <p>A powerful, lightweight Node.js proxy server that seamlessly bridges JanitorAI with the crowdsourced AI Horde network.</p>

  [English](README.md) | [Tiếng Việt](README_vn.md) | [中文](README_zh.md)
</div>

---

## 📖 Introduction

[JanitorAI](https://janitorai.com) is an incredible frontend for roleplaying and AI chat, but it natively relies on OpenAI-compatible synchronous APIs. On the other hand, the **[AI Horde](https://stablehorde.net/)** is a fantastic community-driven network providing free access to top-tier LLMs, but it utilizes a unique asynchronous polling API architecture.

**This Gateway solves the incompatibility.** It acts as a middleman on your local machine:
1. It intercepts standard OpenAI chat requests sent by JanitorAI.
2. It translates the conversation history into a unified prompt and submits it as an asynchronous job to the AI Horde.
3. It quietly polls the AI Horde network for the generation status.
4. Once completed, it packages the result back into the OpenAI format JanitorAI expects.

With this gateway, you can enjoy hundreds of powerful AI models entirely for **free**!

## ✨ Key Features

- 🚀 **Plug & Play:** Zero complex configuration. Just run the batch file and you're good to go.
- 🛡️ **Auto-Validation:** Automatically corrects invalid requests from the client (e.g., forcing a minimum of 16 `max_tokens` to bypass AI Horde's strict validation).
- 🔄 **Smart URL Handling:** Automatically catches and routes variations of the JanitorAI proxy endpoint (`/`, `/v1`, `/chat/completions`, `/v1/chat/completions`).
- 🤖 **Model Routing:** Map "Any" to a randomized free worker, or specify an exact Model ID (e.g., `koboldcpp/Artemis-31B-v1b`).
- 🕒 **Async Polling:** Manages the AI Horde waiting queue natively without crashing or timing out the JanitorAI interface.

## ⚙️ Prerequisites

- **[Node.js](https://nodejs.org/en/download/)** (v18 or newer recommended).
- **[Git](https://git-scm.com/)** (Optional, for easy cloning and updates).

## 🚀 Installation & Setup

1. **Download the Repository**
   Using Git:
   ```bash
   git clone https://github.com/YOUR_GITHUB_USERNAME/aihorde-janitor-gateway.git
   cd aihorde-janitor-gateway
   ```
   *(Alternatively, download the repository as a ZIP file from GitHub and extract it).*

2. **First Time Run (Windows)**
   Simply double-click the `start.bat` file. 
   It will automatically install necessary dependencies (`express`, `axios`, `cors`, `dotenv`) and start the server. 
   You will see a console window stating: `AI Horde JanitorAI Gateway running on http://localhost:3000`.

## 🎮 How to Use with JanitorAI

Keep the gateway running in the background, then set up JanitorAI:

1. Open a chat in JanitorAI and click the **API Settings** (top right).
2. Select **Custom** or **OpenAI Proxy**.
3. **Proxy URL:** 
   ```text
   http://localhost:3000/v1/chat/completions
   ```
4. **API Key:** 
   ```text
   0000000000
   ```
   > **Note:** This is the default anonymous key required by AI Horde. JanitorAI will block the proxy if this field is empty. For much faster response times, register at [AI Horde](https://stablehorde.net/) to get your own API Key and earn Kudos!
5. **Model:** 
   - Type `Any` to let the network pick the fastest available model.
   - Or, specify an exact Model ID from the AI Horde network (e.g., `koboldcpp/Artemis-31B-v1b`).
6. **Save Settings** and start chatting!

*(⚠️ **CRITICAL:** Make sure "Stream" is turned **OFF** in JanitorAI settings as AI Horde relies on full-text asynchronous returns).*

## 🔄 Updating

To get the latest features and bug fixes:
- **Windows:** Double-click the `update.bat` file. It will automatically pull the latest code from GitHub and update your dependencies.
- **Manual:** Run `git pull origin main` followed by `npm install`.

## 🛠️ Advanced Configuration

You can create a `.env` file in the root folder to customize the server:
```env
PORT=3000
AI_HORDE_API_KEY=your_personal_api_key_here
```
If you set your personal API Key here, the gateway will use it regardless of what is typed into the JanitorAI interface.

## 💡 Credits & Acknowledgements

- 👨‍💻 **Author & Developer:** AkimitsujiroVN | 📧 [**Email**](mailto:ebisudakk20607@gmail.com) | 🌐 [**Facebook**](https://www.facebook.com/akimitsujirovn/)
- Powered by the incredible volunteer network of the [AI Horde](https://stablehorde.net/).
- Built to enhance the [JanitorAI](https://janitorai.com) experience.

## 📄 License
This project is licensed under the MIT License.
