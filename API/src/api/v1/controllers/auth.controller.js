// import { ACCESS_TOKEN_LIFE, ACCESS_TOKEN_SECRET_KEY, REFRESH_TOKEN_SECRET } from '../config/vars';
const DB = require('../../../DB/DB');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
require('dotenv').config({path: __dirname+'../.env'});

const JWT_KEY = process.env.JWT_KEY

const { getNextID } = require('./common');


module.exports = {
  login: (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5002');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Methods', 'POST');

    let { username, password } = req.body;

    DB.open()
    .then( db => db.collection("users") )
    .then( users => {
      users.findOne( {username: username}, (err, user) => {
        if(err) res.json({ status: false, result: err });
        else if(!user) res.json({ status: false, result: "User not found!" })
        else {
          
          bcrypt.compare(password, user.password)
          .then( response => {
            if(response === true) {
              const data = { username: user.username, userID: user.user_id, name: user.nicename, role: user.role }
              const token = jwt.sign(data, JWT_KEY);
              res.cookie("token", token, {
                maxAge: 3 * 24 * 60 * 60 * 1000,
                httpOnly: true,
                //secure: true,
              })
              res.status(200).json({ status: true, result: "Login Successful!", token: token });
            }
            else res.status(200).json({ status: false, result: "Wrong passwrod!" })
          } )
          .catch( err => res.json({ status: false, result: err }) )
        }
      })
    })
  },

  register: (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5002');
    res.setHeader('Access-Control-Allow-Methods', 'POST');

    let { username, password, nicename, email } = req.body;

    if(username && password && email) {

      password = bcrypt.hashSync(password, saltRounds);

      DB.open()
      .then( db => {
        const users = db.collection("users");
  
        getNextID(db, "user_id")
        .then( userID => {
          if(userID.lastErrorObject.updatedExisting) {
            const data = {
              user_id: userID.value.value,
              username: username,
              password: password,
              nicename: nicename,
              email: email,
              user_image: "",
              active_key: "",
              role: 1,
              meta: {}
            }
            users.insertOne(data, (err, result) => {
              if( err ) {
                err.code === 11000
                ? res.json({status: false, result: `Usename "${username}" has already been taken.`})
                : res.json({status: false, result: "Something went wrong."})
              }
              else res.status(200).json({status: true, result: "Register Successful!"})
              // else res.send(result);
              // result.insertedCount !== 1
            })
          }
        })
      })
    }
    else {
      res.json({ status: false, result: "Please fill in all required fields." })
    }
  },
  
  auth: (req, res, next) => {
    let token = req.headers.cookie
    if(token) {
      token = token.replace('token=', '');
      jwt.verify(token, JWT_KEY, (err, user) => {
        if(err) {
          res.status(400).json({ status: false, result: { error: "Something went wrong."} })
          throw err;
        }
        else res.json({status: true, result: user});
      });
    }
    else {
      res.json({status: false, result: { error: "Token is not valid yet. Please log in again."} });
    }
  },

  logout: (req, res) => {
    res.clearCookie("token");
    res.json({ status: true, result: { error: "Token has been removed."} })
  },

  test: (req, res) => {

  }
}
