import { QueryInterface } from "sequelize";

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.bulkInsert(
      "barber_users", [
      {
        name: 'Chuca',
        email: 'clebersonsantos2013@hotmail.com',
        password: '$2a$10$t0dvtlARWFqfG0PzSUt8vezI77ibzL17gbVjWm05aGlSPE55KTR4K',
      }
    ],
      {}
    );
  },

  down(queryInterface: QueryInterface) {
    return queryInterface.bulkDelete("barber_users", {});
  },
};
