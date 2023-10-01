const { barberServices } = require('../services');

const getAllBarberServicesController = async (_req, res) => {
  const services = await barberServices.getAllBarberServices();
  console.log(services);
  return res.status(200).json(services);
};

getAllBarberServicesController();

module.exports = {
  getAllBarberServicesController,
};