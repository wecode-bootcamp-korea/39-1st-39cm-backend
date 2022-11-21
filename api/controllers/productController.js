const { productService } = require('../services');
const { CustomError } = require('../utils/error');
const getProductByProductId = async (req, res) => {
    try {
        const { productId } = req.params;
        if (isNaN(productId)) {
            throw new CustomError('BAD_REQUEST', 400);
        }
        const product = await productService.getProductByProductId(productId);
        res.status(200).json({ product });
    } catch (err) {
        res.status(err.statusCode || 500).json({ message: err.message });
    }
};

const getProducts = async (req, res) => {
    try {
        const { limit, offset, sort, min_price, max_price, color, category, brand, product_gender } = req.query;
        for (let i in req.query) {
            if (["'", `"`, `,`, `.`].some((e) => req.query[i].includes(e))) throw new CustomError('BAD_REQUEST', 400);
        }
        if (
            isNaN(limit) ||
            isNaN(offset) ||
            isNaN(min_price) ||
            isNaN(max_price) ||
            isNaN(category) ||
            isNaN(product_gender)
        ) {
            throw new CustomError('BAD_REQUEST', 400);
        }
        const products = await productService.getProducts(
            limit,
            offset,
            sort,
            min_price,
            max_price,
            color,
            category,
            brand,
            product_gender
        );
        res.status(200).json({ products });
    } catch (err) {
        res.status(err.statusCode || 500).json({ message: err.message });
    }
};
module.exports = {
    getProductByProductId,
    getProducts,
};
