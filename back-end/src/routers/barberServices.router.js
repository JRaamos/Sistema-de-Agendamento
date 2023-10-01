const router = require('express').Router();

const { barberServicesController } = require('../controllers');

router.get('/', () => "Seja bem vindo ao nosso sistema de agendamento de serviços da Barberia Stylu's!");

router.get('/services', () => barberServicesController.getAllBarberServices);

module.exports = router;