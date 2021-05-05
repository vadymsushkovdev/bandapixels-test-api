"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
class HttpError extends Error {
    constructor(status, message) {
        super(message);
        Error.captureStackTrace(this, this.constructor);
        this.status = status || 0;
        this.name = 'HttpError';
        this.message = message || `${http_1.default.STATUS_CODES[this.status]}`;
    }
}
exports.HttpError = HttpError;
exports.default = HttpError;
//# sourceMappingURL=index.js.map