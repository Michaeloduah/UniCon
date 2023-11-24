const { User } = require("../models");

async function index(req, res, next) {
  try {
    const user = req.session.user;

    res.render("admin/index", {
      user: user,
      title: "Dashboard",
      breadcrumb: "Home",
    });
  } catch (error) {
    res.send("error: " + error.message);
  }
}

async function profile(req, res) {
  try {
    const user = req.session.user;

    res.render("admin/profile", {
      user: user,
      title: "Profile",
      breadcrumb: "Profile",
    });
  } catch (error) {
    res.send("error: " + error);
  }
}

module.exports = {
  index,
  profile,
};
