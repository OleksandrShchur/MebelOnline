# Architecture findings (as inspected)

**Status:** Phases A–F executed (2026-08-14). Catalog APIs covered by LocalDB integration tests and a live GET smoke on `MebelOnline_PhaseBC_Test`.

**Date:** 2026-08-14

## 1. Solution structure

| Project | Path | Target | Role |
|---------|------|--------|------|
| `MebelOnline.Server` | `MebelOnline.Server/` | net9.0 | ASP.NET Core host: controllers, Swagger at `/swagger`, SPA proxy, static files |
| `MebelOnline.Core` | `MebelOnline.Core/` | net9.0 | Services, DTOs (`Models`), mappers, helpers |
| `MebelOnline.Db` | `MebelOnline.Db/` | net9.0 | EF Core `AppDbContext`, hand-written entities, Fluent configs, SQL scripts |
| `MebelOnline.Core.Tests` | `MebelOnline.Core.Tests/` | net9.0 | xUnit mapper/validation/hierarchy tests |
| `MebelOnline.Server.Tests` | `MebelOnline.Server.Tests/` | net9.0 | xUnit + WebApplicationFactory against LocalDB |
| `mebelonline.client` | `mebelonline.client/` | React 18 + Vite 6 | Public SPA |

## 2. Backend

### 2.1 Host (`Program.cs`)

- Controllers only (no minimal APIs).
- DI: five `IMappingService<,>` singletons, `IMapper` singleton, three scoped services (`ICategoryService`, `IProductService`, `ISearchService`), `AppDbContext` scoped.
- SQL Server via `UseSqlServer(GetConnectionString("DefaultConnection"))` (user secrets / environment; see `docs/database.md`).
- Startup does **not** call `Database.EnsureCreated()`. Apply `Migrations/Up` scripts manually.
- Middleware: ProblemDetails, exception handler, status code pages, default files, static files, HTTPS redirection (skipped in `Testing`), `UseAuthorization()` with **no authentication configured**, `MapControllers()`, `MapFallbackToFile("/index.html")`.
- Development: Swagger UI at **`/swagger`**. SPA owns `/`.

### 2.2 API surface

All endpoints are GET. Prefix: `api/[controller]` (ASP.NET default; frontend calls lowercase).

| Controller | Route | Returns |
|------------|-------|---------|
| `ProductsController` | `GET api/Products/latest` | `IEnumerable<ProductCardModel>` |
| `ProductsController` | `GET api/Products/{productId:int}` | `ProductDetailsModel` |
| `CategoriesController` | `GET api/Categories/all` | `IEnumerable<CategoryRevertedModel>` |
| `CategoriesController` | `GET api/Categories/breadcrumbs/{productId:int}` | `IEnumerable<CategoryBreadcrumbModel>` |
| `CategoriesController` | `GET api/Categories/catalog` | `IEnumerable<CategoryCatalogModel>` |
| `CategoriesController` | `GET api/Categories/{categoryId:int}` | `CategoryDetailsModel` (404 if missing) |
| `SearchController` | `GET api/Search` | `PagedResultModel<ProductCardModel>` |
| `SearchController` | `GET api/Search/sidebar` | `SearchSidebarModel` |

Missing product/category → **404 ProblemDetails**. Invalid paging/search → **400 ProblemDetails**. `CancellationToken` on all GETs.

### 2.3 Services and data access

There is **no repository layer**. Services inject `AppDbContext` directly.

| Service | Behavior |
|---------|----------|
| `ProductService` | Latest: `AsNoTracking`, newest `Id` first, `Take(12)`. Details: Brand, Category, Options, Attributes→Attribute, Images. Null if missing. |
| `CategoryService` | Hierarchy `HasProducts`; catalog two levels; breadcrumbs `/catalog/{id}`; `GetCategoryByIdAsync`. |
| `SearchService` | Text + options/attributes; `categoryId` descendants; price/brand/`Матеріал`; sort + Id tie-break; page 0 / size 1–48. |

