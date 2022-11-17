const { AppDataSource } = require('./data_source');

const getProductByProductId = async (productId) => {
    const row = await AppDataSource.query(
        `SELECT
            p.name productName,
            p.description description,
            p.price price,
            JSON_ARRAYAGG(pi.image_url) images,
            c.name category,
            COUNT(l.product_id) AS totalLikes,
            (
                SELECT 
                    JSON_ARRAYAGG(
                        JSON_OBJECT(
                            "reviewTitle",r.title,
                            "reviewContent",r.content,
                            "reviewImage",r.image_url,
                            "rating",r.rating,
                            "reviewUser",u.name
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
    console.log('product' + row);
    return row;
};

const getProducts = async (whereClause, orderClause, limitClause) => {
    const rows = await AppDataSource.query(
        `SELECT
            p.name productName,
            p.brand_name brandName,
            p.price price,
            c.name category,
            p.color,
            pg.id productGender,
            JSON_ARRAYAGG(pi.image_url) images,
            (
                SELECT 
                    COUNT(*)
                FROM reviews r 
                WHERE r.product_id = p.id
                GROUP BY r.product_id
            ) as reviewCount,
            (
                SELECT 
                    COUNT(*)
                FROM likes l
                WHERE l.product_id = p.id
                GROUP BY l.product_id
            ) as likeCount

        FROM products p
        LEFT JOIN 
            product_images pi ON p.id = pi.product_id
        LEFT JOIN 
            categories c ON c.id = p.category_id
        LEFT JOIN
            product_genders pg ON p.product_gender_id = pg.id
        ?
        GROUP BY p.id 
        ?
        ?
        `,
        [whereClause, orderClause, limitClause]
    );
    console.log(rows);
    return rows;
};

module.exports = { getProductByProductId, getProducts };
