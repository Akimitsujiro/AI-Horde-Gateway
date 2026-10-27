## 2024-05-16 - Prevent Request Body DoS, Enforce Type Validation, and Prevent Error Leakage
**Vulnerability:** The application was vulnerable to payload DoS due to no limits on `express.json()`, potential breaking logic bugs on invalid `messages` type inputs, and potential leakage of internal error data within the 500 response catch block.
**Learning:** These types of security best practices are often missed during initial implementation or prototyping of Express.js APIs.
**Prevention:** Always add payload size limits to Express body parsers (like `express.json({ limit: '1mb' })`), validate input types proactively on critical request endpoints, and return generic error messages to clients while logging details server-side.
