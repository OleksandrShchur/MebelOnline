# Database (Phase 1)

SQL scripts under `MebelOnline.Db/Migrations` are the **source of truth**. The app does **not** call `EnsureCreated()` and does **not** run EF Core migrations.

## Connection string

Do **not** commit a real connection string. Configure `ConnectionStrings:DefaultConnection` via:

```powershell
dotnet user-secrets set "ConnectionStrings:DefaultConnection" "Server=(localdb)\MSSQLLocalDB;Database=MebelOnline;Trusted_Connection=True;TrustServerCertificate=True" --project MebelOnline.Server
```

or the environment variable `ConnectionStrings__DefaultConnection`.

LocalDB instance `MSSQLLocalDB` is a typical Windows dev host. Production/staging should use SQL Server with the same scripts.

## Apply order (CLEAN database)

Run Up scripts in filename order against an empty database:

1. `Up/001_AddTables.sql` — full schema (8 tables, `Products.Note`, `ProductOptions.Material` **and** `OptionType`, FKs, `ProductAttributeValues.Id` IDENTITY, indexes)
2. `Up/002_AddBrandTestData.sql` — Ukrainian furniture brands
3. `Up/003_AddTestUsers.sql` — no-op (Users table unused; no plaintext passwords)
4. `Up/004_AddCategoriesTestData.sql` — Ukrainian furniture categories (3-level tree)
5. `Up/005_AddProductAttributesTestData.sql` — `Колір`, `Матеріал`, `Розмір`
6. `Up/006_AddProductTestData.sql` — demo products (`Title`, options, attributes, images)
7. `Up/007_AlignSchema.sql` — idempotent; **no-op** after current 001 for columns already present. Still required on older DBs for leftover FKs / IDENTITY / indexes. Before adding `FK_Products_Categories`, remaps orphan `Products.CategoryId` values. Current `001` now also `ALTER`s missing `Products.Note`, `ProductOptions.Material`, and `ProductOptions.OptionType` so **006 does not depend on 007**.

Example (LocalDB, new database):

```powershell
sqlcmd -S "(localdb)\MSSQLLocalDB" -Q "IF DB_ID('MebelOnline') IS NULL CREATE DATABASE [MebelOnline];"
$up = "MebelOnline.Db\Migrations\Up"
Get-ChildItem $up -Filter *.sql | Sort-Object Name | ForEach-Object {
  sqlcmd -S "(localdb)\MSSQLLocalDB" -d MebelOnline -i $_.FullName -f 65001
}
```

`-f 65001` is UTF-8 (Ukrainian seed text).

## Rollback

Seed-only (keep tables), reverse of Up:

6 → 5 → 4 → 3 → 2, then optionally `Down/007_AlignSchema.sql` **only** on a legacy database that used 007 against an old 001.

Full teardown: `Down/001_AddTables.sql` drops all eight tables (child tables first).

Do **not** run `Down/007` against a clean database created from current `001` — those columns/indexes are baseline, not 007-only.

## Existing local `MebelOnline` database

A LocalDB database named `MebelOnline` may already exist from `EnsureCreated()` plus old English seed. Phase 1 scripts were **not** applied against it (no destructive updates to unknown live data).

To switch that instance to the scripted schema+seed, create a **new** database (or drop a disposable dev DB yourself) and apply 001–007. Do not assume live row data should be migrated in Phase 1. **Do not DROP `MebelOnline` from automation.**

## Older schema already has 001–005 (`Msg 207 … 'Material'`)

`006` inserts into `ProductOptions.Material`. An older `ProductOptions` table (created before `Material` was in `001`) is left unchanged by `CREATE TABLE IF NOT EXISTS`, so filename order `006` then `007` used to fail: `007` added `Material` **after** the seed.

`001` now adds `Material` / `OptionType` / `Note` if missing. On a live DB that already applied 001–005:

1. Re-run `Up/001_AddTables.sql` (adds missing columns; does not drop tables or seed).
2. Skip 002–005 if those seeds already applied.
3. Run `Up/006_AddProductTestData.sql`.
4. Run `Up/007_AlignSchema.sql` (indexes / FKs / IDENTITY; remaps orphan `CategoryId`s if needed; no-op for columns `001` just added).

Alternative if you do not want to re-run `001`: run `007` **then** `006`.

## `007` fails with `FK_Products_Categories` (Msg 547)

`ALTER TABLE` cannot add `FK_Products_Categories` while any `Products.CategoryId` is NULL, 0, or not in `Categories.Id`.

Typical cause on a live DB: `004` was skipped (Categories still the old English EnsureCreated tree, often ids 1–3 `Furniture` / `Electronics` / `Fashion`) and `006` then inserted demo products with Ukrainian leaf ids 12–35. Those leaf ids are orphans until `004` exists.

**Re-run this version of `Up/007_AlignSchema.sql`.** It remaps only rows that would fail the FK (does not DELETE products), then adds the constraint:

1. 006 leaf id → matching 004 parent when that parent row exists (e.g. 12 → 1), unless the parent is leftover English `Electronics` / `Fashion`.
2. Remaining orphans → `Кухні` if present, else `Furniture`, else id 1, else the first root category.

Clean databases with no orphans: the UPDATEs affect 0 rows. If the FK already exists, the whole repair is skipped.

If live `Categories` is still the English tree, remapped 006 products land under that tree (usually id 1 / Furniture). `004` can still be applied later (`IF NOT EXISTS` by id): ids 4–35 are inserted, but ids 1–3 keep their English names. The FK does not need 004 once 007 has succeeded.

## Indexes added (justified)

| Index | Why |
|-------|-----|
| `IX_Products_CategoryId` | Category listing and `categoryId` search |
| `IX_Products_Title` | Title lookup / search |
| `IX_ProductImages_ProductId_IsPrimary` | Card/PDP primary image |
| `IX_Categories_ParentCategoryId` | Hierarchy / descendant filter |

## Schema rules

- New columns require `Up/00N_*.sql` + `Down` + EF entity/Fluent alignment.
- No cart, order, auth, slug, stock, or category-active columns in Phase 1.
