-- Insert products for 'Sofas' (CategoryId = 16)
INSERT INTO dbo.Products (Name, Description, Price, StockQuantity, ImageUrl, DateAdded, CategoryId) 
VALUES 
('Leather Sofa', 'Luxury leather sofa', 599.99, 10, 'images/sofa1.jpg', GETDATE(), 16),
('Fabric Sofa', 'Comfortable fabric sofa', 450.00, 8, 'images/sofa2.jpg', GETDATE(), 16),
('Corner Sofa', 'Stylish corner sofa', 700.00, 12, 'images/sofa3.jpg', GETDATE(), 16),
('Modern Sofa', 'Modern design sofa', 520.00, 6, 'images/sofa4.jpg', GETDATE(), 16),
('Recliner Sofa', 'Recliner with cup holders', 580.00, 7, 'images/sofa5.jpg', GETDATE(), 16),
('Loveseat Sofa', 'Loveseat with plush fabric', 320.00, 9, 'images/sofa6.jpg', GETDATE(), 16),
('Sectional Sofa', 'Spacious sectional sofa', 820.00, 5, 'images/sofa7.jpg', GETDATE(), 16),
('Chaise Sofa', 'Chaise lounge sofa', 460.00, 14, 'images/sofa8.jpg', GETDATE(), 16),
('Sofa Bed', 'Convertible sofa bed', 700.00, 7, 'images/sofa9.jpg', GETDATE(), 16),
('Outdoor Sofa', 'Water-resistant outdoor sofa', 500.00, 12, 'images/sofa10.jpg', GETDATE(), 16),
('Vintage Sofa', 'Vintage style sofa', 400.00, 8, 'images/sofa11.jpg', GETDATE(), 16),
('Compact Sofa', 'Compact design sofa', 250.00, 15, 'images/sofa12.jpg', GETDATE(), 16),
('Double Sofa', 'Double seater sofa', 300.00, 10, 'images/sofa13.jpg', GETDATE(), 16),
('Adjustable Sofa', 'Adjustable backrest sofa', 650.00, 5, 'images/sofa14.jpg', GETDATE(), 16),
('Velvet Sofa', 'Velvet fabric sofa', 550.00, 6, 'images/sofa15.jpg', GETDATE(), 16);

-- Repeat similar insert statements for other last-level categories

-- 'Coffee Tables' (CategoryId = 31)
INSERT INTO dbo.Products (Name, Description, Price, StockQuantity, ImageUrl, DateAdded, CategoryId) 
VALUES 
('Glass Coffee Table', 'Modern glass coffee table', 120.00, 10, 'images/table1.jpg', GETDATE(), 31),
('Wood Coffee Table', 'Rustic wood coffee table', 100.00, 15, 'images/table2.jpg', GETDATE(), 31),
('Marble Coffee Table', 'Luxury marble coffee table', 300.00, 7, 'images/table3.jpg', GETDATE(), 31);

-- 'Beds' (CategoryId = 17)
INSERT INTO dbo.Products (Name, Description, Price, StockQuantity, ImageUrl, DateAdded, CategoryId) 
VALUES 
('King Bed', 'King size wooden bed', 800.00, 9, 'images/bed1.jpg', GETDATE(), 17),
('Queen Bed', 'Queen size metal bed', 600.00, 12, 'images/bed2.jpg', GETDATE(), 17),
('Single Bed', 'Single bed with storage', 400.00, 18, 'images/bed3.jpg', GETDATE(), 17);

-- 'Wardrobes' (CategoryId = 33)
INSERT INTO dbo.Products (Name, Description, Price, StockQuantity, ImageUrl, DateAdded, CategoryId) 
VALUES 
('2-Door Wardrobe', 'Classic 2-door wardrobe', 350.00, 7, 'images/wardrobe1.jpg', GETDATE(), 33),
('3-Door Wardrobe', 'Spacious 3-door wardrobe', 500.00, 5, 'images/wardrobe2.jpg', GETDATE(), 33),
('Sliding Door Wardrobe', 'Sliding door wardrobe', 600.00, 10, 'images/wardrobe3.jpg', GETDATE(), 33);

-- 'Smartphones' (CategoryId = 18)
INSERT INTO dbo.Products (Name, Description, Price, StockQuantity, ImageUrl, DateAdded, CategoryId) 
VALUES 
('iPhone 14 Pro', '256GB, Space Gray', 1200.00, 25, 'images/phone1.jpg', GETDATE(), 18),
('Samsung Galaxy S23', '128GB, Blue', 999.00, 30, 'images/phone2.jpg', GETDATE(), 18),
('Google Pixel 8', '128GB, Black', 899.00, 20, 'images/phone3.jpg', GETDATE(), 18);

-- 'Vacuum Cleaners' (CategoryId = 38)
INSERT INTO dbo.Products (Name, Description, Price, StockQuantity, ImageUrl, DateAdded, CategoryId) 
VALUES 
('Cordless Vacuum', 'Powerful cordless vacuum', 150.00, 10, 'images/vacuum1.jpg', GETDATE(), 38),
('Robot Vacuum', 'Smart robot vacuum', 400.00, 8, 'images/vacuum2.jpg', GETDATE(), 38),
('Handheld Vacuum', 'Portable handheld vacuum', 75.00, 15, 'images/vacuum3.jpg', GETDATE(), 38);

-- 'Microwaves' (CategoryId = 20)
INSERT INTO dbo.Products (Name, Description, Price, StockQuantity, ImageUrl, DateAdded, CategoryId) 
VALUES 
('Compact Microwave', 'Small microwave oven', 120.00, 20, 'images/microwave1.jpg', GETDATE(), 20),
('Convection Microwave', 'Convection microwave', 250.00, 15, 'images/microwave2.jpg', GETDATE(), 20),
('Built-in Microwave', 'Built-in microwave', 300.00, 12, 'images/microwave3.jpg', GETDATE(), 20);

-- 'Ovens' (CategoryId = 37)
INSERT INTO dbo.Products (Name, Description, Price, StockQuantity, ImageUrl, DateAdded, CategoryId) 
VALUES 
('Electric Oven', 'Freestanding electric oven', 500.00, 7, 'images/oven1.jpg', GETDATE(), 37),
('Double Oven', 'Double oven with grill', 750.00, 5, 'images/oven2.jpg', GETDATE(), 37),
('Gas Oven', 'Gas oven with safety features', 550.00, 10, 'images/oven3.jpg', GETDATE(), 37);

-- Update HasProducts field for categories
UPDATE c
SET c.HasProducts = 1
FROM Categories c
JOIN Products p ON p.CategoryId = c.Id;
