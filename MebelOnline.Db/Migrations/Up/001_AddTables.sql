IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Categories')
BEGIN
    CREATE TABLE dbo.Categories (
        Id INT PRIMARY KEY,
        Name NVARCHAR(255) NOT NULL,
        Description NVARCHAR(500) NULL,
        ParentCategoryId INT NULL,
        HasProducts BIT NOT NULL DEFAULT 0,
        CONSTRAINT FK_Category_ParentCategory 
            FOREIGN KEY (ParentCategoryId) REFERENCES Categories(Id) ON DELETE NO ACTION
    );
END;

IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Users')
BEGIN
    CREATE TABLE dbo.Users (
	Id int NOT NULL,
	PasswordHash varchar(256) COLLATE SQL_Latin1_General_CP1_CI_AI NOT NULL
);
END;

IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Products')
BEGIN
    CREATE TABLE dbo.Products (
        Id INT PRIMARY KEY IDENTITY(1,1),
        Name NVARCHAR(255) NOT NULL,
        Description NVARCHAR(500) NULL,
        Price DECIMAL(18, 2) NOT NULL,
        StockQuantity INT NOT NULL,
        ImageUrl NVARCHAR(500) NULL,
        DateAdded DATETIME NOT NULL,
        CategoryId INT NOT NULL,
        CONSTRAINT FK_Products_Categories FOREIGN KEY (CategoryId) REFERENCES dbo.Categories(Id) ON DELETE CASCADE
    );
END;
