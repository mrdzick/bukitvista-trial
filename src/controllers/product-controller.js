const { inject, injectable, decorate } = require('inversify');
const ProductService = require('../services/product-service');

class ProductController {
  constructor (productService) {
    this.productService = productService;
  }

  async createProduct (req, res, next) {
    try {
      const product = req.body;
      const createdProduct = await this.productService.createProduct(product);

      res.status(201).json({
        message: 'Product created successfully',
        data: createdProduct,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateProduct (req, res, next) {
    try {
      const id = req.params.id;
      const product = req.body;
      const updatedProduct = await this.productService.updateProduct(id, product);

      res.status(201).json({
        message: 'Product updated successfully',
        data: updatedProduct,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllProducts (req, res, next) {
    try {
      const filter = req.query;
      
      const products = await this.productService.getAllProducts(filter);

      res.status(200).json({
        message: 'Products fetched successfully',
        data: products,
      });
    } catch (error) {
      next(error);
    }
  }
}

decorate(injectable(), ProductController);
decorate(inject(ProductService), ProductController, 0);

module.exports = ProductController;

