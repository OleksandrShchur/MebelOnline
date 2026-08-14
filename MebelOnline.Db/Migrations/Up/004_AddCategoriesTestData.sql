-- Ukrainian furniture categories matching the reference landing (top level)
-- plus a 3-level tree so category descendant filters can be exercised.

-- Level 1 — landing catalog cards
IF NOT EXISTS (SELECT 1 FROM dbo.Categories WHERE Id = 1)
INSERT INTO dbo.Categories (Id, Name, ImageUrl, ParentCategoryId, HasProducts)
VALUES (1, N'Кухні', N'https://picsum.photos/seed/cat-kuhni/400/300', NULL, 0);

IF NOT EXISTS (SELECT 1 FROM dbo.Categories WHERE Id = 2)
INSERT INTO dbo.Categories (Id, Name, ImageUrl, ParentCategoryId, HasProducts)
VALUES (2, N'Кухонні столи та стільці', N'https://picsum.photos/seed/cat-stoly/400/300', NULL, 0);

IF NOT EXISTS (SELECT 1 FROM dbo.Categories WHERE Id = 3)
INSERT INTO dbo.Categories (Id, Name, ImageUrl, ParentCategoryId, HasProducts)
VALUES (3, N'Шафи', N'https://picsum.photos/seed/cat-shafy/400/300', NULL, 0);

IF NOT EXISTS (SELECT 1 FROM dbo.Categories WHERE Id = 4)
INSERT INTO dbo.Categories (Id, Name, ImageUrl, ParentCategoryId, HasProducts)
VALUES (4, N'Ліжка', N'https://picsum.photos/seed/cat-lizhka/400/300', NULL, 0);

IF NOT EXISTS (SELECT 1 FROM dbo.Categories WHERE Id = 5)
INSERT INTO dbo.Categories (Id, Name, ImageUrl, ParentCategoryId, HasProducts)
VALUES (5, N'Матраци', N'https://picsum.photos/seed/cat-matratsy/400/300', NULL, 0);

IF NOT EXISTS (SELECT 1 FROM dbo.Categories WHERE Id = 6)
INSERT INTO dbo.Categories (Id, Name, ImageUrl, ParentCategoryId, HasProducts)
VALUES (6, N'Дитячі меблі', N'https://picsum.photos/seed/cat-dytyachi/400/300', NULL, 0);

IF NOT EXISTS (SELECT 1 FROM dbo.Categories WHERE Id = 7)
INSERT INTO dbo.Categories (Id, Name, ImageUrl, ParentCategoryId, HasProducts)
VALUES (7, N'Комоди та тумби', N'https://picsum.photos/seed/cat-komody/400/300', NULL, 0);

IF NOT EXISTS (SELECT 1 FROM dbo.Categories WHERE Id = 8)
INSERT INTO dbo.Categories (Id, Name, ImageUrl, ParentCategoryId, HasProducts)
VALUES (8, N'Меблі для передпокою', N'https://picsum.photos/seed/cat-peredpokiy/400/300', NULL, 0);

IF NOT EXISTS (SELECT 1 FROM dbo.Categories WHERE Id = 9)
INSERT INTO dbo.Categories (Id, Name, ImageUrl, ParentCategoryId, HasProducts)
VALUES (9, N'Офісні меблі', N'https://picsum.photos/seed/cat-office/400/300', NULL, 0);

IF NOT EXISTS (SELECT 1 FROM dbo.Categories WHERE Id = 10)
INSERT INTO dbo.Categories (Id, Name, ImageUrl, ParentCategoryId, HasProducts)
VALUES (10, N'Дивани', N'https://picsum.photos/seed/cat-dyvany/400/300', NULL, 0);

IF NOT EXISTS (SELECT 1 FROM dbo.Categories WHERE Id = 11)
INSERT INTO dbo.Categories (Id, Name, ImageUrl, ParentCategoryId, HasProducts)
VALUES (11, N'Меблі для ванни', N'https://picsum.photos/seed/cat-vanna/400/300', NULL, 0);

-- Level 2
IF NOT EXISTS (SELECT 1 FROM dbo.Categories WHERE Id = 12)
INSERT INTO dbo.Categories (Id, Name, ParentCategoryId, HasProducts) VALUES (12, N'Кухонні гарнітури', 1, 0);

IF NOT EXISTS (SELECT 1 FROM dbo.Categories WHERE Id = 13)
INSERT INTO dbo.Categories (Id, Name, ParentCategoryId, HasProducts) VALUES (13, N'Кухонні модулі', 1, 0);

IF NOT EXISTS (SELECT 1 FROM dbo.Categories WHERE Id = 14)
INSERT INTO dbo.Categories (Id, Name, ParentCategoryId, HasProducts) VALUES (14, N'Кухонні столи', 2, 0);

IF NOT EXISTS (SELECT 1 FROM dbo.Categories WHERE Id = 15)
INSERT INTO dbo.Categories (Id, Name, ParentCategoryId, HasProducts) VALUES (15, N'Кухонні стільці', 2, 0);

