# Routes

## 1. Current frontend routes (source of truth)

Defined in `mebelonline.client/src/App.tsx`. **No `/uk` prefix anywhere in the repo.**

| Path | Page | Data |
|------|------|------|
| `/` | Home | `GET /api/categories/all` + `GET /api/products/latest` |
| `/catalog` | Catalog grid | `GET /api/categories/catalog` |
| `/catalog/:categoryId` | Category products + filters | `GET /api/categories/{id}` + `GET /api/search?categoryId=` + sidebar |
| `/search` | Search + filters | `GET /api/search`, `GET /api/search/sidebar` |
| `/product/:productId` | Product details | `GET /api/products/{id}`, `GET /api/categories/breadcrumbs/{id}` |

Query string used on `/search` (and on `/catalog/:id` for listing controls):

`searchString`, `page` (0-based), `pageSize` (default 12, max 48), `sortBy`, `minPrice`, `maxPrice`, `selectedBrands`, `selectedMaterials`. Category pages put `categoryId` on the API call from the path, not the query string.

Category breadcrumbs from the API point at `/catalog/{id}`.

Header lists Головна, Каталог, Пошук. «Контакти» / «Про нас» are footer static copy, not routes.

## 2. Product-brief example (not implemented)

The Phase 1 brief suggested:

- `/uk`
- `/uk/kategoriyi`
- `/uk/kategoriyi/{categorySlug}`
- `/uk/poshuk?q={query}`
- `/uk/tovar/{productSlug}`

These **were not adopted.** Phase 1 URLs stay ID-based (`/catalog/:categoryId`, `/product/:productId`). No slug columns.

## 3. Final proposed Phase 1 route map

**Decision:** preserve existing conventions; category listing uses **integer ids**. `/uk/...` slugs were rejected.

| Path | Purpose | Ukrainian UI title (copy, not URL) |
|------|---------|-------------------------------------|
| `/` | Home: category menu + “Новинки” | Головна |
| `/catalog` | Category overview cards | Каталог меблів |
| `/catalog/:categoryId` | **New.** Products in that category (and descendants), with existing search filters | Категорія |
| `/search` | Full-text/catalog search | Пошук |
| `/product/:productId` | Product details | Товар |

### `/catalog/:categoryId`

- Loads category metadata + product grid (search API + `categoryId`).
- Breadcrumbs: Головна → Каталог меблів → ancestor names → current.
- Filters: price, brand, material (reuse search sidebar).
- Sort: existing `sortBy`.

### Search query (keep names)

`/search?searchString={q}&page=0&pageSize=12&sortBy=Ascending`

Optional: `minPrice`, `maxPrice`, `selectedBrands`, `selectedMaterials`.

Do **not** rename `searchString` → `q` unless the architect wants a breaking query-string change.

### Out of route map unless approved

- `/contacts`, `/about` — header links exist; default is **footer static contacts** on all pages (reference-site pattern), not new routes.
- `/uk/**` — Alternative B below.

## 4. Alternative B (requires approval)

If the architect mandates Ukrainian path segments and slugs:

| Path | Replaces |
|------|----------|
| `/uk` | `/` |
| `/uk/kategoriyi` | `/catalog` |
| `/uk/kategoriyi/{categorySlug}` | `/catalog/:categoryId` |
| `/uk/poshuk?q=` | `/search?searchString=` |
| `/uk/tovar/{productSlug}` | `/product/:productId` |

Requires: `Categories.Slug`, `Products.Slug` (unique, indexed), generation rules, redirects from old URLs, API-by-slug endpoints. **Not in Phase 1 unless approved.**

## 5. Backend routes

See `docs/api-contract.md`. SPA fallback: `MapFallbackToFile("/index.html")` so unknown paths serve the React app (except `/api/*`).
