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
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    
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
              created_at: cmt.created_at,
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
      res.send({
        status: false,
        code: httpStatus.SERVER_ERROR,
        result: err
      })
    })
  },

  getPostsDetails: async (req, res) => {
    let { id } = req.params;
    id = parseInt(id)

    Post
    .aggregate()
    .match({id: id})
    .lookup({
      from: 'users',
      localField: 'owner',
      foreignField: 'id',
      as: 'owner'
    })
    .unwind("owner")
    .then( async postData => {
      postData = postData[0];
      
      // Get comment information.
      let comments = await Comment
      .aggregate()
      .match({post: id})
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

      const owner = {
        id: postData.owner.id,
        name: postData.owner.name
      }
      const result = {
        id: postData.id,
        title: postData.title,
        owner: owner,
        tags: postData.tags,
        created_at: postData.created_at,
        comments: comments
      } 

      res.send({
        status: true,
        code: httpStatus.OK,
        result: result,
      })
    })
    .catch( err => {
      console.log(err)
      res.send({
        status: false,
        code: httpStatus.SERVER_ERROR,
        result: err
      })
    })
  },

  addPost: async (req, res) => {
    let id = await nextID("posts");
    let { title, content, tags, owner } = req.body;

    tags = typeof tags == Array ? tags : [...tags];
    owner = parseInt(owner);


    console.log(id);
    
    if(!owner) {
      res.send({
        status: false,
        code: httpStatus.UNAUTHORIZED,
        result: "Please login to create a post."
      })
    } else {
      const postData = new Post({
        id: id,
        title: title,
        content: content,
        owner: owner,
        tags: tags
      })
  
      postData
      .save()
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

  updatePost: (req, res) => {
    const { title, content, owner } = req.body;
    let tags = req.body.tags;
    const { id } = req.params;

    tags = typeof tags == Array ? tags : [...tags];

    if(!owner) {
      res.send({
        status: false,
        code: httpStatus.UNAUTHORIZED,
        result: "Please login to update a post."
      })
    } else {
      const newPostData = {
        title: title,
        content: content,
        tags: tags
      }

      Post.findOneAndUpdate(
        {id: id},
        newPostData
      )
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
    }
  },

  deletePost: (req, res) => {
    const { id } = req.params;

    Post.remove({id: id})
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
