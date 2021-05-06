import AuthService from './service';
import { IUserModel } from '@components/User/models/model';
import { Request, Response } from 'express';
import userService from '@components/User/service';
import Joi from 'joi';
import AuthValidation from '@components/Auth/validations/validation';

export async function signup(req: Request, res: Response): Promise < void > {
    const validate: Joi.ValidationResult < IUserModel > = AuthValidation.getUser(req.body);

    if (validate.error) { throw new Error(validate.error.message); }

    const user: IUserModel = req.body;

    user.id_type  = await AuthService.defineIdType(user.id);

    const createdUser: IUserModel = await userService.createUser(user);
    const authToken: string = await AuthService.loginUser(createdUser);

    res.json({ status: 200, access_token: authToken });
}

export async function login(req: Request, res: Response): Promise < void > {
    const validate: Joi.ValidationResult < IUserModel > = AuthValidation.getUser(req.body);

    if (validate.error) { throw new Error(validate.error.message); }

    const authToken: string = await AuthService.loginUser(req.body);

    res.json({ status: 200, access_token: authToken });
}

export async function logout(req: Request, res: Response): Promise < void > {
    if (!req.query.all) { res.json({ status: 401, message: '\'All\' parameter is missed' }); }

    const bearerHeader: string = req.headers['authorization'] || '';
    const bearer: string[] = bearerHeader.split(' ');

    await AuthService.logout(String(req.query.all), bearer[1]);

    res.json({ status: 200, message: 'User(s) logged out' });
}
