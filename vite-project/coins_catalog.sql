CREATE DATABASE IF NOT EXISTS coins_catalog;
USE coins_catalog;

CREATE TABLE coins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    short_description TEXT,
    full_description TEXT,
    issuing_country VARCHAR(100),
    composition VARCHAR(50),
    quality VARCHAR(50),
    denomination VARCHAR(50),
    year INT,
    weight DECIMAL(10, 2),
    price DECIMAL(10, 2),
    category VARCHAR(50),
    front_image VARCHAR(255)
);
