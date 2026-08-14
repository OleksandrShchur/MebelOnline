# User stories (Phase 1)

Stories use **existing fields** from `docs/data-model.md`. UI copy is Ukrainian. IDs are stable for the traceability matrix.

## Visitor — browse

**US-01 — Open the home page**  
As a visitor, I want to open the site and see Ukrainian navigation, a category menu, and new products so that I can start browsing.  
**Maps to:** `GET /api/categories/all`, `GET /api/products/latest`; route `/`.

**US-02 — See the catalog of categories**  
As a visitor, I want a catalog page of top-level categories with images and subcategory names so that I can pick a furniture type.  
**Maps to:** `GET /api/categories/catalog`; `Categories.Name`, `ImageUrl`, children via `ParentCategoryId`; route `/catalog`.

**US-03 — Open a category and see its products**  
As a visitor, I want to open a category and see its products (including descendant categories) with price and photo so that I do not have to guess a search word.  
**Maps to:** `Categories.Id`, `Products.CategoryId`; proposed `categoryId` on search; route `/catalog/:categoryId`.

**US-04 — Navigate the category tree**  
As a visitor, I want sidebar/menu items to go to the matching category page so that hover/click is not display-only.  
**Maps to:** `CategoryRevertedModel.id`; sidebar and mobile nav use `Link` to `/catalog/{id}`.

## Visitor — search and filter

**US-05 — Search by text**  
As a visitor, I want to type a query (e.g. «диван») and see matching products so that I can find items by name or description.  
**Maps to:** `SearchString` vs `Title`, `Description`, `Brand.Name`, `Categories.Name`, `ProductAttributeValues.Value`; route `/search`.

**US-06 — Filter by price, brand, and material**  
As a visitor, I want to narrow results by price, виробник, and матеріал so that I can reduce a long list.  
**Maps to:** `Price`, `Brands.Name`, attribute name material + `Value`. Applying filters must **keep** `searchString` / `categoryId`.

**US-07 — Sort and paginate**  
As a visitor, I want to sort (price, name) and page through results so that I can scan ~1000 products.  
**Maps to:** `SortBy`, `page`, `pageSize` (max 48).

## Visitor — product

**US-08 — Open product details**  
As a visitor, I want to open a product by id and see gallery, title, prices in грн, dimensions in см, attributes, note, and brand.  
**Maps to:** `GET /api/products/{id}`; `ProductImages`, `Title`, `Price`, `OldPrice`, `Width/Height/Depth`, `Attributes`, `Note`, `Brand`; route `/product/:productId`.

**US-09 — See фасад and корпус colors**  
As a visitor, I want to view color swatches for корпус and фасад so that I understand available finishes.  
**Maps to:** `ProductOptions.ColorName`, `ImageUrl`, `OptionType` Front/Frame. Selection is visual only (no cart).

**US-10 — Follow breadcrumbs**  
As a visitor, I want breadcrumbs (Головна → Каталог → … → product) so that I can go back up the tree.  
**Maps to:** `ParentCategoryId` chain; URLs should use `/catalog/:id` after the category route exists, not search-by-name.

## Visitor — trust and contact

**US-11 — See price in UAH**  
As a visitor, I want every price in Ukrainian hryvnia so that I am not shown another currency.

**US-12 — Contact the shop**  
As a visitor, I want phone/messengers/address in the footer (and product CTAs if URLs are provided) so that I can order offline.  
**Maps to:** static copy; no API. Details TBD (blocking).

**US-13 — Use the site on a phone**  
As a visitor, I want home, catalog, search, and product pages to work on a narrow screen, including a way to reach categories (sidebar is desktop-only today).

## Quality

**US-14 — Clear empty, loading, and not-found states**  
As a visitor, I want a loading indicator, an empty-results message, and a not-found product page instead of a blank layout.

**US-15 — Safe public API**  
As a visitor/integrator, I want consistent 400/404 errors, page-size limits, and no database internals in responses.
