'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('barber_services',
      [
        {
          id: 1,
          services: 'Corte na máquina',
          price: 20.00,
          duration: 30,
        },
        {
          id: 2,
          services: 'Corte na máquina + tesoura',
          price: 20.00,
          duration: 40,
        },
        {
          id: 3,
          services: 'Corte tesoura',
          price: 25.00,
          duration: 40,
        },
        {
          id: 4,
          services: 'Corte, barba e sobrancelha',
          price: 45.00,
          duration: 60,
        },
        {
          id: 5,
          services: 'Corte máquina 1 ou 0',
          price: 15.00,
          duration: 30,
        },
        {
          id: 6,
          services: 'Corte navalhado',
          price: 25.00,
          duration: 30,
        },
        {
          id: 7,
          services: 'Barba',
          price: 15.00,
          duration: 30,
        },
        {
          id: 8,
          services: 'Sobrancelha',
          price: 10.00,
          duration: 20,
        },
        {
          id: 9,
          services: 'Pé de cabelo',
          price: 10.00,
          duration: 20,
        },
        {
          id: 10,
          services: 'Pigmentação',
          price: 10.00,
          duration: null,
        },
      ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('barber_services', null, {});
  }
};
