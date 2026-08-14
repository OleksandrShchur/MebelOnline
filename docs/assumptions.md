# Assumptions (Phase 1)

These assumptions were **approved** for Phase B/C (2026-08-14). They are the working contract for the backend.

## Product

1. Phase 1 is a **public, read-only** Ukrainian furniture catalog. No cart, checkout, payments, orders, accounts, login, admin, CMS, SEO program, analytics, or i18n beyond Ukrainian.
2. Catalog size is about **1000 products**. SQL `LIKE` search is acceptable now. Elasticsearch is out of scope.
3. Currency is **UAH only**. `Products.Price` / `OldPrice` are hryvnia. No currency column.
4. All rows in `Products` are visible. There is no availability flag.
5. “Styles” means **фасад/корпус color options** (`ProductOptions.OptionType` Front/Frame) **and** the SQL `Material` column on the same table, plus **EAV attributes**. Not a furniture-design-style taxonomy.
6. Dimensions are centimeters (UI labels `см`).
7. Contact/messenger details on the reference landing are **static copy**, not a CMS.
8. Favorite/wishlist icons are **hidden by the frontend**. Backend must not add wishlist APIs.
9. Product administration is out of scope; data is loaded into SQL Server via numbered scripts.

## Architecture / process

10. **SQL Up scripts are the source of truth.** `EnsureCreated()` is removed. Schema changes need SQL Up/Down + entity alignment. Apply order: `docs/database.md`.
11. Routing stays **ID-based**: `/`, `/catalog`, `/catalog/:categoryId`, `/search`, `/product/:productId`. No slug columns, no `/uk/...` routes.
12. Existing API controller names and GET catalog/search/product endpoints are preserved and extended, not replaced.
13. APIs return DTOs only, never EF entities.
14. `Users` remains unused. Table is not deleted and not expanded. Auth is not built. Seed does not insert plaintext passwords.
15. English Electronics/Fashion seed is replaced with Ukrainian furniture categories and demo products.
16. Images remain **URL strings**.
17. Connection string lives in **user secrets / environment**, not in git.
18. Frontend stays React + MUI + Vite hosted by ASP.NET SpaProxy / static files.
19. Ukrainian UI copy is hardcoded (no i18n framework) for Phase 1.

## Approved defaults

| Topic | Decision |
|-------|----------|
| Page index | **0-based**. `SearchParamsModel.Page` default **0** |
| Default page size | 12 |
| Max page size | 48 |
| Max search string length | 100 |
| Latest products count | 12, newest `Id` first |
| Category product listing | Search API + `categoryId` (self + descendants) |
| Sort | `SortBy` price asc/desc, name; stable `Id` tie-breaker |
| 404 / 400 | JSON ProblemDetails |
| Read queries | `AsNoTracking()` + `CancellationToken` |
| Material attribute name | Ukrainian `"Матеріал"` in DB and C# |
| ProductOptions | **Keep both** SQL `Material` and EF `OptionType` (tinyint) |
| Products.Note | Column exists in SQL and on the entity |
| Availability / category active / sort / slugs | **Not added** in Phase 1 |
| Swagger | `/swagger` (does not steal SPA `/`) |

## Explicitly not assumed

- A populated production database already matches these scripts.
- Elasticsearch, Redis, or a CDN is available.
- Phase 1 frontend (D–F) is complete.
