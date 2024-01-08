const bcrypt = require("bcrypt");
const { Admin } = require("../models");

async function dashboard(req, res, next) {
  try {
    const user = req.session.user;

    res.render("admin/dashboard/index", {
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

    res.render("admin/dashboard/profile", {
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
    res.render("admin/login", { title: "Login" });
  } catch (error) {
    res.send("error: " + error.message);
  }
}

async function register(req, res, next) {
  try {
    res.render("admin/register", { title: "Register" });
  } catch (error) {
    res.send("error: " + error.message);
  }
}

async function signup(req, res, next) {
  try {
    const { name, username, email, phone, password, confirmpassword } =
      req.body;

    if (confirmpassword == password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await Admin.create({
        name,
        username,
        email,
        phone,
        password: hashedPassword,
      })
      res.redirect('/admin/login');
    } else {
      $password_error = 'Password Confirmation Failed'
      res.render({ message: $password_error });
    }
  } catch (error) {
    console.error(error);
  }
}

async function signin(req, res, next) {
  const { email, password } = req.body;

  const user = await Admin.findOne({
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
  res.redirect("/admin/dashboard");
}

async function logout(req, res, next) {
  // Clear the user's session
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
    }
    // Redirect to the login page after logout
    res.redirect("/login");
  });
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
