-- migrate:up
CREATE TABLE order_status (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    CONSTRAINT order_status_name_ukey UNIQUE (name)
);

-- migrate:down
DROP TABLE order_status;

