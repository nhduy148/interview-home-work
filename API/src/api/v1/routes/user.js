const express = require("express");
const router = express.Router();
const validate = require('express-validation');

// Validatiion
const { getUsers, getUser, updateUserInfo, deleteUser, createUser } =  require('../validations/user');

// Controller
const { registerUser, getListUser, getUserByID, removeUser, editUserInfo } = require('../controllers/user')

router.get('/', validate(getUsers, {}, {}), getListUser);

router.post('/register', validate(createUser, {}, {}), registerUser);

router.route('/:id')
.get(validate(getUser, {}, {}), getUserByID)
.put(validate(updateUserInfo, {}, {}), editUserInfo)
.delete(validate(deleteUser, {}, {}), removeUser)

module.exports = router;
