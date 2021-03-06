// Imports
const express = require('express')
const multerConfig = require('./config/multer')
const upload = require('multer')(multerConfig)
const routes = express.Router()
const UserController = require('./app/controllers/UserControllers')
const SessionController = require('./app/controllers/SessionController')
const DashboardController = require('./app/controllers/DashboardController')
const AppointmentController = require('./app/controllers/AppointmentController')
const FileController = require('./app/controllers/FileController')
const AuthMiddleware = require('./app/middlewares/auth')
const guestMiddleware = require('./app/middlewares/guest')
const AvailableController = require('./app/controllers/AvailableController')
const ProviderPainelController = require('./app/controllers/ProviderPainelController')

// Midleware para mensagens flash
routes.use((req, res, next) => {
  res.locals.flashSucess = req.flash('success')
  res.locals.flashError = req.flash('error')

  return next()
})

// Rotas de Login e Cadastro
routes.get('/', guestMiddleware, SessionController.create)
routes.post('/signin', SessionController.store)

routes.get('/signup', guestMiddleware, UserController.create)
routes.post('/signup', upload.single('avatar'), UserController.store)
// Middleware para verificar se o usuário está logado
routes.use('/app', AuthMiddleware)
// Rotas de logout e dashboard
routes.get('/app/logout', SessionController.destroy)
routes.get('/app/dashboard', DashboardController.index)

routes.get('/files/:file', FileController.show)
routes.get('/app/appointments/new/:provider', AppointmentController.create)
routes.post('/app/appointments/new/:provider', AppointmentController.store)

routes.get('/app/available/:provider', AvailableController.index)

routes.get('/app/provider/', ProviderPainelController.index)
module.exports = routes
