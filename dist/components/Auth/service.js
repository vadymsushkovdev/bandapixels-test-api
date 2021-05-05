"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validation_1 = __importDefault(require("./validations/validation"));
const model_1 = __importDefault(require("@components/User/models/model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const server_1 = __importDefault(require("@config/server/server"));
const constants_1 = __importDefault(require("./constants"));
const authService = {
    async defineIdType(id) {
        if (id.includes('@')) {
            return constants_1.default.id_type.email;
        }
        if (id.charAt(0) === '+') {
            throw new Error('Add an id without \'+\'');
        }
        if (!isNaN(Number(id))) {
            return constants_1.default.id_type.phone;
        }
        throw new Error('Invalid id');
    },
    async loginUser(body) {
        try {
            const validate = validation_1.default.getUser(body);
            if (validate.error) {
                throw new Error(validate.error.message);
            }
            const user = await model_1.default.findOne({ id: body.id });
            if (user) {
                user.access_token = await this.getTokens(user.id);
                await model_1.default.updateOne({ id: body.id }, { $set: user }).exec();
                return user;
            }
            throw new Error('Invalid password or id');
        }
        catch (error) {
            throw new Error(error);
        }
    },
    async logout(typeLogout, token) {
        try {
            if (typeLogout === 'false') {
                const user = await model_1.default.findOne({ access_token: token });
                if (user) {
                    await model_1.default.updateOne({ access_token: token }, { $set: { access_token: ' ' } }).exec();
                    return user;
                }
            }
            if (typeLogout === 'true') {
                await model_1.default.updateMany({}, { $set: { access_token: ' ' } }).exec();
            }
        }
        catch (error) {
            throw new Error(error);
        }
    },
    async getTokens(userId) {
        try {
            return jsonwebtoken_1.default.sign({ id: userId }, server_1.default.get('secret'), { expiresIn: constants_1.default.token.expareTime });
        }
        catch (error) {
            throw new Error(error);
        }
    }
};
exports.default = authService;
//# sourceMappingURL=service.js.map