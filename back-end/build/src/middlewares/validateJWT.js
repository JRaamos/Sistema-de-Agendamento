"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_utils_1 = __importDefault(require("../utils/jwt.utils"));
const validateJWT = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization || !authorization.includes('Bearer')) {
        return res.status(401).json({ message: 'Token not found' });
    }
    const token = authorization.split(' ')[1];
    try {
        const userCode = jwt_utils_1.default.verifyToken(token);
        if (!userCode) {
            return res.status(401).json({
                message: 'Expired or invalid token',
            });
        }
        next();
    }
    catch (error) {
        return res.status(401).json({
            message: 'Expired or invalid token',
        });
    }
};
exports.default = validateJWT;
