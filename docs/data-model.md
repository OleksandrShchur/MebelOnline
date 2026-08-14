# Data model (SQL Server + EF)

**Source of truth:** `MebelOnline.Db/Migrations/Up/001_AddTables.sql` (plus idempotent `007_AlignSchema.sql` for older databases). Entities and Fluent configs are aligned to those scripts. Apply order: `docs/database.md`.

**SQL Server:** verified against LocalDB SQL Server 2019 Express. Scripts use standard T-SQL.

**EF Core migrations:** none. Scripts are manual.

## 1. Tables and entities

### 1.1 `Categories` / `CategoryEntity`

| Column | SQL | Entity | Notes |
|--------|-----|--------|-------|
| `Id` | `INT PRIMARY KEY` (not IDENTITY) | `int Id` | Manual IDs in seed |
| `Name` | `NVARCHAR(255) NOT NULL` UNIQUE | `string Name` | Unique |
| `ImageUrl` | `NVARCHAR(500) NULL` | `string? ImageUrl` | URL string |
| `ParentCategoryId` | `INT NULL`, FK self | `int? ParentCategoryId` | `IX_Categories_ParentCategoryId` |
| `HasProducts` | `BIT NOT NULL DEFAULT 0` | `bool HasProducts` | Set by seed `006` |

**Not present:** slug, sort order, active/inactive.

**Hierarchy:** 3-level tree. Seed `004` is Ukrainian furniture (landing names at level 1).

**Product relationship:** `Products.CategoryId` → `Categories.Id` (`FK_Products_Categories`). `ProductEntity.Category` navigation.

### 1.2 `Products` / `ProductEntity`

| Column | SQL | Entity | Notes |
|--------|-----|--------|-------|
| `Id` | `INT IDENTITY PK` | `int Id` | |
| `Title` | `NVARCHAR(255) NOT NULL` | `string Title` | Indexed `IX_Products_Title` |
| `Description` | `NVARCHAR(4000)` | `string Description` | |
| `Price` | `DECIMAL(18,2) NOT NULL` | `decimal Price` | UAH; no currency column |
| `OldPrice` | `DECIMAL(18,2)` | `decimal? OldPrice` | |
| `CategoryId` | `INT NOT NULL`, FK | `int CategoryId` | `IX_Products_CategoryId` |
| `Width` / `Height` / `Depth` | `DECIMAL(18,2)` | `decimal?` | см in UI |
| `BrandId` | `INT` nullable, FK → `Brands` | `int? BrandId` | |
| `Note` | `NVARCHAR(255) NULL` | `string? Note` | |

**Not present:** slug, SKU, stock, currency, timestamps.

### 1.3 `Brands` / `BrandEntity`

Unchanged shape. Seed: ВМК-Україна, Gerbor, Еверест, Blest, Novelty.

### 1.4 `ProductImages` / `ProductImageEntity`

`Url` NVARCHAR(500), `IsPrimary` BIT. Index `IX_ProductImages_ProductId_IsPrimary`.

### 1.5 `ProductOptions` / `ProductOptionEntity`

**Both columns exist** (approved):

| Column | SQL | Entity |
|--------|-----|--------|
| `ColorName` | `NVARCHAR(100)` | `string ColorName` |
| `Material` | `NVARCHAR(100) NULL` | `string? Material` |
| `OptionType` | `TINYINT NOT NULL DEFAULT 0` | `ProductOptionTypeEnum` (`NotSpecified=0`, `Front=1`, `Frame=2`) |
| `ImageUrl` | `NVARCHAR(500)` | `string ImageUrl` |

PDP variant model is Front/Frame via `OptionType`. `Material` stays as a column and is returned on option DTOs.

EAV `ProductAttributes.Name == N'Матеріал'` is the sidebar material filter.

### 1.6 `ProductAttributes` / `ProductAttributeValues`

Attribute seed names: `Колір`, `Матеріал`, `Розмір`.

`ProductAttributeValues.Id` is **IDENTITY**.

### 1.7 `Users` / `UserEntity`

Unused. Table kept. Seed `003` inserts **no rows** (no plaintext passwords). No auth APIs.

## 2. Relationships

```
Categories (self ParentCategoryId)
Products.CategoryId → Categories.Id     [FK_Products_Categories]
Products.BrandId → Brands.Id
ProductImages.ProductId → Products.Id
ProductOptions.ProductId → Products.Id
ProductAttributeValues.ProductId → Products.Id
ProductAttributeValues.AttributeId → ProductAttributes.Id
```

## 3. Indexes

See `docs/database.md`. No slug indexes.

## 4. Price and currency

UAH implied. No `Currency` column.

## 5. Availability

No stock flag. Every `Products` row is catalog-visible.

## 6. Scripts inventory

| Script | Purpose |
|--------|---------|
| `Up/001_AddTables.sql` | Full schema for a clean DB; also `ALTER`s missing `Note` / `Material` / `OptionType` |
| `Up/002_AddBrandTestData.sql` | Ukrainian brands |
| `Up/003_AddTestUsers.sql` | No-op |
| `Up/004_AddCategoriesTestData.sql` | Ukrainian 3-level categories |
| `Up/005_AddProductAttributesTestData.sql` | Колір, Матеріал, Розмір |
| `Up/006_AddProductTestData.sql` | Demo products (`Title`), images, options, attributes |
| `Up/007_AlignSchema.sql` | Idempotent alignment for older DBs |
| `Down/001_AddTables.sql` | Drops all 8 tables |
| `Down/002`–`006` | Seed rollback |
| `Down/007_AlignSchema.sql` | Legacy 007 rollback only |

## 7. Generation workflow

1. `Migrations/Up/*.sql` is source of truth.
2. Do not call `EnsureCreated()`.
3. Apply scripts in order (`docs/database.md`).
4. Align entities/Fluent to the schema.
5. New changes: `Up/008_....sql` + Down, then entities. No admin/cart/order tables.
