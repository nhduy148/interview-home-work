const User = require('../models/user.model');
const httpStatus = require('http-status');
const { nextID } = require('../../../helpers/counters');

module.exports = {

  getListUser: async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;    
    const skip = limit * (page - 1);
    const total_user = await User.countDocuments();
    const total_page = Math.round(total_user / limit) || 1;
    const has_next_page = page + 1 <= total_page ? true : false;
    const has_prev_page = page - 1 > 0 ? true : false;
    const next_page = has_next_page ? page + 1 : null;
    const prev_page = has_prev_page ? page - 1 : null;    

    User.find({}).skip(skip).limit(limit)
    .then( data => 
        res.send({
            status: true,
            code: httpStatus.OK,
            page: page,
            total_page: total_page,
            has_next_page: has_next_page,
            next_page: next_page,
            has_prev_page: has_prev_page,
            prev_page: prev_page,
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

  getUserByID: async (req, res, next) => {
    const id = req.params.id || false;

    User.find({id: id})
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

  addUser: async (req, res) => {

    const { username, password, name, dob } = req.body;
    const nextUserID = await nextID("users");
    
    const user = new User({
      id: nextUserID,
      username: username,
      password: password,
      name: name,
      dob: dob
    });

    user.save()
    .then(
      userData => res.send({
        status: true,
        code: httpStatus.CREATED,
        result: userData
      }).format()
    )
    .catch( err => 
      res.send({
        status: false,
        code: httpStatus.SERVER_ERROR,
        result: err
      })
    )
  },

  editUserInfo: async (req, res, next) => {

    const { password, name, dob } = req.body;
    const { id } = req.params;

    const newUserInfo = {
      password: password,
      name: name,
      dob: dob
    };

    const data = await User.findOneAndUpdate({id: id}, newUserInfo);

    try {
      res.send({
        status: true,
        code: httpStatus.OK,
        result:data
      })
    }
    catch( err ) {
      res.send({
        status: false,
        code: httpStatus.SERVER_ERROR,
        result: err
      })
    }
  },

  removeUser: async (req, res, next) => {
    const id = req.params.id;

    User.remove({id: id})
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
}
