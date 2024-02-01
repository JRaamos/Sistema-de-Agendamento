"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validateUser = (req, res, next) => {
    const { name, phone } = req.body;
    if (!name || !phone) {
        return res.status(300).json({ message: 'Invalid name or phone. Try again.' });
    }
    next();
};
const validateService = (req, res, next) => {
    const { services } = req.body;
    if (!services) {
        return res.status(300).json({ message: 'Invalid services. Try again.' });
    }
    next();
};
const validadeSchedule = (req, res, next) => {
    const { date, hour } = req.body;
    if (!date || !hour) {
        return res.status(300).json({ message: 'Invalid date or hour. Try again.' });
    }
    next();
};
exports.default = { validateUser, validateService, validadeSchedule };
