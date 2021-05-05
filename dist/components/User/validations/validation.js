"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const validation_1 = __importDefault(require("@components/validation"));
const constants_1 = __importDefault(require("@components/Auth/constants"));
class UserValidation extends validation_1.default {
    constructor() {
        super();
    }
    createUser(params) {
        if (params.id_type === constants_1.default.id_type.email) {
            const schema = joi_1.default.object().keys({
                password: joi_1.default.string().required(),
                id: joi_1.default.string().email({
                    minDomainAtoms: 2
                }).required(),
                id_type: joi_1.default.string().required()
            });
            return joi_1.default.validate(params, schema);
        }
        if (params.id_type === constants_1.default.id_type.phone) {
            const schema = joi_1.default.object().keys({
                password: joi_1.default.string().required(),
                id: joi_1.default.string().regex(/^[0-9]{10,14}$/).required(),
                id_type: joi_1.default.string().required()
            });
            return joi_1.default.validate(params, schema);
        }
    }
}
exports.default = new UserValidation();
//# sourceMappingURL=validation.js.map