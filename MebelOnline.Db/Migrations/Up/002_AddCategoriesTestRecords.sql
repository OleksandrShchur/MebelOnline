-- Level 1 - Root Categories
INSERT INTO dbo.Categories (Id, Name, Description, ParentCategoryId, HasProducts) 
VALUES (1, 'Furniture', 'All types of furniture', NULL, 0);
INSERT INTO dbo.Categories (Id, Name, Description, ParentCategoryId, HasProducts) 
VALUES (2, 'Electronics', 'Various electronic items', NULL, 0);
INSERT INTO dbo.Categories (Id, Name, Description, ParentCategoryId, HasProducts) 
VALUES (3, 'Appliances', 'Home and kitchen appliances', NULL, 0);

-- Level 2 - Subcategories under 'Furniture'
INSERT INTO dbo.Categories (Id, Name, Description, ParentCategoryId, HasProducts) 
VALUES (4, 'Living Room Furniture', 'Sofas, tables, and more', 1, 0);
INSERT INTO dbo.Categories (Id, Name, Description, ParentCategoryId, HasProducts) 
VALUES (5, 'Bedroom Furniture', 'Beds, wardrobes, and more', 1, 0);
INSERT INTO dbo.Categories (Id, Name, Description, ParentCategoryId, HasProducts) 
VALUES (6, 'Office Furniture', 'Desks, chairs, and more', 1, 0);

-- Level 2 - Subcategories under 'Electronics'
INSERT INTO dbo.Categories (Id, Name, Description, ParentCategoryId, HasProducts) 
VALUES (7, 'Mobile Phones', 'Smartphones and accessories', 2, 0);
INSERT INTO dbo.Categories (Id, Name, Description, ParentCategoryId, HasProducts) 
VALUES (8, 'Laptops', 'Personal and gaming laptops', 2, 0);
INSERT INTO dbo.Categories (Id, Name, Description, ParentCategoryId, HasProducts) 
VALUES (9, 'Televisions', 'Smart and LED TVs', 2, 0);

-- Level 2 - Subcategories under 'Appliances'
INSERT INTO dbo.Categories (Id, Name, Description, ParentCategoryId, HasProducts) 
VALUES (10, 'Kitchen Appliances', 'Microwaves, blenders, and more', 3, 0);
INSERT INTO dbo.Categories (Id, Name, Description, ParentCategoryId, HasProducts) 
VALUES (11, 'Home Appliances', 'Vacuum cleaners, irons, and more', 3, 0);

-- Level 3 - Subcategories under 'Living Room Furniture'
INSERT INTO dbo.Categories (Id, Name, Description, ParentCategoryId, HasProducts) 
VALUES (12, 'Sofas', 'Leather and fabric sofas', 4, 0);
INSERT INTO dbo.Categories (Id, Name, Description, ParentCategoryId, HasProducts) 
VALUES (13, 'Coffee Tables', 'Wooden and glass tables', 4, 0);

-- Level 3 - Subcategories under 'Bedroom Furniture'
INSERT INTO dbo.Categories (Id, Name, Description, ParentCategoryId, HasProducts) 
VALUES (14, 'Beds', 'Single, double, and king size beds', 5, 0);
INSERT INTO dbo.Categories (Id, Name, Description, ParentCategoryId, HasProducts) 
VALUES (15, 'Wardrobes', 'Sliding and hinged wardrobes', 5, 0);

-- Level 3 - Subcategories under 'Mobile Phones'
INSERT INTO dbo.Categories (Id, Name, Description, ParentCategoryId, HasProducts) 
VALUES (16, 'Smartphones', 'iOS and Android phones', 7, 0);
INSERT INTO dbo.Categories (Id, Name, Description, ParentCategoryId, HasProducts) 
VALUES (17, 'Accessories', 'Phone cases, chargers, and more', 7, 0);

-- Level 3 - Subcategories under 'Kitchen Appliances'
INSERT INTO dbo.Categories (Id, Name, Description, ParentCategoryId, HasProducts) 
VALUES (18, 'Blenders', 'Portable and countertop blenders', 10, 0);
INSERT INTO dbo.Categories (Id, Name, Description, ParentCategoryId, HasProducts) 
VALUES (19, 'Microwaves', 'Solo and convection microwaves', 10, 0);

-- Level 3 - Subcategories under 'Home Appliances'
INSERT INTO dbo.Categories (Id, Name, Description, ParentCategoryId, HasProducts) 
VALUES (20, 'Vacuum Cleaners', 'Corded and cordless vacuums', 11, 0);
