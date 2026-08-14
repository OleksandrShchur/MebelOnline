-- Demo Ukrainian furniture products (UAH). Column is Title (not Name).
-- Stable ids 1–32 for tests. OptionType: 0=NotSpecified, 1=Front, 2=Frame.
-- Requires Products.Note and ProductOptions.Material + OptionType (created in 001).
-- If Msg 207 Invalid column name 'Material': re-run Up/001 (or Up/007) first, then this script.
-- Do not drop a live MebelOnline database to unblock this seed.

SET IDENTITY_INSERT dbo.Products ON;

IF NOT EXISTS (SELECT 1 FROM dbo.Products WHERE Id = 1)
INSERT INTO dbo.Products (Id, Title, Description, Price, OldPrice, CategoryId, Width, Height, Depth, BrandId, Note)
VALUES (1, N'Кухонний гарнітур «Скандинавія»', N'Прямий кухонний гарнітур з фасадами МДФ. Верхні та нижні модулі в комплекті.', 24999.00, 28999.00, 12, 280.00, 220.00, 60.00, 1, N'Збірка на місці за окремою домовленістю.');

IF NOT EXISTS (SELECT 1 FROM dbo.Products WHERE Id = 2)
INSERT INTO dbo.Products (Id, Title, Description, Price, OldPrice, CategoryId, Width, Height, Depth, BrandId, Note)
VALUES (2, N'Кухонний гарнітур «Лофт»', N'Кухня в стилі лофт з відкритими полицями та фасадами під бетон.', 31999.00, NULL, 12, 320.00, 230.00, 60.00, 3, NULL);

IF NOT EXISTS (SELECT 1 FROM dbo.Products WHERE Id = 3)
INSERT INTO dbo.Products (Id, Title, Description, Price, OldPrice, CategoryId, Width, Height, Depth, BrandId, Note)
VALUES (3, N'Кухонний модуль верхній 80 см', N'Навісна шафка з двома полицями. Підходить для готових гарнітурів.', 4299.00, NULL, 13, 80.00, 72.00, 32.00, 2, NULL);

IF NOT EXISTS (SELECT 1 FROM dbo.Products WHERE Id = 4)
INSERT INTO dbo.Products (Id, Title, Description, Price, OldPrice, CategoryId, Width, Height, Depth, BrandId, Note)
VALUES (4, N'Стіл обідній «Дуб натуральний»', N'Масив дуба, стійка до подряпин стільниця. На 6 персон.', 8999.00, 9999.00, 14, 160.00, 75.00, 90.00, 1, NULL);

IF NOT EXISTS (SELECT 1 FROM dbo.Products WHERE Id = 5)
INSERT INTO dbo.Products (Id, Title, Description, Price, OldPrice, CategoryId, Width, Height, Depth, BrandId, Note)
VALUES (5, N'Стіл розкладний «Клен»', N'Розкладний обідній стіл для кухні та їдальні.', 6499.00, NULL, 14, 120.00, 75.00, 80.00, 2, NULL);

IF NOT EXISTS (SELECT 1 FROM dbo.Products WHERE Id = 6)
INSERT INTO dbo.Products (Id, Title, Description, Price, OldPrice, CategoryId, Width, Height, Depth, BrandId, Note)
VALUES (6, N'Стілець «М''який»', N'Кухонний стілець з м''яким сидінням та спинкою.', 1899.00, NULL, 15, 45.00, 95.00, 52.00, 4, NULL);

IF NOT EXISTS (SELECT 1 FROM dbo.Products WHERE Id = 7)
INSERT INTO dbo.Products (Id, Title, Description, Price, OldPrice, CategoryId, Width, Height, Depth, BrandId, Note)
VALUES (7, N'Барний стілець «Лофт»', N'Високий стілець з металевим каркасом.', 2199.00, NULL, 15, 42.00, 105.00, 42.00, 3, NULL);

