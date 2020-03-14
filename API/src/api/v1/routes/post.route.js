const express = require('express');
const router = express.Router();
const validate = require('express-validation');

const postCtrl = require('../controllers/post.controller');
const postValid = require('../validations/post.validation');

router.get('/', validate(postValid.getPosts, {}, {}), postCtrl.getPostsFull);

router.post('/add', validate(postValid.createPost, {}, {}), postCtrl.addPost)

router.route('/:id')
.get(validate(postValid.getPost, {}, {}), postCtrl.getPostsDetails)
.put(validate(postValid.updatePost, {}, {}), postCtrl.updatePost)
.delete(validate(postValid.deletePost, {}, {}), postCtrl.deletePost)

module.exports = router;
