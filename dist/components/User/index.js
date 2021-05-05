"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const service_1 = __importDefault(require("./service"));
async function info(req, res) {
    const bearerHeader = req.headers['authorization'] || '';
    const bearer = bearerHeader.split(' ');
    const user = await service_1.default.usersInfo(bearer[1]);
    res.json({ id: user.id, id_type: user.id_type });
}
exports.info = info;
//# sourceMappingURL=index.js.map