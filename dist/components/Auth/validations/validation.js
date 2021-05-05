"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const validation_1 = __importDefault(require("@components/validation"));
class AuthValidation extends validation_1.default {
    constructor() {
        super();
    }
    getUser(params) {
        const schema = joi_1.default.object().keys({
            password: joi_1.default.string().required(),
            id: joi_1.default.string().required()
        });
        return joi_1.default.validate(params, schema);
    }
}
exports.default = new AuthValidation();
//# sourceMappingURL=validation.js.map