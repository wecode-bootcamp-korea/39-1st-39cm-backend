-- migrate:up
CREATE TABLE genders (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    CONSTRAINT genders_name_ukey UNIQUE (name)
);

-- migrate:down
DROP TABLE genders;