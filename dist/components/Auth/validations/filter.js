"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const error_1 = __importDefault(require("@config/error"));
function exceptionsAuthFilter(targetMethod) {
    return async function (req, res, next) {
        try {
            await targetMethod(req, res, next);
        }
        catch (error) {
            if (error.code === 500) {
                return next(new error_1.default(error.message.status, error.message));
            }
            res.json({ status: 400, message: error.message });
        }
    };
}
exports.default = exceptionsAuthFilter;
//# sourceMappingURL=filter.js.map