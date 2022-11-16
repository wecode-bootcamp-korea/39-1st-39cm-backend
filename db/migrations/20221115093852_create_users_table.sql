-- migrate:up
CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    address VARCHAR(300) NOT NULL,
    point DECIMAL(9,2) NOT NULL DEFAULT 1000000,
    gender_id INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT users_gender_id_fkey FOREIGN KEY (gender_id) REFERENCES genders(id),
    CONSTRAINT users_email_ukey UNIQUE (email)
);

-- migrate:down
DROP TABLE users;

