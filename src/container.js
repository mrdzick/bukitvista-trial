const { Container } = require('inversify');
const ProductRepository = require('./repositories/product-repository');
const ProductService = require('./services/product-service');
const StoreApi = require('./api/store-api');
const ProductController = require('./controllers/product-controller');

const container = new Container();
container.bind(ProductRepository).toSelf();
container.bind(ProductService).toSelf();
container.bind(StoreApi).toSelf();
container.bind(ProductController).toSelf();

module.exports = container;