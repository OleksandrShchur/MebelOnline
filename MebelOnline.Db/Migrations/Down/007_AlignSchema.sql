-- Rollback for 007_AlignSchema.sql (legacy databases only).
-- Do NOT run this against a clean database created from current 001:
-- Note, OptionType, Material, FKs, and indexes are part of the 001 baseline there.
--
-- This script only removes objects that 007 adds on top of an older schema.
-- It does not drop Products.Note or ProductOptions.OptionType/Material (data-preserving).

IF EXISTS (SELECT 1 FROM sys.indexes WHERE name = 'IX_ProductImages_ProductId_IsPrimary' AND object_id = OBJECT_ID('dbo.ProductImages'))
    DROP INDEX IX_ProductImages_ProductId_IsPrimary ON dbo.ProductImages;

IF EXISTS (SELECT 1 FROM sys.indexes WHERE name = 'IX_Products_Title' AND object_id = OBJECT_ID('dbo.Products'))
    DROP INDEX IX_Products_Title ON dbo.Products;

IF EXISTS (SELECT 1 FROM sys.indexes WHERE name = 'IX_Products_CategoryId' AND object_id = OBJECT_ID('dbo.Products'))
    DROP INDEX IX_Products_CategoryId ON dbo.Products;

IF EXISTS (SELECT 1 FROM sys.indexes WHERE name = 'IX_Categories_ParentCategoryId' AND object_id = OBJECT_ID('dbo.Categories'))
    DROP INDEX IX_Categories_ParentCategoryId ON dbo.Categories;

IF EXISTS (SELECT 1 FROM sys.foreign_keys WHERE name = 'FK_Products_Categories')
    ALTER TABLE dbo.Products DROP CONSTRAINT FK_Products_Categories;
