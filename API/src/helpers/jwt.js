import { sign, verify } from 'jsonwebtoken';

module.exports = {
  generateToken: (user, secretSignature, tokenLife) => {
    return new Promise( (resolve, reject ) => {
      const { id, username, name } = user;
      const userData = {
        id: id,
        username, username,
        name: name
      }

      sign(
        {userInfo: userData},
        secretSignature,
        {
          algorithm: "HS256",
          expiresIn: tokenLife,
        },
        (error, token) => {
          if (error) {
            return reject(error);
          }
          resolve(token);
      });
    })
  },
  
  verifyToken: (token, secretKey) => {
    return new Promise((resolve, reject) => {
      verify(token, secretKey, (error, decoded) => {
        if (error) {
          return reject(error);
        }
        resolve(decoded);
      });
    });
  }
}