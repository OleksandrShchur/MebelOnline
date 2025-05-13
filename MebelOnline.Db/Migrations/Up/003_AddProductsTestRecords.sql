-- Insert products for 'Sofas' (CategoryId = 12)
INSERT INTO dbo.Products (Name, Description, Price, StockQuantity, ImageUrl, DateAdded, CategoryId) 
VALUES 
('Luxury Leather Sofa', 'Premium leather sofa with adjustable headrests', 599.99, 10, 'images/sofa1.jpg', GETDATE(), 12),
('Fabric Recliner Sofa', 'Comfortable fabric recliner with cup holders', 450.00, 8, 'images/sofa2.jpg', GETDATE(), 12),
('Sectional Sofa', 'Modern sectional sofa with chaise', 799.99, 5, 'images/sofa3.jpg', GETDATE(), 12);

-- Insert products for 'Coffee Tables' (CategoryId = 13)
INSERT INTO dbo.Products (Name, Description, Price, StockQuantity, ImageUrl, DateAdded, CategoryId) 
VALUES 
('Wooden Coffee Table', 'Classic wooden coffee table with storage', 150.00, 12, 'images/table1.jpg', GETDATE(), 13),
('Glass Coffee Table', 'Round glass coffee table with metal legs', 220.00, 7, 'images/table2.jpg', GETDATE(), 13),
('Marble Coffee Table', 'Luxury marble coffee table, white', 300.00, 4, 'images/table3.jpg', GETDATE(), 13);

-- Insert products for 'Beds' (CategoryId = 14)
INSERT INTO dbo.Products (Name, Description, Price, StockQuantity, ImageUrl, DateAdded, CategoryId) 
VALUES 
('King Size Bed', 'Wooden king size bed with headboard', 550.00, 6, 'images/bed1.jpg', GETDATE(), 14),
('Queen Size Bed', 'Metal queen size bed frame', 400.00, 10, 'images/bed2.jpg', GETDATE(), 14),
('Single Bed', 'Single bed with storage drawers', 300.00, 15, 'images/bed3.jpg', GETDATE(), 14);

-- Insert products for 'Wardrobes' (CategoryId = 15)
INSERT INTO dbo.Products (Name, Description, Price, StockQuantity, ImageUrl, DateAdded, CategoryId) 
VALUES 
('3-Door Wardrobe', 'Spacious 3-door wardrobe with mirror', 500.00, 5, 'images/wardrobe1.jpg', GETDATE(), 15),
('Sliding Door Wardrobe', 'Sliding door wardrobe with shelves', 650.00, 3, 'images/wardrobe2.jpg', GETDATE(), 15),
('Compact Wardrobe', 'Compact wardrobe with two drawers', 300.00, 9, 'images/wardrobe3.jpg', GETDATE(), 15);

-- Insert products for 'Smartphones' (CategoryId = 16)
INSERT INTO dbo.Products (Name, Description, Price, StockQuantity, ImageUrl, DateAdded, CategoryId) 
VALUES 
('iPhone 14', 'Apple iPhone 14 with 256GB storage', 999.99, 20, 'images/phone1.jpg', GETDATE(), 16),
('Samsung Galaxy S22', 'Samsung Galaxy S22, 128GB', 899.99, 25, 'images/phone2.jpg', GETDATE(), 16),
('Google Pixel 7', 'Google Pixel 7 with advanced camera', 799.99, 18, 'images/phone3.jpg', GETDATE(), 16);

-- Insert products for 'Accessories' (CategoryId = 17)
INSERT INTO dbo.Products (Name, Description, Price, StockQuantity, ImageUrl, DateAdded, CategoryId) 
VALUES 
('Wireless Charger', 'Fast wireless charger for smartphones', 49.99, 30, 'images/accessory1.jpg', GETDATE(), 17),
('Phone Case', 'Shockproof phone case', 19.99, 40, 'images/accessory2.jpg', GETDATE(), 17),
('Screen Protector', 'Anti-glare screen protector', 9.99, 50, 'images/accessory3.jpg', GETDATE(), 17);

-- Insert products for 'Blenders' (CategoryId = 18)
INSERT INTO dbo.Products (Name, Description, Price, StockQuantity, ImageUrl, DateAdded, CategoryId) 
VALUES 
('Portable Blender', 'USB rechargeable portable blender', 35.00, 20, 'images/blender1.jpg', GETDATE(), 18),
('Countertop Blender', 'High-speed countertop blender', 120.00, 10, 'images/blender2.jpg', GETDATE(), 18),
('Food Processor', 'Multi-functional food processor', 150.00, 7, 'images/blender3.jpg', GETDATE(), 18);

-- Insert products for 'Microwaves' (CategoryId = 19)
INSERT INTO dbo.Products (Name, Description, Price, StockQuantity, ImageUrl, DateAdded, CategoryId) 
VALUES 
('Solo Microwave', 'Compact solo microwave oven', 100.00, 15, 'images/microwave1.jpg', GETDATE(), 19),
('Convection Microwave', 'Convection microwave with grill', 220.00, 12, 'images/microwave2.jpg', GETDATE(), 19),
('Built-in Microwave', 'Built-in microwave with sensor cooking', 300.00, 5, 'images/microwave3.jpg', GETDATE(), 19);

-- Insert products for 'Vacuum Cleaners' (CategoryId = 20)
INSERT INTO dbo.Products (Name, Description, Price, StockQuantity, ImageUrl, DateAdded, CategoryId) 
VALUES 
('Cordless Vacuum', 'Lightweight cordless vacuum', 150.00, 10, 'images/vacuum1.jpg', GETDATE(), 20),
('Robotic Vacuum', 'Smart robotic vacuum cleaner', 400.00, 8, 'images/vacuum2.jpg', GETDATE(), 20),
('Handheld Vacuum', 'Portable handheld vacuum', 75.00, 20, 'images/vacuum3.jpg', GETDATE(), 20);
