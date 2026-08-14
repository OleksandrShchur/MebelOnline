-- Idempotent schema alignment for databases created from an older 001 or from EnsureCreated().
-- Safe to run after the current 001 (no-op when objects already exist).
-- Does not drop data. Does not modify the unused Users table.
-- If 006 failed with Invalid column name 'Material', run this (or re-run 001) BEFORE retrying 006.
-- Current 001 also adds Material/OptionType/Note; 007 still covers FKs, IDENTITY, and indexes.
-- If this script failed with Msg 547 FK_Products_Categories: re-run it. Orphan Products.CategoryId
-- values (NULL, 0, or not in Categories) are remapped to a valid existing category, then the FK is added.
-- Clean databases with no orphans: those UPDATEs affect 0 rows.

-- Products.Note
IF COL_LENGTH('dbo.Products', 'Note') IS NULL
BEGIN
    ALTER TABLE dbo.Products ADD Note NVARCHAR(255) NULL;
END;

-- ProductOptions.Material (keep existing OptionType)
IF COL_LENGTH('dbo.ProductOptions', 'Material') IS NULL
BEGIN
    ALTER TABLE dbo.ProductOptions ADD Material NVARCHAR(100) NULL;
END;

-- ProductOptions.OptionType (keep existing Material)
IF COL_LENGTH('dbo.ProductOptions', 'OptionType') IS NULL
BEGIN
    ALTER TABLE dbo.ProductOptions ADD OptionType TINYINT NOT NULL CONSTRAINT DF_ProductOptions_OptionType DEFAULT 0;
END;

-- FK Products.CategoryId → Categories
-- Msg 547 happens when Products.CategoryId is NULL, 0, or not in Categories.Id.
-- Typical live-DB pattern: 004 skipped (Categories still the old English tree, often ids 1–3
-- Furniture/Electronics/Fashion) then 006 inserted demo products with Ukrainian leaf ids 12–35.
-- Repair is non-destructive: remap orphans only; never DELETE products. Runs only when the FK
-- is missing. Prefer 006 leaf → 004 parent when that parent exists; otherwise a furniture root.
IF OBJECT_ID('dbo.Products', 'U') IS NOT NULL
    AND OBJECT_ID('dbo.Categories', 'U') IS NOT NULL
    AND COL_LENGTH('dbo.Products', 'CategoryId') IS NOT NULL
    AND NOT EXISTS (SELECT 1 FROM sys.foreign_keys WHERE name = 'FK_Products_Categories')
BEGIN
    DECLARE @FallbackCategoryId INT;
    DECLARE @LeafMapped INT = 0;
    DECLARE @FallbackMapped INT = 0;
    DECLARE @StillOrphan INT = 0;
    DECLARE @LeafToParent TABLE (LeafId INT PRIMARY KEY, ParentId INT);

    -- Fallback: Кухні (004), else Furniture (old English root), else Id=1, else first root, else MIN(Id).
    SELECT TOP (1) @FallbackCategoryId = Id FROM dbo.Categories WHERE Name = N'Кухні' ORDER BY Id;
    IF @FallbackCategoryId IS NULL
        SELECT TOP (1) @FallbackCategoryId = Id FROM dbo.Categories WHERE Name = N'Furniture' ORDER BY Id;
    IF @FallbackCategoryId IS NULL
        SELECT @FallbackCategoryId = Id FROM dbo.Categories WHERE Id = 1;
    IF @FallbackCategoryId IS NULL
        SELECT TOP (1) @FallbackCategoryId = Id FROM dbo.Categories WHERE ParentCategoryId IS NULL ORDER BY Id;
    IF @FallbackCategoryId IS NULL
        SELECT @FallbackCategoryId = MIN(Id) FROM dbo.Categories;

    IF @FallbackCategoryId IS NULL
    BEGIN
        PRINT N'007_AlignSchema: skipped FK_Products_Categories - dbo.Categories is empty, cannot remap orphans.';
    END
    ELSE
    BEGIN
        -- 006 leaf CategoryId → 004 parent when the leaf is missing but the parent exists.
        -- Covers partial 004 / English 1-3 still present (e.g. 12→1 Кухні/Furniture, 16→3).
        INSERT INTO @LeafToParent (LeafId, ParentId) VALUES
            (12, 1), (13, 1),
            (14, 2), (15, 2),
            (16, 3), (17, 3),
            (18, 4), (19, 4),
            (20, 5), (21, 5),
            (22, 6), (23, 6),
            (24, 7), (25, 7),
            (26, 8), (27, 8),
            (28, 9), (29, 9),
            (30, 10), (31, 10),
            (32, 11), (33, 11),
            (34, 30), (35, 31);

        UPDATE p
        SET p.CategoryId = m.ParentId
        FROM dbo.Products p
        INNER JOIN @LeafToParent m ON m.LeafId = p.CategoryId
        WHERE (p.CategoryId IS NULL OR p.CategoryId = 0
               OR NOT EXISTS (SELECT 1 FROM dbo.Categories c WHERE c.Id = p.CategoryId))
          AND EXISTS (SELECT 1 FROM dbo.Categories c WHERE c.Id = m.ParentId)
          -- Do not park furniture demo products under leftover English Electronics/Fashion ids.
          AND NOT EXISTS (
              SELECT 1 FROM dbo.Categories c
              WHERE c.Id = m.ParentId AND c.Name IN (N'Electronics', N'Fashion')
          );
        SET @LeafMapped = @@ROWCOUNT;

        -- Remaining orphans (0, unknown ids, English IDENTITY ids, 006 leaves whose parent is also missing).
        UPDATE p
        SET p.CategoryId = @FallbackCategoryId
        FROM dbo.Products p
        WHERE p.CategoryId IS NULL
           OR p.CategoryId = 0
           OR NOT EXISTS (SELECT 1 FROM dbo.Categories c WHERE c.Id = p.CategoryId);
        SET @FallbackMapped = @@ROWCOUNT;

        IF @LeafMapped + @FallbackMapped > 0
            PRINT N'007_AlignSchema: remapped ' + CAST(@LeafMapped + @FallbackMapped AS nvarchar(11))
                + N' orphan Products.CategoryId row(s) (' + CAST(@LeafMapped AS nvarchar(11))
                + N' via 006 leaf→parent, ' + CAST(@FallbackMapped AS nvarchar(11))
                + N' via fallback category ' + CAST(@FallbackCategoryId AS nvarchar(11))
                + N'). Products were not deleted.';
        ELSE
            PRINT N'007_AlignSchema: no orphan Products.CategoryId rows; remap is a no-op.';

        SELECT @StillOrphan = COUNT(*)
        FROM dbo.Products p
        WHERE p.CategoryId IS NULL
           OR p.CategoryId = 0
           OR NOT EXISTS (SELECT 1 FROM dbo.Categories c WHERE c.Id = p.CategoryId);

        IF @StillOrphan > 0
            PRINT N'007_AlignSchema: skipped FK_Products_Categories - ' + CAST(@StillOrphan AS nvarchar(11))
                + N' orphan Product row(s) remain.';
        ELSE
            ALTER TABLE dbo.Products
                ADD CONSTRAINT FK_Products_Categories
                FOREIGN KEY (CategoryId) REFERENCES dbo.Categories(Id) ON DELETE NO ACTION;
    END
