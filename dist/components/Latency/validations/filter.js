"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const error_1 = __importDefault(require("@config/error"));
function exceptionsLatencyFilter(targetMethod) {
    return async function (req, res, next) {
        try {
            await targetMethod(req, res, next);
        }
        catch (error) {
            next(new error_1.default(error.message.status, error.message));
        }
    };
}
exports.default = exceptionsLatencyFilter;
//# sourceMappingURL=filter.js.map