IF NOT EXISTS (SELECT 1 FROM dbo.Products WHERE Id = 8)
INSERT INTO dbo.Products (Id, Title, Description, Price, OldPrice, CategoryId, Width, Height, Depth, BrandId, Note)
VALUES (8, N'Шафа-купе 2-дверна', N'Шафа-купе з дзеркалом на одній стулці.', 12999.00, 14999.00, 16, 160.00, 220.00, 60.00, 2, NULL);

IF NOT EXISTS (SELECT 1 FROM dbo.Products WHERE Id = 9)
INSERT INTO dbo.Products (Id, Title, Description, Price, OldPrice, CategoryId, Width, Height, Depth, BrandId, Note)
VALUES (9, N'Шафа-купе 3-дверна', N'Простора шафа-купе з трьома відділеннями.', 17999.00, NULL, 16, 240.00, 220.00, 60.00, 1, N'Доставка по Україні.');

IF NOT EXISTS (SELECT 1 FROM dbo.Products WHERE Id = 10)
INSERT INTO dbo.Products (Id, Title, Description, Price, OldPrice, CategoryId, Width, Height, Depth, BrandId, Note)
VALUES (10, N'Шафа розпашна «Класика»', N'Двостулкова шафа з штангою та полицями.', 9999.00, NULL, 17, 120.00, 210.00, 55.00, 3, NULL);

IF NOT EXISTS (SELECT 1 FROM dbo.Products WHERE Id = 11)
INSERT INTO dbo.Products (Id, Title, Description, Price, OldPrice, CategoryId, Width, Height, Depth, BrandId, Note)
VALUES (11, N'Ліжко двоспальне «Орлеан»', N'Двоспальне ліжко з підйомним механізмом та нішею для білизни.', 15999.00, 18999.00, 18, 180.00, 95.00, 210.00, 5, N'Матрац у комплект не входить.');

IF NOT EXISTS (SELECT 1 FROM dbo.Products WHERE Id = 12)
INSERT INTO dbo.Products (Id, Title, Description, Price, OldPrice, CategoryId, Width, Height, Depth, BrandId, Note)
VALUES (12, N'Ліжко двоспальне «Мілан»', N'М''яке узголів''я, каркас з ДСП.', 13999.00, NULL, 18, 160.00, 100.00, 200.00, 5, NULL);

IF NOT EXISTS (SELECT 1 FROM dbo.Products WHERE Id = 13)
INSERT INTO dbo.Products (Id, Title, Description, Price, OldPrice, CategoryId, Width, Height, Depth, BrandId, Note)
VALUES (13, N'Ліжко односпальне «Софія»', N'Односпальне ліжко для спальні або дитячої.', 6999.00, NULL, 19, 90.00, 85.00, 200.00, 2, NULL);

IF NOT EXISTS (SELECT 1 FROM dbo.Products WHERE Id = 14)
INSERT INTO dbo.Products (Id, Title, Description, Price, OldPrice, CategoryId, Width, Height, Depth, BrandId, Note)
VALUES (14, N'Матрац ортопедичний 160x200', N'Ортопедичний матрац середньої жорсткості.', 8999.00, NULL, 20, 160.00, 22.00, 200.00, 5, NULL);

IF NOT EXISTS (SELECT 1 FROM dbo.Products WHERE Id = 15)
INSERT INTO dbo.Products (Id, Title, Description, Price, OldPrice, CategoryId, Width, Height, Depth, BrandId, Note)
VALUES (15, N'Матрац ортопедичний 180x200', N'Ортопедичний матрац для двоспального ліжка.', 9999.00, 10999.00, 20, 180.00, 22.00, 200.00, 5, NULL);

IF NOT EXISTS (SELECT 1 FROM dbo.Products WHERE Id = 16)
INSERT INTO dbo.Products (Id, Title, Description, Price, OldPrice, CategoryId, Width, Height, Depth, BrandId, Note)
VALUES (16, N'Матрац пружинний Pocket Spring', N'Незалежні пружини, чохол з бязі.', 7499.00, NULL, 21, 160.00, 18.00, 200.00, 5, NULL);

