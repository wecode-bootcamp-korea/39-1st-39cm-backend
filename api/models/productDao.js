const { AppDataSource } = require('./data_source');

const getProductByProductId = async (productId) => {
    const posts = await AppDataSource.query(
        `SELECT
            p.name productName,
            p.description description,
            p.price price,
            JSON_ARRAYAGG(pi.image_url) images,
            c.name category,
            COUNT(l.product_id) AS Totallikes,
            (
                SELECT 
                    JSON_ARRAYAGG(
                        JSON_OBJECT(
                        "reviewTitle",r.title,
                        "reviewContent",r.content,
                        "reviewImage",r.image_url,
                        "rating",r.rating,
                        "reviewUser",r.user_id
                    )
                ) 
                FROM reviews r 
                    JOIN products p ON p.id = r.product_id
                    JOIN users u ON u.id = r.user_id
                    WHERE p.id = ?
                    GROUP BY p.id
            ) as reviews
        FROM products p
            LEFT JOIN product_images pi ON p.id = pi.product_id
            LEFT JOIN categories c ON c.id = p.category_id
            LEFT JOIN likes l ON p.id=l.product_id
            WHERE p.id = ?	
            GROUP BY p.id
        `,
        [productId, productId]
    );
    console.log(posts);
    return posts;
};

module.exports = { getProductByProductId };
