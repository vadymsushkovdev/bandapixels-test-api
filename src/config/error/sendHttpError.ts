import { HttpError } from './index';
import { NextFunction, Request } from 'express';

export function sendHttpErrorModule(req: Request, res: any, next: NextFunction): void {
    res.sendHttpError = (error: HttpError): void => {
        res.status(error.status);

        /**
         * if this looks like an AJAX request
         * if this request has a "json" content-type AND ALSO has its "Accept" header set
         * if this request DOESN'T explicitly want HTML
         */
        if (
            req.xhr ||
            req.is('json') ||
            (req.is('json') && req.get('Accept'))
        )
         {
            res.json({
                status: error.status,
                name: error.name,
                message: error.message
            });
        } else {
            res.send(generateHTML(error));
        }
    };

    next();
}

const generateHTML: Function = (error: HttpError): string => {
    if (error) {
        return '<div style=\'text-align: center;\'>' +
            `<p>Status: ${error.status}</p>` +
            `<p>Name: ${error.name}</p>` +
            `<p>${error}</p>` +
        `</div>`;
    }

    return '';
};

