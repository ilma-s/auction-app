INSERT INTO app_user (user_id, username, email, first_name, last_name, is_admin)
VALUES
    ('1', 'user1', 'user1@example.com', 'John', 'Doe', true),
    ('2', 'user2', 'user2@example.com', 'Jane', 'Smith', false),
    ('3', 'user3', 'user3@example.com', 'Alice', 'Johnson', false),
    ('4', 'user4', 'user4@example.com', 'Bob', 'Brown', true),
    ('5', 'user5', 'user5@example.com', 'Ella', 'Davis', false);

INSERT INTO category (category_id, name, parent_category)
VALUES
    ('1', 'Electronics', null),
    ('2', 'Laptops', 1),
    ('3', 'Clothing', null),
    ('4', 'Shoes', 3),
    ('5', 'Accessories', 3);

INSERT INTO product (product_id, seller_id, category, name, description, starting_price, current_price, start_date, status, end_date)
VALUES
    ('1', 1, 'Electronics', 'Laptop 1', 'Description 1', 500.00, 500.00, '2023-01-01', 'Active', '2023-01-10'),
    ('2', 2, 'Laptops', 'Laptop 2', 'Description 2', 600.00, 600.00, '2023-01-02', 'Active', '2023-01-12'),
    ('3', 3, 'Clothing', 'Shirt 1', 'Description 3', 20.00, 20.00, '2023-01-03', 'Active', '2023-01-13'),
    ('4', 4, 'Shoes', 'Running Shoes', 'Description 4', 75.00, 75.00, '2023-01-04', 'Active', '2023-01-14'),
    ('5', 5, 'Accessories', 'Watch', 'Description 5', 100.00, 100.00, '2023-01-05', 'Active', '2023-01-15');

INSERT INTO bid (bid_id, amount, timestamp, bidder_id, product_id)
VALUES
    ('1', 100.00, '2023-01-01', 1, 1),
    ('2', 150.00, '2023-01-02', 2, 2),
    ('3', 120.00, '2023-01-03', 3, 3),
    ('4', 200.00, '2023-01-04', 4, 4),
    ('5', 80.00, '2023-01-05', 5, 5);

INSERT INTO image (image_id, image_url, product)
VALUES
    ('1', 'https://www.buzzsneakers.ba/files/images/slike-proizvoda/media/DD1/DD1503-101/images/DD1503-101.jpg', 1),
    ('2', 'https://p4-ofp.static.pub/fes/cms/2023/02/10/phe0ownvboinbal3fqqtu61hc0hi65654938.png', 2),
    ('3', 'https://sites.create-cdn.net/siteimages/28/4/9/284928/15/7/9/15798435/761x1000.jpg?1505296014', 3),
    ('4', 'https://www.vancleefarpels.com/content/dam/rcq/vca/19/40/17/6/1940176.png', 4),
    ('5', 'https://www.rollingstone.com/wp-content/uploads/2022/03/samsung-frame-tv-deal-e1648592033348.jpeg?w=1200&h=663&crop=1', 5);

INSERT INTO product_category (id, category, product)
VALUES
    ('1', 1, 1),
    ('2', 2, 2),
    ('3', 3, 3),
    ('4', 4, 4),
    ('5', 5, 5);

INSERT INTO transaction (transaction_id, timestamp, status, bid_id)
VALUES
    ('1', '2023-01-01', 'Success', 1),
    ('2', '2023-01-02', 'Success', 2),
    ('3', '2023-01-03', 'Success', 3),
    ('4', '2023-01-04', 'Success', 4),
    ('5', '2023-01-05', 'Success', 5);

INSERT INTO wishlist (id, user_id, product_id)
VALUES
    ('1', 1, 1),
    ('2', 2, 2),
    ('3', 3, 3),
    ('4', 4, 4),
    ('5', 5, 5);
