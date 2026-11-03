## 2023-11-03 - Missing Keep-Alive Connection Polling
**Learning:** Polling an external API every few seconds without HTTP keep-alive results in recreating TCP connections and TLS handshakes on every single request, leading to massive unnecessary latency and CPU overhead.
**Action:** Always configure a custom `axios` instance with `http.Agent` and `https.Agent` set to `{ keepAlive: true }` when repeatedly polling an API or making high-frequency external requests.
