const { barberServices } = require('../services');

const getAllBarberServicesController = async (_req, res) => {
  const services = await barberServices.getAllBarberServices();
  return res.status(200).json(services);
};


module.exports = {
  getAllBarberServicesController,
};