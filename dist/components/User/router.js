"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_1 = require("./index");
const jwtAuth_1 = __importDefault(require("@guards/jwtAuth"));
const router = express_1.Router();
router.get('/info', jwtAuth_1.default, index_1.info);
exports.default = router;
//# sourceMappingURL=router.js.map