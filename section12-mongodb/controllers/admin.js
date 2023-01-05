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
  const user = req.user;
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = parseFloat(req.body.price);
  const description = req.body.description;

  user
    .createProduct({
      title: title,
      price: price,
      imageUrl: imageUrl,
      description: description,
    })
    .then(result => {
      console.log(`Created Product ${result.dataValues.id}`);
      res.redirect("/admin/products");
    })
    .catch(err => console.log(err));
};

// exports.getProducts = (req, res, next) => {
//   const user = req.user;

//   user
//     .getProducts()
//     .then(products => {
//       res.render("admin/product-list", {
//         pageTitle: "Admin Products",
//         path: "/admin/products",
//         productCSS: true,
//         activeShop: true,
//         products: products,
//         hasProducts: products.length > 0,
//       });
//     })
//     .catch(err => console.log(err));
// };

// exports.getEditProduct = (req, res, next) => {
//   const isEditMode = req.query.edit;
//   const user = req.user;
//   const productId = req.params.productId;

//   if (!isEditMode) {
//     return res.redirect("/");
//   }

//   user
//     .getProducts({ where: { id: productId } })
//     .then(products => {
//       const product = products[0];

//       if (!product) {
//         return res.redirect("/");
//       }

//       res.render("admin/edit-product", {
//         pageTitle: "Edit Product",
//         path: "/admin/edit-product",
//         product: product,
//         isEditMode: isEditMode,
//       });
//     })
//     .catch(err => console.log(err));
// };

// exports.postEditProduct = (req, res, next) => {
//   const productId = req.body.productId;
//   const updatedTitle = req.body.title;
//   const updatedImageUrl = req.body.imageUrl;
//   const updatedPrice = parseFloat(req.body.price);
//   const updatedDescription = req.body.description;

//   Product.findByPk(productId)
//     .then(product => {
//       product.title = updatedTitle;
//       product.imageUrl = updatedImageUrl;
//       product.description = updatedDescription;
//       product.price = updatedPrice;
//       return product.save();
//     })
//     .then(product => {
//       console.log(`Updated Product ${product.id}`);
//       res.redirect("/admin/products");
//     })
//     .catch(err => console.log(err));
// };

// exports.postDeleteProduct = (req, res, next) => {
//   const productId = req.body.productId;

//   Product.findByPk(productId)
//     .then(product => {
//       return product.destroy();
//     })
//     .then(product => {
//       console.log(`Destroyed Product ${product.id}`);
//       res.redirect("/admin/products");
//     })
//     .catch(err => console.log(err));
// };
