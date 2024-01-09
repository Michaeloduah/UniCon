const bcrypt = require("bcrypt");
const { University } = require("../models");

async function dashboard(req, res) {
  try {
    const user = req.session.user;

    res.render("university/dashboard/index", {
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

    res.render("university/dashboard/profile", {
      user: user,
      title: "Profile",
      breadcrumb: "Profile",
    });
  } catch (error) {
    res.send("error: " + error);
  }
}

async function login(req, res) {
  try {
    res.render("university/login", { title: "Login" });
  } catch (error) {
    res.send("error " + error.message);
  }
}

async function register(req, res) {
  try {
    res.render("university/register", { title: "Register" });
  } catch (error) {
    res.send("error " + error.message);
  }
}

async function signup(req, res) {
  try {
    const {
      name,
      username,
      email,
      phone,
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
      res.redirect("/university/login");
    } else {
      $password_error = "Password Confirmation Failed";
      res.render({ message: $password_error });
    }
  } catch (error) {
    res.send("error " + error.message);
  }
}

async function signin(req, res) {
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

async function logout(req, res) {
  try {
    req.session.destroy((err) => {
      if (err) {
        console.error("Error destroying session:", err);
      }
      // Redirect to the login page after logout
      res.redirect("/");
    });
  } catch (error) {
    res.send("error " + error.message);
  }
}

async function editprofile(req, res) {
  try {
    const user = req.session.user;
    res.render("university/dashboard/editprofile", {
      user: user,
      title: "Edit Profile",
      breadcrumb: "Edit Profile",
    });
  } catch (error) {}
}

async function updateprofile(req, res) {
  const userId = req.session.user;
  const {
    name,
    username,
    email,
    phone,
    password,
    confirmpassword,
    country,
    address,
    bio,
    account_status,
  } = req.body;

  try {
    const user = await University.findByPk(userId.id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (confirmpassword == password) {
      user.name = name;
      user.username = username;
      user.email = email;
      user.phone = phone;
      user.password = await bcrypt.hash(password, 10);
      user.country = country;
      user.address = address;
      user.bio = bio;
      user.account_status = account_status;

      await user.save();
    }
    res.redirect("/uni/dashboard");
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  dashboard,
  profile,
  login,
  register,
  signin,
  signup,
  editprofile,
  updateprofile,
  logout,
};
