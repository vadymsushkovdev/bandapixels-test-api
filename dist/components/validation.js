"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const mongoose_1 = require("mongoose");
class Validation {
    constructor() {
        this.messageObjectId = 'Argument passed in must be a single String of 12 bytes or a string of 24 hex characters';
        this.customJoi = joi_1.default.extend({
            name: 'objectId',
            language: {
                base: this.messageObjectId
            },
            pre(value, state, options) {
                if (!mongoose_1.Types.ObjectId.isValid(value)) {
                    return this.createError('objectId.base', {
                        value
                    }, state, options);
                }
                return value;
            }
        });
    }
}
exports.default = Validation;
//# sourceMappingURL=validation.js.map