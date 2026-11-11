## 2024-05-24 - HTTP Keep-Alive for API Polling
**Learning:** The application polls the AI Horde API every 2 seconds, causing high TCP/TLS handshake overhead for every request.
**Action:** Use a custom top-level Axios instance configured with `http.Agent({ keepAlive: true })` and `https.Agent({ keepAlive: true })` to reuse connections, which significantly reduces network overhead. The instance must be created globally to prevent memory leaks.
