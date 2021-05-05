"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const express_1 = require("express");
const filter_1 = __importDefault(require("./validations/filter"));
const jwtAuth_1 = __importDefault(require("@guards/jwtAuth"));
const router = express_1.Router();
router.post('/signup', filter_1.default(index_1.signup));
router.post('/login', filter_1.default(index_1.login));
router.get('/logout', jwtAuth_1.default, filter_1.default(index_1.logout));
exports.default = router;
//# sourceMappingURL=router.js.map