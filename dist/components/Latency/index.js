"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ping_1 = __importDefault(require("ping"));
const constants_1 = __importDefault(require("./constants"));
async function latencyGoogle(req, res) {
    const latency = await ping_1.default.promise.probe(constants_1.default.ping.google);
    if (!latency.alive) {
        return res.json('Connection is down');
    }
    return res.json(`${constants_1.default.ping.google} site response latency is ${latency.time}ms`);
}
exports.latencyGoogle = latencyGoogle;
//# sourceMappingURL=index.js.map