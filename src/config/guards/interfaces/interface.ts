import { Request } from 'express';

export default interface IRequestWithUser extends Request {
    user: object | string;
}
