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
    ('10', 'jack.hall', 'jack.hall@example.com', 'Jack', 'Hall', false)
    ON CONFLICT (user_id) DO NOTHING;


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
    ('20', 'Kitchenware', 16)
ON CONFLICT (category_id) DO NOTHING;


ALTER TABLE product
    ALTER COLUMN description TYPE TEXT;

INSERT INTO product (product_id, seller_id, name, description, starting_price, current_price, start_date, status, end_date)
VALUES
    ('1', 1, 'Dell XPS 15 Laptop', 'This powerful laptop offers excellent performance and a stunning 4K display. Ideal for both work and entertainment, it''s a premium choice for professionals and enthusiasts. With its high-resolution screen, you can enjoy crystal-clear visuals and immerse yourself in your favorite content. The laptop is powered by a state-of-the-art processor, ensuring smooth multitasking and seamless performance. Whether you''re crunching numbers or playing the latest games, the Dell XPS 15 will exceed your expectations. It''s more than just a computer; it''s a gateway to productivity and enjoyment.', 1499.99, 1499.99, '2023-10-24 15:00:00', 'AVAILABLE', '2023-12-14 15:00:00'),
    ('2', 2, 'HP Spectre x360', 'A versatile 2-in-1 laptop with a sleek design and impressive battery life. It''s perfect for those who value both style and functionality. The Spectre x360 can effortlessly transform from a laptop to a tablet, offering you the flexibility you need. Its long-lasting battery ensures that you can work, stream, and create for hours on end without worrying about recharging. With its cutting-edge technology and stunning display, this laptop is your ticket to a world of possibilities. Get ready to experience the future of computing with the HP Spectre x360.', 1299.99, 1299.99, '2023-10-20 16:00:00', 'AVAILABLE', '2023-12-20 00:00:00'),
    ('3', 3, 'Adidas Men’s Hooded Sweatshirt', 'Stay warm and stylish with this branded Adidas hooded sweatshirt. Perfect for casual outings and chilly days. This sweatshirt is more than just an article of clothing; it''s a symbol of comfort and fashion. The soft, high-quality fabric keeps you cozy and warm, making it a reliable companion during the colder months. With its iconic Adidas logo and timeless design, it''s a versatile addition to your wardrobe. Whether you''re running errands or catching up with friends, this hooded sweatshirt will keep you looking great and feeling comfortable.', 69.99, 69.99, '2023-10-10 17:00:00', 'AVAILABLE', '2023-12-30 17:00:00'),
    ('4', 4, 'Nike Air Zoom Pegasus 38', 'Designed for runners, these shoes offer exceptional comfort, support, and responsiveness. Whether you''re a beginner or a pro, they''ll help you go the distance. The Nike Air Zoom Pegasus 38 is more than just a pair of sneakers; it''s a tool for athletes looking to excel in their sport. These shoes provide superior cushioning to reduce impact during your runs, and the exceptional grip ensures you maintain control over various terrains. Whether you''re training for a marathon or simply going for a jog, these sneakers are your ticket to improved performance and comfort.', 119.99, 119.99, '2023-10-04 00:00:00', 'AVAILABLE', '2023-12-04 00:00:00'),
    ('5', 5, 'Tiffany & Co. Diamond Necklace', 'Elegant and luxurious, this Tiffany & Co. diamond necklace is a statement piece that adds a touch of sophistication to any outfit. This necklace is more than just a piece of jewelry; it''s a symbol of elegance and prestige. The exquisite diamonds and timeless design make it a piece that will never go out of style. Whether you''re attending a gala, a wedding, or a special event, this diamond necklace will make you the center of attention and leave a lasting impression.', 4999.99, 4999.99, '2023-10-05 00:00:00', 'AVAILABLE', '2023-12-30 00:00:00'),
    ('6', 6, 'Samsung Galaxy S22 Ultra', 'The flagship smartphone with a stunning display, powerful camera system, and lightning-fast performance. It''s the ultimate choice for tech enthusiasts. The Samsung Galaxy S22 Ultra is more than just a phone; it''s a pocket-sized powerhouse. Its incredible display showcases vibrant colors and crystal-clear details, making your content come to life. With a cutting-edge camera system, you can capture professional-quality photos and videos. Whether you''re a photography enthusiast, a gaming aficionado, or a multitasking pro, this smartphone will revolutionize your digital experience.', 1199.99, 1199.99, '2023-10-06 09:00:00', 'AVAILABLE', '2023-12-16 09:00:00'),
    ('7', 7, 'ASUS ROG Zephyrus G15', 'A gaming laptop with top-tier specifications, high refresh rate display, and advanced cooling. Dominate your opponents with this gaming powerhouse. The ASUS ROG Zephyrus G15 is more than just a laptop; it''s a portal to the gaming world. With top-tier specs, you''ll have the power to run the most demanding games without a hitch. The high refresh rate display ensures you see every frame with precision, and the advanced cooling system keeps your laptop running at peak performance. Whether you''re a professional gamer or a casual player, the Zephyrus G15 guarantees that you have the upper hand in the virtual arena.', 1699.99, 1699.99, '2023-10-07 00:00:00', 'AVAILABLE', '2023-12-25 00:00:00'),
    ('8', 8, 'Jimmy Choo Women’s High Heel Shoes', 'Elevate your style with these elegant Jimmy Choo high heel shoes. They''re perfect for formal events and special occasions. These high heel shoes are more than just footwear; they''re a statement of sophistication and glamour. The exquisite craftsmanship and timeless design make them the perfect complement to your formal outfit. Whether you''re attending a wedding, a gala, or a special dinner, these Jimmy Choo shoes will make you stand out and showcase your refined taste.', 199.99, 199.99, '2023-10-08 10:00:00', 'AVAILABLE', '2023-12-18 10:00:00'),
    ('9', 9, 'Under Armour Curry 8 Basketball Shoes', 'Endorsed by NBA star Stephen Curry, these shoes offer exceptional traction, cushioning, and support for basketball players. Elevate your game with these kicks. The Under Armour Curry 8 Basketball Shoes are more than just sneakers; they''re your ticket to becoming a basketball legend. With outstanding traction, cushioning, and support, you''ll be able to perform your best on the court. Whether you''re a professional athlete or a dedicated enthusiast, these kicks will make sure you reach your highest potential and dominate the game.', 149.99, 149.99, '2023-11-09 00:00:00', 'AVAILABLE', '2023-12-19 00:00:00'),
    ('10', 10, 'Ray-Ban Aviator Sunglasses', 'A timeless pair of aviator sunglasses that provide both UV protection and a stylish look. They''re a must-have for sunny days and fashion-forward individuals. The Ray-Ban Aviator Sunglasses are more than just eyewear; they''re a statement of style and protection. With their timeless design and UV protection, they keep your eyes safe from the sun while keeping you in vogue. Whether you''re at the beach, on a road trip, or simply enjoying the outdoors, these shades will keep you looking cool and protected.', 129.99, 129.99, '2023-10-01 18:00:00', 'AVAILABLE', '2023-12-30 18:00:00'),
    ('11', 1, 'Sony 65-Inch 4K Smart TV', 'Experience stunning visuals with this 65-inch Sony 4K Smart TV. It offers exceptional picture quality and smart features for an immersive entertainment experience. The Sony 65-Inch 4K Smart TV is more than just a television; it''s a window to a world of breathtaking entertainment. With exceptional picture quality and smart features, it provides an immersive experience for your favorite content. Whether you''re streaming, gaming, or watching your favorite shows, this TV guarantees that every detail is crystal clear and vibrant.', 999.99, 999.99, '2023-10-20 12:00:00', 'AVAILABLE', '2023-12-20 12:00:00'),
    ('12', 2, 'Apple iPhone 15 Pro', 'The latest iPhone with a Pro camera system, faster A15 Bionic chip, and a Super Retina XDR display. It''s the ultimate smartphone for Apple enthusiasts. The Apple iPhone 15 Pro is more than just a phone; it''s a piece of technological art. With a Pro camera system that captures breathtaking photos, a faster A15 Bionic chip, and a Super Retina XDR display, it''s the ultimate smartphone for Apple enthusiasts. Whether you''re a photography enthusiast, a power user, or simply in love with Apple''s design philosophy, the iPhone 15 Pro exceeds expectations in every way.', 1099.99, 1099.99, '2023-10-12 13:00:00', 'AVAILABLE', '2023-12-22 13:00:00'),
    ('13', 3, 'Gucci Leather Wallet', 'A luxurious Gucci leather wallet that combines style and functionality. Keep your essentials organized in style. The Gucci Leather Wallet is more than just a wallet; it''s a luxurious accessory that combines style and functionality. Crafted with precision and featuring the iconic Gucci design, this wallet keeps your essentials organized in the most stylish way possible. Whether you''re headed to a business meeting or a social gathering, it''s the perfect complement to your outfit and a symbol of your exquisite taste.', 299.99, 299.99, '2023-10-08 00:00:00', 'AVAILABLE', '2023-12-28 00:00:00'),
    ('14', 4, 'Van Cleef & Arpels Bracelet', 'Vintage Alhambra bracelet, 5 motifs, guilloché 18K yellow gold. Enhance your elegance with this exquisite luxury diamond bracelet. It''s a timeless piece that adds a touch of sophistication to any outfit. The Vintage Alhambra bracelet from Van Cleef & Arpels is more than just a piece of jewelry; it''s a symbol of opulence and timeless beauty. With its 5 motifs and guilloché 18K yellow gold, it enhances your elegance and adds a touch of sophistication to any outfit. Whether you''re attending a gala or a romantic dinner, it''s the perfect accessory to make a statement and showcase your refined taste.', 5000.00, 5100.00, '2023-10-15 14:00:00', 'AVAILABLE', '2023-12-25 14:00:00'),
    ('15', 5, 'Tissot Men’s Swiss Watch', 'A sophisticated Tissot Swiss watch that combines classic design with Swiss precision. It''s a timeless accessory for any occasion. The Tissot Men’s Swiss Watch is more than just a timepiece; it''s a statement of classic design and Swiss precision. With its sophisticated craftsmanship and attention to detail, it''s a timeless accessory for any occasion. Whether you''re at a business meeting or a social event, this watch will be your perfect companion, accentuating your style and punctuality.', 599.99, 599.99, '2023-10-20 16:00:00', 'AVAILABLE', '2023-12-10 16:00:00'),
    ('16', 6, 'LG OLED 4K Ultra HD TV', 'Get an incredible viewing experience with the LG OLED 4K Ultra HD TV. It offers deep blacks and vibrant colors for a cinematic experience at home. The LG OLED 4K Ultra HD TV is more than just a television; it''s your gateway to an incredible viewing experience. With deep blacks and vibrant colors, it provides a cinematic experience right in your living room. Whether you''re watching the latest blockbusters, streaming your favorite series, or gaming, this TV will make every moment unforgettable. Elevate your home entertainment with the LG OLED 4K Ultra HD TV.', 1499.99, 1499.99, '2023-10-15 18:00:00', 'AVAILABLE', '2023-12-25 18:00:00'),
    ('17', 7, 'Acer Predator Helios 300', 'A high-performance gaming laptop with a fast refresh rate display, powerful GPU, and a cool design. Dominate your gaming sessions with this gaming powerhouse. The Acer Predator Helios 300 is more than just a laptop; it''s a high-performance gaming beast. With a fast refresh rate display, a powerful GPU, and a cool design, this laptop is built for one purpose - to dominate your gaming sessions. Whether you''re an esports pro or a casual gamer, the Predator Helios 300 ensures you have the firepower needed to conquer your virtual opponents. Take your gaming to the next level with this powerful and stylish gaming machine.', 1299.99, 1299.99, '2023-10-02 19:00:00', 'AVAILABLE', '2023-12-10 19:00:00'),
    ('18', 8, 'Prada Women’s Handbag', 'Elevate your style with a luxurious Prada handbag. It''s a fashionable accessory that complements any outfit. The Prada Women’s Handbag is more than just a bag; it''s a fashionable accessory that complements any outfit and adds a touch of elegance. Crafted with precision and featuring the iconic Prada design, this handbag is the epitome of luxury and style. Whether you''re attending a social event or a formal gathering, it''s the perfect accessory to make a statement and showcase your exquisite taste.', 699.99, 699.99, '2023-10-02 00:00:00', 'AVAILABLE', '2023-12-27 00:00:00'),
    ('19', 9, 'Nike Air Force 1 Sneakers', 'Classic Nike Air Force 1 sneakers that provide timeless style and comfort. They''re a favorite for streetwear enthusiasts. The Nike Air Force 1 Sneakers are more than just shoes; they''re a symbol of timeless style and comfort. Whether you''re a streetwear enthusiast or simply looking for a pair of sneakers that will keep you comfortable throughout the day, the Air Force 1s are a favorite choice. Elevate your style with these iconic and reliable kicks.', 89.99, 89.99, '2023-10-15 15:00:00', 'AVAILABLE', '2023-12-25 15:00:00'),
    ('20', 10, 'Ray-Ban Wayfarer Sunglasses', 'Iconic Ray-Ban Wayfarer sunglasses that offer a stylish and timeless look. They''re perfect for sunny days and retro fashion lovers. The Ray-Ban Wayfarer Sunglasses are more than just shades; they''re an iconic statement of fashion and a timeless accessory for sunny days and retro fashion lovers. Whether you''re at the beach, driving, or simply strolling around town, these sunglasses will keep you looking cool, and their classic design never goes out of style.', 129.99, 129.99, '2023-10-20 20:00:00', 'AVAILABLE', '2023-12-10 20:00:00')
    ON CONFLICT (product_id) DO NOTHING;


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
    ('10', 290.00, '2023-01-15 10:35:50', 10, 10)
    ON CONFLICT (bid_id) DO NOTHING;


