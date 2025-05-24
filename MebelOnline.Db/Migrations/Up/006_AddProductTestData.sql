-- Declare cursor for leaf categories
DECLARE category_cursor CURSOR FOR
SELECT Id FROM Categories
WHERE Id NOT IN (
    SELECT DISTINCT ParentCategoryId 
    FROM Categories 
    WHERE ParentCategoryId IS NOT NULL
);

DECLARE @CategoryId INT;
DECLARE @ProductId INT;

OPEN category_cursor;
FETCH NEXT FROM category_cursor INTO @CategoryId;

WHILE @@FETCH_STATUS = 0
BEGIN
    -- Create sample product name
    DECLARE @ProductName NVARCHAR(255) = CONCAT('Sample Product for Category ', @CategoryId);

    -- Insert sample product only if it does not already exist
    IF NOT EXISTS (
        SELECT 1 FROM Products WHERE Name = @ProductName
    )
    BEGIN
        INSERT INTO Products (Name, Description, Price, CategoryId)
        VALUES (
            @ProductName,
            CONCAT('This is a sample product for category ', @CategoryId),
            99.99,
            @CategoryId
        );
    END

    -- Get ProductId of the (newly or previously) inserted sample product
    SELECT @ProductId = Id FROM Products WHERE Name = @ProductName;

    -- Insert sample image if none exists for this product
    IF NOT EXISTS (
        SELECT 1 FROM ProductImages WHERE ProductId = @ProductId
    )
    BEGIN
        INSERT INTO ProductImages (ProductId, Url, IsPrimary)
        VALUES 
            (@ProductId, 'https://example.com/sample-image1.jpg', 1),
            (@ProductId, 'https://example.com/sample-image2.jpg', 0);
    END

    FETCH NEXT FROM category_cursor INTO @CategoryId;
END

CLOSE category_cursor;
DEALLOCATE category_cursor;
