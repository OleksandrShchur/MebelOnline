-- Source of truth for a CLEAN database.
-- Apply order: 001 → 002 → 003 → 004 → 005 → 006 → 007.
-- 001 is idempotent: CREATE if missing, then ADD Products.Note / ProductOptions.Material / OptionType
-- if an older table already exists without them (so 006 can run without waiting for 007).
-- 007 remains for leftover alignment on older DBs (FKs, IDENTITY, indexes) and is a no-op after current 001.
-- If 001–005 already ran on an older schema: re-run this 001, skip 002–005, then 006 (007 optional after).

IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Categories')
BEGIN
    CREATE TABLE dbo.Categories (
        Id INT PRIMARY KEY,
        Name NVARCHAR(255) NOT NULL,
        ImageUrl NVARCHAR(500) NULL,
        ParentCategoryId INT NULL,
        HasProducts BIT NOT NULL CONSTRAINT DF_Categories_HasProducts DEFAULT 0,
        CONSTRAINT FK_Category_ParentCategory
            FOREIGN KEY (ParentCategoryId) REFERENCES dbo.Categories(Id) ON DELETE NO ACTION,
        CONSTRAINT UX_Categories_Name UNIQUE (Name)
    );
END;

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'IX_Categories_ParentCategoryId' AND object_id = OBJECT_ID('dbo.Categories'))
BEGIN
    CREATE INDEX IX_Categories_ParentCategoryId ON dbo.Categories (ParentCategoryId);
END;

IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Users')
BEGIN
    CREATE TABLE dbo.Users (
        Id INT NOT NULL PRIMARY KEY,
        PasswordHash VARCHAR(256) COLLATE SQL_Latin1_General_CP1_CI_AI NOT NULL
    );
END;

IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Brands')
BEGIN
    CREATE TABLE dbo.Brands (
        Id INT PRIMARY KEY IDENTITY(1,1),
        Name NVARCHAR(100) NOT NULL,
        Description NVARCHAR(4000),
        ImageUrl NVARCHAR(500)
    );
END;

IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'ProductAttributes')
BEGIN
    CREATE TABLE dbo.ProductAttributes (
        Id INT PRIMARY KEY IDENTITY(1,1),
        Name NVARCHAR(100) NOT NULL
    );
END;

IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Products')
BEGIN
    CREATE TABLE dbo.Products (
        Id INT PRIMARY KEY IDENTITY(1,1),
        Title NVARCHAR(255) NOT NULL,
        Description NVARCHAR(4000),
        Price DECIMAL(18, 2) NOT NULL,
        OldPrice DECIMAL(18, 2),
        CategoryId INT NOT NULL,
        Width DECIMAL(18, 2),
        Height DECIMAL(18, 2),
        Depth DECIMAL(18, 2),
        BrandId INT,
        Note NVARCHAR(255) NULL,
        CONSTRAINT FK_Products_Categories FOREIGN KEY (CategoryId) REFERENCES dbo.Categories(Id) ON DELETE NO ACTION,
        CONSTRAINT FK_Products_Brands FOREIGN KEY (BrandId) REFERENCES dbo.Brands(Id)
    );
END;

-- Additive: older Products tables skip CREATE above.
IF COL_LENGTH('dbo.Products', 'Note') IS NULL
BEGIN
    ALTER TABLE dbo.Products ADD Note NVARCHAR(255) NULL;
END;

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'IX_Products_CategoryId' AND object_id = OBJECT_ID('dbo.Products'))
BEGIN
    CREATE INDEX IX_Products_CategoryId ON dbo.Products (CategoryId);
END;

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'IX_Products_Title' AND object_id = OBJECT_ID('dbo.Products'))
BEGIN
    CREATE INDEX IX_Products_Title ON dbo.Products (Title);
END;

IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'ProductImages')
BEGIN
    CREATE TABLE dbo.ProductImages (
        Id INT PRIMARY KEY IDENTITY(1,1),
        ProductId INT NOT NULL,
        Url NVARCHAR(500),
        IsPrimary BIT NOT NULL,
        CONSTRAINT FK_ProductImages_Products FOREIGN KEY (ProductId) REFERENCES dbo.Products(Id)
    );
END;

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'IX_ProductImages_ProductId_IsPrimary' AND object_id = OBJECT_ID('dbo.ProductImages'))
BEGIN
    CREATE INDEX IX_ProductImages_ProductId_IsPrimary ON dbo.ProductImages (ProductId, IsPrimary);
END;

IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'ProductOptions')
BEGIN
    CREATE TABLE dbo.ProductOptions (
        Id INT PRIMARY KEY IDENTITY(1,1),
        ProductId INT NOT NULL,
        ColorName NVARCHAR(100),
        Material NVARCHAR(100) NULL,
        OptionType TINYINT NOT NULL CONSTRAINT DF_ProductOptions_OptionType DEFAULT 0,
        ImageUrl NVARCHAR(500),
        CONSTRAINT FK_ProductOptions_Products FOREIGN KEY (ProductId) REFERENCES dbo.Products(Id)
    );
END;

-- Additive: older ProductOptions (OptionType only, or Material only) skip CREATE above.
-- Keep BOTH Material and OptionType.
IF COL_LENGTH('dbo.ProductOptions', 'Material') IS NULL
BEGIN
    ALTER TABLE dbo.ProductOptions ADD Material NVARCHAR(100) NULL;
END;

IF COL_LENGTH('dbo.ProductOptions', 'OptionType') IS NULL
BEGIN
    ALTER TABLE dbo.ProductOptions ADD OptionType TINYINT NOT NULL CONSTRAINT DF_ProductOptions_OptionType DEFAULT 0;
END;

IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'ProductAttributeValues')
BEGIN
    CREATE TABLE dbo.ProductAttributeValues (
        Id INT PRIMARY KEY IDENTITY(1,1),
        ProductId INT NOT NULL,
        AttributeId INT NOT NULL,
        Value NVARCHAR(100),
        CONSTRAINT FK_ProductAttributeValues_Products FOREIGN KEY (ProductId) REFERENCES dbo.Products(Id),
        CONSTRAINT FK_ProductAttributeValues_ProductAttributes FOREIGN KEY (AttributeId) REFERENCES dbo.ProductAttributes(Id)
    );
END;
