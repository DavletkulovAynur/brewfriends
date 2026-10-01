# Copilot Code Review Instructions

Review only the changes in the pull request, together with the surrounding code needed to understand their behavior. Prioritize concrete bugs, security vulnerabilities, data loss, broken authorization, and regressions over style preferences.

## Security Review

- Verify Telegram `initData` or authentication payloads are cryptographically validated on the server, including the expected bot secret and any applicable freshness or replay protections. Never trust client-provided user identity or authorization claims.
- Check every API route for input validation, authentication, authorization, safe error responses, and protection against accessing or changing another user's data.
- Inspect session creation, cookie or token handling, expiration, signing, and secret usage. Flag hardcoded credentials, tokens, private keys, or sensitive values in source, logs, and client bundles.
- Review database queries and mutations for tenant or user isolation, unsafe interpolation, missing constraints, and unintended exposure of personal data.
- Check external URLs, redirects, webhook handling, file handling, and any use of dynamic code or HTML for injection and SSRF risks.

## Correctness and Tests

- Follow data from the route or component boundary through services and repositories to verify assumptions and error handling.
- Look for null, malformed input, empty state, race condition, timezone, and failure-path bugs.
- Check that new or changed behavior has focused tests. Do not require tests for purely presentational changes when there is no meaningful behavior to exercise.
- Treat existing CI checks as evidence, not proof that a change is correct. Consider cases the current tests do not cover.

## Review Output

Report only actionable findings. For each finding include:

1. Severity: critical, high, medium, or low.
2. File and relevant line or symbol.
3. The concrete problem and why it matters.
4. A concise remediation suggestion.

Do not report formatting preferences as findings. If there are no actionable findings, say so clearly and mention any meaningful testing gaps or assumptions.