"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    up(queryInterface) {
        return queryInterface.bulkInsert("barber_users", [
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
        ], {});
    },
    down(queryInterface) {
        return queryInterface.bulkDelete("barber_users", {});
    },
};
