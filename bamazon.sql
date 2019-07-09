DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
    id INTEGER NULL,
    name VARCHAR(45) NULL,
    department VARCHAR (45) NULL,
    price DECIMAL (4,2) NULL,
    stock INTEGER NULL,
    PRIMARY KEY (id)
);

INSERT INTO products 
    (id, name, department, price, stock)
VALUES
    (1011, 'bananas', 'produce', 1.50, 25),
    (1046, 'eggs', 'dairy', 0.99, 20),
    (2039, 'pitch perfect dvd', 'electronics', 9.99, 6),
    (2074, 'apple watch', 'electronics', 159.99, 8),
    (3082, 'crocs', 'shoe', 19.99, 4),
    (3099, 'running sneakers', 'shoe', 80.00, 12),
    (4010, 'dr. pepper', 'beverage', 15.00, 40),
    (4024, 'keystone light', 'beverage', 11.99, 40),
    (5068, 'hawaiian shirt', 'clothing', 17.99, 10),
    (5074, 'jorts', 'clothing', 12.00, 10);



