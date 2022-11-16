-- migrate:up
CREATE TABLE categories (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    CONSTRAINT categories_name_ukey UNIQUE (name)
);


-- migrate:down
DROP TABLE categories;
