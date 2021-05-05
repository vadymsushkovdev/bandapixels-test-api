"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_1 = require("./index");
const jwtAuth_1 = __importDefault(require("@guards/jwtAuth"));
const filter_1 = __importDefault(require("./validations/filter"));
const router = express_1.Router();
router.get('/latency', jwtAuth_1.default, filter_1.default(index_1.latencyGoogle));
exports.default = router;
//# sourceMappingURL=router.js.map