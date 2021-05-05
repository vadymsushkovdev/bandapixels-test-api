"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const compression_1 = __importDefault(require("compression"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const error_1 = require("@config/error");
const sendHttpError_1 = require("@config/error/sendHttpError");
class Middleware {
    static configure(app) {
        app.use(body_parser_1.default.urlencoded({ extended: false }));
        app.use(body_parser_1.default.json());
        app.use(cookie_parser_1.default());
        app.use(compression_1.default());
        app.use(cors_1.default());
        app.use(sendHttpError_1.sendHttpErrorModule);
        app.use(helmet_1.default());
        app.use((req, res, next) => {
            res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS ');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With,' +
                ' Content-Type, Accept,' +
                ' Authorization,' +
                ' Access-Control-Allow-Credentials');
            res.header('Access-Control-Allow-Credentials', 'true');
            next();
        });
    }
    static initErrorHandler(app) {
        app.use((error, req, res) => {
            if (typeof error === 'number') {
                error = new error_1.HttpError(error);
            }
            if (error instanceof error_1.HttpError) {
                res.sendHttpError(error);
            }
            else {
                if (app.get('env') === 'development') {
                    error = new error_1.HttpError(500, error.message);
                    res.sendHttpError(error);
                }
                else {
                    error = new error_1.HttpError(500);
                    res.sendHttpError(error, error.message);
                }
            }
            console.error(error);
        });
    }
}
exports.default = Middleware;
//# sourceMappingURL=middleware.js.map