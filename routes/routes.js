const express = require('express');
const router = express.Router();
const home = require('../controllers/HomeController')
const middleware = require('../middlewares/authentication');

// HomePage Routes
router.get('/', home.homepage);
router.get('/login', home.login);
router.get('/register', home.register);
router.post('/signup', home.signup);
router.post('/signin', home.signin);

module.exports = router;