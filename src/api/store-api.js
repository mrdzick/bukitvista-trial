const { inject, injectable, decorate } = require('inversify');

class StoreApi {
  baseApiUrl = 'https://fakestoreapi.com';

  async createProduct(product) {
    const response = await fetch(`${this.baseApiUrl}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });

    return response.json();
  }

  async updateProduct(id, product) {
    const response = await fetch(`${this.baseApiUrl}/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });

    return response.json();
  }
}

decorate(injectable(), StoreApi);

module.exports = StoreApi;