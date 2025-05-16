-- Level 1 - Root Categories
INSERT INTO dbo.Categories (Id, Name, ParentCategoryId, HasProducts) 
VALUES (1, 'Furniture', NULL, 0);
INSERT INTO dbo.Categories (Id, Name, ParentCategoryId, HasProducts) 
VALUES (2, 'Electronics', NULL, 0);
INSERT INTO dbo.Categories (Id, Name, ParentCategoryId, HasProducts) 
VALUES (3, 'Appliances', NULL, 0);
INSERT INTO dbo.Categories (Id, Name, ParentCategoryId, HasProducts) 
VALUES (4, 'Fashion', NULL, 0);
INSERT INTO dbo.Categories (Id, Name, ParentCategoryId, HasProducts) 
VALUES (5, 'Sports', NULL, 0);

-- Level 2 - Subcategories under 'Furniture'
INSERT INTO dbo.Categories (Id, Name, ParentCategoryId, HasProducts) 
VALUES (6, 'Living Room', 1, 0);
INSERT INTO dbo.Categories (Id, Name, ParentCategoryId, HasProducts) 
VALUES (7, 'Bedroom', 1, 0);
INSERT INTO dbo.Categories (Id, Name, ParentCategoryId, HasProducts) 
VALUES (21, 'Office', 1, 0);
INSERT INTO dbo.Categories (Id, Name, ParentCategoryId, HasProducts) 
VALUES (22, 'Patio', 1, 0);

-- Level 2 - Subcategories under 'Electronics'
INSERT INTO dbo.Categories (Id, Name, ParentCategoryId, HasProducts) 
VALUES (8, 'Mobile Devices', 2, 0);
INSERT INTO dbo.Categories (Id, Name, ParentCategoryId, HasProducts) 
VALUES (9, 'Computers', 2, 0);
INSERT INTO dbo.Categories (Id, Name, ParentCategoryId, HasProducts) 
VALUES (23, 'Audio', 2, 0);
INSERT INTO dbo.Categories (Id, Name, ParentCategoryId, HasProducts) 
VALUES (24, 'Wearables', 2, 0);

-- Level 2 - Subcategories under 'Appliances'
INSERT INTO dbo.Categories (Id, Name, ParentCategoryId, HasProducts) 
VALUES (10, 'Kitchen', 3, 0);
INSERT INTO dbo.Categories (Id, Name, ParentCategoryId, HasProducts) 
VALUES (11, 'Cleaning', 3, 0);
INSERT INTO dbo.Categories (Id, Name, ParentCategoryId, HasProducts) 
VALUES (25, 'Heating & Cooling', 3, 0);
INSERT INTO dbo.Categories (Id, Name, ParentCategoryId, HasProducts) 
VALUES (26, 'Smart Home', 3, 0);

-- Level 2 - Subcategories under 'Fashion'
INSERT INTO dbo.Categories (Id, Name, ParentCategoryId, HasProducts) 
VALUES (12, 'Men', 4, 0);
INSERT INTO dbo.Categories (Id, Name, ParentCategoryId, HasProducts) 
VALUES (13, 'Women', 4, 0);
INSERT INTO dbo.Categories (Id, Name, ParentCategoryId, HasProducts) 
VALUES (27, 'Kids', 4, 0);
INSERT INTO dbo.Categories (Id, Name, ParentCategoryId, HasProducts) 
VALUES (28, 'Accessories', 4, 0);

-- Level 2 - Subcategories under 'Sports'
INSERT INTO dbo.Categories (Id, Name, ParentCategoryId, HasProducts) 
VALUES (14, 'Outdoor', 5, 0);
INSERT INTO dbo.Categories (Id, Name, ParentCategoryId, HasProducts) 
VALUES (15, 'Indoor', 5, 0);
INSERT INTO dbo.Categories (Id, Name, ParentCategoryId, HasProducts) 
VALUES (29, 'Fitness', 5, 0);
INSERT INTO dbo.Categories (Id, Name, ParentCategoryId, HasProducts) 
VALUES (30, 'Cycling', 5, 0);

