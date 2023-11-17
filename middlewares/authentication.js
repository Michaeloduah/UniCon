// Middleware for the routes
function isAuthenticated(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.redirect("/login");
  }
}

function isNotAuthenticated(req, res, next) {
    if (!req.session.user) {
        next();
    } else {
        res.redirect("/dashboard");
    }
}

module.exports = {
    isAuthenticated,
    isNotAuthenticated
}