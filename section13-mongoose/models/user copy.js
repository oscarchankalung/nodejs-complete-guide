const mongodb = require("mongodb");

const { getDb } = require("../util/database");

class User {
  constructor(id, username, email, cart) {
    this._id = id ? new mongodb.ObjectId(id) : null;
    this.name = username;
    this.email = email;
    this.cart = cart ?? { items: [] };
  }

  save() {
    const db = getDb();
    let dbOp;

    if (this._id) {
      const filter = { _id: this._id };
      const updatedUser = { $set: this };
      const option = { upsert: true };
      dbOp = db.collection("users").updateOne(filter, updatedUser, option);
    } else {
      dbOp = db.collection("users").insertOne(this);
    }

    return dbOp
      .then(result => {
        return result;
      })
      .catch(err => {
        console.log(err);
      });
  }

  getCart() {
    // merge cartItems with products
    // update cartItems by removing deleted products

    const db = getDb();
    const cartItemProductIds = this.cart.items.map(item => item.productId);
    let mergedCartProducts = [];
    let updatedCartItems = [];

    return db
      .collection("products")
      .find({ _id: { $in: cartItemProductIds } })
      .toArray()
      .then(products => {
        return products.map(product => {
          const cartItem = this.cart.items.find(item => {
            const cartItemProductId = item.productId.toString();
            const productId = product._id.toString();
            return cartItemProductId === productId;
          });
          const cartProduct = { ...product, quantity: cartItem.quantity };

          mergedCartProducts.push(cartProduct);
          updatedCartItems.push(cartItem);
          return cartProduct;
        });
      })
      .then(products => {
        if (cartItemProductIds.length > updatedCartItems.length) {
          const filter = { _id: this._id };
          const updatedUser = { $set: { "cart.items": updatedCartItems } };
          return db.collection("users").updateOne(filter, updatedUser);
        }
      })
      .then(result => {
        return mergedCartProducts;
      })
      .catch(err => {
        console.log(err);
      });
  }

  addItemToCart(productId) {
    const db = getDb();
    const findIndexCallback = item => item.productId.toString() === productId;
    const cartProductIndex = this.cart.items.findIndex(findIndexCallback);
    const updatedCartItems = [...this.cart.items];
    let newQuantity = 1;

    if (cartProductIndex >= 0) {
      newQuantity = this.cart.items[cartProductIndex].quantity + 1;
      updatedCartItems[cartProductIndex].quantity = newQuantity;
    } else {
      updatedCartItems.push({
        productId: new mongodb.ObjectId(productId),
        quantity: newQuantity,
      });
    }

    const filter = { _id: this._id };
    const updatedUser = { $set: { "cart.items": updatedCartItems } };
    return db.collection("users").updateOne(filter, updatedUser);
  }

  deleteItemFromCart(productId) {
    const db = getDb();
    const updatedCartItems = this.cart.items.filter(item => {
      return item.productId.toString() !== productId;
    });

    const filter = { _id: this._id };
    const updatedUser = { $set: { "cart.items": updatedCartItems } };
    return db.collection("users").updateOne(filter, updatedUser);
  }

  createOrder() {
    const db = getDb();

    return this.getCart()
      .then(products => {
        const order = {
          items: products,
          user: { _id: this._id, name: this.name },
        };
        return db.collection("orders").insertOne(order);
      })
      .then(result => {
        this.cart = { items: [] };
        const filter = { _id: this._id };
        const updatedUser = { $set: { "cart.items": [] } };
        return db.collection("users").updateOne(filter, updatedUser);
      })
      .catch(err => {
        console.log(err);
      });
  }

  getOrders() {
    const db = getDb();

    return db
      .collection("orders")
      .find({ "user._id": this._id })
      .toArray()
      .catch(err => {
        console.log(err);
      });
  }

  static findById(id) {
    const db = getDb();
    return db
      .collection("users")
      .find({ _id: new mongodb.ObjectId(id) })
      .next()
      .then(user => {
        return user;
      })
      .catch(err => {
        console.log(err);
      });
  }
}

module.exports = User;