IF NOT EXISTS (SELECT 1 FROM dbo.Products WHERE Id = 17)
INSERT INTO dbo.Products (Id, Title, Description, Price, OldPrice, CategoryId, Width, Height, Depth, BrandId, Note)
VALUES (17, N'Ліжко дитяче «Кораблик»', N'Дитяче ліжко з бортиком безпеки.', 5499.00, NULL, 22, 80.00, 70.00, 180.00, 2, NULL);

IF NOT EXISTS (SELECT 1 FROM dbo.Products WHERE Id = 18)
INSERT INTO dbo.Products (Id, Title, Description, Price, OldPrice, CategoryId, Width, Height, Depth, BrandId, Note)
VALUES (18, N'Стіл письмовий дитячий', N'Регульована стільниця, полиця для книжок.', 3299.00, NULL, 23, 110.00, 75.00, 55.00, 3, NULL);

IF NOT EXISTS (SELECT 1 FROM dbo.Products WHERE Id = 19)
INSERT INTO dbo.Products (Id, Title, Description, Price, OldPrice, CategoryId, Width, Height, Depth, BrandId, Note)
VALUES (19, N'Комод 4 шухляди', N'Комод з чотирма шухлядами на телескопічних напрямних.', 4599.00, NULL, 24, 80.00, 90.00, 45.00, 1, NULL);

IF NOT EXISTS (SELECT 1 FROM dbo.Products WHERE Id = 20)
INSERT INTO dbo.Products (Id, Title, Description, Price, OldPrice, CategoryId, Width, Height, Depth, BrandId, Note)
VALUES (20, N'Тумба приліжкова «Ночі»', N'Тумба з шухлядою та відкритою нішею.', 1999.00, NULL, 25, 45.00, 50.00, 40.00, 2, NULL);

IF NOT EXISTS (SELECT 1 FROM dbo.Products WHERE Id = 21)
INSERT INTO dbo.Products (Id, Title, Description, Price, OldPrice, CategoryId, Width, Height, Depth, BrandId, Note)
VALUES (21, N'Шафа в передпокій «Хол»', N'Вузька шафа з гачками та полицею для взуття.', 7999.00, NULL, 26, 80.00, 200.00, 40.00, 1, NULL);

IF NOT EXISTS (SELECT 1 FROM dbo.Products WHERE Id = 22)
INSERT INTO dbo.Products (Id, Title, Description, Price, OldPrice, CategoryId, Width, Height, Depth, BrandId, Note)
VALUES (22, N'Вішак підлоговий', N'Металевий вішак для одягу в передпокій.', 1299.00, NULL, 27, 50.00, 170.00, 50.00, 3, NULL);

IF NOT EXISTS (SELECT 1 FROM dbo.Products WHERE Id = 23)
INSERT INTO dbo.Products (Id, Title, Description, Price, OldPrice, CategoryId, Width, Height, Depth, BrandId, Note)
VALUES (23, N'Стіл офісний «Ріо»', N'Письмовий стіл з тумбою зліва.', 5699.00, NULL, 28, 140.00, 75.00, 70.00, 2, NULL);

IF NOT EXISTS (SELECT 1 FROM dbo.Products WHERE Id = 24)
INSERT INTO dbo.Products (Id, Title, Description, Price, OldPrice, CategoryId, Width, Height, Depth, BrandId, Note)
VALUES (24, N'Крісло офісне «Комфорт»', N'Сітка на спинці, регульована висота.', 3999.00, 4499.00, 29, 65.00, 120.00, 65.00, 2, NULL);

IF NOT EXISTS (SELECT 1 FROM dbo.Products WHERE Id = 25)
INSERT INTO dbo.Products (Id, Title, Description, Price, OldPrice, CategoryId, Width, Height, Depth, BrandId, Note)
VALUES (25, N'Диван прямий «Орлеан»', N'Прямий диван з велюровою оббивкою. Розкладний механізм єврокнижка.', 18999.00, 21999.00, 30, 220.00, 90.00, 95.00, 4, N'Тканина антикіготь — за запитом.');

