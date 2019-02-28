const express = require('express')
const nunjucks = require('nunjucks')
const path = require('path')
const session = require('express-session')
const LokiStore = require('connect-loki')(session)
const flash = require('connect-flash')
const dateFilter = require('nunjucks-date-filter')
// Classe de configuração do server
class App {
  constructor () {
    this.express = express()
    // Verifica se o ambiente é de desenvolvimento ou produção
    this.isDev = process.env.NODE_ENV !== 'production'

    this.middlewares()
    this.views()
    this.routes()
  }
  middlewares () {
    this.express.use(express.urlencoded({ extended: false }))
    this.express.use(flash())
    // Salvar Session
    this.express.use(
      session({
        name: 'root',
        secret: 'MyAppSecret',
        resave: true,
        store: new LokiStore({
          path: path.resolve(
            __dirname,
            '..',
            'tmp',
            'sessions',
            'session-store.db'
          )
        }),
        saveUninitialized: false
      })
    )
  }
  // Configurações do framework para views, no caso o nunjucks
  views () {
    const env = nunjucks.configure(path.resolve(__dirname, 'app', 'views'), {
      watch: this.isDev,
      express: this.express,
      autoscape: true
    })
    env.addFilter('date', dateFilter)
    this.express.use(express.static(path.resolve(__dirname, 'public')))
    this.express.set('view engine', 'njk')
  }

  routes () {
    this.express.use(require('./routes'))
  }
}

module.exports = new App().express
