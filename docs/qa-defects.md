# QA defects (Phase 1)

## Fixed in this integration pass

| ID | Severity | Summary | Resolution |
|----|----------|---------|------------|
| QA-01 | Medium | Frontend `CategoryDetailsModel.parent` was a single `{id,name}` while the API returns a nested `parent.parent` chain. Category breadcrumbs could drop grandparents if the nav tree (`HasProducts`) had not loaded. | Walk nested parents from `GET /api/categories/{id}`; Vitest covers `/catalog/10` → `/catalog/30` → leaf. |
| QA-02 | Low | Frontend option/product DTOs omitted optional `material` and `category` fields the API already returns. Runtime ignored extras; types were wrong. | Types aligned. UI still uses attributes for Матеріал and breadcrumbs API for PDP trail. |
| QA-03 | Low | Playwright `/api/search**` mock overrode `/sidebar`, so filter checkboxes never appeared in new e2e. | Single search route handler dispatches sidebar vs listing. |

## Open / residual (in scope, not blockers for a catalog demo)

| ID | Severity | Summary | Notes |
|----|----------|---------|-------|
| QA-04 | Medium | LocalDB database **`MebelOnline`** still has EnsureCreated-era **English** categories (`Furniture`, `Electronics`, …). Phase 1 scripts were **not** applied to it. | Use `MebelOnline_PhaseBC_Test` or recreate `MebelOnline` yourself from `001`–`007`. Do not drop unknown live data from automation. |
| QA-05 | Low | `HasProducts` is set only on categories that **directly** contain products (`006`). Ancestors stay 0. Home sidebar still builds via parent Includes. | Catalog overview lists all top-level categories regardless. Empty categories show the empty listing state. |
| QA-06 | Low | ESLint `react-refresh/only-export-components` on carousel helpers and `categoriesContext`. | 3 warnings, 0 errors. Pre-existing pattern. |
| QA-07 | Low | Nullable-reference CS8618 warnings on entities/DTOs. | Build succeeds. Not a runtime catalog defect. |
| QA-08 | Low | Production JS chunk ~587 kB (gzip ~186 kB). Vite warns about size. | Acceptable for Phase 1; no code-splitting work in this pass. |
| QA-09 | Low | No CI workflow in the repository. | Tests exist locally only. |
| QA-10 | Low | Combined SPA + live SQL browser e2e was **not** run. Playwright mocks `/api`. | Live proof is xUnit + curl against the test DB. |
| QA-11 | Low | Responsive matrix beyond Chromium desktop and 390×844 is **code/CSS review**, not a device lab. | Documented in release-readiness. |

## Deferred (out of scope leftovers)

| ID | Item | Action |
|----|------|--------|
| DEF-01 | `Users` table (empty; no passwords) | Leave; no auth |
| DEF-02 | `UseAuthorization()` without authentication | Harmless no-op |
| DEF-03 | Placeholder phone/email/address/messenger hrefs | Static demo copy; not a chat backend |
| DEF-04 | `MebelOnline.Server.http` weatherforecast leftover | Ignore |
| DEF-05 | `@mui/styles` in package.json (unused) | Do not adopt |
| DEF-06 | Favorites | **Removed** from UI (not merely hidden) |
| DEF-07 | Header «Контакти» / «Про нас» routes | Removed from nav; footer has static copy |

## Closed by prior phases (verified)

- `EnsureCreated()` removed from startup.
- Search `categoryId` includes descendants.
- ProblemDetails 400/404; page 0 default; pageSize max 48; search ≤ 100.
- Breadcrumb URLs `/catalog/{id}`.
- Material attribute **Матеріал**.
- No POST/PUT/PATCH/DELETE catalog APIs (`POST /api/products` → 405).
