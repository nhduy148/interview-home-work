const authCtrl = require('../controllers/auth.controller')

module.exports = app => {

  app.post('/login', authCtrl.login)

  app.post('/register', authCtrl.register)

  app.get('/auth', authCtrl.auth)

  app.get('/logout', authCtrl.logout)

  app.post('/test', authCtrl.test)
}