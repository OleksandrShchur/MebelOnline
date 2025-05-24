-- Level 1 - Root Categories
IF NOT EXISTS (SELECT 1 FROM dbo.Categories WHERE Id = 1)
INSERT INTO dbo.Categories (Id, Name, ParentCategoryId, HasProducts) VALUES (1, 'Furniture', NULL, 0);

IF NOT EXISTS (SELECT 1 FROM dbo.Categories WHERE Id = 2)
INSERT INTO dbo.Categories (Id, Name, ParentCategoryId, HasProducts) VALUES (2, 'Electronics', NULL, 0);

IF NOT EXISTS (SELECT 1 FROM dbo.Categories WHERE Id = 3)
INSERT INTO dbo.Categories (Id, Name, ParentCategoryId, HasProducts) VALUES (3, 'Appliances', NULL, 0);

IF NOT EXISTS (SELECT 1 FROM dbo.Categories WHERE Id = 4)
INSERT INTO dbo.Categories (Id, Name, ParentCategoryId, HasProducts) VALUES (4, 'Fashion', NULL, 0);

IF NOT EXISTS (SELECT 1 FROM dbo.Categories WHERE Id = 5)
INSERT INTO dbo.Categories (Id, Name, ParentCategoryId, HasProducts) VALUES (5, 'Sports', NULL, 0);

-- Level 2 - Furniture
IF NOT EXISTS (SELECT 1 FROM dbo.Categories WHERE Id = 6)
INSERT INTO dbo.Categories (Id, Name, ParentCategoryId, HasProducts) VALUES (6, 'Living Room', 1, 0);

IF NOT EXISTS (SELECT 1 FROM dbo.Categories WHERE Id = 7)
INSERT INTO dbo.Categories (Id, Name, ParentCategoryId, HasProducts) VALUES (7, 'Bedroom', 1, 0);

IF NOT EXISTS (SELECT 1 FROM dbo.Categories WHERE Id = 21)
INSERT INTO dbo.Categories (Id, Name, ParentCategoryId, HasProducts) VALUES (21, 'Office', 1, 0);

IF NOT EXISTS (SELECT 1 FROM dbo.Categories WHERE Id = 22)
INSERT INTO dbo.Categories (Id, Name, ParentCategoryId, HasProducts) VALUES (22, 'Patio', 1, 0);

-- Level 2 - Electronics
IF NOT EXISTS (SELECT 1 FROM dbo.Categories WHERE Id = 8)
INSERT INTO dbo.Categories (Id, Name, ParentCategoryId, HasProducts) VALUES (8, 'Mobile Devices', 2, 0);

IF NOT EXISTS (SELECT 1 FROM dbo.Categories WHERE Id = 9)
INSERT INTO dbo.Categories (Id, Name, ParentCategoryId, HasProducts) VALUES (9, 'Computers', 2, 0);

IF NOT EXISTS (SELECT 1 FROM dbo.Categories WHERE Id = 23)
INSERT INTO dbo.Categories (Id, Name, ParentCategoryId, HasProducts) VALUES (23, 'Audio', 2, 0);

IF NOT EXISTS (SELECT 1 FROM dbo.Categories WHERE Id = 24)
INSERT INTO dbo.Categories (Id, Name, ParentCategoryId, HasProducts) VALUES (24, 'Wearables', 2, 0);

-- Level 2 - Appliances
IF NOT EXISTS (SELECT 1 FROM dbo.Categories WHERE Id = 10)
INSERT INTO dbo.Categories (Id, Name, ParentCategoryId, HasProducts) VALUES (10, 'Kitchen', 3, 0);

IF NOT EXISTS (SELECT 1 FROM dbo.Categories WHERE Id = 11)
INSERT INTO dbo.Categories (Id, Name, ParentCategoryId, HasProducts) VALUES (11, 'Cleaning', 3, 0);

IF NOT EXISTS (SELECT 1 FROM dbo.Categories WHERE Id = 25)
INSERT INTO dbo.Categories (Id, Name, ParentCategoryId, HasProducts) VALUES (25, 'Heating & Cooling', 3, 0);

IF NOT EXISTS (SELECT 1 FROM dbo.Categories WHERE Id = 26)
INSERT INTO dbo.Categories (Id, Name, ParentCategoryId, HasProducts) VALUES (26, 'Smart Home', 3, 0);

