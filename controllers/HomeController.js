const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
const { User } = require("../models");

async function homepage(req, res) {
  try {
    res.render("home/index", { title: "Homepage" });
  } catch (error) {
    res.send("error: " + error.message);
  }
}

async function login(req, res) {
  try {
    res.render("home/login", { title: "Login" });
  } catch (error) {
    res.send("error: " + error.message);
  }
}

async function register(req, res) {
  try {
    res.render("home/register", { title: "Register" });
  } catch (error) {
    res.send("error: " + error.message);
  }
}

async function signup(req, res) {
  try {
    const { name, username, email, phone, password, confirmpassword } =
      req.body;

    if (confirmpassword == password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({
        name,
        username,
        email,
        phone,
        password: hashedPassword,
      });
      res.redirect("/users/login");
    } else {
      $password_error = "Password Confirmation Failed";
      res.render({ message: $password_error });
    }
  } catch (error) {
    console.error(error);
  }
}

async function signin(req, res) {
  const { email, password } = req.body;

  const user = await User.findOne({
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
  res.redirect("/users/dashboard");
}

async function logout(req, res) {
  // Clear the user's session
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
    }
    // Redirect to the login page after logout
    res.redirect("/");
  });
}

async function dashboard(req, res) {
  try {
    const user = req.session.user;

    res.render("users/dashboard", {
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
    res.render("users/profile", {
      user: user,
      title: "Profile",
      breadcrumb: "Profile",
    });
  } catch (error) {
    res.send("error: " + error);
  }
}

async function editprofile(req, res) {
  try {
    const user = req.session.user;
    res.render("users/editprofile", {
      user: user,
      title: "Edit Profile",
      breadcrumb: "Edit Profile",
    });
  } catch (error) {}
}

async function updateprofile(req, res) {
  const userId = req.session.user;
  const { name, username, email, phone, password, confirmpassword } = req.body;

  try {
    const user = await User.findByPk(userId.id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (confirmpassword == password) {
      user.name = name;
      user.username = username;
      user.email = email;
      user.phone = phone;
      user.password = await bcrypt.hash(password, 10);

      await user.save();
    }
    res.redirect("/users/dashboard");
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error"  });
  }
}

module.exports = {
  homepage,
  login,
  register,
  signup,
  signin,
  logout,
  dashboard,
  profile,
  editprofile,
  updateprofile,
};
