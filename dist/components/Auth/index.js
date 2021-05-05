"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const service_1 = __importDefault(require("./service"));
const service_2 = __importDefault(require("@components/User/service"));
async function signup(req, res) {
    const user = req.body;
    user.id_type = await service_1.default.defineIdType(user.id);
    const createdUser = await service_2.default.createUser(user);
    res.json({ status: 200, access_token: createdUser.access_token });
}
exports.signup = signup;
async function login(req, res) {
    const user = await service_1.default.loginUser(req.body);
    res.json({ status: 200, access_token: user.access_token });
}
exports.login = login;
async function logout(req, res) {
    if (!req.query.all) {
        res.json({ status: 401, message: '\'All\' parameter is missed' });
    }
    const bearerHeader = req.headers['authorization'] || '';
    const bearer = bearerHeader.split(' ');
    await service_1.default.logout(String(req.query.all), bearer[1]);
    res.json({ status: 200, message: 'User(s) logged out' });
}
exports.logout = logout;
//# sourceMappingURL=index.js.map