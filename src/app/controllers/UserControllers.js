const { User } = require('../models')

class UserController {
  // Renderiza a página de criação de usuário
  create (req, res) {
    return res.render('auth/signup')
  }
  // Função para criar usuário
  async store (req, res) {
    if (req.file == null) {
      req.flash('error', 'Adicione uma foto')
      return res.redirect('/signup')
    }
    const { filename: avatar } = req.file

    await User.create({ ...req.body, avatar })

    req.flash('success', 'Usuário Cadastrado com Sucesso')

    return res.redirect('/')
  }
}

module.exports = new UserController()
