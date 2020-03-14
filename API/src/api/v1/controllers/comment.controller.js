const Comment = require('../models/comment.model');
const { nextID } = require('../../../helpers/counters');
const httpStatus = require('http-status')

module.exports = {
  
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
  },

  listComment: async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;    
    const skip = limit * (page - 1);
    const total_comment = await Comment.countDocuments();
    const total_page = Math.round(total_comment / limit) || 1;
    const has_next_page = page + 1 <= total_page ? true : false;
    const has_prev_page = page - 1 > 0 ? true : false;
    const next_page = has_next_page ? page + 1 : null;
    const prev_page = has_prev_page ? page - 1 : null;

    let comments = await Comment
    .aggregate()
    .lookup({
      from: 'users',
      localField: 'owner',
      foreignField: 'id',
      as: 'owner'
    })
    .unwind("owner")
    
    comments = comments.map( cmt => {
      const ownerName = cmt.owner.name === "" ? "Anonymous" : cmt.owner.name;
      return {
        id: cmt.id,
        content: cmt.content,
        created_at: cmt.created_at,
        owner: {
          id: cmt.owner.id,
          name: ownerName,
          created_at: cmt.owner.created_at
        }
      }
    })

    try {
      res.send({
        status: true,
        code: httpStatus.OK,
        page: page,
        total_page: total_page,
        has_next_page: has_next_page,
        next_page: next_page,
        has_prev_page: has_prev_page,
        prev_page: prev_page,
        result: comments,
      })
    } catch (err) {
      res.send({
        status: false,
        code: httpStatus.SERVER_ERROR,
        result: err
      })      
    }
  },

  getOneComment: (req, res) => {
    const { id } = req.params;

    Comment.find({id: id})
    .then( data => 
        res.send({
          status: true,
          code: httpStatus.OK,
          result: data,
        })
    )
    .catch( err => 
      res.send({
        status: false,
        code: httpStatus.SERVER_ERROR,
        result: err
      })
    )
  },

  addComment: async (req, res) => {
    let { owner, post, content } = req.body;
    owner = parseInt(owner);
    post = parseInt(post);
    const id = await nextID("users");

    if( !owner ) {
      res.send({
        status: false,
        code: httpStatus.UNAUTHORIZED,
        result: "Please login to create a post."
      })
    }
    else if( !post ) {
      res.send({
        status: false,
        code: httpStatus.UNAUTHORIZED,
        result: "You must select a post to add a comment."
      })
    }
    else {
      const comment = new Comment({
        id: id,
        owner: owner,
        post: post,
        content: content
      })

      comment.save()
      .then(        
        data => res.send({
          status: true,
          code: httpStatus.CREATED,
          result: data
        })
      )
      .catch( err => 
        res.send({
          status: false,
          code: httpStatus.SERVER_ERROR,
          result: err
        })
      )
    }
  },

  editComment: (req, res) => {
    const { id } = req.params;
    const { content } = req.body;

    Comment
    .findOneAndUpdate({id: id}, {content: content})
    .then(
      data => res.send({
        status: true,
        code: httpStatus.OK,
        result:data
      })
    )
    .catch(
      res.send({
        status: false,
        code: httpStatus.SERVER_ERROR,
        result: err
      })
    )
  },

  deleteComment: (req, res) => {
    const { id } = req.params;

    Comment.remove({id: id})
    .then( data => 
        res.send({
          status: true,
          code: httpStatus.OK,
          result: data,
        })
    )
    .catch( err => 
      res.send({
        status: false,
        code: httpStatus.SERVER_ERROR,
        result: err
      })
    )
  }
}
