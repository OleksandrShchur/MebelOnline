# Acceptance criteria (Phase 1)

Criteria are testable against **existing fields** and the proposed routes/APIs. Ukrainian copy is required in the UI. Phase 1 is not complete until these pass after implementation phases.

## Home and chrome

**AC-01** Given the app is running with a database, when I open `/`, then I see Ukrainian nav (at least Головна, Каталог, Пошук) and a product section titled **Новинки**.  
**AC-02** When latest products exist, `/` shows up to 12 cards with title, UAH price (`грн` or `₴`), and primary image URL. If a product has no primary image, the page does not crash.  
**AC-03** Category menu items navigate to `/catalog/{categoryId}` (not a no-op). On mobile, categories are reachable (drawer or catalog link).  
**AC-04** `index.html` language is `uk` and the document title is a Ukrainian shop name (not “Vite + React + TS”).

## Catalog

**AC-05** `/catalog` shows top-level categories (`ParentCategoryId` null) with `Name` and `ImageUrl` when present, plus up to several child `Name`s.  
**AC-06** Clicking a category card or “Показати всі...” opens `/catalog/{id}` for that category’s `Id`.  
**AC-07** `/catalog/{id}` lists products whose `CategoryId` is that id or a descendant. Pagination and filters work. Unknown id → not-found UI and API 404.  
**AC-08** Category listing does not depend on putting the category **name** into `searchString`.

## Search and filters

**AC-09** Header search on Enter goes to `/search?searchString=...&page=0&pageSize=...` and returns products matching title, description, brand, category name, or attribute value (case-insensitive).  
**AC-10** `searchString` longer than 100 characters returns **400** ProblemDetails. Empty/whitespace does not 500.  
**AC-11** Applying price/brand/material filters **preserves** `searchString` and `categoryId` if present.  
**AC-12** Material filter uses the same attribute name as the database (after aligning `"Матеріал"` vs `"Material"`).  
**AC-13** `pageSize` above 48 is rejected or clamped to 48. Default page is **0**. Sort options: price asc, price desc, name; order is stable (Id tie-break).  
**AC-14** Zero hits shows an empty state (not a blank page).

## Product details

**AC-15** `/product/{id}` shows `Title`, `Price` (and `OldPrice` struck through when set) in грн, gallery from `ProductImages`, dimensions in см when `Width`/`Height`/`Depth` set, attribute key/value pairs, `Note` when set, brand name when `BrandId` set.  
**AC-16** Front options render as **Колір фасаду**, frame as **Колір корпусу**, using `ColorName` + `ImageUrl`. Changing swatch does not call a write API.  
**AC-17** Unknown `productId` → 404 API + not-found UI (no null-ref).  
**AC-18** Breadcrumbs include Головна, Каталог, ancestor category names, current product; category crumbs go to `/catalog/{id}`.

## Quality / NFR

**AC-19** All catalog GETs use DTOs, `AsNoTracking`, and accept cancellation.  
**AC-20** Unhandled errors return ProblemDetails without SQL text or connection details.  
**AC-21** UI is Ukrainian throughout Phase 1 screens. No language switcher.  
**AC-22** No cart, checkout, login, or payment screens. Favorite control is inert or hidden.  
**AC-23** Layout is usable at a mobile breakpoint (header menu, product stacked layout already drafted) and desktop.  
**AC-24** Automated tests exist for search pagination/validation, product 404, category listing, and at least one frontend critical path (see `docs/test-strategy.md`).

## Data / DB

**AC-25** App starts against SQL Server using a configured connection string (not committed secrets). `EnsureCreated()` is not used in the approved workflow.  
**AC-26** SQL and EF agree on `ProductOptions` (`OptionType` vs `Material`) and `Products.Note` / `Title`. Seed scripts that reference `Products.Name` are fixed or replaced.
