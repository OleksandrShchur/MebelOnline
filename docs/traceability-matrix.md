# Traceability matrix (Phase 1)

Maps requirements → stories → acceptance criteria → actual/proposed technical hooks. Empty cells mean “not in current code; planned.”

| REQ | Stories | AC | Routes | API | Data fields |
|-----|---------|----|--------|-----|-------------|
| REQ-01 Home | US-01, US-04, US-13 | AC-01, AC-02, AC-03, AC-04 | `/` | `GET /api/categories/all`, `GET /api/products/latest` | `Categories.*`, `Products.Title/Price/OldPrice`, `ProductImages` |
| REQ-02 Catalog overview | US-02 | AC-05, AC-06 | `/catalog` | `GET /api/categories/catalog` | `Name`, `ImageUrl`, `ParentCategoryId` |
| REQ-03 Category listing | US-03, US-04 | AC-07, AC-08 | `/catalog/:categoryId` | `GET /api/search?categoryId=`, `GET /api/categories/{id}` | `Categories.Id`, `Products.CategoryId` |
| REQ-04 Text search | US-05 | AC-09, AC-10, AC-14 | `/search` | `GET /api/search` | `Title`, `Description`, `Brand.Name`, `Categories.Name`, `ProductAttributeValues.Value` |
| REQ-05 Filters | US-06, US-07 | AC-11, AC-12, AC-13 | `/search`, `/catalog/:id` | `GET /api/search`, `GET /api/search/sidebar` | `Price`, `Brands.Name`, material attribute `Value` |
| REQ-06 PDP | US-08, US-09 | AC-15, AC-16, AC-17 | `/product/:productId` | `GET /api/products/{id}` | images, dimensions, attributes, `Note`, `Brand`, `ProductOptions` |
| REQ-07 Breadcrumbs | US-10 | AC-18 | PDP + category | `GET /api/categories/breadcrumbs/{productId}`; category page walks nested `parent` | `ParentCategoryId` chain |
| REQ-08 UAH | US-11 | AC-02, AC-15 | all product UIs | price decimals as-is | `Price`, `OldPrice` (no currency column) |
| REQ-09 Read-only | US-15 | AC-22 | — | GET only | no writes |
| REQ-10 Responsive + visual | US-13, US-12 | AC-03, AC-23 | all | — | — |
| REQ-11 SQL catalog | — | AC-25, AC-26 | — | DbContext | existing tables |
| REQ-12 API safety | US-15 | AC-10, AC-13, AC-19, AC-20 | — | ProblemDetails, limits | — |
| REQ-13 Tests | — | AC-24 | — | Core.Tests, Server.Tests, Vitest, Playwright | — |
| REQ-14 Identity/contacts | US-12 | AC-04 | footer | none | static copy (placeholder) |
| NFR-01 Stack | — | — | — | net9.0, React 18, SQL Server | — |
| NFR-02 DB-first | — | AC-25, AC-26 | — | SQL scripts | schema alignment |
| NFR-03 Preserve shapes | — | — | keep `/catalog`, `/search`, `/product/:id` | keep existing GET paths | — |
| NFR-04 Read hygiene | US-15 | AC-19 | — | AsNoTracking, CT | — |
| NFR-05 Limits | US-07 | AC-10, AC-13 | — | pageSize, search length | — |
| NFR-06 Search path | US-05 | — | — | LIKE now; FTS/ES later | — |

## Coverage after B–F

Planning gaps from Phase A (no `/catalog/:id`, search-by-name breadcrumbs, missing tests) are closed. Remaining residuals: `docs/qa-defects.md` (English `MebelOnline` DB, no CI, placeholder contacts, mocked Playwright).

Favorites and `Users` stay out of this matrix (`docs/out-of-scope.md`).
