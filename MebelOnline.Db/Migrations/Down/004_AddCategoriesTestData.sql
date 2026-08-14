-- Children first because of FK_Category_ParentCategory.
DELETE FROM dbo.Categories WHERE Id IN (34, 35);
DELETE FROM dbo.Categories WHERE Id BETWEEN 12 AND 33;
DELETE FROM dbo.Categories WHERE Id BETWEEN 1 AND 11;
