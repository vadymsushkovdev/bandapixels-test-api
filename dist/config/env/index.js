"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const NODE_ENV = process.env.NODE_ENV || 'development';
const development = {
    port: process.env.PORT,
    database: {
        MONGODB_URI: process.env.MONGODB_URI,
        MONGODB_DB_MAIN: process.env.MONGODB_DB_MAIN
    },
    secret: process.env.SECRET
};
const production = {
    port: process.env.PORT,
    database: {
        MONGODB_URI: process.env.MONGODB_URI,
        MONGODB_DB_MAIN: process.env.MONGODB_DB_MAIN
    },
    secret: process.env.SECRET
};
const test = {
    port: process.env.PORT,
    database: {
        MONGODB_URI: process.env.MONGODB_URI,
        MONGODB_DB_MAIN: process.env.MONGODB_DB_MAIN_TEST
    },
    secret: process.env.SECRET
};
const config = { test, development, production };
exports.default = config[NODE_ENV];
//# sourceMappingURL=index.js.map