IF NOT EXISTS (SELECT 1 FROM dbo.Products WHERE Id = 26)
INSERT INTO dbo.Products (Id, Title, Description, Price, OldPrice, CategoryId, Width, Height, Depth, BrandId, Note)
VALUES (26, N'Диван прямий «Велюр»', N'Компактний прямий диван для вітальні.', 14999.00, NULL, 30, 200.00, 85.00, 90.00, 4, NULL);

IF NOT EXISTS (SELECT 1 FROM dbo.Products WHERE Id = 27)
INSERT INTO dbo.Products (Id, Title, Description, Price, OldPrice, CategoryId, Width, Height, Depth, BrandId, Note)
VALUES (27, N'Диван прямий з нішею «Берлін»', N'Прямий диван з нішею для білизни під сидінням.', 16999.00, NULL, 34, 210.00, 88.00, 95.00, 4, NULL);

IF NOT EXISTS (SELECT 1 FROM dbo.Products WHERE Id = 28)
INSERT INTO dbo.Products (Id, Title, Description, Price, OldPrice, CategoryId, Width, Height, Depth, BrandId, Note)
VALUES (28, N'Диван кутовий «Атланта»', N'Кутовий диван з правим відтоком.', 24999.00, 27999.00, 31, 270.00, 90.00, 160.00, 4, NULL);

IF NOT EXISTS (SELECT 1 FROM dbo.Products WHERE Id = 29)
INSERT INTO dbo.Products (Id, Title, Description, Price, OldPrice, CategoryId, Width, Height, Depth, BrandId, Note)
VALUES (29, N'Диван кутовий з баром «Прага»', N'Кутовий диван з барним відділенням у підлокітнику.', 28999.00, NULL, 35, 280.00, 92.00, 170.00, 4, NULL);

IF NOT EXISTS (SELECT 1 FROM dbo.Products WHERE Id = 30)
INSERT INTO dbo.Products (Id, Title, Description, Price, OldPrice, CategoryId, Width, Height, Depth, BrandId, Note)
VALUES (30, N'Тумба під умивальник 80 см', N'Тумба з двома шухлядами, стільниця під накладний умивальник.', 6799.00, NULL, 32, 80.00, 80.00, 45.00, 1, NULL);

IF NOT EXISTS (SELECT 1 FROM dbo.Products WHERE Id = 31)
INSERT INTO dbo.Products (Id, Title, Description, Price, OldPrice, CategoryId, Width, Height, Depth, BrandId, Note)
VALUES (31, N'Дзеркало з шафкою для ванни', N'Навісне дзеркало з шафкою та підсвіткою.', 3599.00, NULL, 33, 60.00, 80.00, 15.00, 3, NULL);

-- Same price as product 10 (9999) to exercise Id tie-break. No images (card mapper must not throw).
IF NOT EXISTS (SELECT 1 FROM dbo.Products WHERE Id = 32)
INSERT INTO dbo.Products (Id, Title, Description, Price, OldPrice, CategoryId, Width, Height, Depth, BrandId, Note)
VALUES (32, N'Шафа розпашна «Економ»', N'Базова розпашна шафа без додаткових опцій.', 9999.00, NULL, 17, 100.00, 200.00, 50.00, 3, NULL);

SET IDENTITY_INSERT dbo.Products OFF;

-- Images (product 32 intentionally has none)
IF NOT EXISTS (SELECT 1 FROM dbo.ProductImages WHERE ProductId = 1)
INSERT INTO dbo.ProductImages (ProductId, Url, IsPrimary) VALUES
    (1, N'https://picsum.photos/seed/mo-1-1/800/600', 1),
    (1, N'https://picsum.photos/seed/mo-1-2/800/600', 0),
    (1, N'https://picsum.photos/seed/mo-1-3/800/600', 0);

