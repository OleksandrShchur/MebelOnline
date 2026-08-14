-- Catalog attribute names in Ukrainian. Search material filter looks up N'Матеріал'.

IF NOT EXISTS (SELECT 1 FROM dbo.ProductAttributes WHERE Name = N'Колір')
INSERT INTO dbo.ProductAttributes (Name) VALUES (N'Колір');

IF NOT EXISTS (SELECT 1 FROM dbo.ProductAttributes WHERE Name = N'Матеріал')
INSERT INTO dbo.ProductAttributes (Name) VALUES (N'Матеріал');

IF NOT EXISTS (SELECT 1 FROM dbo.ProductAttributes WHERE Name = N'Розмір')
INSERT INTO dbo.ProductAttributes (Name) VALUES (N'Розмір');