IF NOT EXISTS (SELECT 1 FROM dbo.Categories WHERE Id = 16)
INSERT INTO dbo.Categories (Id, Name, ParentCategoryId, HasProducts) VALUES (16, N'Шафи-купе', 3, 0);

IF NOT EXISTS (SELECT 1 FROM dbo.Categories WHERE Id = 17)
INSERT INTO dbo.Categories (Id, Name, ParentCategoryId, HasProducts) VALUES (17, N'Розпашні шафи', 3, 0);

IF NOT EXISTS (SELECT 1 FROM dbo.Categories WHERE Id = 18)
INSERT INTO dbo.Categories (Id, Name, ParentCategoryId, HasProducts) VALUES (18, N'Двоспальні ліжка', 4, 0);

IF NOT EXISTS (SELECT 1 FROM dbo.Categories WHERE Id = 19)
INSERT INTO dbo.Categories (Id, Name, ParentCategoryId, HasProducts) VALUES (19, N'Односпальні ліжка', 4, 0);

IF NOT EXISTS (SELECT 1 FROM dbo.Categories WHERE Id = 20)
INSERT INTO dbo.Categories (Id, Name, ParentCategoryId, HasProducts) VALUES (20, N'Ортопедичні матраци', 5, 0);

IF NOT EXISTS (SELECT 1 FROM dbo.Categories WHERE Id = 21)
INSERT INTO dbo.Categories (Id, Name, ParentCategoryId, HasProducts) VALUES (21, N'Пружинні матраци', 5, 0);

IF NOT EXISTS (SELECT 1 FROM dbo.Categories WHERE Id = 22)
INSERT INTO dbo.Categories (Id, Name, ParentCategoryId, HasProducts) VALUES (22, N'Дитячі ліжка', 6, 0);

IF NOT EXISTS (SELECT 1 FROM dbo.Categories WHERE Id = 23)
INSERT INTO dbo.Categories (Id, Name, ParentCategoryId, HasProducts) VALUES (23, N'Дитячі письмові столи', 6, 0);

IF NOT EXISTS (SELECT 1 FROM dbo.Categories WHERE Id = 24)
INSERT INTO dbo.Categories (Id, Name, ParentCategoryId, HasProducts) VALUES (24, N'Комоди', 7, 0);

IF NOT EXISTS (SELECT 1 FROM dbo.Categories WHERE Id = 25)
INSERT INTO dbo.Categories (Id, Name, ParentCategoryId, HasProducts) VALUES (25, N'Тумби приліжкові', 7, 0);

IF NOT EXISTS (SELECT 1 FROM dbo.Categories WHERE Id = 26)
INSERT INTO dbo.Categories (Id, Name, ParentCategoryId, HasProducts) VALUES (26, N'Шафи в передпокій', 8, 0);

IF NOT EXISTS (SELECT 1 FROM dbo.Categories WHERE Id = 27)
INSERT INTO dbo.Categories (Id, Name, ParentCategoryId, HasProducts) VALUES (27, N'Вішаки', 8, 0);

IF NOT EXISTS (SELECT 1 FROM dbo.Categories WHERE Id = 28)
INSERT INTO dbo.Categories (Id, Name, ParentCategoryId, HasProducts) VALUES (28, N'Офісні столи', 9, 0);

IF NOT EXISTS (SELECT 1 FROM dbo.Categories WHERE Id = 29)
INSERT INTO dbo.Categories (Id, Name, ParentCategoryId, HasProducts) VALUES (29, N'Офісні крісла', 9, 0);

IF NOT EXISTS (SELECT 1 FROM dbo.Categories WHERE Id = 30)
INSERT INTO dbo.Categories (Id, Name, ParentCategoryId, HasProducts) VALUES (30, N'Прямі дивани', 10, 0);

IF NOT EXISTS (SELECT 1 FROM dbo.Categories WHERE Id = 31)
INSERT INTO dbo.Categories (Id, Name, ParentCategoryId, HasProducts) VALUES (31, N'Кутові дивани', 10, 0);

IF NOT EXISTS (SELECT 1 FROM dbo.Categories WHERE Id = 32)
INSERT INTO dbo.Categories (Id, Name, ParentCategoryId, HasProducts) VALUES (32, N'Тумби під умивальник', 11, 0);

IF NOT EXISTS (SELECT 1 FROM dbo.Categories WHERE Id = 33)
INSERT INTO dbo.Categories (Id, Name, ParentCategoryId, HasProducts) VALUES (33, N'Дзеркала для ванни', 11, 0);

-- Level 3 (under sofas — descendant filter)
IF NOT EXISTS (SELECT 1 FROM dbo.Categories WHERE Id = 34)
INSERT INTO dbo.Categories (Id, Name, ParentCategoryId, HasProducts) VALUES (34, N'Прямі дивани з нішею', 30, 0);

IF NOT EXISTS (SELECT 1 FROM dbo.Categories WHERE Id = 35)
INSERT INTO dbo.Categories (Id, Name, ParentCategoryId, HasProducts) VALUES (35, N'Кутові дивани з барним відділенням', 31, 0);