IF NOT EXISTS (SELECT 1 FROM dbo.ProductImages WHERE ProductId = 2)
INSERT INTO dbo.ProductImages (ProductId, Url, IsPrimary) VALUES (2, N'https://picsum.photos/seed/mo-2-1/800/600', 1);

IF NOT EXISTS (SELECT 1 FROM dbo.ProductImages WHERE ProductId = 3)
INSERT INTO dbo.ProductImages (ProductId, Url, IsPrimary) VALUES (3, N'https://picsum.photos/seed/mo-3-1/800/600', 1);

IF NOT EXISTS (SELECT 1 FROM dbo.ProductImages WHERE ProductId = 4)
INSERT INTO dbo.ProductImages (ProductId, Url, IsPrimary) VALUES
    (4, N'https://picsum.photos/seed/mo-4-1/800/600', 1),
    (4, N'https://picsum.photos/seed/mo-4-2/800/600', 0);

IF NOT EXISTS (SELECT 1 FROM dbo.ProductImages WHERE ProductId = 5)
INSERT INTO dbo.ProductImages (ProductId, Url, IsPrimary) VALUES (5, N'https://picsum.photos/seed/mo-5-1/800/600', 1);

IF NOT EXISTS (SELECT 1 FROM dbo.ProductImages WHERE ProductId = 6)
INSERT INTO dbo.ProductImages (ProductId, Url, IsPrimary) VALUES (6, N'https://picsum.photos/seed/mo-6-1/800/600', 1);

IF NOT EXISTS (SELECT 1 FROM dbo.ProductImages WHERE ProductId = 7)
INSERT INTO dbo.ProductImages (ProductId, Url, IsPrimary) VALUES (7, N'https://picsum.photos/seed/mo-7-1/800/600', 1);

IF NOT EXISTS (SELECT 1 FROM dbo.ProductImages WHERE ProductId = 8)
INSERT INTO dbo.ProductImages (ProductId, Url, IsPrimary) VALUES
    (8, N'https://picsum.photos/seed/mo-8-1/800/600', 1),
    (8, N'https://picsum.photos/seed/mo-8-2/800/600', 0);

IF NOT EXISTS (SELECT 1 FROM dbo.ProductImages WHERE ProductId = 9)
INSERT INTO dbo.ProductImages (ProductId, Url, IsPrimary) VALUES (9, N'https://picsum.photos/seed/mo-9-1/800/600', 1);

IF NOT EXISTS (SELECT 1 FROM dbo.ProductImages WHERE ProductId = 10)
INSERT INTO dbo.ProductImages (ProductId, Url, IsPrimary) VALUES (10, N'https://picsum.photos/seed/mo-10-1/800/600', 1);

IF NOT EXISTS (SELECT 1 FROM dbo.ProductImages WHERE ProductId = 11)
INSERT INTO dbo.ProductImages (ProductId, Url, IsPrimary) VALUES
    (11, N'https://picsum.photos/seed/mo-11-1/800/600', 1),
    (11, N'https://picsum.photos/seed/mo-11-2/800/600', 0),
    (11, N'https://picsum.photos/seed/mo-11-3/800/600', 0);

IF NOT EXISTS (SELECT 1 FROM dbo.ProductImages WHERE ProductId = 12)
INSERT INTO dbo.ProductImages (ProductId, Url, IsPrimary) VALUES (12, N'https://picsum.photos/seed/mo-12-1/800/600', 1);

IF NOT EXISTS (SELECT 1 FROM dbo.ProductImages WHERE ProductId = 13)
INSERT INTO dbo.ProductImages (ProductId, Url, IsPrimary) VALUES (13, N'https://picsum.photos/seed/mo-13-1/800/600', 1);

IF NOT EXISTS (SELECT 1 FROM dbo.ProductImages WHERE ProductId = 14)
INSERT INTO dbo.ProductImages (ProductId, Url, IsPrimary) VALUES (14, N'https://picsum.photos/seed/mo-14-1/800/600', 1);

