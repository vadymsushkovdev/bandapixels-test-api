import * as express from 'express';
import * as http from 'http';
import AuthRouter from './Auth/router';
import PingerRouter from './Pinger/router';
import UserRouter from './User/router';

export function init(app: express.Application): void {
    const router: express.Router = express.Router();

    app.use('', PingerRouter);
    app.use('', UserRouter);
    app.use('', AuthRouter);
    app.use((req, res, next) => {
        res.status(404).send(http.STATUS_CODES[404]);
    });

    app.use(router);
}
