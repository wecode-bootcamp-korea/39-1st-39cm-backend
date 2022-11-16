-- migrate:up
CREATE TABLE order_item_status (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    CONSTRAINT order_item_status_name_ukey UNIQUE (name)
);

-- migrate:down
DROP TABLE order_item_status;

