const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  cart: {
    items: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true },
      },
    ],
  },
});

schema.methods.addItemToCart = function (productId) {
  const findIndexCallback = item => item.product.toString() === productId;
  const cartProductIndex = this.cart.items.findIndex(findIndexCallback);
  const updatedCartItems = [...this.cart.items];
  let newQuantity = 1;

  if (cartProductIndex >= 0) {
    newQuantity = this.cart.items[cartProductIndex].quantity + 1;
    updatedCartItems[cartProductIndex].quantity = newQuantity;
  } else {
    updatedCartItems.push({
      product: productId,
      quantity: newQuantity,
    });
  }

  this.cart.items = updatedCartItems;

  return this.save();
};

schema.methods.deleteItemFromCart = function (productId) {
  const filterCallback = item => item.product.toString() !== productId;
  const updatedCartItems = this.cart.items.filter(filterCallback);

  this.cart.items = updatedCartItems;
  return this.save();
};

schema.methods.clearCart = function () {
  this.cart.items = [];
  return this.save();
};

module.exports = mongoose.model("User", schema);
