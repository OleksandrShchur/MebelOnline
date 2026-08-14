# Test cases (Phase 1)

Anonymous catalog only. No cart, checkout, accounts, or admin.

**Layers:** Vitest (mocked fetch), Playwright Chromium (mocked `/api/*`), xUnit against LocalDB `MebelOnline_PhaseBC_Test`. Playwright does **not** prove live SQL.

## Home and chrome

| ID | Case | Expect | Evidence |
|----|------|--------|----------|
| TC-01 | Open `/` | `lang=uk`; nav Головна / Каталог / Пошук; heading **Новинки** | Vitest `home.test.tsx`; Playwright browse |
| TC-02 | Latest products | Up to 12 cards; title; грн; missing primary image does not crash | API `GET /api/products/latest` live smoke (id 32 `imageUrl` null, 200); Vitest cards |
| TC-03 | Category nav | Items go to `/catalog/{id}`; mobile drawer lists categories | Vitest sidebar/header; Playwright mobile |
| TC-04 | Document language/title | `index.html` `lang=uk`; title «MebelOnline — меблі онлайн» | Inspected `index.html`; Playwright `lang=uk` |

## Catalog

| ID | Case | Expect | Evidence |
|----|------|--------|----------|
| TC-05 | `/catalog` | Top-level cards with name/image and child names | Vitest `catalog.test.tsx`; live `GET /api/categories/catalog` 200 |
| TC-06 | Card / «Показати всі...» | Navigates to `/catalog/{id}` not `searchString=name` | Vitest `catalogCard.test.tsx` |
| TC-07 | `/catalog/{id}` | Products for id + descendants; unknown id → 404 UI + API 404 | Vitest category listing; live `/api/categories/34`; Playwright 999 |
| TC-08 | Category listing query | Sends `categoryId`, not category name as `searchString` | Vitest `categoryListing.test.tsx` |

## Search and filters

| ID | Case | Expect | Evidence |
|----|------|--------|----------|
| TC-09 | Header Enter | `/search?searchString=...&page=0&pageSize=12` | Vitest headerSearch; Playwright browse |
| TC-10 | `searchString` > 100 | API 400 ProblemDetails; UI clamps to 100 | Live smoke 101 chars → 400; Vitest clamp |
| TC-11 | Apply filters | Keeps `searchString` / `categoryId` | Vitest listingControls/searchQuery; Playwright filters |
| TC-12 | Material | Attribute name **Матеріал** | Seed + live `selectedMaterials=Велюр`; UI label |
| TC-13 | Paging/sort | Default page 0; pageSize 1–48 else 400; sort + Id tie-break | Server.Tests; Playwright page=1 |
| TC-14 | Zero hits | Empty state, not blank page | Playwright search miss; Vitest search |

## Product details

| ID | Case | Expect | Evidence |
|----|------|--------|----------|
| TC-15 | `/product/{id}` | Title, грн, oldPrice strike, gallery, см, attributes, Note, brand | Vitest PDP; live product 25; Playwright PDP |
| TC-16 | Options | Колір фасаду / Колір корпусу; swatch is local state only | Vitest productOptions; no write APIs in repo |
| TC-17 | Unknown product | 404 ProblemDetails + «Товар не знайдено» | Server.Tests; Playwright |
| TC-18 | Breadcrumbs | Головна → Каталог → `/catalog/{id}` → product | Live breadcrumbs/25; Vitest nested parents |

## Quality

| ID | Case | Expect | Evidence |
|----|------|--------|----------|
| TC-19 | GET hygiene | DTOs, AsNoTracking, CancellationToken | Inspected services/controllers |
| TC-20 | Errors | ProblemDetails; no SQL in body | Live 404 `application/problem+json` |
| TC-21 | Ukrainian UI | No language switcher | Header/pages inspected; Playwright |
| TC-22 | No commerce | No cart/login/checkout/favorites | Grep + Playwright count 0 |
| TC-23 | Responsive | Usable at phone and desktop breakpoints | Code review + Playwright 390×844; **no device lab** |
| TC-24 | Automated tests | Backend search limits + 404 + category; frontend critical path | Core 29 + Server 30 + Vitest 37 + Playwright 7 |

## Data

| ID | Case | Expect | Evidence |
|----|------|--------|----------|
| TC-25 | SQL Server start | Connection via env/user secrets; no `EnsureCreated()` | Inspected Program.cs; live host on test DB |
| TC-26 | Schema | `Title`/`Note`/`OptionType`+`Material`; no `Products.Name` | sqlcmd on `MebelOnline_PhaseBC_Test` |
