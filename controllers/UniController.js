const bcrypt = require("bcrypt");
const { University } = require("../models");

async function dashboard(req, res, next) {
  try {
    const user = req.session.user;

    res.render("uni/dashboard/index", {
      user: user,
      title: "Dashboard",
      breadcrumb: "Home",
    });
  } catch (error) {
    res.send("error: " + error.message);
  }
}

async function profile(req, res, next) {
  try {
    const user = req.session.user;

    res.render("uni/dashboard/profile", {
      user: user,
      title: "Profile",
      breadcrumb: "Profile",
    });
  } catch (error) {
    res.send("error: " + error);
  }
}

async function login(req, res, next) {
  try {
    res.render("university/login", { title: "Login" });
  } catch (error) {
    res.send("error " + error.message);
  }
}

async function register(req, res, next) {
  try {
    res.render("university/register", { title: "Register" });
  } catch (error) {
    res.send("error " + error.message);
  }
}

async function signup(req, res, next) {
  try {
    const {
      name,
      username,
      email,
      password,
      confirmpassword,
      country,
      address,
      bio,
      account_status,
    } = req.body;

    if (confirmpassword == password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await University.create({
        name,
        username,
        email,
        phone,
        password: hashedPassword,
        country,
        address,
        bio,
        account_status,
      });
      res.redirect("/uni/login");
    } else {
      $password_error = "Password Confirmation Failed";
      res.render({ message: $password_error });
    }
  } catch (error) {
    res.send("error " + error.message);
  }
}

async function signin(req, res, next) {
  const { email, password } = req.body;

  const user = await University.findOne({
    where: { email },
  });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return res.status(401).json({ message: "Invalid password" });
  }

  // Set up a session with user information
  req.session.user = user;

  // Redirect to the dashboard
  res.redirect("/uni/dashboard");
}

async function logout(req, res, next) {
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