IF NOT EXISTS (SELECT 1 FROM dbo.ProductImages WHERE ProductId = 15)
INSERT INTO dbo.ProductImages (ProductId, Url, IsPrimary) VALUES (15, N'https://picsum.photos/seed/mo-15-1/800/600', 1);

IF NOT EXISTS (SELECT 1 FROM dbo.ProductImages WHERE ProductId = 16)
INSERT INTO dbo.ProductImages (ProductId, Url, IsPrimary) VALUES (16, N'https://picsum.photos/seed/mo-16-1/800/600', 1);

IF NOT EXISTS (SELECT 1 FROM dbo.ProductImages WHERE ProductId = 17)
INSERT INTO dbo.ProductImages (ProductId, Url, IsPrimary) VALUES (17, N'https://picsum.photos/seed/mo-17-1/800/600', 1);

IF NOT EXISTS (SELECT 1 FROM dbo.ProductImages WHERE ProductId = 18)
INSERT INTO dbo.ProductImages (ProductId, Url, IsPrimary) VALUES (18, N'https://picsum.photos/seed/mo-18-1/800/600', 1);

IF NOT EXISTS (SELECT 1 FROM dbo.ProductImages WHERE ProductId = 19)
INSERT INTO dbo.ProductImages (ProductId, Url, IsPrimary) VALUES (19, N'https://picsum.photos/seed/mo-19-1/800/600', 1);

IF NOT EXISTS (SELECT 1 FROM dbo.ProductImages WHERE ProductId = 20)
INSERT INTO dbo.ProductImages (ProductId, Url, IsPrimary) VALUES (20, N'https://picsum.photos/seed/mo-20-1/800/600', 1);

IF NOT EXISTS (SELECT 1 FROM dbo.ProductImages WHERE ProductId = 21)
INSERT INTO dbo.ProductImages (ProductId, Url, IsPrimary) VALUES (21, N'https://picsum.photos/seed/mo-21-1/800/600', 1);

IF NOT EXISTS (SELECT 1 FROM dbo.ProductImages WHERE ProductId = 22)
INSERT INTO dbo.ProductImages (ProductId, Url, IsPrimary) VALUES (22, N'https://picsum.photos/seed/mo-22-1/800/600', 1);

IF NOT EXISTS (SELECT 1 FROM dbo.ProductImages WHERE ProductId = 23)
INSERT INTO dbo.ProductImages (ProductId, Url, IsPrimary) VALUES (23, N'https://picsum.photos/seed/mo-23-1/800/600', 1);

IF NOT EXISTS (SELECT 1 FROM dbo.ProductImages WHERE ProductId = 24)
INSERT INTO dbo.ProductImages (ProductId, Url, IsPrimary) VALUES (24, N'https://picsum.photos/seed/mo-24-1/800/600', 1);

IF NOT EXISTS (SELECT 1 FROM dbo.ProductImages WHERE ProductId = 25)
INSERT INTO dbo.ProductImages (ProductId, Url, IsPrimary) VALUES
    (25, N'https://picsum.photos/seed/mo-25-1/800/600', 1),
    (25, N'https://picsum.photos/seed/mo-25-2/800/600', 0),
    (25, N'https://picsum.photos/seed/mo-25-3/800/600', 0),
    (25, N'https://picsum.photos/seed/mo-25-4/800/600', 0);

IF NOT EXISTS (SELECT 1 FROM dbo.ProductImages WHERE ProductId = 26)
INSERT INTO dbo.ProductImages (ProductId, Url, IsPrimary) VALUES (26, N'https://picsum.photos/seed/mo-26-1/800/600', 1);

IF NOT EXISTS (SELECT 1 FROM dbo.ProductImages WHERE ProductId = 27)
INSERT INTO dbo.ProductImages (ProductId, Url, IsPrimary) VALUES
    (27, N'https://picsum.photos/seed/mo-27-1/800/600', 1),
    (27, N'https://picsum.photos/seed/mo-27-2/800/600', 0);

