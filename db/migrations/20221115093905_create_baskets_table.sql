-- migrate:up
CREATE TABLE baskets (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    amount INT NOT NULL,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT baskets_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id),
    CONSTRAINT baskets_product_id_fkey FOREIGN KEY (product_id) REFERENCES products(id),
    CONSTRAINT baskets_user_id_product_id_unq UNIQUE (user_id, product_id)
);


-- migrate:down
DROP TABLE baskets;

