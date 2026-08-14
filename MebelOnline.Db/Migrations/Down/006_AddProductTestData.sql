DELETE FROM dbo.ProductAttributeValues;
DELETE FROM dbo.ProductOptions;
DELETE FROM dbo.ProductImages;
DELETE FROM dbo.Products;

UPDATE dbo.Categories SET HasProducts = 0;