IF NOT EXISTS (SELECT 1 FROM dbo.ProductImages WHERE ProductId = 28)
INSERT INTO dbo.ProductImages (ProductId, Url, IsPrimary) VALUES
    (28, N'https://picsum.photos/seed/mo-28-1/800/600', 1),
    (28, N'https://picsum.photos/seed/mo-28-2/800/600', 0);

IF NOT EXISTS (SELECT 1 FROM dbo.ProductImages WHERE ProductId = 29)
INSERT INTO dbo.ProductImages (ProductId, Url, IsPrimary) VALUES
    (29, N'https://picsum.photos/seed/mo-29-1/800/600', 1),
    (29, N'https://picsum.photos/seed/mo-29-2/800/600', 0);

IF NOT EXISTS (SELECT 1 FROM dbo.ProductImages WHERE ProductId = 30)
INSERT INTO dbo.ProductImages (ProductId, Url, IsPrimary) VALUES (30, N'https://picsum.photos/seed/mo-30-1/800/600', 1);

IF NOT EXISTS (SELECT 1 FROM dbo.ProductImages WHERE ProductId = 31)
INSERT INTO dbo.ProductImages (ProductId, Url, IsPrimary) VALUES (31, N'https://picsum.photos/seed/mo-31-1/800/600', 1);

-- Front (1) / Frame (2) options — keep Material column populated
IF NOT EXISTS (SELECT 1 FROM dbo.ProductOptions WHERE ProductId = 1)
INSERT INTO dbo.ProductOptions (ProductId, ColorName, Material, OptionType, ImageUrl) VALUES
    (1, N'Білий глянець', N'МДФ', 1, N'https://picsum.photos/seed/opt-1-front-white/80/80'),
    (1, N'Дуб сонома', N'МДФ', 1, N'https://picsum.photos/seed/opt-1-front-oak/80/80'),
    (1, N'Білий', N'ДСП', 2, N'https://picsum.photos/seed/opt-1-frame-white/80/80'),
    (1, N'Графіт', N'ДСП', 2, N'https://picsum.photos/seed/opt-1-frame-graphite/80/80');

IF NOT EXISTS (SELECT 1 FROM dbo.ProductOptions WHERE ProductId = 11)
INSERT INTO dbo.ProductOptions (ProductId, ColorName, Material, OptionType, ImageUrl) VALUES
    (11, N'Сірий велюр', N'Велюр', 1, N'https://picsum.photos/seed/opt-11-front-grey/80/80'),
    (11, N'Бежевий велюр', N'Велюр', 1, N'https://picsum.photos/seed/opt-11-front-beige/80/80'),
    (11, N'Венге', N'ДСП', 2, N'https://picsum.photos/seed/opt-11-frame-wenge/80/80');

IF NOT EXISTS (SELECT 1 FROM dbo.ProductOptions WHERE ProductId = 25)
INSERT INTO dbo.ProductOptions (ProductId, ColorName, Material, OptionType, ImageUrl) VALUES
    (25, N'Сірий', N'Велюр', 1, N'https://picsum.photos/seed/opt-25-front-grey/80/80'),
    (25, N'Синій', N'Велюр', 1, N'https://picsum.photos/seed/opt-25-front-blue/80/80'),
    (25, N'Бежевий', N'Екошкіра', 1, N'https://picsum.photos/seed/opt-25-front-beige/80/80'),
    (25, N'Чорний', N'ДСП', 2, N'https://picsum.photos/seed/opt-25-frame-black/80/80'),
    (25, N'Горіх', N'ДСП', 2, N'https://picsum.photos/seed/opt-25-frame-walnut/80/80');

