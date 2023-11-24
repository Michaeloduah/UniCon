const bcrypt = require("bcrypt");
const { User }  = require("../models");

async function homepage(req, res, next) {
  try {
    res.render("home/index", { title: "Homepage" });
  } catch (error) {
    res.send("error: " + error.message);
  }
}

async function login(req, res, next) {
  try {
    res.render("home/login", { title: "Login" });
  } catch (error) {
    res.send("error: " + error.message);
  }
}

async function register(req, res, next) {
  try {
    res.render("home/register", { title: "Register" });
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
      const newUser = await User.create({
        name,
        username,
        email,
        phone,
        password: hashedPassword,
      })
      res.redirect('/login');
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
  res.redirect("/dashboard");
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
  homepage,
  login,
  register,
  signup,
  signin,
  logout,
};
