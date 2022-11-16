-- migrate:up
CREATE TABLE product_genders (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    CONSTRAINT product_genders_name_ukey UNIQUE (name)
);

-- migrate:down
DROP TABLE product_genders;
