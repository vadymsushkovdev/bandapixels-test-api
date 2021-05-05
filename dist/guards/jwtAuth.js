"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const error_1 = __importDefault(require("@config/error"));
const http_1 = __importDefault(require("http"));
const model_1 = __importDefault(require("@components/User/models/model"));
async function isAuthenticated(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (!bearerHeader) {
        return next(new error_1.default(400, 'No token provided'));
    }
    try {
        const bearer = bearerHeader.split(' ');
        const user = await model_1.default.findOne({ access_token: bearer[1] });
        if (user) {
            return next();
        }
        return next(new error_1.default(400, 'Unauthorized'));
    }
    catch (error) {
        return next(new error_1.default(401, http_1.default.STATUS_CODES[401]));
    }
}
exports.default = isAuthenticated;
//# sourceMappingURL=jwtAuth.js.map