import express from 'express';
import http from 'http';
import AuthRouter from './Auth/router';
import LatencyRouter from './Latency/router';
import UserRouter from './User/router';

export default function router(app: express.Application): void {
    const router: express.Router = express.Router();

    app.use(LatencyRouter);
    app.use(UserRouter);
    app.use(AuthRouter);
    app.use((req, res, next) => {
        res.status(404).send(http.STATUS_CODES[404]);
    });

    app.use(router);
}
