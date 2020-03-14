const { nextID } = require('../../../helpers/counters');
const { generateToken, verifyToken } = require('../../../helpers/jwt');
const User = require('../models/user.model');
const httpStatus = require('http-status');


module.exports = {
  login: async (req, res) => {
    try {
      
      let { username, password } = req.body;
      const user = await User.findOne({ username }).exec();
      const isPasswordExact = await user.comparePassword(password)
      const message = !user ? "User not found!" : !isPasswordExact ? "Wrong passwrod!" : "Login Successful!";
      const code = !user || !isPasswordExact ? httpStatus.NON_AUTHORITATIVE_INFORMATION : httpStatus.OK;
      const status = !user || !isPasswordExact ? false : true;
      const token = status === true ? await generateToken(user) : false;

      if( token ) {
        res.cookie("token", token, {
          maxAge: 3 * 24 * 60 * 60 * 1000,
          httpOnly: true,
          //secure: true,
        })
      }
      
      res.send({
        result: message,
        code: code,
        status: status,
        token: token
      });
    }
    catch(err) {
      res.send({
        result: err,
        code: httpStatus.CONFLICT,
        status: false,
      });
    }
  },
  
  auth: async (req, res, next) => {
    let token = req.headers.cookie
    if(token) {
      token = token.replace('token=', '');
      const userInfo = await verifyToken(token);
      res.send({
        status: true,
        code: httpStatus.OK,
        result: userInfo
      })
    }
    else {
      res.send({
        result: { error: "Token is not valid yet. Please log in again."},
        code: httpStatus.CONFLICT,
        status: false,
      });
    }
  },

  registerUser: async (req, res, next) => {
    try {
      const { username, password, name, dob } = req.body;
      const isUserExists = await User.findOne({ username });
      const nextUserID = await nextID("users");

      if (isUserExists) {
        res.send({
          message: 'This "username" is already exists.',
          code: httpStatus.CONFLICT,
          status: false,
        });
      } else {
        const userData = new User({
          id: nextUserID,
          username: username,
          password: password,
          name: name,
          dob: dob
        });

        const user = await userData.save()
        formattedData = user.format();
        
        res.send({
          status: true,
          code: httpStatus.CREATED,
          result: formattedData
        })
      }
    }
    catch( err ) { 
      res.send({
        status: false,
        code: httpStatus.SERVER_ERROR,
        result: err
      })
    }
  },

  logout: (req, res) => {
    res.clearCookie("token");
    res.json({ status: true, result: { error: "Token has been removed."} })
  },

  test: (req, res) => {

  }
}
