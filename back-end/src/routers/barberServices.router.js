const router = require('express').Router();

const { barberServicesController } = require('../controllers');


router.get('/services', barberServicesController.getAllBarberServicesController);

module.exports = router;