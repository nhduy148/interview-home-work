require('dotenv').config({path: __dirname+'../../.env'});

module.exports = {
  saltRounds: parseInt(process.env.BCRYPT_SALT_ROUNDS),
  DB_NAME: process.env.DB_NAME,  
  DB_URL: `${process.env.DB_HOST}:${process.env.DB_PORT}`,
  ACCESS_TOKEN_LIFE: process.env.ACCESS_TOKEN_LIFE,    
  ACCESS_TOKEN_SECRET_KEY: process.env.ACCESS_TOKEN_SECRET_KEY,    
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,   
}
