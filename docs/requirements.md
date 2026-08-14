# Requirements (Product Owner)

**Product:** MebelOnline — public furniture catalog (Ukraine).  
**Phase:** 1 (read-only catalog). **Not complete.**  
**Language:** Ukrainian UI. **Currency:** UAH (₴ / грн).  
**Visual reference:** [preview.mebellanding.pages.dev](https://preview.mebellanding.pages.dev/) (design/interaction only). Home was reachable; nested paths returned 404 to the fetch tool (likely a single-page landing).

## Business goal

A visitor can browse furniture by category, search the catalog, and open a product page with photos, price, dimensions, attributes, and color options — then contact the shop via static messengers/phone. No purchase in the app.

## In-scope capabilities

| ID | Requirement |
|----|-------------|
| REQ-01 | Home page with Ukrainian chrome, category navigation, and a “Новинки” product strip. |
| REQ-02 | Catalog overview of top-level categories with images and subcategory names. |
| REQ-03 | Category product listing (filterable, paginated, sorted) using real `Categories.Id`, not name-as-search only. |
| REQ-04 | Full catalog search by text (title, description, brand, category, attribute values). |
| REQ-05 | Search/category filters: price range, brand, material. |
| REQ-06 | Product details: gallery, title, price and old price, dimensions (cm), attributes, note, brand, фасад/корпус color options. |
| REQ-07 | Breadcrumbs from home/catalog through categories to the product. |
| REQ-08 | Prices shown in UAH (`грн` or `₴`). No other currency. |
| REQ-09 | Read-only public access. No login. |
| REQ-10 | Responsive layout (mobile and desktop), aligned with the reference’s catalog feel (hero/categories/footer contacts as applicable). |
| REQ-11 | Data from existing SQL Server catalog (database-first). ~1000 products. |
| REQ-12 | Consistent API errors, pagination limits, and no leak of internal DB details. |
| REQ-13 | Automated tests covering catalog API and critical UI flows (see test strategy). |
| REQ-14 | Static shop identity: logo placeholder replaced when asset exists; footer contacts if details are provided. |

## Out of scope

See `docs/out-of-scope.md`. Cart, checkout, accounts, admin, SEO program, analytics, CMS, Elasticsearch, i18n beyond Ukrainian.

## Data fields we will use (existing)

Do not invent columns. Stories map to:

- Category: `Id`, `Name`, `ImageUrl`, `ParentCategoryId`, `HasProducts`
- Product: `Id`, `Title`, `Description`, `Price`, `OldPrice`, `CategoryId`, `Width`, `Height`, `Depth`, `BrandId`, `Note` (if SQL is aligned)
- Brand: `Name`, `Description`, `ImageUrl`
- Images: `Url`, `IsPrimary`
- Options: `ColorName`, `ImageUrl`, `OptionType` (Front/Frame) — after SQL/EF alignment
- Attributes: `ProductAttributes.Name`, `ProductAttributeValues.Value`

## Non-functional

| ID | Requirement |
|----|-------------|
| NFR-01 | ASP.NET Core 9 + React 18 + SQL Server, as in the repo. |
| NFR-02 | Database-first: SQL scripts drive schema; entities follow. |
| NFR-03 | Preserve existing route and API shapes; extend, do not rewrite. |
| NFR-04 | Cancellation tokens and no-tracking reads on catalog queries. |
| NFR-05 | Max page size and max search length enforced. |
| NFR-06 | Search remains in-process SQL/EF; document upgrade path only. |

## Success

A reviewer can run the SPA against a SQL Server database, browse Ukrainian furniture categories, search, open a product, and see UAH prices — without accounts or checkout. Phase 1 is **not** claimed done until Phases B–F are executed and accepted.
