import * as http from 'http';

export class HttpError extends Error {
    status: number;
    message: string;
    name: 'HttpError';

    constructor(status ? : number, message ? : string) {
        super(message);

        Error.captureStackTrace(this, this.constructor);

        this.status = status;
        this.name = this.name;
        this.message = message || http.STATUS_CODES[this.status];
    }
}

export default HttpError;
