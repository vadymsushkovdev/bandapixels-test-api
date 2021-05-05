"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function sendHttpErrorModule(req, res, next) {
    res.sendHttpError = (error) => {
        res.status(error.status);
        if (req.xhr ||
            req.is('json') ||
            (req.is('json') && req.get('Accept'))) {
            res.json({
                status: error.status,
                name: error.name,
                message: error.message
            });
        }
        else {
            res.send(generateHTML(error));
        }
    };
    next();
}
exports.sendHttpErrorModule = sendHttpErrorModule;
const generateHTML = (error) => {
    if (error) {
        return '<div style=\'text-align: center;\'>' +
            `<p>Status: ${error.status}</p>` +
            `<p>Name: ${error.name}</p>` +
            `<p>${error}</p>` +
            `</div>`;
    }
    return '';
};
//# sourceMappingURL=sendHttpError.js.map