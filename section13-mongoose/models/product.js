const mongodb = require("mongodb");

const { getDb } = require("../util/database");

class Product {
  constructor(id, title, price, imageUrl, description, userId) {
    this._id = id ? new mongodb.ObjectId(id) : null;
    this.title = title;
    this.price = price;
    this.imageUrl = imageUrl;
    this.description = description;
    this.userId = userId;
  }

  save() {
    const db = getDb();
    let dbOp;

    if (this._id) {
      const filter = { _id: this._id };
      const updatedProduct = { $set: this };
      dbOp = db.collection("products").updateOne(filter, updatedProduct);
    } else {
      dbOp = db.collection("products").insertOne(this);
    }

    return dbOp
      .then(result => {
        return result;
      })
      .catch(err => {
        console.log(err);
      });
  }

  static fetchAll() {
    const db = getDb();
    return db
      .collection("products")
      .find()
      .toArray()
      .then(products => {
        return products;
      })
      .catch(err => {
        console.log(err);
      });
  }

  static findById(id) {
    const db = getDb();
    return db
      .collection("products")
      .find({ _id: new mongodb.ObjectId(id) })
      .next()
      .then(product => {
        return product;
      })
      .catch(err => {
        console.log(err);
      });
  }

  static deleteById(id) {
    const db = getDb();
    return db
      .collection("products")
      .deleteOne({ _id: new mongodb.ObjectId(id) })
      .then(result => {
        return result;
      })
      .catch(err => {
        console.log(err);
      });
  }
}

module.exports = Product;
