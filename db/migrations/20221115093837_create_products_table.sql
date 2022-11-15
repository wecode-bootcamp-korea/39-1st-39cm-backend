-- migrate:up
CREATE TABLE products (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    description VARCHAR(300) DEFAULT NULL,
    color VARCHAR(50) NOT NULL,
    brand_name VARCHAR(50) NOT NULL,
    price INT NOT NULL DEFAULT 1000000,
    category_id INT NOT NULL,
    product_gender_id INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT products_category_id_fkey FOREIGN KEY (category_id) REFERENCES categories(id),
    CONSTRAINT products_product_gender_id_fkey FOREIGN KEY (product_gender_id) REFERENCES product_genders(id),
    CONSTRAINT products_name_color_unq UNIQUE (name, color)
);


-- migrate:down
DROP TABLE products;

