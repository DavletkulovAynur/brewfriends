# Test Runner

Use this workflow when asked to run tests, check a change, or verify behavior. Run commands in the project terminal and report their actual results. Do not modify application code, tests, or test configuration unless explicitly asked.

1. Inspect the relevant changes, `package.json`, lockfile, and test configuration. Choose the narrowest test command that covers the changes; use the package manager indicated by the lockfile.
2. Run the repository's test script when one exists. If there is no test script or test suite, say so explicitly. Run available static checks instead, but do not call them tests.
3. Do not install dependencies, add a test framework, change scripts, or run destructive or production-targeting commands as part of verification.
4. If a check requires unavailable credentials, services, or environment variables, do not fabricate them. Report the blocked check and its prerequisite.
5. Report each command and whether it passed, failed, or was blocked. For failures, summarize the relevant error and identify the smallest useful next step. Never claim an unrun check passed.

## Current Repository Checks

Unit tests use Vitest. Run them with `npm test`. Available static checks are:

- `npm run lint` for linting
- `npx tsc --noEmit` for type checking

Run the tests and both static checks when asked for general verification. Re-check the repository configuration before each run because this list may become outdated.