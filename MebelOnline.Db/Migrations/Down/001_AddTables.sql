-- Drops all catalog tables. Child tables first because of FKs.
-- Users is unused in Phase 1 but is dropped here as part of full schema teardown.

IF OBJECT_ID('dbo.ProductAttributeValues', 'U') IS NOT NULL
    DROP TABLE dbo.ProductAttributeValues;

IF OBJECT_ID('dbo.ProductOptions', 'U') IS NOT NULL
    DROP TABLE dbo.ProductOptions;

IF OBJECT_ID('dbo.ProductImages', 'U') IS NOT NULL
    DROP TABLE dbo.ProductImages;

IF OBJECT_ID('dbo.Products', 'U') IS NOT NULL
    DROP TABLE dbo.Products;

IF OBJECT_ID('dbo.ProductAttributes', 'U') IS NOT NULL
    DROP TABLE dbo.ProductAttributes;

IF OBJECT_ID('dbo.Brands', 'U') IS NOT NULL
    DROP TABLE dbo.Brands;

IF OBJECT_ID('dbo.Users', 'U') IS NOT NULL
    DROP TABLE dbo.Users;

IF OBJECT_ID('dbo.Categories', 'U') IS NOT NULL
    DROP TABLE dbo.Categories;
