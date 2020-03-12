const DB = require('../DB/DB');
const { getNextID } = require('./common');

module.exports = {
  getPosts: (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5002');
    res.setHeader('Access-Control-Allow-Methods', 'GET');

    let orderBy = req.query.orderBy ? `${req.query.orderBy}` : "date";
    let order = req.query.order === "ASC" ? 1 : req.query.order === "DESC" ? -1 : -1;
    let limit = req.query.limit ? parseInt(req.query.limit) : 10;

    DB.open()
      .then(db => db.collection("posts"))
      .then(posts => {})
      .catch(err => {})
  },
}
