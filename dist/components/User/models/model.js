"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const connection_1 = __importDefault(require("@config/connection/connection"));
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    id: {
        type: String,
        unique: true,
        trim: true
    },
    id_type: {
        type: String,
    },
    password: {
        type: String,
    },
    access_token: {
        type: String,
    },
}, {
    collection: 'usermodel',
    versionKey: false
}).pre('save', async function (next) {
    const user = this;
    if (!user.isModified('password')) {
        return next();
    }
    try {
        const salt = await bcrypt_1.default.genSalt(10);
        user.password = await bcrypt_1.default.hash(user.password, salt);
        next();
    }
    catch (error) {
        return next(error);
    }
});
exports.default = connection_1.default.model('UserModel', UserSchema);
//# sourceMappingURL=model.js.map