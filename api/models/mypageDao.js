const { appDataSource } = require('./data_source');

const getUserInformation = async (userId) => {
    const row = await appDataSource.query(
        `select
        users.id,
        users.name,
        users.point,
        (SELECT
            JSON_ARRAYAGG(
                JSON_OBJECT(
                "productName", products.name,
                "productBrand", products.brand_name,
                "reviewTitle",r.title,
                "reviewContent", r.content,
                "reviewImage",r.image_url))
                from reviews r 
                inner join products on r.product_id = products.id
                where r.user_id = ?
        ) reviewed,
        (SELECT
        JSON_ARRAYAGG(likes.product_id)
        from likes where likes.user_id = ?
        ) liked
        
        from users
        LEFT join reviews on reviews.user_id = users.id
        LEFT join products on reviews.product_id = products.id
        LEFT join product_images on products.id = product_images.product_id
        LEFT join likes on likes.user_id = reviews.user_id
        where users.id = ?
        group by users.id`,
        [userId, userId, userId]
    );
    return row;
};

const getUserOrdered = async (userId) => {
    const row = await appDataSource.query(
        `select 
        p.name,
        p.id as productId,
        p.brand_name as brandName,
        users.id as userId,
        p.price as productPrice,
        order_items.amount as amount,
        (select JSON_ARRAYAGG(product_images.image_url) images
        from product_images where product_images.product_id = p.id) as image
        FROM products p 
        inner join order_items on p.id = order_items.product_id
        inner join orders on orders.id = order_items.order_id
        inner join users on orders.user_id = users.id
        where users.id = ? `,
        [userId]
    );
    return row;
};

module.exports = { getUserInformation, getUserOrdered };
