## 2024-10-30 - Prevent Error Leakage via Error Responses
**Vulnerability:** Error details (like stack traces or internal API responses) could leak sensitive information if passed back to the user in HTTP 500 responses.
**Learning:** Using `error.message` directly in the error response might inadvertently expose internal details if the error originates from internal services or libraries.
**Prevention:** Sanitize error messages returned to the user, providing generic messages for unexpected server errors while logging the detailed internal errors server-side.

## 2024-10-30 - Prevent Application Crashes from Unvalidated Input
**Vulnerability:** The `messages` array from the incoming request body was used directly in iteration (`for const msg of messages`) without validating that it is an array. This could lead to a server crash if a client sent a string or object for `messages`.
**Learning:** Even internal gateway applications need robust input validation because unhandled input types can cause crashes (Denial of Service). Manual type checking using `Array.isArray()` is required when lacking external schema validation dependencies.
**Prevention:** Always validate the type of incoming data before using it, especially when iterating over it or using array methods.
