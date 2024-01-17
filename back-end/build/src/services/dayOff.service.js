"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dayOff_Model_1 = __importDefault(require("../database/models/dayOff.Model"));
const createDayOff = async (dayOff) => {
    dayOff.map(async (item) => {
        const newdayOff = {
            dayOff: item.selectedDate,
            time: item.timeOff,
            barberId: 1,
        };
        return dayOff_Model_1.default.create(newdayOff);
    });
};
const getDayOffs = async () => dayOff_Model_1.default.findAll();
const deleteDayOff = async (date) => dayOff_Model_1.default.destroy({
    where: {
        dayOff: date,
    },
});
exports.default = {
    createDayOff,
    getDayOffs,
    deleteDayOff,
};
