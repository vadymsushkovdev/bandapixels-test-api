import * as express from 'express';
import { HttpError } from '@config/error';
export default interface ICustomResponse extends express.Response {
    sendHttpError: (error: HttpError | Error, message?: string) => void;
}
