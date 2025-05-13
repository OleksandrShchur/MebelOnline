-- Insert test data for Categories table

-- Level 1 - Root Categories
INSERT INTO dbo.Categories (Id, Name, Description, ParentCategoryId) VALUES (1, 'Furniture', 'All types of furniture', NULL);
INSERT INTO dbo.Categories (Id, Name, Description, ParentCategoryId) VALUES (2, 'Electronics', 'Various electronic items', NULL);
INSERT INTO dbo.Categories (Id, Name, Description, ParentCategoryId) VALUES (3, 'Appliances', 'Home and kitchen appliances', NULL);

-- Level 2 - Subcategories under 'Furniture'
INSERT INTO dbo.Categories (Id, Name, Description, ParentCategoryId) VALUES (4, 'Living Room Furniture', 'Sofas, tables, and more', 1);
INSERT INTO dbo.Categories (Id, Name, Description, ParentCategoryId) VALUES (5, 'Bedroom Furniture', 'Beds, wardrobes, and more', 1);
INSERT INTO dbo.Categories (Id, Name, Description, ParentCategoryId) VALUES (6, 'Office Furniture', 'Desks, chairs, and more', 1);

-- Level 2 - Subcategories under 'Electronics'
INSERT INTO dbo.Categories (Id, Name, Description, ParentCategoryId) VALUES (7, 'Mobile Phones', 'Smartphones and accessories', 2);
INSERT INTO dbo.Categories (Id, Name, Description, ParentCategoryId) VALUES (8, 'Laptops', 'Personal and gaming laptops', 2);
INSERT INTO dbo.Categories (Id, Name, Description, ParentCategoryId) VALUES (9, 'Televisions', 'Smart and LED TVs', 2);

-- Level 2 - Subcategories under 'Appliances'
INSERT INTO dbo.Categories (Id, Name, Description, ParentCategoryId) VALUES (10, 'Kitchen Appliances', 'Microwaves, blenders, and more', 3);
INSERT INTO dbo.Categories (Id, Name, Description, ParentCategoryId) VALUES (11, 'Home Appliances', 'Vacuum cleaners, irons, and more', 3);

-- Level 3 - Subcategories under 'Living Room Furniture'
INSERT INTO dbo.Categories (Id, Name, Description, ParentCategoryId) VALUES (12, 'Sofas', 'Leather and fabric sofas', 4);
INSERT INTO dbo.Categories (Id, Name, Description, ParentCategoryId) VALUES (13, 'Coffee Tables', 'Wooden and glass tables', 4);

-- Level 3 - Subcategories under 'Bedroom Furniture'
INSERT INTO dbo.Categories (Id, Name, Description, ParentCategoryId) VALUES (14, 'Beds', 'Single, double, and king size beds', 5);
INSERT INTO dbo.Categories (Id, Name, Description, ParentCategoryId) VALUES (15, 'Wardrobes', 'Sliding and hinged wardrobes', 5);

-- Level 3 - Subcategories under 'Mobile Phones'
INSERT INTO dbo.Categories (Id, Name, Description, ParentCategoryId) VALUES (16, 'Smartphones', 'iOS and Android phones', 7);
INSERT INTO dbo.Categories (Id, Name, Description, ParentCategoryId) VALUES (17, 'Accessories', 'Phone cases, chargers, and more', 7);

-- Level 3 - Subcategories under 'Kitchen Appliances'
INSERT INTO dbo.Categories (Id, Name, Description, ParentCategoryId) VALUES (18, 'Blenders', 'Portable and countertop blenders', 10);
INSERT INTO dbo.Categories (Id, Name, Description, ParentCategoryId) VALUES (19, 'Microwaves', 'Solo and convection microwaves', 10);

-- Level 3 - Subcategories under 'Home Appliances'
INSERT INTO dbo.Categories (Id, Name, Description, ParentCategoryId) VALUES (20, 'Vacuum Cleaners', 'Corded and cordless vacuums', 11);