-- Level 3 - Subcategories under 'Living Room'
INSERT INTO dbo.Categories (Id, Name, ParentCategoryId, HasProducts) 
VALUES (16, 'Sofas', 6, 0);
INSERT INTO dbo.Categories (Id, Name, ParentCategoryId, HasProducts) 
VALUES (31, 'Coffee Tables', 6, 0);
INSERT INTO dbo.Categories (Id, Name, ParentCategoryId, HasProducts) 
VALUES (32, 'TV Units', 6, 0);

-- Level 3 - Subcategories under 'Bedroom'
INSERT INTO dbo.Categories (Id, Name, ParentCategoryId, HasProducts) 
VALUES (17, 'Beds', 7, 0);
INSERT INTO dbo.Categories (Id, Name, ParentCategoryId, HasProducts) 
VALUES (33, 'Wardrobes', 7, 0);
INSERT INTO dbo.Categories (Id, Name, ParentCategoryId, HasProducts) 
VALUES (34, 'Nightstands', 7, 0);

-- Level 3 - Subcategories under 'Mobile Devices'
INSERT INTO dbo.Categories (Id, Name, ParentCategoryId, HasProducts) 
VALUES (18, 'Smartphones', 8, 0);
INSERT INTO dbo.Categories (Id, Name, ParentCategoryId, HasProducts) 
VALUES (35, 'Tablets', 8, 0);

-- Level 3 - Subcategories under 'Computers'
INSERT INTO dbo.Categories (Id, Name, ParentCategoryId, HasProducts) 
VALUES (19, 'Laptops', 9, 0);
INSERT INTO dbo.Categories (Id, Name, ParentCategoryId, HasProducts) 
VALUES (36, 'Desktops', 9, 0);

-- Level 3 - Subcategories under 'Kitchen'
INSERT INTO dbo.Categories (Id, Name, ParentCategoryId, HasProducts) 
VALUES (20, 'Microwaves', 10, 0);
INSERT INTO dbo.Categories (Id, Name, ParentCategoryId, HasProducts) 
VALUES (37, 'Ovens', 10, 0);

-- Level 3 - Subcategories under 'Cleaning'
INSERT INTO dbo.Categories (Id, Name, ParentCategoryId, HasProducts) 
VALUES (38, 'Vacuum Cleaners', 11, 0);
INSERT INTO dbo.Categories (Id, Name, ParentCategoryId, HasProducts) 
VALUES (39, 'Mops', 11, 0);

-- Level 3 - Subcategories under 'Fashion > Men'
INSERT INTO dbo.Categories (Id, Name, ParentCategoryId, HasProducts) 
VALUES (40, 'Shirts', 12, 0);
INSERT INTO dbo.Categories (Id, Name, ParentCategoryId, HasProducts) 
VALUES (41, 'Shoes', 12, 0);

-- Level 3 - Subcategories under 'Fashion > Women'
INSERT INTO dbo.Categories (Id, Name, ParentCategoryId, HasProducts) 
VALUES (42, 'Dresses', 13, 0);
INSERT INTO dbo.Categories (Id, Name, ParentCategoryId, HasProducts) 
VALUES (43, 'Handbags', 13, 0);

-- Level 3 - Subcategories under 'Sports > Outdoor'
INSERT INTO dbo.Categories (Id, Name, ParentCategoryId, HasProducts) 
VALUES (44, 'Camping', 14, 0);
INSERT INTO dbo.Categories (Id, Name, ParentCategoryId, HasProducts) 
VALUES (45, 'Hiking', 14, 0);

-- Level 3 - Subcategories under 'Sports > Indoor'
INSERT INTO dbo.Categories (Id, Name, ParentCategoryId, HasProducts) 
VALUES (46, 'Yoga', 15, 0);
INSERT INTO dbo.Categories (Id, Name, ParentCategoryId, HasProducts) 
VALUES (47, 'Dumbbells', 15, 0);

-- Level 3 - Subcategories under 'Sports > Fitness'
INSERT INTO dbo.Categories (Id, Name, ParentCategoryId, HasProducts) 
VALUES (48, 'Treadmills', 29, 0);
INSERT INTO dbo.Categories (Id, Name, ParentCategoryId, HasProducts) 
VALUES (49, 'Exercise Bikes', 29, 0);

-- Level 3 - Subcategories under 'Sports > Cycling'
INSERT INTO dbo.Categories (Id, Name, ParentCategoryId, HasProducts) 
VALUES (50, 'Mountain Bikes', 30, 0);
