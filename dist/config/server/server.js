"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("module-alias/register");
const middleware_1 = __importDefault(require("@config/middleware/middleware"));
const router_1 = __importDefault(require("@components/router"));
const app = express_1.default();
middleware_1.default.configure(app);
router_1.default(app);
middleware_1.default.initErrorHandler(app);
app.set('port', process.env.PORT);
app.set('secret', process.env.SECRET);
exports.default = app;
//# sourceMappingURL=server.js.map