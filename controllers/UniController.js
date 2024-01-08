const bcrypt = require("bcrypt");
const { University } = require("../models");

async function dashboard(res, req, next) {
  try {
  } catch (error) {
    res.send("error " + error.message);
  }
}

async function profile(res, req, next) {
  try {
  } catch (error) {
    res.send("error " + error.message);
  }
}

async function login(res, req, next) {
  try {
    res.render("university/login", { title: "Login" });
  } catch (error) {
    res.send("error " + error.message);
  }
}

async function register(res, req, next) {
  try {
    res.render("university/register", { title: "Register" });
  } catch (error) {
    res.send("error " + error.message);
  }
}

async function signup(res, req, next) {
  try {
    const { name, username, email, country, password, confirmpassword } =
      req.body;

    if (confirmpassword == password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await Admin.create({
        name,
        username,
        email,
        phone,
        password: hashedPassword,
      });
      res.redirect("/admin/login");
    } else {
      $password_error = "Password Confirmation Failed";
      res.render({ message: $password_error });
    }
  } catch (error) {
    res.send("error " + error.message);
  }
}

async function signin(res, req, next) {
  try {
  } catch (error) {
    res.send("error " + error.message);
  }
}

async function logout(res, req, next) {
  try {
  } catch (error) {
    res.send("error " + error.message);
  }
}

module.exports = {
  dashboard,
  profile,
  login,
  register,
  signin,
  signup,
  logout,
};
