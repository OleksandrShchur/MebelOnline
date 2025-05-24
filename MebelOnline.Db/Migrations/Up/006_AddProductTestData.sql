-- Declare cursor for leaf categories
DECLARE category_cursor CURSOR FOR
SELECT Id FROM Categories
WHERE Id NOT IN (SELECT DISTINCT ParentCategoryId FROM Categories WHERE ParentCategoryId IS NOT NULL);

DECLARE @CategoryId INT;
DECLARE @ProductId INT = 1;

OPEN category_cursor;
FETCH NEXT FROM category_cursor INTO @CategoryId;

WHILE @@FETCH_STATUS = 0
BEGIN
    -- Insert sample product only if it does not already exist
    IF NOT EXISTS (
        SELECT 1 FROM Products WHERE Name = CONCAT('Sample Product for Category ', @CategoryId)
    )
    BEGIN
        INSERT INTO Products (Name, Description, Price, CategoryId)
        VALUES (
            CONCAT('Sample Product for Category ', @CategoryId),
            CONCAT('This is a sample product for category ', @CategoryId),
            99.99,
            @CategoryId
        );
    END

    FETCH NEXT FROM category_cursor INTO @CategoryId;
END

CLOSE category_cursor;
DEALLOCATE category_cursor;
