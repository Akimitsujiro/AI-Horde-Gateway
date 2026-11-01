## 2024-05-24 - AI Horde API Polling TLS Overhead

**Learning:** The application was polling the AI Horde API every 2 seconds using the default global `axios` instance. This caused unnecessary latency and CPU overhead because a new TCP connection was established and a full TLS handshake was performed on every single poll request.
**Action:** Created a custom `axios` instance using `http.Agent` and `https.Agent` configured with `{ keepAlive: true }` to reuse connections for the repeated polling loop, eliminating the TLS overhead per poll.
