const mongodb = require("mongodb");

const { getDb } = require("../util/database");

class User {
  constructor(username, email, cart, id) {
    this.name = username;
    this.email = email;
    this.cart = cart ?? { items: [] };
    this._id = id ? new mongodb.ObjectId(id) : null;
  }

  save() {
    const db = getDb();
    let dbOp;

    if (this._id) {
      const filter = { _id: this._id };
      const updatedUser = { $set: this };
      dbOp = db.collection("users").updateOne(filter, updatedUser);
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
    const db = getDb();
    const productIds = this.cart.items.map(item => item.productId);

    return db
      .collection("products")
      .find({ _id: { $in: productIds } })
      .toArray()
      .then(products => {
        return products.map(product => {
          const cartProduct = this.cart.items.find(item => {
            return item.productId.toString() === product._id.toString();
          });
          return { ...product, quantity: cartProduct.quantity };
        });
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
          user: {
            _id: this._id,
            name: this.name,
          },
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
