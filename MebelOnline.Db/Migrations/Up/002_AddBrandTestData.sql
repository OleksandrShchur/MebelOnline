-- Ukrainian furniture brands (demo). Prices elsewhere are UAH; brands have no currency column.

SET IDENTITY_INSERT dbo.Brands ON;

IF NOT EXISTS (SELECT 1 FROM dbo.Brands WHERE Id = 1)
INSERT INTO dbo.Brands (Id, Name, Description, ImageUrl)
VALUES (1, N'ВМК-Україна', N'Український виробник корпусних меблів.', N'https://picsum.photos/seed/brand-vmk/200/200');

IF NOT EXISTS (SELECT 1 FROM dbo.Brands WHERE Id = 2)
INSERT INTO dbo.Brands (Id, Name, Description, ImageUrl)
VALUES (2, N'Gerbor', N'Меблі для дому та офісу.', N'https://picsum.photos/seed/brand-gerbor/200/200');

IF NOT EXISTS (SELECT 1 FROM dbo.Brands WHERE Id = 3)
INSERT INTO dbo.Brands (Id, Name, Description, ImageUrl)
VALUES (3, N'Еверест', N'Корпусні меблі українського виробництва.', N'https://picsum.photos/seed/brand-everest/200/200');

IF NOT EXISTS (SELECT 1 FROM dbo.Brands WHERE Id = 4)
INSERT INTO dbo.Brands (Id, Name, Description, ImageUrl)
VALUES (4, N'Blest', N'М''які меблі: дивани та крісла.', N'https://picsum.photos/seed/brand-blest/200/200');

IF NOT EXISTS (SELECT 1 FROM dbo.Brands WHERE Id = 5)
INSERT INTO dbo.Brands (Id, Name, Description, ImageUrl)
VALUES (5, N'Novelty', N'Ліжка, матраци та меблі для спальні.', N'https://picsum.photos/seed/brand-novelty/200/200');

SET IDENTITY_INSERT dbo.Brands OFF;
