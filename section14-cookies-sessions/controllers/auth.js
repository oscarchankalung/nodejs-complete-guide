exports.getLogin = (req, res, next) => {
  const isLoggedIn = req.cookies.isLoggedIn;

  res.render("auth/login", {
    pageTitle: "Login",
    path: "/login",
    isLoggedIn: isLoggedIn,
  });
};

exports.postLogin = (req, res, next) => {
  res.cookie("isLoggedIn", "true", {
    maxAge: 600000,
    secure: true,
    httpOnly: true,
    sameSite: "lax",
  });
  res.redirect("/");
};
