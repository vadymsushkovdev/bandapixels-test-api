"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const router_1 = __importDefault(require("./Auth/router"));
const router_2 = __importDefault(require("./Latency/router"));
const router_3 = __importDefault(require("./User/router"));
function router(app) {
    const router = express_1.default.Router();
    app.use(router_2.default);
    app.use(router_3.default);
    app.use(router_1.default);
    app.use((req, res, next) => {
        res.status(404).send(http_1.default.STATUS_CODES[404]);
    });
    app.use(router);
}
exports.default = router;
//# sourceMappingURL=router.js.map