**Reads use `AsNoTracking()` and `CancellationToken`.** Search supports `categoryId` (self + descendants) and Id tie-break sorting.

**N+1 / query-cost risks:** correlated `ProductAttributeValues.Any(...)` and `ProductOptions.Any(...)` in search; sidebar rebuilds the product query several times. Acceptable for ~1000 rows.

### 2.4 Mapping

Custom `IMapper` / `IMappingService<TSource,TTarget>` (not AutoMapper). Registered mappers:

- `CategoryModelMapper`
- `ProductCardModelMapper` (missing primary image → `imageUrl` null, no throw)
- `ProductDetailsModelMapper` (splits options into Front/Frame by `ProductOptionTypeEnum`)
- `CategoryBreadcrumbMapper` (**registered, unused**; breadcrumbs come from `CategoryTransformer`)
- `CategoryCatalogModelMapper`

### 2.5 Connection and secrets

- `appsettings.json` and `appsettings.Development.json`: logging only. **No committed `ConnectionStrings`.**
- `UserSecretsId` is set on the Server csproj. See `docs/database.md`.
- `launchSettings.json` profiles `https` (ports 7087 / 5211) and IIS Express. SpaProxy via `ASPNETCORE_HOSTINGSTARTUPASSEMBLIES`.
- `MebelOnline.Server.http` still calls `/weatherforecast/` (template leftover).

### 2.6 Packages (Server)

- `Microsoft.AspNetCore.OpenApi` 9.0.0
- `Microsoft.AspNetCore.SpaProxy` 9.*-*
- `Microsoft.EntityFrameworkCore.SqlServer` 9.0.4
- `Swashbuckle.AspNetCore` 8.1.1

Db project also references EF Core 9.0.4 + Design.

## 3. Frontend

| Item | Finding |
|------|---------|
| React | `^18.3.1` |
| TypeScript | `~5.8.3` |
| Vite | `^6.3.5`, HTTPS port **51347**, proxies `^/api/` to `https://localhost:7087` |
| Router | `react-router-dom` `^7.6.1` |
| UI | MUI v7 + Emotion (`sx`, `styled`) |
| Carousel | Embla |
| API | Native `fetch` (no axios) |
| State | Local `useState` / `useEffect` only |
| i18n library | None; Ukrainian strings hardcoded |
| Tests | Vitest + Playwright (mocked API); backend xUnit |

Routes in `App.tsx`: `/`, `/catalog`, `/catalog/:categoryId`, `/product/:productId`, `/search`. Layout = Header + Outlet + Footer.

`index.html` uses `lang="uk"` and a Ukrainian document title. Favicon is `public/favicon.svg`.

## 4. Database-first intent vs actual

**Intended and implemented:** numbered SQL scripts under `MebelOnline.Db/Migrations/Up/` and `Down/`. Runtime does not auto-apply them. Apply order: `docs/database.md`.

## 5. Request flow (catalog)

```
Browser (Vite :51347 or Server fallback)
  → fetch /api/...
  → Controller
  → *Service (AppDbContext)
  → Mapper → DTO JSON
```

SPA production hosting: Server `UseStaticFiles` + `MapFallbackToFile`. Dev: SpaProxy to Vite.

## 6. What exists vs gaps (architecture level)

| Exists | Incomplete / conflicting | Deferred |
|--------|--------------------------|----------|
| SQL scripts as source of truth; tests | Existing LocalDB `MebelOnline` still has English EnsureCreated seed | Slug routing (rejected) |
| GET catalog APIs + ProblemDetails | Connection string not in git (by design) | CORS, health (not required) |
| SPA `/catalog/:categoryId` + Vitest/Playwright | No CI; Playwright does not hit live SQL | Auth/cart/admin/SEO |
| Swagger at `/swagger` | Placeholder contact details | Elasticsearch |