-- Level 2 - Fashion
IF NOT EXISTS (SELECT 1 FROM dbo.Categories WHERE Id = 12)
INSERT INTO dbo.Categories (Id, Name, ParentCategoryId, HasProducts) VALUES (12, 'Men', 4, 0);

IF NOT EXISTS (SELECT 1 FROM dbo.Categories WHERE Id = 13)
INSERT INTO dbo.Categories (Id, Name, ParentCategoryId, HasProducts) VALUES (13, 'Women', 4, 0);

IF NOT EXISTS (SELECT 1 FROM dbo.Categories WHERE Id = 27)
INSERT INTO dbo.Categories (Id, Name, ParentCategoryId, HasProducts) VALUES (27, 'Kids', 4, 0);

IF NOT EXISTS (SELECT 1 FROM dbo.Categories WHERE Id = 28)
INSERT INTO dbo.Categories (Id, Name, ParentCategoryId, HasProducts) VALUES (28, 'Accessories', 4, 0);

-- Level 2 - Sports
IF NOT EXISTS (SELECT 1 FROM dbo.Categories WHERE Id = 14)
INSERT INTO dbo.Categories (Id, Name, ParentCategoryId, HasProducts) VALUES (14, 'Outdoor', 5, 0);

IF NOT EXISTS (SELECT 1 FROM dbo.Categories WHERE Id = 15)
INSERT INTO dbo.Categories (Id, Name, ParentCategoryId, HasProducts) VALUES (15, 'Indoor', 5, 0);

IF NOT EXISTS (SELECT 1 FROM dbo.Categories WHERE Id = 29)
INSERT INTO dbo.Categories (Id, Name, ParentCategoryId, HasProducts) VALUES (29, 'Fitness', 5, 0);

IF NOT EXISTS (SELECT 1 FROM dbo.Categories WHERE Id = 30)
INSERT INTO dbo.Categories (Id, Name, ParentCategoryId, HasProducts) VALUES (30, 'Cycling', 5, 0);

-- Level 3 - Living Room
IF NOT EXISTS (SELECT 1 FROM dbo.Categories WHERE Id = 16)
INSERT INTO dbo.Categories (Id, Name, ParentCategoryId, HasProducts) VALUES (16, 'Sofas', 6, 0);

IF NOT EXISTS (SELECT 1 FROM dbo.Categories WHERE Id = 31)
INSERT INTO dbo.Categories (Id, Name, ParentCategoryId, HasProducts) VALUES (31, 'Coffee Tables', 6, 0);

IF NOT EXISTS (SELECT 1 FROM dbo.Categories WHERE Id = 32)
INSERT INTO dbo.Categories (Id, Name, ParentCategoryId, HasProducts) VALUES (32, 'TV Units', 6, 0);

-- Bedroom
IF NOT EXISTS (SELECT 1 FROM dbo.Categories WHERE Id = 17)
INSERT INTO dbo.Categories (Id, Name, ParentCategoryId, HasProducts) VALUES (17, 'Beds', 7, 0);

IF NOT EXISTS (SELECT 1 FROM dbo.Categories WHERE Id = 33)
INSERT INTO dbo.Categories (Id, Name, ParentCategoryId, HasProducts) VALUES (33, 'Wardrobes', 7, 0);

IF NOT EXISTS (SELECT 1 FROM dbo.Categories WHERE Id = 34)
INSERT INTO dbo.Categories (Id, Name, ParentCategoryId, HasProducts) VALUES (34, 'Nightstands', 7, 0);

-- Mobile Devices
IF NOT EXISTS (SELECT 1 FROM dbo.Categories WHERE Id = 18)
INSERT INTO dbo.Categories (Id, Name, ParentCategoryId, HasProducts) VALUES (18, 'Smartphones', 8, 0);

IF NOT EXISTS (SELECT 1 FROM dbo.Categories WHERE Id = 35)
INSERT INTO dbo.Categories (Id, Name, ParentCategoryId, HasProducts) VALUES (35, 'Tablets', 8, 0);

