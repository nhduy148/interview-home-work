const Comment = require('../models/comment.model');
module.exports = {
  // Get comment information.
  getCommentsByPostID: (postID) => {
    Comment
    .aggregate()
    .match({post: postID})
    .lookup({
      from: 'users',
      localField: 'owner',
      foreignField: 'id',
      as: 'owner'
    })
    .then( data => console.log(data) )
    .catch( err => console.log(err) )
  }
}
