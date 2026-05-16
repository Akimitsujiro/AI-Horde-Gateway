<div align="center">
  <h1>🌉 AI Horde - JanitorAI Gateway</h1>
  <p>Một máy chủ Proxy Node.js siêu nhẹ, giúp kết nối trực tiếp JanitorAI với mạng lưới AI Horde miễn phí do cộng đồng đóng góp.</p>

  [English](README.md) | [Tiếng Việt](README_vn.md) | [中文](README_zh.md)
</div>

---

## 📖 Giới thiệu

[JanitorAI](https://janitorai.com) là một nền tảng tuyệt vời để nhập vai và trò chuyện với AI, nhưng nó chỉ hỗ trợ các API đồng bộ (synchronous) chuẩn OpenAI. Trong khi đó, **[AI Horde](https://stablehorde.net/)** là một mạng lưới máy tính tình nguyện khổng lồ cung cấp AI miễn phí, nhưng lại sử dụng cơ chế API bất đồng bộ (asynchronous) đặc thù.

**Gateway này ra đời để giải quyết sự không tương thích đó.** Nó đóng vai trò là "người phiên dịch" trên máy tính của bạn:
1. Đón nhận các yêu cầu trò chuyện chuẩn OpenAI từ JanitorAI.
2. Dịch lịch sử trò chuyện thành cấu trúc prompt phù hợp và gửi dưới dạng "công việc bất đồng bộ" lên AI Horde.
3. Âm thầm liên tục hỏi (poll) AI Horde để lấy kết quả.
4. Đóng gói kết quả trả về theo đúng chuẩn OpenAI mà JanitorAI cần.

Nhờ có Gateway này, bạn có thể trải nghiệm hàng trăm mô hình ngôn ngữ AI mạnh mẽ hoàn toàn **miễn phí**!

## ✨ Tính năng nổi bật

- 🚀 **Plug & Play (Cắm là chạy):** Không cần cấu hình lằng nhằng. Nháy đúp file bat là có thể dùng ngay.
- 🛡️ **Tự động sửa lỗi (Auto-Validation):** Tự động điều chỉnh các thông số sai lệch (ví dụ: ép `max_tokens` tối thiểu là 16 để tránh bị AI Horde từ chối).
- 🔄 **Xử lý URL thông minh:** Tự động bắt đúng mọi loại đường dẫn mà JanitorAI trỏ tới (`/`, `/v1`, `/chat/completions`, `/v1/chat/completions`).
- 🤖 **Điều hướng Model:** Dịch tự động từ khóa "Any" thành lệnh chọn model ngẫu nhiên rảnh rỗi nhất, hoặc dùng đúng Model ID bạn yêu cầu (VD: `koboldcpp/Artemis-31B-v1b`).
- 🕒 **Chờ thông minh (Async Polling):** Quản lý quá trình xếp hàng trên AI Horde mượt mà mà không làm treo giao diện JanitorAI.

## ⚙️ Yêu cầu hệ thống

- **[Node.js](https://nodejs.org/en/download/)** (Phiên bản v18 trở lên).
- **Git** (Tùy chọn, dùng để tải và cập nhật code nhanh).

## 🚀 Cài đặt & Khởi chạy

1. **Tải mã nguồn**
   Nếu dùng Git, chạy lệnh sau:
   ```bash
   git clone https://github.com/YOUR_GITHUB_USERNAME/aihorde-janitor-gateway.git
   cd aihorde-janitor-gateway
   ```
   *(Hoặc bạn có thể tải file ZIP từ GitHub về và giải nén).*

2. **Chạy lần đầu (Trên Windows)**
   Nháy đúp vào file `start.bat`. 
   Nó sẽ tự động tải các thư viện cần thiết (`express`, `axios`, `cors`, `dotenv`) và bật Server. 
   Khi thấy dòng chữ: `AI Horde JanitorAI Gateway running on http://localhost:3000` là thành công.

## 🎮 Cách kết nối với JanitorAI

Giữ cho cửa sổ dòng lệnh của Gateway luôn chạy nền, sau đó thiết lập trên JanitorAI:

1. Mở một đoạn chat trên JanitorAI và bấm vào biểu tượng **API Settings** (Góc trên bên phải).
2. Chọn **Custom** hoặc **OpenAI Proxy**.
3. **Proxy URL:** 
   ```text
   http://localhost:3000/v1/chat/completions
   ```
4. **API Key:** 
   ```text
   0000000000
   ```
   > **Lưu ý quan trọng:** Đây là mã ẩn danh mặc định của AI Horde. Bạn bắt buộc phải nhập mã này (hoặc bất kỳ ký tự nào) vì JanitorAI không cho phép để trống ô này. Để tốc độ phản hồi nhanh gấp nhiều lần, hãy đăng ký tài khoản tại [AI Horde](https://stablehorde.net/) để lấy API Key cá nhân và tích lũy Kudos!
5. **Model:** 
   - Gõ `Any` để AI Horde tự tìm máy chủ phản hồi nhanh nhất.
   - Hoặc dán một Model ID cụ thể (VD: `koboldcpp/Artemis-31B-v1b`).
6. **Save Settings** và bắt đầu trò chuyện!

*(⚠️ **ĐẶC BIỆT LƯU Ý:** Phải **TẮT** chế độ "Stream" trong cài đặt JanitorAI vì AI Horde yêu cầu trả về toàn bộ chữ một lần).*

## 🔄 Cập nhật phiên bản mới

Để lấy code mới nhất và các bản vá lỗi:
- **Trên Windows:** Chỉ cần nháy đúp vào file `update.bat`. Hệ thống sẽ tự động kéo code từ GitHub và cập nhật thư viện.
- **Thủ công:** Chạy lệnh `git pull origin main` rồi chạy tiếp `npm install`.

## 🛠️ Cấu hình nâng cao

Bạn có thể tạo một file tên là `.env` trong thư mục gốc để tuỳ chỉnh server:
```env
PORT=3000
AI_HORDE_API_KEY=your_personal_api_key_here
```
Nếu bạn nhập API Key cá nhân vào đây, Gateway sẽ luôn sử dụng nó bất kể bạn nhập gì trên giao diện JanitorAI.

## 💡 Tác giả & Phát triển

- 👨‍💻 **Tác giả & Phát triển (Author):** AkimitsujiroVN | 📧 [**Email**](mailto:ebisudakk20607@gmail.com) | 🌐 [**Facebook**](https://www.facebook.com/akimitsujirovn/)
- Vận hành bởi mạng lưới máy tính tình nguyện tuyệt vời [AI Horde](https://stablehorde.net/).
- Xây dựng nhằm nâng tầm trải nghiệm cho cộng đồng [JanitorAI](https://janitorai.com).

## 📄 Giấy phép (License)
Dự án được phân phối dưới giấy phép MIT License.
