import { QueryInterface } from "sequelize";

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.bulkInsert(
      "barber_users", [
      {
        name: 'Chuca',
        email: 'clebersonsantos2013@hotmail.com',
        password: '$2a$12$BvxtqyVoOyweXOTOrrlXk.YjFWKF/muoisTfQaD1jytWR882BPOIm',
      },
      {
        name: 'Jonathan',
        email: 'jhonyramos46@gmail.com',
        password: '$2a$12$BvxtqyVoOyweXOTOrrlXk.YjFWKF/muoisTfQaD1jytWR882BPOIm',
      }
    ],
      {}
    );
  },

  down(queryInterface: QueryInterface) {
    return queryInterface.bulkDelete("barber_users", {});
  },
};
