"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const services_json_1 = __importDefault(require("./services.json"));
const getPrice = (service) => {
    const price = services_json_1.default.filter((serviceItem) => serviceItem.services === service);
    return price[0].price;
};
exports.default = getPrice;
