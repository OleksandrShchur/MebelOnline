IF NOT EXISTS (SELECT 1 FROM ProductAttributes WHERE Name = 'Color')
BEGIN
    INSERT INTO ProductAttributes (Name)
    VALUES ('Color');
END

IF NOT EXISTS (SELECT 1 FROM ProductAttributes WHERE Name = 'Material')
BEGIN
    INSERT INTO ProductAttributes (Name)
    VALUES ('Material');
END

IF NOT EXISTS (SELECT 1 FROM ProductAttributes WHERE Name = 'Size')
BEGIN
    INSERT INTO ProductAttributes (Name)
    VALUES ('Size');
END
