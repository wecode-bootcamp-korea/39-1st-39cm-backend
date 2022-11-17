const { productService } = require('../services');
const { CustomError } = require('../utils/error');
const getProductByProductId = async (req, res) => {
    try {
        const { productId } = req.params;
        if (isNaN(productId)) {
            throw new CustomError('BAD_REQUEST', 400);
        }
        const product = await productService.getProductByProductId(productId);
        res.status(200).json({ product: product });
    } catch (err) {
        res.status(err.statusCode || 500).json({ message: err.message });
    }
};

const getProducts = async (req, res) => {
    try {
        for (let i in req.query) {
            if (["'", `"`, `,`, `.`].some((e) => req.query[i].includes(e))) throw new CustomError('BAD_REQUEST', 400);
        }
        if (
            isNaN(req.query.limit) ||
            isNaN(req.query.offset) ||
            isNaN(req.query.min_price) ||
            isNaN(req.query.max_price) ||
            isNaN(req.query.category) ||
            isNaN(req.query.product_gender)
        ) {
            throw new CustomError('BAD_REQUEST', 400);
        }
        const products = await productService.getProducts(
            req.query.limit,
            req.query.offset,
            req.query.sort,
            req.query.min_price,
            req.query.max_price,
            req.query.color,
            req.query.category,
            req.query.brand,
            req.query.product_gender
        );
        res.status(200).json({ products: products });
    } catch (err) {
        res.status(err.statusCode || 500).json({ message: err.message });
    }
};
module.exports = {
    getProductByProductId,
    getProducts,
};
