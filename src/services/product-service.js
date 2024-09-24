const { inject, injectable, decorate } = require('inversify');
const ProductRepository = require('../repositories/product-repository');
const StoreApi = require('../api/store-api')
const ResponseError = require('../common/error/response-error');

class ProductService {
  constructor (productRepository, storeApi) {
    this.productRepository = productRepository;
    this.storeApi = storeApi;
  }

  async createProduct (product) {
    const response = await this.storeApi.createProduct(product);

    if (response.status === 400) {
      throw new ResponseError('Validation error', 400);
    }

    const createdProduct = await this.productRepository.create(product);

    return createdProduct;
  }

  async updateProduct(id, product) {
    const response = await this.storeApi.updateProduct(id, product);

    if (response.status === 400) {
      throw new ResponseError('Validation error', 400);
    }

    await this.productRepository.update(id, product);

    const updatedProduct = await this.productRepository.getProductById(id);
    
    return updatedProduct;
  }

  async getAllProducts(filter) {

    const products = await this.productRepository.getAllProducts(filter);

    return products;
  }
}

decorate(injectable(), ProductService);
decorate(inject(ProductRepository), ProductService, 0);
decorate(inject(StoreApi), ProductService, 1);

module.exports = ProductService;