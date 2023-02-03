const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  const isLoggedIn = req.session.isLoggedIn;
  const isEditMode = req.query.edit;

  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    isLoggedIn: isLoggedIn,
    isEditMode: isEditMode,
  });
};

exports.postAddProduct = (req, res, next) => {
  const user = req.session.user;
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = parseFloat(req.body.price);
  const description = req.body.description;
  const product = new Product({
    title,
    price,
    imageUrl,
    description,
    user,
  });

  product
    .save()
    .then(result => {
      console.log(`Created Product ${result._id.toString()}`);
      res.redirect("/admin/products");
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getProducts = (req, res, next) => {
  const isLoggedIn = req.session.isLoggedIn;

  Product.find()
    // .select("title price -_id")
    // .populate("user", "name")
    .then(products => {
      res.render("admin/product-list", {
        pageTitle: "Admin Products",
        path: "/admin/products",
        isLoggedIn: isLoggedIn,
        activeShop: true,
        productCSS: true,
        products: products,
        hasProducts: products.length > 0,
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getEditProduct = (req, res, next) => {
  const isLoggedIn = req.session.isLoggedIn;
  const isEditMode = req.query.edit;
  const productId = req.params.productId;

  if (!isEditMode) {
    return res.redirect("/");
  }

  Product.findById(productId)
    .then(product => {
      if (!product) {
        return res.redirect("/");
      }

      res.render("admin/edit-product", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        isLoggedIn: isLoggedIn,
        isEditMode: isEditMode,
        product: product,
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.postEditProduct = (req, res, next) => {
  const productId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedImageUrl = req.body.imageUrl;
  const updatedPrice = parseFloat(req.body.price);
  const updatedDescription = req.body.description;

  Product.findById(productId)
    .then(product => {
      product.title = updatedTitle;
      product.imageUrl = updatedImageUrl;
      product.price = updatedPrice;
      product.description = updatedDescription;
      return product.save();
    })
    .then(product => {
      console.log(`Updated Product ${product._id.toString()}`);
      res.redirect("/admin/products");
    })
    .catch(err => {
      console.log(err);
    });
};

exports.postDeleteProduct = (req, res, next) => {
  const productId = req.body.productId;

  Product.findByIdAndRemove(productId)
    .then(result => {
      console.log(`Deleted Product ${result._id.toString()}`);
      res.redirect("/admin/products");
    })
    .catch(err => {
      console.log(err);
    });
};
