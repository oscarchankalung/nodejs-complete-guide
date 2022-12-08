const fs = require("fs");
const path = require("path");
const rootDir = require("../util/path");

const p = path.join(rootDir, "data", "cart.json");

const getCartFromFile = callback => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      callback({ products: [], totalPrice: 0 });
    } else {
      callback(JSON.parse(fileContent));
    }
  });
};

module.exports = class Cart {
  static addProduct(id, productPrice, callback) {
    // Fetch the previous cart
    getCartFromFile(cart => {
      // Find existing product
      const existingProductIndex = cart.products.findIndex(p => p.id === id);
      const existingProduct = cart.products[existingProductIndex];
      let updatedProduct;

      // Add product
      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.qty = existingProduct.qty + 1;
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id: id, qty: 1 };
        cart.products = [...cart.products, updatedProduct];
      }
      cart.totalPrice = cart.totalPrice + productPrice;

      // Save the new cart
      fs.writeFile(p, JSON.stringify(cart), err => {
        if (!err) {
          callback(cart);
        } else {
          console.log(err);
        }
      });
    });
  }

  static deleteProduct(id, productPrice, callback) {
    // Fetch the previous cart
    getCartFromFile(cart => {
      // Find existing product
      const product = cart.products.find(p => p.id === id);
      const updatedCart = { ...cart };

      if (!product) {
        return;
      }

      // Delete product
      const productQty = product.qty ?? 0;
      updatedCart.products = updatedCart.products.filter(p => p.id !== id);
      updatedCart.totalPrice -= productPrice * productQty;

      // Save the new cart
      fs.writeFile(p, JSON.stringify(updatedCart), err => {
        if (!err) {
          callback(updatedCart);
        } else {
          console.log(err);
        }
      });
    });
  }

  static getCart(callback) {
    getCartFromFile(callback);
  }
};
