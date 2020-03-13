const Post = require('../models/post.model');
const Comment = require('../models/comment.model');
const httpStatus = require('http-status');
const { nextID } = require('../../../helpers/counters');

module.exports = {

  // Not full information
  getPosts: async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;    
    const skip = limit * (page - 1);
    const total_post = await Post.countDocuments();
    const total_page = Math.round(total_post / limit) || 1;
    const has_next_page = page + 1 <= total_page ? true : false;
    const has_prev_page = page - 1 > 0 ? true : false;
    const next_page = has_next_page ? page + 1 : null;
    const prev_page = has_prev_page ? page - 1 : null;    

    Post.find({}).skip(skip).limit(limit)
    .then( data => {
      
      const result = data.map( (postItem, i) => {
        const excerpt = postItem.content.replace(/(<([^>]+)>)/ig,"").replace(/\s\s+/g, ' ').substr(0, 100)+'...';
        return {
          id: postItem.id,
          title: postItem.title,
          excerpt: excerpt,
          owner: postItem.owner,
          tags: postItem.tags,
          created_at: postItem.created_at
        }
      })

      res.send({
        status: true,
        code: httpStatus.OK,
        page: page,
        total_page: total_page,
        has_next_page: has_next_page,
        next_page: next_page,
        has_prev_page: has_prev_page,
        prev_page: prev_page,
        result: result,
      })
    })
    .catch( err => 
      res.send({
        status: true,
        code: httpStatus.SERVER_ERROR,
        result: err
      })
    )
  },

  // Full information ( with comments and author )
  getPostsFull: async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;    
    const skip = limit * (page - 1);
    const total_post = await Post.countDocuments();
    const total_page = Math.round(total_post / limit) || 1;
    const has_next_page = page + 1 <= total_page ? true : false;
    const has_prev_page = page - 1 > 0 ? true : false;
    const next_page = has_next_page ? page + 1 : null;
    const prev_page = has_prev_page ? page - 1 : null;

    Post
    .aggregate()
    .lookup({
      from: 'users',
      localField: 'owner',
      foreignField: 'id',
      as: 'owner'
    })
    .unwind("owner")
    .skip(skip)
    .limit(limit)
    .then( data => {

      Promise.all(
        data.map( async (postItem, i) => {      
          const postID = postItem.id;
    
          // Get comment information.
          let comments = await Comment
          .aggregate()
          .match({post: postID})
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
              owner: {
                id: cmt.owner.id,
                name: ownerName,
                created_at: cmt.owner.created_at
              }
            }
          })
  
          const excerpt = postItem.content.replace(/(<([^>]+)>)/ig,"").replace(/\s\s+/g, ' ').substr(0, 100)+'...';
          const owner = {
            id: postItem.owner.id,
            name: postItem.owner.name
          }
          return {
            id: postItem.id,
            title: postItem.title,
            excerpt: excerpt,
            owner: owner,
            tags: postItem.tags,
            created_at: postItem.created_at,
            comments: comments
          }
        })
      )
      .then( result => 
        res.send({
          status: true,
          code: httpStatus.OK,
          page: page,
          total_page: total_page,
          has_next_page: has_next_page,
          next_page: next_page,
          has_prev_page: has_prev_page,
          prev_page: prev_page,
          result: result,
        })
      )      
      .catch( err => err )
      

    })
    .catch( err => {
      console.log(err)
      res.send({
        status: false,
        code: httpStatus.SERVER_ERROR,
        result: err
      })
    })
  }
}
