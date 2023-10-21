"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const message = 'Invalid entries. Try again.';
const validateUser = (req, res, next) => {
    const { name, phone } = req.body;
    if (!name || !phone) {
        return res.status(400).json({ message });
    }
    next();
};
const validateService = (req, res, next) => {
    const { services, price } = req.body;
    if (!services || !price) {
        return res.status(400).json({ message });
    }
    next();
};
const validadeSchedule = (req, res, next) => {
    const { date, hour } = req.body;
    if (!date || !hour) {
        return res.status(400).json({ message });
    }
    next();
};
exports.default = { validateUser, validateService, validadeSchedule };
