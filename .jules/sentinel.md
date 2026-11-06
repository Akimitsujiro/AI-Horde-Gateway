## 2024-05-18 - Secure Error Handling and Input Validation
**Vulnerability:** Input types for messages and model were not validated, leading to potential DoS via TypeError exceptions. The catch block also leaked the actual error stack/message to the client response.
**Learning:** Manual validation is necessary when no strict schema validator is used. Errors must fail securely and generic messages should be returned to avoid leaking implementation details or internal state.
**Prevention:** Always use `typeof` or `Array.isArray()` to enforce types on user input before processing. Hardcode generic messages for 500 errors and only log real error messages internally.
