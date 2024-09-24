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
    const { limit, category, sort } = filter;

    const where = {};

    if (category) {
      where.category = category;
    }

    const order = sort === 'desc' ? 'DESC' : 'ASC';
    const limitSetting = limit ? parseInt(filter.limit, 10) : null;

    return this.model.findAll({
      where,
      limit: limitSetting,
      order: [
        ['title', order],
      ],
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