-- Computers
IF NOT EXISTS (SELECT 1 FROM dbo.Categories WHERE Id = 19)
INSERT INTO dbo.Categories (Id, Name, ParentCategoryId, HasProducts) VALUES (19, 'Laptops', 9, 0);

IF NOT EXISTS (SELECT 1 FROM dbo.Categories WHERE Id = 36)
INSERT INTO dbo.Categories (Id, Name, ParentCategoryId, HasProducts) VALUES (36, 'Desktops', 9, 0);

-- Kitchen
IF NOT EXISTS (SELECT 1 FROM dbo.Categories WHERE Id = 20)
INSERT INTO dbo.Categories (Id, Name, ParentCategoryId, HasProducts) VALUES (20, 'Microwaves', 10, 0);

IF NOT EXISTS (SELECT 1 FROM dbo.Categories WHERE Id = 37)
INSERT INTO dbo.Categories (Id, Name, ParentCategoryId, HasProducts) VALUES (37, 'Ovens', 10, 0);

-- Cleaning
IF NOT EXISTS (SELECT 1 FROM dbo.Categories WHERE Id = 38)
INSERT INTO dbo.Categories (Id, Name, ParentCategoryId, HasProducts) VALUES (38, 'Vacuum Cleaners', 11, 0);

IF NOT EXISTS (SELECT 1 FROM dbo.Categories WHERE Id = 39)
INSERT INTO dbo.Categories (Id, Name, ParentCategoryId, HasProducts) VALUES (39, 'Mops', 11, 0);

-- Fashion > Men
IF NOT EXISTS (SELECT 1 FROM dbo.Categories WHERE Id = 40)
INSERT INTO dbo.Categories (Id, Name, ParentCategoryId, HasProducts) VALUES (40, 'Shirts', 12, 0);

IF NOT EXISTS (SELECT 1 FROM dbo.Categories WHERE Id = 41)
INSERT INTO dbo.Categories (Id, Name, ParentCategoryId, HasProducts) VALUES (41, 'Shoes', 12, 0);

-- Fashion > Women
IF NOT EXISTS (SELECT 1 FROM dbo.Categories WHERE Id = 42)
INSERT INTO dbo.Categories (Id, Name, ParentCategoryId, HasProducts) VALUES (42, 'Dresses', 13, 0);

IF NOT EXISTS (SELECT 1 FROM dbo.Categories WHERE Id = 43)
INSERT INTO dbo.Categories (Id, Name, ParentCategoryId, HasProducts) VALUES (43, 'Handbags', 13, 0);

-- Sports > Outdoor
IF NOT EXISTS (SELECT 1 FROM dbo.Categories WHERE Id = 44)
INSERT INTO dbo.Categories (Id, Name, ParentCategoryId, HasProducts) VALUES (44, 'Camping', 14, 0);

IF NOT EXISTS (SELECT 1 FROM dbo.Categories WHERE Id = 45)
INSERT INTO dbo.Categories (Id, Name, ParentCategoryId, HasProducts) VALUES (45, 'Hiking', 14, 0);

-- Sports > Indoor
IF NOT EXISTS (SELECT 1 FROM dbo.Categories WHERE Id = 46)
INSERT INTO dbo.Categories (Id, Name, ParentCategoryId, HasProducts) VALUES (46, 'Yoga', 15, 0);

IF NOT EXISTS (SELECT 1 FROM dbo.Categories WHERE Id = 47)
INSERT INTO dbo.Categories (Id, Name, ParentCategoryId, HasProducts) VALUES (47, 'Dumbbells', 15, 0);

-- Sports > Fitness
IF NOT EXISTS (SELECT 1 FROM dbo.Categories WHERE Id = 48)
INSERT INTO dbo.Categories (Id, Name, ParentCategoryId, HasProducts) VALUES (48, 'Treadmills', 29, 0);

IF NOT EXISTS (SELECT 1 FROM dbo.Categories WHERE Id = 49)
INSERT INTO dbo.Categories (Id, Name, ParentCategoryId, HasProducts) VALUES (49, 'Exercise Bikes', 29, 0);

-- Sports > Cycling
IF NOT EXISTS (SELECT 1 FROM dbo.Categories WHERE Id = 50)
INSERT INTO dbo.Categories (Id, Name, ParentCategoryId, HasProducts) VALUES (50, 'Mountain Bikes', 30, 0);
