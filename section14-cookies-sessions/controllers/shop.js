const Product = require("../models/product");
const Order = require("../models/order");

exports.getIndex = (req, res, next) => {
  const isLoggedIn = req.session.isLoggedIn;

  Product.find()
    .then(products => {
      res.render("shop/index", {
        pageTitle: "Shop",
        path: "/",
        isLoggedIn: isLoggedIn,
        products: products,
        hasProducts: products.length > 0,
        productCSS: true,
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getProducts = (req, res, next) => {
  const isLoggedIn = req.session.isLoggedIn;

  Product.find()
    .then(products => {
      res.render("shop/product-list", {
        pageTitle: "Products",
        path: "/products",
        isLoggedIn: isLoggedIn,
        products: products,
        hasProducts: products.length > 0,
        productCSS: true,
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getProduct = (req, res, next) => {
  const isLoggedIn = req.session.isLoggedIn;
  const productId = req.params.productId;

  Product.findById(productId)
    .then(product => {
      res.render(`shop/product-detail`, {
        pageTitle: `Product ${product.title}`,
        path: `shop/products/${productId}`,
        isLoggedIn: isLoggedIn,
        product: product,
        productCSS: true,
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getCart = (req, res, next) => {
  const isLoggedIn = req.session.isLoggedIn;
  const user = req.session.user;

  user
    .populate("cart.items.product")
    .then(user => {
      const cartItems = user.cart.items;
      let totalPrice = 0;

      cartItems.forEach(cartItem => {
        totalPrice += cartItem.product.price * cartItem.quantity;
      });

      res.render("shop/cart", {
        pageTitle: "Your Cart",
        path: "/cart",
        isLoggedIn: isLoggedIn,
        cartItems: cartItems,
        totalPrice: totalPrice,
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.postCart = (req, res, next) => {
  const user = req.session.user;
  const productId = req.body.productId;

  user
    .addItemToCart(productId)
    .then(result => {
      res.redirect("/cart");
    })
    .catch(err => {
      console.log(err);
    });
};

exports.postCartDeleteItem = (req, res, next) => {
  const user = req.session.user;
  const productId = req.body.productId;

  user
    .deleteItemFromCart(productId)
    .then(result => {
      res.redirect("/cart");
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getOrders = (req, res, next) => {
  const isLoggedIn = req.session.isLoggedIn;
  const user = req.session.user;

  Order.find({ user: user._id })
    .then(orders => {
      res.render("shop/orders", {
        pageTitle: "Your Orders",
        path: "/orders",
        isLoggedIn: isLoggedIn,
        orders: orders,
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.postOrder = (req, res, next) => {
  const user = req.session.user;

  user
    .populate("cart.items.product")
    .then(user => {
      const order = new Order({ user: user._id, items: user.cart.items });
      return order.save();
    })
    .then(order => {
      return user.clearCart();
    })
    .then(result => {
      res.redirect("/orders");
    })
    .catch(err => {
      console.log(err);
    });
};
