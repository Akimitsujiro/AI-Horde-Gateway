## 2023-10-30 - Reuse connections for frequent polling to skip TLS overhead
**Learning:** The gateway frequently polls the AI Horde API to check the generation status. Without connection keep-alive, each polling request triggers a new TLS handshake, causing significant overhead.
**Action:** Use a custom Axios instance configured with `http.Agent` and `https.Agent` (both `{ keepAlive: true }`) to optimize connection reuse and skip TLS overhead when repeatedly polling APIs.
