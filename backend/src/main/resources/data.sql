INSERT INTO app_user (user_id, username, email, first_name, last_name, is_admin)
VALUES
    ('1', 'john.doe', 'john.doe@example.com', 'John', 'Doe', true),
    ('2', 'jane.smith', 'jane.smith@example.com', 'Jane', 'Smith', false),
    ('3', 'alice.johnson', 'alice.johnson@example.com', 'Alice', 'Johnson', false),
    ('4', 'bob.brown', 'bob.brown@example.com', 'Bob', 'Brown', true),
    ('5', 'ella.davis', 'ella.davis@example.com', 'Ella', 'Davis', false),
    ('6', 'frank.wilson', 'frank.wilson@example.com', 'Frank', 'Wilson', false),
    ('7', 'grace.taylor', 'grace.taylor@example.com', 'Grace', 'Taylor', false),
    ('8', 'henry.martin', 'henry.martin@example.com', 'Henry', 'Martin', false),
    ('9', 'ivy.clark', 'ivy.clark@example.com', 'Ivy', 'Clark', false),
    ('10', 'jack.hall', 'jack.hall@example.com', 'Jack', 'Hall', false);

INSERT INTO category (category_id, name, parent_category)
VALUES
    ('1', 'Electronics', null),
    ('2', 'Laptops', 1),
    ('3', 'Mobiles', 1),
    ('4', 'TVs', 1),

    ('5', 'Fashion', null),
    ('6', 'Accessories', 5),
    ('7', 'Jewelry', 5),
    ('8', 'Shoes', 5),

    ('9', 'Sportswear', null),
    ('10', 'Shoes', 9),
    ('11', 'Sneakers', 9),
    ('12', 'Sweatshirts', 9),

    ('13', 'Home', null),
    ('14', 'Pillows', 13),
    ('15', 'Curtains', 13),

    ('16', 'Appliances', null),
    ('17', 'Cookware', 16),
    ('18', 'Furniture', 16),
    ('19', 'Bedding', 16),
    ('20', 'Kitchenware', 16);

INSERT INTO product (product_id, seller_id, name, description, starting_price, current_price, start_date, status, end_date)
VALUES
    ('1', 1, 'Dell XPS 15 Laptop', 'This powerful laptop offers excellent performance and a stunning 4K display. Ideal for both work and entertainment, it''s a premium choice for professionals and enthusiasts.', 1499.99, 1499.99, '2023-01-01', 'Available', '2023-01-10'),
    ('2', 2, 'HP Spectre x360', 'A versatile 2-in-1 laptop with a sleek design and impressive battery life. It''s perfect for those who value both style and functionality.', 1299.99, 1299.99, '2023-01-02', 'Available', '2023-01-12'),
    ('3', 3, 'Adidas Men’s Hooded Sweatshirt', 'Stay warm and stylish with this branded Adidas hooded sweatshirt. Perfect for casual outings and chilly days.', 69.99, 69.99, '2023-01-03', 'Available', '2023-01-13'),
    ('4', 4, 'Nike Air Zoom Pegasus 38', 'Designed for runners, these shoes offer exceptional comfort, support, and responsiveness. Whether you''re a beginner or a pro, they''ll help you go the distance.', 119.99, 119.99, '2023-01-04', 'Available', '2023-01-14'),
    ('5', 5, 'Tiffany & Co. Diamond Necklace', 'Elegant and luxurious, this Tiffany & Co. diamond necklace is a statement piece that adds a touch of sophistication to any outfit.', 4999.99, 4999.99, '2023-01-05', 'Available', '2023-01-15'),
    ('6', 6, 'Samsung Galaxy S22 Ultra', 'The flagship smartphone with a stunning display, powerful camera system, and lightning-fast performance. It''s the ultimate choice for tech enthusiasts.', 1199.99, 1199.99, '2023-01-06', 'Available', '2023-01-16'),
    ('7', 7, 'ASUS ROG Zephyrus G15', 'A gaming laptop with top-tier specifications, high refresh rate display, and advanced cooling. Dominate your opponents with this gaming powerhouse.', 1699.99, 1699.99, '2023-01-07', 'Available', '2023-01-17'),
    ('8', 8, 'Jimmy Choo Women’s High Heel Shoes', 'Elevate your style with these elegant Jimmy Choo high heel shoes. They''re perfect for formal events and special occasions.', 199.99, 199.99, '2023-01-08', 'Available', '2023-01-18'),
    ('9', 9, 'Under Armour Curry 8 Basketball Shoes', 'Endorsed by NBA star Stephen Curry, these shoes offer exceptional traction, cushioning, and support for basketball players. Elevate your game with these kicks.', 149.99, 149.99, '2023-01-09', 'Available', '2023-01-19'),
    ('10', 10, 'Ray-Ban Aviator Sunglasses', 'A timeless pair of aviator sunglasses that provide both UV protection and a stylish look. They''re a must-have for sunny days and fashion-forward individuals.', 129.99, 129.99, '2023-01-10', 'Available', '2023-01-20');

