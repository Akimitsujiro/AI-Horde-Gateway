## 2026-10-27 - Optimize HTTP Keep-Alive for Polling
**Learning:** Repeatedly polling an external API in a `while` loop without keep-alive enabled creates significant overhead due to constant TCP/TLS handshakes.
**Action:** Always configure an `https.Agent({ keepAlive: true })` for `axios` instances that make frequent or recurring requests to the same host.
