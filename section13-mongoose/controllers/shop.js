const Product = require("../models/product");

exports.getIndex = (req, res, next) => {
  Product.find()
    .then(products => {
      res.render("shop/index", {
        pageTitle: "Shop",
        path: "/",
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
  Product.find()
    .then(products => {
      res.render("shop/product-list", {
        pageTitle: "Products",
        path: "/products",
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
  const productId = req.params.productId;

  Product.findById(productId)
    .then(product => {
      res.render(`shop/product-detail`, {
        pageTitle: `Product ${product.title}`,
        path: `shop/products/${productId}`,
        product: product,
        productCSS: true,
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getCart = (req, res, next) => {
  const user = req.user;

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
        cartItems: cartItems,
        totalPrice: totalPrice,
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.postCart = (req, res, next) => {
  const user = req.user;
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
  const user = req.user;
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
  const user = req.user;

  user
    .getOrders()
    .then(orders => {
      res.render("shop/orders", {
        pageTitle: "Your Orders",
        path: "/orders",
        orders: orders,
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.postOrder = (req, res, next) => {
  const user = req.user;

  user
    .createOrder()
    .then(result => {
      res.redirect("/orders");
    })
    .catch(err => {
      console.log(err);
    });
};
