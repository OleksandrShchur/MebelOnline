# Test strategy (Phase 1)

**Status (Phase F):** executed 2026-08-14. Backend xUnit, frontend Vitest, Playwright (mocked API), and a live GET smoke against LocalDB `MebelOnline_PhaseBC_Test`.

## Goals

- Lock catalog read APIs (pagination, filters, 404, validation).
- Prevent regressions in search-by-category vs search-by-text.
- Cover Ukrainian-critical UI paths without claiming a live-SQL browser suite.
- Do not test out-of-scope commerce.

## Layers

### 1. Backend unit (`MebelOnline.Core.Tests`)

xUnit. Mapper / validation / category hierarchy. Does not require SQL Server.

### 2. API integration (`MebelOnline.Server.Tests`)

`WebApplicationFactory` against LocalDB database **`MebelOnline_PhaseBC_Test`**. Skips if LocalDB is unavailable (`LocalDbFact`).

| Case | Expect |
|------|--------|
| `GET /api/products/{id}` missing | 404 ProblemDetails |
| `GET /api/products/latest` | 200 DTO array |
| `GET /api/search` `pageSize=500` | 400 |
| `GET /api/search` `searchString` 101 chars | 400 |
| `GET /api/search?categoryId=` | that subtree + descendants |
| `GET /api/categories/{id}` missing | 404 |
| Response JSON | camelCase DTO fields only |

No authentication tests (no auth).

### 3. Frontend unit (Vitest + Testing Library)

Run from `mebelonline.client`: `npm test` (mocked API, no SQL Server).

Covers navigation, `categoryId` vs `searchString`, filter preserve, 404 pages, грн formatting, gallery keyboard attributes, no cart/favorites.

### 4. Playwright e2e (mocked API)

`mebelonline.client/e2e/anonymous-flows.spec.ts` intercepts `/api/*`. **Does not need SQL Server.**

```
cd mebelonline.client
npm install
npx playwright install chromium
npm run test:e2e
```

Vite is started on HTTP `:5174`. Default project is Chromium only.

### 5. Live API smoke (this pass)

ASP.NET host with `ConnectionStrings__DefaultConnection` pointing at `MebelOnline_PhaseBC_Test` (environment variable, not committed). GETs exercised with `curl` on `http://127.0.0.1:5055`. This is **API-only**; the SPA was not driven against that host in a browser.

### 6. Data scripts

`001`–`007` applied on the test database (existing from Phase B/C). `Products.Name` is absent; `Title`, `Note`, `OptionType` present. Attribute **Матеріал** seeded.

## What not to automate in Phase 1

- Visual pixel match vs the preview site.
- Load tests at 1000 products.
- Elasticsearch.
- Users/password seed.
- Full device lab (360 through 1920). Playwright ran Chromium desktop + one 390×844 case; other sizes are CSS/code review.

## Results (2026-08-14)

| Suite | Result |
|-------|--------|
| `dotnet test` Core.Tests | **29 passed** |
| `dotnet test` Server.Tests (LocalDB) | **30 passed** |
| `npm test` (Vitest) | **37 passed** (19 files) |
| `npm run lint` | 0 errors, 3 react-refresh warnings |
| `npm run build` | **succeeded** (`tsc -b && vite build`) |
| `npm run test:e2e` | **7 passed** (mocked API) |
| Live SQL API smoke | **passed** on `MebelOnline_PhaseBC_Test` |
| CI | **none** in repo |

## Definition of done for tests

AC-24 is met: backend integration for search limits + product 404 + category listing, plus frontend tests on navigation/filter preserve. CI is still absent.
