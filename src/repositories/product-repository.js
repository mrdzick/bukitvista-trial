const { decorate, injectable } = require('inversify');
const { Product } = require('../../models');

class ProductRepository {
  model = Product;

  async create(value, options) {
    return this.model.create({
      title: value.title,
      price: value.price,
      description: value.description,
      image: value.image,
      category: value.category,
    },
    options);
  }

  async getAllProducts(filter) {
    return this.model.findAll({
      where: filter,
    });
  }

  async getProductById(id) {
    return this.model.findOne({
      where: {
        id,
      },
    });
  }

  async update(id, value) {
    return this.model.update({
      title: value.title,
      price: value.price,
      description: value.description,
      image: value.image,
      category: value.category,
    }, {
      where: {
        id,
      },
    });
  }
}

decorate(injectable(), ProductRepository);

module.exports = ProductRepository;