ALTER TABLE image
    ALTER COLUMN image_url TYPE TEXT;


INSERT INTO image (image_id, image_url, product)
VALUES
    ('1', 'https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/notebooks/xps-notebooks/xps-15-9530/media-gallery/touch-black/notebook-xps-15-9530-t-black-gallery-5.psd?fmt=pjpg&pscan=auto&scl=1&wid=3481&hei=2067&qlt=100,1&resMode=sharp2&size=3481,2067&chrss=full&imwidth=5000', 1),
    ('2', 'https://cpuinfotech.ba/wp-content/uploads/2021/11/251A2EA_200819123826674.jpg', 2),
    ('3', 'https://assets.adidas.com/images/c_crop,f_auto,fl_lossy,g_north,h_840,q_auto,y_40/h_840/e0a2a4ca9fec42288c66e0a76fba7129_9366/All_SZN_Fleece_Hoodie_Black_IJ6889_01_laydown.jpg', 3),
    ('4', 'https://static.nike.com/a/videos/t_PDP_1280_v1/f_auto,q_auto:eco,so_0.71/4725f2ef-9b70-4dce-aea2-0667accde52f/air-zoom-pegasus-38-younger-older-road-running-shoes-sdD49r.jpg', 4),
    ('5', 'https://media.tiffany.com/is/image/Tiffany/EcomItemL2/tiffany-victoriagraduated-line-necklace-13199477_993503_ED.jpg', 5),
    ('6', 'https://cdn.dxomark.com/wp-content/uploads/medias/post-106688/Samsung-Galaxy-S22-Ultra-featured-image-packshot-review-Recovered.jpg', 6),
    ('7', 'https://dlcdnwebimgs.asus.com/files/media/C93177C5-674A-43E4-818C-045854974C8B/V5/img/frame/05.webp', 7),
    ('8', 'https://media.jimmychoo.com/image/upload/c_fit,dpr_2.0,f_auto,h_520,q_auto:best,w_520/ROWPROD_PRODUCT/images/original/SAEDA100BGH_000757_SIDE_vg154.jpg', 8),
    ('9', 'https://underarmour.scene7.com/is/image/Underarmour/3024422-104_PAIR?rp=standard-30pad|pdpMainDesktop&scl=1&fmt=jpg&qlt=85&resMode=sharp2&cache=on,on&bgc=f0f0f0&wid=566&hei=708&size=536,688', 9),
    ('10', 'https://cdn1.visiofactory.com/101774-thickbox/ray-ban-aviator-large-metal-black-rb3025-002-48-58-14-medium-polarized.jpg', 10),
    ('11', 'https://d13o3tuo14g2wf.cloudfront.net/assets%2FAsset+Hierarchy%2FConsumer+Assets%2FTelevision%2FBRAVIA+LCD+HDTV%2FFY+22%2FX85K%2FProduct+shots%2FX85K_55_65_75%2FeComm%2F1--X85K-65-Sony-FRNT.png?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9kMTNvM3R1bzE0ZzJ3Zi5jbG91ZGZyb250Lm5ldC9hc3NldHMlMkZBc3NldCtIaWVyYXJjaHklMkZDb25zdW1lcitBc3NldHMlMkZUZWxldmlzaW9uJTJGQlJBVklBK0xDRCtIRFRWJTJGRlkrMjIlMkZYODVLJTJGUHJvZHVjdCtzaG90cyUyRlg4NUtfNTVfNjVfNzUlMkZlQ29tbSUyRjEtLVg4NUstNjUtU29ueS1GUk5ULnBuZyIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MjE0NTc2MjAwMH19fV19&Signature=DyjM3tu0XHEiqM~Y07JHHvxXGDLWGUvw~YvXjL-vDMHSQQs~3HXnZUXG6QDJ2El8VbWPbASV6D2RBbeqJvoVBJkqQm0ji7bGG3V2TAjMbE8beXv8qDfq55TEKY1xHQcMVEk7mo4xHJDCJTOt7er~zww270osLgmFxIo5hX7Gcexs4vpObCxv8gXivvIWuKFyBCE1mEsXiSoJvqhZXAom9Y6IGy2bFzVeGyogc51eIzcAuDxCXhcRBs5WmYgbNpnfr2hCbDrI64ieUb3PUi~Xiw3ChaWHU8Us4i3Cu7ZGnJWXs0nAl4iJMMrTiJfh3dWLvhDDc48e2yv1jieRK~-fAw__&Key-Pair-Id=K37BLT9C6HMMJ0', 11),
    ('12', 'https://www.worldshop.eu/medias/img/8941439844382_w1260_717535487/apple-iphone15-smartphone-256gb-black.webp', 12),
    ('13', 'https://image.harrods.com/gucci-leather-gg-marmont-coin-wallet_18549711_42039648_800.jpg', 13),
    ('14', 'https://www.vancleefarpels.com/content/dam/rcq/vca/16/26/45/6/1626456.png.transform.vca-w820-1x.png', 14),
    ('15', 'https://content.thewosgroup.com/productimage/17361324/17361324_2.jpg?impolicy=hero&imwidth=700', 15),
    ('16', 'https://media.us.lg.com/transform/ecomm-PDPGallery-1100x730/cb7d27f1-9fd2-4036-95ca-d6dbf92be866/md08003937-DZ01-jpg', 16),
    ('17', 'https://www.gadgetvoize.com/wp-content/uploads/2023/01/Predator-Helios-18-PH18-Large.jpg', 17),
    ('18', 'https://www.prada.com/content/dam/pradabkg_products/1/1BK/1BK016/ZO6F0002/1BK016_ZO6_F0002_V_OOO_SLF.jpg/_jcr_content/renditions/cq5dam.web.hebebed.1000.1000.jpg', 18),
    ('19', 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/f094af40-f82f-4fb9-a246-e031bf6fc411/air-force-1-07-shoe-Dz225W.png', 19),
    ('20', 'https://assets.sunglasshut.com/is/image/LuxotticaRetail/805289126577__STD__shad__qt.png?impolicy=SGH_bgtransparent', 20),

    ('21', 'https://www.prada.com/content/dam/pradabkg_products/1/1BK/1BK016/ZO6F0002/1BK016_ZO6_F0002_V_OOO_SLR.jpg/_jcr_content/renditions/cq5dam.web.hebebed.1000.1000.jpg', 18),
    ('22', 'https://www.prada.com/content/dam/pradabkg_products/1/1BK/1BK016/ZO6F0002/1BK016_ZO6_F0002_V_OOO_SLO.jpg/_jcr_content/renditions/cq5dam.web.hebebed.1000.1000.jpg', 18),
    ('23', 'https://www.prada.com/content/dam/pradabkg_products/1/1BK/1BK016/ZO6F0002/1BK016_ZO6_F0002_V_OOO_SLD.jpg/_jcr_content/renditions/cq5dam.web.hebebed.1000.1000.jpg', 18),
    ('24', 'https://www.prada.com/content/dam/pradabkg_products/1/1BK/1BK016/ZO6F0002/1BK016_ZO6_F0002_V_OOO_SLDA.jpg/_jcr_content/renditions/cq5dam.web.hebebed.1000.1000.jpg', 18),

    ('25', 'https://www.tissotwatches.com/media/catalog/product/T/1/T137.207.11.091.00_PROFIL.png?im=Resize=(920,920)', 15),
    ('26', 'https://www.tissotwatches.com/media/catalog/product/T/1/T129.407.11.051.00_back_product.png?im=Resize=(920,920)', 15),
    ('27', 'https://m.media-amazon.com/images/I/61TUeleDvKL._AC_UX522_.jpg', 15),

    ('28', 'https://media.tiffany.com/is/image/Tiffany/EcomItemL2/tiffany-victoriagraduated-line-necklace-13199477_1029275_SV_1.jpg?&op_usm=1.0,1.0,6.0&defaultImage=NoImageAvailableInternal&&fmt=webp', 5),
    ('29', 'https://media.tiffany.com/is/image/Tiffany/EcomItemL2/tiffany-victoriagraduated-line-necklace-13199477_993501_AV_1.jpg?&op_usm=1.0,1.0,6.0&defaultImage=NoImageAvailableInternal&&fmt=webp', 5),
    ('30', 'https://media.tiffany.com/is/image/Tiffany/EcomItemL2/tiffany-victoriagraduated-line-necklace-13199477_993502_AV_2.jpg?&op_usm=1.0,1.0,6.0&defaultImage=NoImageAvailableInternal&&fmt=webp', 5),
    ('31', 'https://media.tiffany.com/is/image/Tiffany/EcomItemL2/tiffany-victoriagraduated-line-necklace-13199477_1017521_AV_4.jpg?&op_usm=1.0,1.0,6.0&defaultImage=NoImageAvailableInternal&&fmt=webp', 5),

    ('32', 'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/b059eb3aaef142289d39f97ae245e443_9366/All_SZN_Fleece_Hoodie_Black_IJ6889_23_hover_model.jpg', 3),
    ('33', 'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/3fe981c3d26d490bbde97ef0c70083cf_9366/All_SZN_Fleece_Hoodie_Black_IJ6889_41_detail.jpg', 3),
    ('34', 'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/ff59528595354bb480e7b1b9ee1fd987_9366/All_SZN_Fleece_Hoodie_Black_IJ6889_21_model.jpg', 3),

    ('35', 'https://assets.sunglasshut.com/is/image/LuxotticaRetail/805289126577__STD__shad__lt.png?impolicy=SGH_bgtransparent', 20),
    ('36', 'https://assets.sunglasshut.com/is/image/LuxotticaRetail/805289126577__STD__shad__bk.png?impolicy=SGH_bgtransparent', 20),
    ('37', 'https://assets.sunglasshut.com/is/image/LuxotticaRetail/805289126577__STD__shad__cfr.png?impolicy=SGH_bgtransparent', 20)

    ON CONFLICT (image_id) DO NOTHING;


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
    ('10', 6, 10),

    ('11', 4, 11),
    ('12', 3, 12),
    ('13', 6, 13),
    ('14', 7, 14),
    ('15', 7, 15),
    ('16', 4, 16),
    ('17', 2, 17),
    ('18', 6, 18),
    ('19', 11, 19),
    ('20', 6, 20)

    ON CONFLICT (id) DO NOTHING;


INSERT INTO transaction (transaction_id, timestamp, status, bid_id)
VALUES
    ('1', '2023-01-06 08:30:00', 'Success', 1),
    ('2', '2023-01-07 09:15:00', 'Success', 2),
    ('3', '2023-01-08 10:00:00', 'Success', 3),
    ('4', '2023-01-09 11:45:00', 'Success', 6),
    ('5', '2023-01-10 12:20:00', 'Success', 7),
    ('6', '2023-01-11 13:40:00', 'Success', 8),
    ('7', '2023-01-12 14:55:00', 'Success', 9),
    ('8', '2023-01-13 15:10:00', 'Success', 10)

    ON CONFLICT (transaction_id) DO NOTHING;



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
    ('10', 10, 3)

    ON CONFLICT (id) DO NOTHING;

