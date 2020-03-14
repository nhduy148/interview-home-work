const express = require('express');
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const { DB_NAME, DB_URL } = require('./config/vars');
const dbConnection = `${DB_URL}/${DB_NAME}`;

require('dotenv').config()
const port = process.env.PORT || 5000

var bodyParser = require('body-parser');

app.use(express.json());

// app.use(bodyParser.text());

app.use(express.urlencoded({ extended: false }));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

// app.use(cors({
// 	origin: 'http://localhost:5003',
// 	credentials: true
// }))

const user = require('./api/v1/routes/user.route');
const post = require('./api/v1/routes/post.route');
const comment = require('./api/v1/routes/comment.route');
const authen = require('./api/v1/routes/auth.route');

app.use( "/user", user, (err, req, res, next) => {
  res.status(400).json(err);
})

app.use( "/post", post, (err, req, res, next) => {
  res.status(400).json(err);
})

app.use( "/comment", comment, (err, req, res, next) => {
  res.status(400).json(err);
})

app.use( "/auth", authen, (err, req, res, next) => {
  res.status(400).json(err);
})


app.use( (req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
	// res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	// res.setHeader('Access-Control-Allow-Credentials', true);
	// res.setHeader("Content-Type", "text/plain");
	// res.setHeader("Content-Type", "application/json");

  res.status(404).send({ error: 'URL: '+req.originalUrl+' not found!'});
  next();
});


mongoose.connect( dbConnection, 
	{ useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true,
	}, 
	(err) => {
	if(err) console.log(err);
	console.log("Connected to Mongo")
})

app.listen(port, () => console.log(`Server started on port ${port}`));
