// Configurações do banco de dados
module.exports = {
  dialect: 'postgres',
  host: '127.0.0.1',
  username: '',
  password: '',
  database: 'gobarber',
  operatorAliases: false,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true
  }
}
