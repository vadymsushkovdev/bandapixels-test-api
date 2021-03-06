import { NextFunction, Response } from 'express';
import HttpError from '@config/error';
import http from 'http';
import IRequestWithUser from './interfaces/interface';
import UserModel, { IUserModel } from '@components/User/models/model';

export default async function isAuthenticated(req: IRequestWithUser, res: Response, next: NextFunction): Promise< void > {
    const bearerHeader: string | undefined = req.headers['authorization'];

    if (!bearerHeader) { return next(new HttpError(400, 'No token provided')); }

    try {
        const bearer: string[] = bearerHeader.split(' ');
        const user: IUserModel | null = await UserModel.findOne({ access_token: bearer[1] });

        if (user) { return next(); }

        return next(new HttpError(400, 'Unauthorized'));
    } catch (error) {
        return next(new HttpError(401, http.STATUS_CODES[401]));
    }
}
