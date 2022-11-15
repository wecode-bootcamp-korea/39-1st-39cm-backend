-- migrate:up
CREATE TABLE order_items (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    amount INT NOT NULL,
    order_items_status_id INT NOT NULL,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT order_items_order_items_status_id_fkey FOREIGN KEY (order_items_status_id) REFERENCES order_item_status(id),
    CONSTRAINT order_items_order_id_fkey FOREIGN KEY (order_id) REFERENCES orders(id),
    CONSTRAINT order_items_product_id_fkey FOREIGN KEY (product_id) REFERENCES products(id),
    CONSTRAINT products_order_id_product_id_unq UNIQUE (order_id, product_id)
);

-- migrate:down
DROP TABLE order_items;

