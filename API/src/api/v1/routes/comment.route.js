const express = require("express");
const router = express.Router();
const validate = require('express-validation');

const commentCtrl = require('../controllers/comment.controller');
const commentValid = require('../validations/comment.validation');

router.get('/', validate(commentValid.getComments, {}, {}), commentCtrl.listComment);

router.post('/add', validate(commentValid.createComment, {}, {}), commentCtrl.addComment);

router.route('/:id')
.get(validate(commentValid.getComment, {}, {}), commentCtrl.getOneComment)
.put(validate(commentValid.updateComment, {}, {}), commentCtrl.editComment)
.delete(validate(commentValid.deleteComment, {}, {}), commentCtrl.deleteComment)

module.exports = router;