INSERT INTO bid (bid_id, amount, timestamp, bidder_id, product_id)
VALUES
    ('1', 220.00, '2023-01-06 08:30:45', 1, 1),
    ('2', 350.00, '2023-01-07 14:15:20', 2, 2),
    ('3', 160.00, '2023-01-08 10:05:30', 3, 3),
    ('4', 260.00, '2023-01-09 17:45:10', 4, 1),
    ('5', 180.00, '2023-01-10 11:20:55', 5, 3),
    ('6', 420.00, '2023-01-11 09:40:30', 6, 6),
    ('7', 510.00, '2023-01-12 16:55:15', 7, 7),
    ('8', 320.00, '2023-01-13 13:10:25', 8, 8),
    ('9', 400.00, '2023-01-14 19:25:30', 9, 9),
    ('10', 290.00, '2023-01-15 10:35:50', 10, 10);

ALTER TABLE image
    ALTER COLUMN image_url TYPE TEXT;


INSERT INTO image (image_id, image_url, product)
VALUES
    ('1', 'https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/notebooks/xps-notebooks/xps-15-9530/media-gallery/touch-black/notebook-xps-15-9530-t-black-gallery-5.psd?fmt=pjpg&pscan=auto&scl=1&wid=3481&hei=2067&qlt=100,1&resMode=sharp2&size=3481,2067&chrss=full&imwidth=5000', 1),
    ('2', 'https://img-cdn.tnwcdn.com/image?fit=1280%2C720&url=https%3A%2F%2Fcdn0.tnwcdn.com%2Fwp-content%2Fblogs.dir%2F1%2Ffiles%2F2021%2F08%2FHP-Spectre-x360-14-1-of-7.jpg&signature=b273734ba382a58d403431a960fd1708', 2),
    ('3', 'https://assets.adidas.com/images/w_1880,f_auto,q_auto/275708ca7dda4edb984eab6400a6ece4_9366/GE0663_43_detail.jpg', 3),
    ('4', 'https://www.theathletesfoot.com.au/media/catalog/product/cache/1d9bed4adb161c46da1721fdfc39729c/c/w/cw7358-002_10.jpg', 4),
    ('5', 'https://media.tiffany.com/is/image/Tiffany/EcomItemL2/tiffany-victoriagraduated-line-necklace-13199477_993503_ED.jpg', 5),
    ('6', 'https://cdn.dxomark.com/wp-content/uploads/medias/post-112004/Samsung-Galaxy-S22-Ultra-Snapdragon_Yoast-image-packshot-review-Recovered.jpg', 6),
    ('7', 'https://dlcdnwebimgs.asus.com/gain/4D7028B0-40BF-4503-AA59-46756749A6DA', 7),
    ('8', 'https://voila.id/cdn/shop/products/5product-SAEDA85ZOD-BLACK-Xms-2023-03-02T2224180700_1024x1024.jpg?v=1677770662', 8),
    ('9', 'https://cdn.media.amplience.net/i/hibbett/Curry-Gold-min', 9),
    ('10', 'https://assets.sunglasshut.com/is/image/LuxotticaRetail/805289628231_030A.png?impolicy=SEO_4x3', 10);

INSERT INTO product_category (id, category, product)
VALUES
    ('1', 2, 1),
    ('2', 2, 2),
    ('3', 12, 3),
    ('4', 11, 4),
    ('5', 7, 5),
    ('6', 3, 6),
    ('7', 2, 7),
    ('8', 8, 8),
    ('9', 11, 9),
    ('10', 6, 10);

INSERT INTO transaction (transaction_id, timestamp, status, bid_id)
VALUES
    ('1', '2023-01-06 08:30:00', 'Success', 1),
    ('2', '2023-01-07 09:15:00', 'Success', 2),
    ('3', '2023-01-08 10:00:00', 'Success', 3),
    ('4', '2023-01-09 11:45:00', 'Success', 6),
    ('5', '2023-01-10 12:20:00', 'Success', 7),
    ('6', '2023-01-11 13:40:00', 'Success', 8),
    ('7', '2023-01-12 14:55:00', 'Success', 9),
    ('8', '2023-01-13 15:10:00', 'Success', 10);


INSERT INTO wishlist (id, user_id, product_id)
VALUES
    ('1', 1, 6),
    ('2', 2, 7),
    ('3', 3, 8),
    ('4', 4, 9),
    ('5', 5, 10),
    ('6', 6, 8),
    ('7', 7, 9),
    ('8', 8, 10),
    ('9', 9, 2),
    ('10', 10, 3);
