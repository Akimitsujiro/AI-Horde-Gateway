## 2026-10-29 - [Keep-Alive for API Polling Loop]
**Learning:** [The application performs repeated polling in a loop (`while (!isDone)`) using `axios.get` without connection reuse. This causes unnecessary repeating of TLS handshakes during the 2-second polling loop against the AI Horde API.]
**Action:** [Use `keepAlive: true` via custom `http.Agent` and `https.Agent` in a custom Axios instance to reuse the connection and avoid repeating TLS handshakes during repeated polling.]
