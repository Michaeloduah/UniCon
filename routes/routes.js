const express = require("express");
const router = express.Router();
const home = require("../controllers/HomeController");
const admin = require("../controllers/AdminController");
const middleware = require("../middlewares/authentication");

// Users Routes
router.get("/", home.homepage);
router.get("/users/login", home.login);
router.get("/users/register", home.register);
router.post("users/signup", home.signup);
router.post("/users/signin", home.signin);
router.get("/users/logout", home.logout);

//dashboard
router.get("/users/dashboard", home.dashboard);
router.get("/users/profile", home.profile);
// Users Routes

// Admin Routes
router.get("/admin/register", admin.register);
router.get("/admin/login", admin.login);
router.post("/admin/signup", admin.signup);
router.post("/admin/signin", admin.signin);
router.get("/admin/dashboard", admin.dashboard);
router.get("/admin/profile", admin.profile);
// Admin Routes

// Universities Routes

// Universities Routes

router.get("/logout", admin.logout);
module.exports = router;
