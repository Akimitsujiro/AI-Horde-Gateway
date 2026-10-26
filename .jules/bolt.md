## 2024-10-26 - Node.js Axios Polling Keep-Alive
**Learning:** In Node.js, `axios` does not use HTTP Keep-Alive by default. This causes a new TCP connection and TLS handshake for every single request. In applications that poll an API frequently (like checking job status every 2 seconds), this overhead is very significant (adding 100s of ms per request depending on network).
**Action:** When polling or making frequent requests to the same origin using Axios in Node.js, always explicitly configure an `https.Agent` with `keepAlive: true` and pass it to the Axios instance.
