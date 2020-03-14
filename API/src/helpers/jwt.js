const { sign, verify } = require('jsonwebtoken');
const { ACCESS_TOKEN_SECRET_KEY, ACCESS_TOKEN_LIFE } = require('../config/vars');

module.exports = {
  generateToken: (user) => {
    return new Promise( (resolve, reject ) => {
      const { id, username, name } = user;
      const userData = {
        id: id,
        username, username,
        name: name
      }

      sign(
        {userInfo: userData},
        ACCESS_TOKEN_SECRET_KEY,
        {
          algorithm: "HS256",
          expiresIn: ACCESS_TOKEN_LIFE,
        },
        (error, token) => {
          if (error) {
            return reject(error);
          }
          resolve(token);
      });
    })
  },
  
  verifyToken: (token) => {
    return new Promise((resolve, reject) => {
      verify(token, ACCESS_TOKEN_SECRET_KEY, (error, decoded) => {
        if (error) {
          return reject(error);
        }
        resolve(decoded);
      });
    });
  }
}
