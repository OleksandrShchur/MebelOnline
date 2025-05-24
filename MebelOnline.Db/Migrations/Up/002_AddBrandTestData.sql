IF NOT EXISTS (SELECT 1 FROM Brands WHERE Name = 'Brand A')
BEGIN
    INSERT INTO Brands (Name, Description, ImageUrl)
    VALUES ('Brand A', 'Description for Brand A', 'https://example.com/brandA.jpg');
END

IF NOT EXISTS (SELECT 1 FROM Brands WHERE Name = 'Brand B')
BEGIN
    INSERT INTO Brands (Name, Description, ImageUrl)
    VALUES ('Brand B', 'Description for Brand B', 'https://example.com/brandB.jpg');
END

IF NOT EXISTS (SELECT 1 FROM Brands WHERE Name = 'Brand C')
BEGIN
    INSERT INTO Brands (Name, Description, ImageUrl)
    VALUES ('Brand C', 'Description for Brand C', 'https://example.com/brandC.jpg');
END
