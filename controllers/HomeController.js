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

module.exports = {
  homepage,
  login,
  register,
};
