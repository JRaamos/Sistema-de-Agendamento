"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    up(queryInterface) {
        return queryInterface.bulkInsert("barber_users", [
            {
                name: 'Chuca',
                email: 'clebersonsantos2013@hotmail.com',
                password: '$2a$10$t0dvtlARWFqfG0PzSUt8vezI77ibzL17gbVjWm05aGlSPE55KTR4K',
            }
        ], {});
    },
    down(queryInterface) {
        return queryInterface.bulkDelete("barber_users", {});
    },
};
