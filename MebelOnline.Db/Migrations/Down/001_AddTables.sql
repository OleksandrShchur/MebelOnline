IF OBJECT_ID('dbo.Products', 'U') IS NOT NULL
BEGIN
    DROP TABLE dbo.Products;
END;

IF OBJECT_ID('dbo.Users', 'U') IS NOT NULL
BEGIN
    DROP TABLE dbo.Users;
END;

IF OBJECT_ID('dbo.Categories', 'U') IS NOT NULL
BEGIN
    DROP TABLE dbo.Categories;
END;
