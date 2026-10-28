## 2024-03-24 - KeepAlive for Repeated Polling
**Learning:** Repeatedly polling an external API (like AI Horde's status endpoint) creates significant TLS overhead and TCP connection setup delays if connections are not reused.
**Action:** Use a custom Axios instance configured with an `http.Agent` and `https.Agent` with `{ keepAlive: true }` to optimize connection reuse and skip TLS overhead when repeatedly polling.
