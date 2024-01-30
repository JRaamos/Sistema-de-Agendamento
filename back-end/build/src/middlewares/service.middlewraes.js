"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const servicePriceValidation = (req, res, next) => {
    const { price } = req.body;
    const { name } = req.params;
    console.log(name);
    if (!name) {
        return res.status(400).json({ message: 'Invalid name. Try again.' });
    }
    if (price <= 0 || !price) {
        return res.status(400).json({ message: 'Invalid price. Try again.' });
    }
    next();
};
exports.default = servicePriceValidation;
