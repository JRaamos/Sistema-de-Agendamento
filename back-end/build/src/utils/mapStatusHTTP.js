"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function mapStatusHTTP(status) {
    switch (status) {
        case 'SUCCESSFUL': return 200;
        case 'INVALID_DATA': return 401;
        case 'CREATED': return 201;
        case 'NOT_FOUND': return 404;
        case 'CONFLICT': return 409;
        default: return 500;
    }
}
exports.default = mapStatusHTTP;
