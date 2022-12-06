const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(title, imageUrl, description, price);
  product.save();
  res.redirect("/products");
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render("admin/product-list", {
      pageTitle: "Admin Products",
      path: "/admin/products",
      productCSS: true,
      activeShop: true,
      products: products,
      hasProducts: products.length > 0,
    });
  });
};
