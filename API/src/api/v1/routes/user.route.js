const express = require("express");
const router = express.Router();
const validate = require('express-validation');

// Validatiion
const userValid =  require('../validations/user.validation');

// Controller
const userCtrl = require('../controllers/user.controller')

router.get('/', validate(userValid.getUsers, {}, {}), userCtrl.getListUser);

router.post('/register', validate(userValid.createUser, {}, {}), userCtrl.registerUser);

router.route('/:id')
.get(validate(userValid.getUser, {}, {}), userCtrl.getUserByID)
.put(validate(userValid.updateUserInfo, {}, {}), userCtrl.editUserInfo)
.delete(validate(userValid.deleteUser, {}, {}), userCtrl.removeUser)

module.exports = router;
