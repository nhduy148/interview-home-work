const postCtrl = require('../controllers/post.controller');
const express = require('express');
const router = express.Router();
// const postValid = require('../validations/')

router.get('/', postCtrl.getPostsFull);

module.exports = router;
