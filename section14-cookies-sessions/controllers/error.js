exports.get404 = (req, res, next) => {
  const isLoggedIn = req.cookies.isLoggedIn;

  res.status(404).render("404", {
    pageTitle: "Page Not Found",
    path: req.path,
    isLoggedIn: isLoggedIn,
  });
};
