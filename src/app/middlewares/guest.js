module.exports = (req, res, next) => {
  if (req.session && !req.session.user) return next()

  return res.redirect('/app/dashboard')
}
// Redireciona o usuário a página de dashboard caso ele entre novamente
// para a página de login
