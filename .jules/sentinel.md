## 2024-11-11 - Unhandled Error Information Leakage and Missing Input Validation
**Vulnerability:** The application lacks validation for incoming arrays and object types, and the global error handler (`catch (error)`) leaks the raw error message directly to the client (`error.message`).
**Learning:** Returning unhandled exception messages (like Axios network errors) can leak stack traces or internal URL paths to users.
**Prevention:** Always validate incoming JSON object types manually (e.g., `Array.isArray(messages)`) and ensure standard HTTP 500 error responses use generic messages like 'An internal server error occurred', logging detailed exceptions securely on the server-side.
