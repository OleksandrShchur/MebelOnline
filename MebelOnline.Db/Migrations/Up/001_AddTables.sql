IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Categories')
BEGIN
    CREATE TABLE dbo.Categories (
        Id INT PRIMARY KEY,
        Name NVARCHAR(255) NOT NULL,
        ImageUrl NVARCHAR(500) NULL,
        ParentCategoryId INT NULL,
        HasProducts BIT NOT NULL DEFAULT 0,
        CONSTRAINT FK_Category_ParentCategory 
            FOREIGN KEY (ParentCategoryId) REFERENCES Categories(Id) ON DELETE NO ACTION
    );
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
        Name NVARCHAR(255) NOT NULL,
        Description NVARCHAR(MAX),
        ImageUrl NVARCHAR(500)
    );
END;

IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'ProductAttributes')
BEGIN
    CREATE TABLE dbo.ProductAttributes (
        Id INT PRIMARY KEY IDENTITY(1,1),
        Name NVARCHAR(255) NOT NULL
    );
END;

IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Products')
BEGIN
    CREATE TABLE dbo.Products (
        Id INT PRIMARY KEY IDENTITY(1,1),
        Title NVARCHAR(255) NOT NULL,
        Description NVARCHAR(MAX),
        Price DECIMAL(18, 2) NOT NULL,
        OldPrice DECIMAL(18, 2),
        CategoryId INT NOT NULL,
        Width DECIMAL(18, 2),
        Height DECIMAL(18, 2),
        Depth DECIMAL(18, 2),
        BrandId INT,
        FOREIGN KEY (BrandId) REFERENCES dbo.Brands(Id)
    );
END;

IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'ProductImages')
BEGIN
    CREATE TABLE dbo.ProductImages (
        Id INT PRIMARY KEY IDENTITY(1,1),
        ProductId INT NOT NULL,
        Url NVARCHAR(500),
        IsPrimary BIT NOT NULL,
        FOREIGN KEY (ProductId) REFERENCES dbo.Products(Id)
    );
END;

IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'ProductOptions')
BEGIN
    CREATE TABLE dbo.ProductOptions (
        Id INT PRIMARY KEY IDENTITY(1,1),
        ProductId INT NOT NULL,
        ColorName NVARCHAR(100),
        Material NVARCHAR(100),
        ImageUrl NVARCHAR(500),
        FOREIGN KEY (ProductId) REFERENCES dbo.Products(Id)
    );
END;

IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'ProductAttributeValues')
BEGIN
    CREATE TABLE dbo.ProductAttributeValues (
        ProductId INT NOT NULL,
        AttributeId INT NOT NULL,
        Value NVARCHAR(255),
        PRIMARY KEY (ProductId, AttributeId),
        FOREIGN KEY (ProductId) REFERENCES dbo.Products(Id),
        FOREIGN KEY (AttributeId) REFERENCES dbo.ProductAttributes(Id)
    );
END;
