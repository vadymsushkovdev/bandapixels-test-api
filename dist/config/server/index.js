"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const serverHandlers_1 = require("./serverHandlers");
const server_1 = __importDefault(require("./server"));
require("module-alias/register");
const Server = http_1.default.createServer(server_1.default);
Server.listen(server_1.default.get('port'));
Server.on('error', (error) => serverHandlers_1.onError(error, server_1.default.get('port')));
Server.on('listening', serverHandlers_1.onListening.bind(Server));
//# sourceMappingURL=index.js.map