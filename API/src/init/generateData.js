const mongoose = require("mongoose");
const { DB_NAME, DB_URL } = require('../config/vars');
const dbConnection = `${DB_URL}/${DB_NAME}`;
const { Counters } = require("../helpers/counters");
const User = require('../api/v1/models/user.model')
const Post = require('../api/v1/models/post.model')
const Comment = require('../api/v1/models/comment.model')

const fileUser = require("./data/users.json");
const filePost = require("./data/posts.json");
const flieComment = require("./data/comments.json");

mongoose.connect(
  dbConnection, 
	{ useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true,
	}, 
	(err) => {
	if(err) console.log(err);
	console.log("Connected to Mongo")
})

Counters.insertMany([
  {forCollection: "users", nextID: fileUser.length + 1},
  {forCollection: "posts", nextID: filePost.length + 1},
  {forCollection: "comments", nextID: flieComment.length + 1},
])
.then( docs => console.log("Generated Counters collection."))
.catch( err => console.log(err) )

User.insertMany(fileUser)
.then( docs => console.log("Generated User collection."))
.catch( err => console.log(err) )

Post.insertMany(filePost)
.then( docs => console.log("Generated Post collection."))
.catch( err => console.log(err) )

Comment.insertMany(flieComment)
.then( docs => console.log("Generated Comment collection."))
.catch( err => console.log(err) )
