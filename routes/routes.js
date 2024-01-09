const express = require("express");
const router = express.Router();
const home = require("../controllers/HomeController");
const admin = require("../controllers/AdminController");
const uni = require("../controllers/UniController");
const middleware = require("../middlewares/authentication");

// Users Routes
router.get("/", home.homepage);
router.get("/users/login", home.login);
router.get("/users/register", home.register);
router.post("/users/signup", home.signup);
router.post("/users/signin", home.signin);
router.get("/users/logout", home.logout);

//dashboard
router.get("/users/dashboard", home.dashboard);
router.get("/users/profile", home.profile);
router.get("/users/editprofile", home.editprofile);
router.post("/users/updateprofile", home.updateprofile);
// Users Routes

// Admin Routes
router.get("/admin/register", admin.register);
router.get("/admin/login", admin.login);
router.post("/admin/signup", admin.signup);
router.post("/admin/signin", admin.signin);
router.get("/admin/dashboard", admin.dashboard);
router.get("/admin/profile", admin.profile);
router.get("/admin/editprofile", admin.editprofile);
router.post("/admin/updateprofile", admin.updateprofile);

router.get("/logout", admin.logout);
// Admin Routes

// Universities Routes
router.get("/uni/register", uni.register);
router.get("/uni/login", uni.login);
router.post("/uni/signup", uni.signup);
router.post("/uni/signin", uni.signin);
router.get("/uni/dashboard", uni.dashboard);
router.get("/uni/profile", uni.profile);
router.get("/uni/editprofile", uni.editprofile);
router.post("/uni/updateprofile", uni.updateprofile);
router.get("/uni/logout", uni.logout);

// Universities Routes

module.exports = router;
