const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  const isEditMode = req.query.edit;

  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    isEditMode: isEditMode,
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = parseFloat(req.body.price);
  const description = req.body.description;
  const product = new Product(null, title, imageUrl, description, price);

  product.save(() => {
    res.redirect("/products");
  });
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

exports.getEditProduct = (req, res, next) => {
  const isEditMode = req.query.edit;
  const productId = req.params.productId;

  Product.findById(productId, product => {
    res.render("admin/edit-product", {
      pageTitle: "Edit Product",
      path: "/admin/edit-product",
      product: product,
      isEditMode: isEditMode,
    });
  });
};

exports.postEditProduct = (req, res, next) => {
  const productId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedImageUrl = req.body.imageUrl;
  const updatedPrice = parseFloat(req.body.price);
  const updatedDescription = req.body.description;
  const updatedProduct = new Product(
    productId,
    updatedTitle,
    updatedImageUrl,
    updatedDescription,
    updatedPrice,
  );

  updatedProduct.save(() => {
    res.redirect("/admin/products");
  });
};

exports.postDeleteProduct = (req, res, next) => {
  const productId = req.body.productId;

  Product.deleteById(productId, () => {
    res.redirect("/admin/products");
  });
};
