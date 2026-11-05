## 2024-05-24 - Keep-Alive connection pooling for API Polling
**Learning:** Polling external APIs repeatedly in a loop without keep-alive enabled incurs significant TLS handshake and TCP connection setup overhead for every request.
**Action:** Always create a custom Axios (or fetch) instance using `http.Agent` and `https.Agent` with `{ keepAlive: true }` when writing code that polls the same endpoint repeatedly.
