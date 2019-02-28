const { User, Appointment } = require('../models')
const { Op } = require('sequelize')
const moment = require('moment')

class ProviderPainelController {
  async index (req, res) {
    const appointments = await Appointment.findAll({
      include: [{ model: User, as: 'user' }],
      where: {
        provider_id: req.session.user.id,
        date: {
          [Op.between]: [
            moment()
              .startOf('day')
              .format(),
            moment()
              .endOf('day')
              .format()
          ]
        }
      }
    })
    appointments.forEach(element => {
      element.date = moment(element.date).subtract(3, 'hours')
    })
    return res.render('provider/index', { appointments })
  }
}

module.exports = new ProviderPainelController()