END;

-- ProductAttributeValues.Id IDENTITY (preserve rows)
IF OBJECT_ID('dbo.ProductAttributeValues', 'U') IS NOT NULL
    AND NOT EXISTS (
        SELECT 1
        FROM sys.identity_columns
        WHERE object_id = OBJECT_ID(N'dbo.ProductAttributeValues') AND name = N'Id'
    )
BEGIN
    CREATE TABLE dbo.ProductAttributeValues_New (
        Id INT PRIMARY KEY IDENTITY(1,1),
        ProductId INT NOT NULL,
        AttributeId INT NOT NULL,
        Value NVARCHAR(100),
        CONSTRAINT FK_ProductAttributeValues_Products FOREIGN KEY (ProductId) REFERENCES dbo.Products(Id),
        CONSTRAINT FK_ProductAttributeValues_ProductAttributes FOREIGN KEY (AttributeId) REFERENCES dbo.ProductAttributes(Id)
    );

    SET IDENTITY_INSERT dbo.ProductAttributeValues_New ON;
    INSERT INTO dbo.ProductAttributeValues_New (Id, ProductId, AttributeId, Value)
    SELECT Id, ProductId, AttributeId, Value FROM dbo.ProductAttributeValues;
    SET IDENTITY_INSERT dbo.ProductAttributeValues_New OFF;

    DROP TABLE dbo.ProductAttributeValues;
    EXEC sp_rename N'dbo.ProductAttributeValues_New', N'ProductAttributeValues';
END;

-- Indexes (justified: category listing, title lookup, primary image, hierarchy walk)
IF OBJECT_ID('dbo.Products', 'U') IS NOT NULL
    AND NOT EXISTS (SELECT 1 FROM sys.indexes WHERE name = 'IX_Products_CategoryId' AND object_id = OBJECT_ID('dbo.Products'))
BEGIN
    CREATE INDEX IX_Products_CategoryId ON dbo.Products (CategoryId);
END;

IF OBJECT_ID('dbo.Products', 'U') IS NOT NULL
    AND NOT EXISTS (SELECT 1 FROM sys.indexes WHERE name = 'IX_Products_Title' AND object_id = OBJECT_ID('dbo.Products'))
BEGIN
    CREATE INDEX IX_Products_Title ON dbo.Products (Title);
END;

IF OBJECT_ID('dbo.ProductImages', 'U') IS NOT NULL
    AND NOT EXISTS (SELECT 1 FROM sys.indexes WHERE name = 'IX_ProductImages_ProductId_IsPrimary' AND object_id = OBJECT_ID('dbo.ProductImages'))
BEGIN
    CREATE INDEX IX_ProductImages_ProductId_IsPrimary ON dbo.ProductImages (ProductId, IsPrimary);
END;

IF OBJECT_ID('dbo.Categories', 'U') IS NOT NULL
    AND NOT EXISTS (SELECT 1 FROM sys.indexes WHERE name = 'IX_Categories_ParentCategoryId' AND object_id = OBJECT_ID('dbo.Categories'))
BEGIN
    CREATE INDEX IX_Categories_ParentCategoryId ON dbo.Categories (ParentCategoryId);
END;
