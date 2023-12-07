"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function mapStatusHTTP(status) {
    var _a;
    const statusHTTPMap = {
        INVALID_DATA: 400,
        UNAUTHORIZED: 401,
        NOT_FOUND: 404,
        INVALIDARGUMENTEXCEPTION: 422,
    };
    return (_a = statusHTTPMap[status]) !== null && _a !== void 0 ? _a : 500;
}
exports.default = mapStatusHTTP;
