## 2024-05-18 - Information Exposure via Error Messages
**Vulnerability:** The application was exposing detailed error messages (including underlying dependency exceptions) directly to clients via the `error.message` field in the 500 server error response.
**Learning:** Detailed error messages can inadvertently leak internal architecture details, paths, or database schemas. They should be logged securely on the server but never exposed to the client.
**Prevention:** Always implement a centralized error handler or generic error response (e.g., "An internal server error occurred") for all unhandled exceptions, mapping specific errors to appropriate HTTP status codes when safe.
