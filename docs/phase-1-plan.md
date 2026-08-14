# Phase 1 implementation plan

**Status:** Phases A–F executed. Catalog is implementation-complete for a Ukrainian read-only demo. See `docs/release-readiness.md` for the strict DoD (not a production-launch sign-off).

Visual reference: [https://preview.mebellanding.pages.dev/](https://preview.mebellanding.pages.dev/) — layout/interaction only.

---

## 0. Inspection snapshot

See `docs/architecture.md`. After B–F:

- SQL scripts are source of truth; `EnsureCreated()` removed
- Ukrainian furniture seed; `Products.Title`; `Note` + `OptionType` + `Material`
- GET APIs: `categoryId`, `GET /api/categories/{id}`, ProblemDetails, validation, `AsNoTracking`, cancellation
- SPA routes `/`, `/catalog`, `/catalog/:categoryId`, `/search`, `/product/:productId`; `lang=uk`; favorites removed
- xUnit (LocalDB) + Vitest + Playwright (mocked API)
- Swagger at `/swagger`
- Live `MebelOnline` DB was **not** recreated (English EnsureCreated seed remains)

---

## 1. Reuse vs build

| Reuse / complete | Build (new) | Correct | Defer |
|------------------|-------------|---------|--------|
| Controllers + services + mappers | `categoryId` search param + `/catalog/:categoryId` | Schema drift — **done in B** | Users/auth |
| Search + sidebar UI | Category page | Material `"Матеріал"` — **done** | Favorites (**removed** in D) |
| PDP layout, carousel, options | ProblemDetails, validation, 404 | `GetLatest` order; image NRE — **done** | Elasticsearch |
| Category catalog cards | Tests (backend + Vitest + Playwright) | Breadcrumb URLs → `/catalog/{id}` — **done** | SEO/CMS |
| MUI theme, header/footer shell | Connection via user secrets | SPA `Link` vs `href` — **done** | Admin |

---

## 2. Phases A–F

### Phase A — Discovery and planning — **done, approved**

### Phase B — Database-first alignment — **done**

1. SQL Server LocalDB exists; live `MebelOnline` DB was **not** mutated (EnsureCreated-era English seed). Test DB `MebelOnline_PhaseBC_Test` used for verification.
2. Scripts win; `EnsureCreated()` removed.
3. Schema: `Products.Note`, `ProductOptions.OptionType` tinyint **and** `Material`, FK `Products.CategoryId`, `ProductAttributeValues.Id` IDENTITY, justified indexes. Seed 006 uses `Title`. Down/001 drops all 8 tables.
4. Entities/Fluent aligned to SQL.
5. Apply order: `docs/database.md`.

### Phase C — API hardening and category listing — **done**

1. Existing GET routes kept.
2. `SearchParamsModel.CategoryId`; descendant filter.
3. `GET /api/categories/{id}` DTO; 404 if missing.
4. Validation: max page 48, max search 100, page ≥ 0, default page 0 / pageSize 12.
5. 404/400 ProblemDetails; no null product bodies.
6. `AsNoTracking`, `CancellationToken`, Id tie-break, latest = newest Id, primary image null-safe.
7. Breadcrumb URLs → `/catalog/{id}`.
8. Swagger at `/swagger`.

### Phase D — Frontend catalog completion — **done**

`/catalog/:categoryId`, `categoryId` on search, ProblemDetails client, Ukrainian chrome, favorites removed, breadcrumbs `/catalog/{id}`.

### Phase E — Tests — **done for Phase 1 layers**

Backend xUnit (Core 29 + Server 30 on LocalDB). Vitest 37. Playwright 7 mocked. No CI.

### Phase F — Polish / QA integration — **done (this pass)**

Contract alignment (nested category parent), live API smoke on test DB, QA docs, production build. Residual risks: `docs/qa-defects.md`.

---

## 3. Schema change rule

Existing tables preferred. If a change is required:

1. Explain why (blocker, not cosmetics).
2. `Up/00N_*.sql` + `Down` rollback.
3. Update entities/configs.
4. No admin/customer/order/cart tables.

---

## 4. Routing and API (short)

**Routes:** `/`, `/catalog`, `/catalog/:categoryId`, `/search`, `/product/:productId`.  
**Not in Phase 1:** `/uk/kategoriyi/...` (slugs rejected).

**API:** `docs/api-contract.md`.

---

## 5. Blocking questions — **answered**

1. SQL Server: LocalDB `MSSQLLocalDB`. Connection via user secrets / env, not git. Existing `MebelOnline` DB differs (EnsureCreated); recreate from scripts for a clean catalog.
2. **Scripts win.** `EnsureCreated()` removed.
3. ProductOptions: **keep both** `Material` and `OptionType`.
4. `Products.Note`: **add to SQL**.
5. URLs: **ID-based**, no slugs / `/uk`.
6. Page index: **0-based**.
7. Availability / category active / sort / slugs: **not added**.
8. Attribute names: Ukrainian `"Матеріал"`.
9. Contacts/About: unchanged (frontend/static; not backend).
10. Favorites: **hide** (frontend); no wishlist APIs.
11. Seed: **replaced** with Ukrainian furniture demo data.
12. `Users`: leave unused; plaintext seed removed.

---

## 6. Approval

Phase A documents were approved with the decisions above. Phase B and C follow them exactly.
