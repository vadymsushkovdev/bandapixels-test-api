"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const env_1 = __importDefault(require("@config/env"));
const connectOptions = { useNewUrlParser: true, useUnifiedTopology: true };
const MONGO_URI = `${env_1.default.database.MONGODB_URI}${env_1.default.database.MONGODB_DB_MAIN}`;
class Connection {
    constructor(uri, options) {
        this._uri = uri;
        this._options = options;
        this._instance = null;
    }
    init() {
        const connection = mongoose_1.default.createConnection(this._uri, this._options);
        connection.on('connecting', () => { console.log('\x1b[32m', 'MongoDB :: connecting'); });
        connection.on('error', (error) => { console.log('\x1b[31m', `MongoDB :: connection ${error}`); mongoose_1.default.disconnect(); });
        connection.on('connected', () => { console.log('\x1b[32m', 'MongoDB :: connected'); });
        connection.once('open', () => { console.log('\x1b[32m', 'MongoDB :: connection opened'); });
        connection.on('reconnected', () => { console.log('\x1b[33m"', 'MongoDB :: reconnected'); });
        connection.on('reconnectFailed', () => { console.log('\x1b[31m', 'MongoDB :: reconnectFailed'); });
        connection.on('disconnected', () => { console.log('\x1b[31m', 'MongoDB :: disconnected'); });
        connection.on('fullsetup', () => { console.log('\x1b[33m"', 'MongoDB :: reconnecting... %d'); });
        return connection;
    }
    getInstance() {
        if (!this._instance) {
            this._instance = this.init();
        }
        return this._instance;
    }
}
exports.default = new Connection(MONGO_URI, connectOptions).getInstance();
//# sourceMappingURL=connection.js.map