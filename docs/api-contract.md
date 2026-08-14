# API contract

Base URL: same origin (`/api/...`). Frontend Vite proxies `^/api/` to the ASP.NET host.

**Conventions:** controller-based routes, GET-only catalog, JSON camelCase, DTOs in `MebelOnline.Core/Models` (never EF entities).

Connection string is not in committed config (user secrets / environment). See `docs/database.md`.

Swagger UI: **`/swagger`** (Development only). SPA owns `/`.

## 1. Endpoints

ASP.NET routing is case-insensitive. Frontend uses lowercase.

### Products

#### `GET /api/products/latest`

- Auth: none
- Returns: `200` `ProductCardModel[]`
- Up to 12 products, **newest `Id` first** (`OrderByDescending(Id)`)
- Card fields only (no full image gallery)

#### `GET /api/products/{productId}`

- `{productId}`: int > 0
- `200` `ProductDetailsModel`
- `400` ProblemDetails if `productId` ≤ 0
- `404` ProblemDetails if missing (never a null body)

### Categories

#### `GET /api/categories/all`

- Hierarchy for home sidebar. Filters `HasProducts == true`. Up to 3 levels via `CategoryRevertedModel`.

#### `GET /api/categories/catalog`

- Top two levels for `/catalog` cards (`CategoryCatalogModel` with `subCategories`).

#### `GET /api/categories/{categoryId}`

- `200` `CategoryDetailsModel`
- `400` if `categoryId` ≤ 0
- `404` ProblemDetails if missing

```json
{
  "id": 34,
  "name": "Прямі дивани з нішею",
  "imageUrl": null,
  "parent": { "id": 30, "name": "Прямі дивани", "parent": { "id": 10, "name": "Дивани", "parent": null } },
  "children": []
}
```

#### `GET /api/categories/breadcrumbs/{productId}`

- Trail: Головна → Каталог меблів → ancestor categories → product
- Category URLs: `/catalog/{id}`; product URL: `/product/{id}`
- `404` if the product is missing

### Search

#### `GET /api/search`

Query (`SearchParamsModel`):

| Param | Type | Default | Behavior |
|-------|------|---------|----------|
| `searchString` | string? | null | Trimmed; whitespace = no text filter. LIKE on title, description, brand name, category name (+ descendants), attribute values, option color/material. Max length **100** (else 400) |
| `page` | int | **0** | 0-based `Skip(page * pageSize)`. Must be ≥ 0 |
| `pageSize` | int | **12** | **1–48** (else 400) |
| `sortBy` | `SortBy` | `Ascending` | `Ascending`=price asc, `Descending`=price desc, `Name`=title; **`Id` tie-breaker** |
| `minPrice` / `maxPrice` | decimal? | null | Inclusive |
| `selectedBrands` | string[]? | null | Match `Brand.Name` (repeat query key or comma-separated) |
| `selectedMaterials` | string[]? | null | Match attribute values where attribute name is `"Матеріал"` |
| `categoryId` | int? | null | Restrict to that category **and descendants**. Must be ≥ 1 if sent |

Returns `PagedResultModel<ProductCardModel>`: `items`, `page`, `pageSize`, `totalCount`, `totalPages`.

Listing items are **cards only** (`id`, `title`, `price`, `oldPrice`, `imageUrl`). Missing primary image → `imageUrl` null, not 500.

#### `GET /api/search/sidebar`

Same query shape and validation. Returns `{ minPrice, maxPrice, brands[], materials[] }` for the filtered set.

## 2. DTO shapes

### `ProductCardModel`

`id`, `title`, `price`, `oldPrice?`, `imageUrl?`

### `ProductDetailsModel`

`id`, `title`, `description`, `price`, `oldPrice?`, `width?`, `height?`, `depth?`, `note?`, `brand? { name, description }`, `category? { id, name }`, `frontOptions[]`, `frameOptions[]`, `images[]`, `attributes[]`

Option: `{ colorName, material?, imageUrl }`. Image: `{ url, isPrimary }`. Attribute: `{ key, value }`.

### Categories

- `CategoryRevertedModel`: `id`, `name`, `childrenCategories[]`
- `CategoryCatalogModel`: `id`, `name`, `imageUrl`, `subCategories[]`
- `CategoryBreadcrumbModel`: `name`, `url`
- `CategoryDetailsModel`: `id`, `name`, `imageUrl`, `parent?`, `children[]`

## 3. Errors

ASP.NET `ProblemDetails` / `ValidationProblemDetails`:

- `400` validation (page, pageSize, search length, ids ≤ 0)
- `404` missing product or category
- `500` unhandled (no SQL/exception details in the body)

Users table is not exposed.

## 4. Example: search

`GET /api/search?searchString=диван&page=0&pageSize=12&sortBy=Ascending&minPrice=1000&maxPrice=50000&selectedBrands=Blest&selectedMaterials=Велюр&categoryId=10`

## 5. Not in Phase 1

- POST/PUT/DELETE, cart, checkout, auth, wishlist
- Elasticsearch
- Slug routes / `GET /api/products/{slug}`
