"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    up(queryInterface) {
        return queryInterface.bulkInsert("services", [
            {
                service_id: 1,
                service: "Corte na máquina",
                price: 20,
                duration: 30,
            },
            {
                service_id: 2,
                service: "Corte na máquina + tesoura",
                price: 20,
                duration: 40,
            },
            {
                service_id: 3,
                service: "Corte tesoura",
                price: 25,
                duration: 40,
            },
            {
                service_id: 4,
                service: "Corte, barba e sobrancelha",
                price: 45,
                duration: 60,
            },
            {
                service_id: 5,
                service: "Corte máquina 1 ou 0",
                price: 15,
                duration: 30,
            },
            {
                service_id: 6,
                service: "Corte navalhado",
                price: 25,
                duration: 30,
            },
            {
                service_id: 7,
                service: "Barba",
                price: 15,
                duration: 30,
            },
            {
                service_id: 8,
                service: "Sobrancelha",
                price: 10,
                duration: 20,
            },
            {
                service_id: 9,
                service: "Pé de cabelo",
                price: 10,
                duration: 20,
            },
            {
                service_id: 10,
                service: "Pigmentação",
                price: 10,
                duration: 30,
            },
        ], {});
    },
    down(queryInterface) {
        return queryInterface.bulkDelete("service", {});
    },
};