IF NOT EXISTS (SELECT 1 FROM dbo.ProductOptions WHERE ProductId = 28)
INSERT INTO dbo.ProductOptions (ProductId, ColorName, Material, OptionType, ImageUrl) VALUES
    (28, N'Графіт', N'Велюр', 1, N'https://picsum.photos/seed/opt-28-front-graphite/80/80'),
    (28, N'Оливковий', N'Велюр', 1, N'https://picsum.photos/seed/opt-28-front-olive/80/80'),
    (28, N'Венге', N'ДСП', 2, N'https://picsum.photos/seed/opt-28-frame-wenge/80/80');

-- EAV attributes (Матеріал is the sidebar filter name)
DECLARE @ColorId INT = (SELECT Id FROM dbo.ProductAttributes WHERE Name = N'Колір');
DECLARE @MaterialId INT = (SELECT Id FROM dbo.ProductAttributes WHERE Name = N'Матеріал');
DECLARE @SizeId INT = (SELECT Id FROM dbo.ProductAttributes WHERE Name = N'Розмір');

IF @MaterialId IS NOT NULL AND NOT EXISTS (SELECT 1 FROM dbo.ProductAttributeValues WHERE ProductId = 1)
BEGIN
    INSERT INTO dbo.ProductAttributeValues (ProductId, AttributeId, Value) VALUES
        (1, @MaterialId, N'МДФ'),
        (1, @ColorId, N'Білий'),
        (1, @SizeId, N'280 см');

    INSERT INTO dbo.ProductAttributeValues (ProductId, AttributeId, Value) VALUES
        (4, @MaterialId, N'Дуб'),
        (4, @ColorId, N'Натуральний'),
        (4, @SizeId, N'160x90 см');

    INSERT INTO dbo.ProductAttributeValues (ProductId, AttributeId, Value) VALUES
        (8, @MaterialId, N'ДСП'),
        (8, @ColorId, N'Білий'),
        (8, @SizeId, N'160 см');

    INSERT INTO dbo.ProductAttributeValues (ProductId, AttributeId, Value) VALUES
        (11, @MaterialId, N'ДСП'),
        (11, @ColorId, N'Сірий'),
        (11, @SizeId, N'180x200 см');

    INSERT INTO dbo.ProductAttributeValues (ProductId, AttributeId, Value) VALUES
        (14, @MaterialId, N'Кокосова койра'),
        (14, @SizeId, N'160x200 см');

    INSERT INTO dbo.ProductAttributeValues (ProductId, AttributeId, Value) VALUES
        (19, @MaterialId, N'ДСП'),
        (19, @ColorId, N'Дуб сонома');

    INSERT INTO dbo.ProductAttributeValues (ProductId, AttributeId, Value) VALUES
        (25, @MaterialId, N'Велюр'),
        (25, @ColorId, N'Сірий'),
        (25, @SizeId, N'220 см');

    INSERT INTO dbo.ProductAttributeValues (ProductId, AttributeId, Value) VALUES
        (26, @MaterialId, N'Велюр'),
        (26, @ColorId, N'Бежевий');

    INSERT INTO dbo.ProductAttributeValues (ProductId, AttributeId, Value) VALUES
        (27, @MaterialId, N'Екошкіра'),
        (27, @ColorId, N'Чорний');

    INSERT INTO dbo.ProductAttributeValues (ProductId, AttributeId, Value) VALUES
        (28, @MaterialId, N'Велюр'),
        (28, @ColorId, N'Графіт');

    INSERT INTO dbo.ProductAttributeValues (ProductId, AttributeId, Value) VALUES
        (29, @MaterialId, N'Екошкіра'),
        (29, @ColorId, N'Коричневий');

    INSERT INTO dbo.ProductAttributeValues (ProductId, AttributeId, Value) VALUES
        (10, @MaterialId, N'ДСП'),
        (32, @MaterialId, N'ДСП');
END;

UPDATE c
SET c.HasProducts = 1
FROM dbo.Categories c
WHERE EXISTS (SELECT 1 FROM dbo.Products p WHERE p.CategoryId = c.Id);
