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
// Users Routes

// Admin Routes
router.get("/admin/register", admin.register);
router.get("/admin/login", admin.login);
router.post("/admin/signup", admin.signup);
router.post("/admin/signin", admin.signin);
router.get("/admin/dashboard", admin.index);
router.get("/admin/profile", admin.profile);
router.get("/admin/logout", admin.logout);
// Admin Routes

// Universities Routes

// Universities Routes

module.exports = router;
