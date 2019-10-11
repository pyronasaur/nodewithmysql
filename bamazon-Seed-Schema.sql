DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT NOT NULL,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  price DECIMAL(13,2) NULL,
  stock_quantity INT NOT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("pillow", "Home Goods", 13.99, 8),
("sheets", "Home Goods", 24.99, 4),
("football", "Sporting Goods", 8.99, 7),
("basketball", "Sporting Goods", 6.99, 1),
("baseball", "Sporting Goods", 4.99, 18),
("t-shirt", "Clothing", 6.49, 10),
("jacket", "Clothing", 44.99, 6),
("shoes", "Clothing", 18.99, 3),
("gloves", "Clothing", 19.99, 4),
("Diamond Ring", "Jewelry", 1399.99, 2)