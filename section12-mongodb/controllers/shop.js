const Product = require("../models/product");

exports.getIndex = (req, res, next) => {
  Product.findAll()
    .then(products => {
      res.render("shop/index", {
        pageTitle: "Shop",
        path: "/",
        products: products,
        hasProducts: products.length > 0,
        productCSS: true,
      });
    })
    .catch(err => console.log(err));
};

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then(products => {
      res.render("shop/product-list", {
        pageTitle: "Products",
        path: "/products",
        products: products,
        hasProducts: products.length > 0,
        productCSS: true,
      });
    })
    .catch(err => console.log(err));
};

exports.getProduct = (req, res, next) => {
  const productId = req.params.productId;

  // Product.findAll({ where: { id: productId } })
  //   .then(products => {
  //     const product = products[0];
  //     res.render(`shop/product-detail`, {
  //       pageTitle: `Product ${productId}`,
  //       path: `shop/products/${productId}`,
  //       product: product,
  //       productCSS: true,
  //     });
  //   })
  //   .catch(err => console.log(err));

  Product.findByPk(productId)
    .then(product => {
      res.render(`shop/product-detail`, {
        pageTitle: `Product ${productId}`,
        path: `shop/products/${productId}`,
        product: product,
        productCSS: true,
      });
    })
    .catch(err => console.log(err));
};

exports.getCart = (req, res, next) => {
  const user = req.user;

  user
    .getCart()
    .then(cart => {
      return cart.getProducts();
    })
    .then(products => {
      return products;
    })
    .then(products => {
      let totalPrice = 0;

      products.forEach(product => {
        totalPrice += product.price * product.cartItem.quantity;
      });

      res.render("shop/cart", {
        pageTitle: "Your Cart",
        path: "/cart",
        products: products,
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
  let fetchedCart;

  user
    .getCart()
    .then(cart => {
      fetchedCart = cart;
      return cart.getProducts({ where: { id: productId } });
    })
    .then(products => {
      if (products.length > 0) {
        return products[0];
      } else {
        return Product.findByPk(productId);
      }
    })
    .then(product => {
      const oldQuantity = product.cartItem?.quantity ?? 0;
      const newQuantity = oldQuantity + 1;

      return fetchedCart.addProduct(product, {
        through: { quantity: newQuantity },
      });
    })
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
    .getCart()
    .then(cart => {
      return cart.getProducts({ where: { id: productId } });
    })
    .then(products => {
      const product = products[0];
      return product.cartItem.destroy();
    })
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
    .getOrders({ include: ["products"] })
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
  let createdOrder;
  let fetchedCart;

  user
    .createOrder()
    .then(order => {
      createdOrder = order;
      return order;
    })
    .then(() => {
      return user.getCart();
    })
    .then(cart => {
      fetchedCart = cart;
      return cart.getProducts();
    })
    .then(products => {
      return createdOrder.addProducts(
        products.map(product => {
          product.orderItem = { quantity: product.cartItem.quantity };
          return product;
        }),
      );
    })
    .then(orderItems => {
      return fetchedCart.setProducts(null);
    })
    .then(result => {
      res.redirect("/orders");
    })
    .catch(err => {
      console.log(err);
    });
};
