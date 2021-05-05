import bodyParser from 'body-parser';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { HttpError } from '@config/error';
import { sendHttpErrorModule } from '@config/error/sendHttpError';
import ICustomResponse from './interfaces/interface';

class Middleware {

    static configure(app: express.Application): void {
        app.use(bodyParser.urlencoded({extended: false}));
        app.use(bodyParser.json());
        app.use(cookieParser());
        app.use(compression());
        app.use(cors());
        app.use(sendHttpErrorModule);
        app.use(helmet());
        app.use((req, res, next) => {
            res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS ');
            res.header(
                'Access-Control-Allow-Headers',
                'Origin, X-Requested-With,' +
                ' Content-Type, Accept,' +
                ' Authorization,' +
                ' Access-Control-Allow-Credentials'
            );
            res.header('Access-Control-Allow-Credentials', 'true');
            next();
        });
    }

    static initErrorHandler(app: express.Application): void {
        // @ts-ignore
        app.use((error: Error, req: express.Request, res: ICustomResponse) => {
            if (typeof error === 'number') {
                error = new HttpError(error);
            }
            if (error instanceof HttpError) {
                res.sendHttpError(error);
            } else {
                if (app.get('env') === 'development') {
                    error = new HttpError(500, error.message);
                    res.sendHttpError(error);
                } else {
                    error = new HttpError(500);
                    res.sendHttpError(error, error.message);
                }
            }

            console.error(error);
        });
    }
}

export default Middleware;
