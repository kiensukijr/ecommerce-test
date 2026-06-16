Playwright test structure for this project

- `pages/` — Page Objects (POM) for UI tests
- `lib/api/` — small ApiClient and AuthClient wrappers used by API tests
- `lib/db/` — DB helpers like `clearCollections` and `seedProducts`
- `fixtures/` — shared fixtures (re-exports `test` which includes DB connection)
- `specs/` — test suites: `ui/`, `api/`, `database/`, `ai/`

Run examples:

```bash
# Run all tests
npm test

# Run only database tests
npm run test:db

# Run a specific spec
npx playwright test tests-playwright/specs/api/routes.spec.ts
```

Notes:

- `fixtures/index.ts` exposes `createApiClient(request)` helper that builds an `ApiClient` instance.
- Extend the POM classes in `pages/` for UI flows.
