const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render("add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
  });
}

exports.postAddProduct =  (req, res, next) => {
  const product = new Product(req.body.title);
  product.save()
  res.redirect("/");
}

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render("shop", {
      pageTitle: "Shop",
      path: "/",
      productCSS: true,
      activeShop: true,
      products: products,
      hasProducts: products.length > 0,
    });
  })
}
