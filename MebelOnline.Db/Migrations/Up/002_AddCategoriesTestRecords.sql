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

-- Level 2 - Subcategories under 'Electronics'
INSERT INTO dbo.Categories (Id, Name, ParentCategoryId, HasProducts) 
VALUES (8, 'Mobile Devices', 2, 0);
INSERT INTO dbo.Categories (Id, Name, ParentCategoryId, HasProducts) 
VALUES (9, 'Computers', 2, 0);

-- Level 2 - Subcategories under 'Appliances'
INSERT INTO dbo.Categories (Id, Name, ParentCategoryId, HasProducts) 
VALUES (10, 'Kitchen', 3, 0);
INSERT INTO dbo.Categories (Id, Name, ParentCategoryId, HasProducts) 
VALUES (11, 'Cleaning', 3, 0);

-- Level 2 - Subcategories under 'Fashion'
INSERT INTO dbo.Categories (Id, Name, ParentCategoryId, HasProducts) 
VALUES (12, 'Men', 4, 0);
INSERT INTO dbo.Categories (Id, Name, ParentCategoryId, HasProducts) 
VALUES (13, 'Women', 4, 0);

-- Level 2 - Subcategories under 'Sports'
INSERT INTO dbo.Categories (Id, Name, ParentCategoryId, HasProducts) 
VALUES (14, 'Outdoor', 5, 0);
INSERT INTO dbo.Categories (Id, Name, ParentCategoryId, HasProducts) 
VALUES (15, 'Indoor', 5, 0);

-- Level 3 - Subcategories under 'Living Room'
INSERT INTO dbo.Categories (Id, Name, ParentCategoryId, HasProducts) 
VALUES (16, 'Sofas', 6, 0);

-- Level 3 - Subcategories under 'Bedroom'
INSERT INTO dbo.Categories (Id, Name, ParentCategoryId, HasProducts) 
VALUES (17, 'Beds', 7, 0);

-- Level 3 - Subcategories under 'Mobile Devices'
INSERT INTO dbo.Categories (Id, Name, ParentCategoryId, HasProducts) 
VALUES (18, 'Smartphones', 8, 0);

-- Level 3 - Subcategories under 'Computers'
INSERT INTO dbo.Categories (Id, Name, ParentCategoryId, HasProducts) 
VALUES (19, 'Laptops', 9, 0);

-- Level 3 - Subcategories under 'Kitchen'
INSERT INTO dbo.Categories (Id, Name, ParentCategoryId, HasProducts) 
VALUES (20, 'Microwaves', 10, 0);
