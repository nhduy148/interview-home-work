const express = require("express");
const router = express.Router();
const validate = require('express-validation');

// Controller
const authCtrl = require('../controllers/auth.controller')
const authValid = require('../validations/auth.validation');

router.post('/register', validate(authValid.register, {}, {}), authCtrl.registerUser);
router.post('/login', validate(authValid.login, {}, {}), authCtrl.login);
router.get('/verify', authCtrl.auth);

module.exports = router;
