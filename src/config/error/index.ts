import http from 'http';

export class HttpError extends Error {
    status: number;
    message: string;
    name: string;

    constructor(status ? : number, message ? : string) {
        super(message);

        Error.captureStackTrace(this, this.constructor);

        this.status = status || 0;
        this.name = 'HttpError';
        this.message = message || `${http.STATUS_CODES[this.status]}`;
    }
}

export default HttpError;
