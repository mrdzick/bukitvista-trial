require('dotenv').config();
require('reflect-metadata');
const express = require('express');
const errorMiddleware = require('./middlewares/error-middleware');
const container = require('./container');
const ProductController = require('./controllers/product-controller');
const { createProductValidator } = require('./validator/create-product-validator');

const app = express();
app.use(express.json());

const productController = container.get(ProductController);

app.post('/v1/products', createProductValidator, productController.createProduct.bind(productController));
app.get('/v1/products', productController.getAllProducts.bind(productController));
app.put('/v1/products/:id', createProductValidator, productController.updateProduct.bind(productController));

// Error handling middleware for Celebrate
app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});