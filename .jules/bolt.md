## 2024-11-08 - Axios Keep-Alive Connection Reuse
**Learning:** Using a custom Axios instance configured with `http.Agent` and `https.Agent` (both `{ keepAlive: true }`) optimizes connection reuse and skips TLS overhead when repeatedly polling APIs.
**Action:** When making frequent HTTP requests to the same origin, especially in polling loops, use persistent keep-alive connections to reduce handshake overhead.
