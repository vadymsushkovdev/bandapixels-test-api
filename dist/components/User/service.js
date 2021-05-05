"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = __importDefault(require("./models/model"));
const validation_1 = __importDefault(require("./validations/validation"));
const service_1 = __importDefault(require("@components/Auth/service"));
const userService = {
    async usersInfo(token) {
        try {
            const user = await model_1.default.findOne({ access_token: token });
            if (user) {
                return user;
            }
            throw new Error('Token is unavailable');
        }
        catch (error) {
            throw new Error(error);
        }
    },
    async createUser(body) {
        try {
            const validate = validation_1.default.createUser(body);
            if (validate.error) {
                throw new Error(validate.error.message);
            }
            const user = new model_1.default({
                id: body.id,
                id_type: body.id_type,
                access_token: await service_1.default.getTokens(body.id),
                password: body.password
            });
            const query = await model_1.default.findOne({ id: body.id });
            if (query) {
                throw new Error('This id already exists');
            }
            const saved = await user.save();
            return saved;
        }
        catch (error) {
            throw new Error(error);
        }
    }
};
exports.default = userService;
//# sourceMappingURL=service.js.map