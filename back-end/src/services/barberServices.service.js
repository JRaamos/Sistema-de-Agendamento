const { BarberService } = require('../models');

const getAllBarberServices = async () => {
  const services = await BarberService.findAll();
  return services;
};

module.exports = {
  getAllBarberServices,
};