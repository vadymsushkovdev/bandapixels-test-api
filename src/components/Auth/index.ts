import AuthService from './service';
import { IUserModel } from '../User/models/model';
import { Request, Response } from 'express';
import UserService from '../User/service';

export async function signup(req: Request, res: Response): Promise < void > {
    const user: IUserModel = req.body;

    user.id_type  = await AuthService.defineIdType(user.id);

    const createdUser: IUserModel = await UserService.createUser(user);

    res.json({ status: 200, access_token: createdUser.access_token });
}

export async function login(req: Request, res: Response): Promise < void > {
    const user: IUserModel = await AuthService.loginUser(req.body);

    res.json({ status: 200, access_token: user.access_token });
}

export async function logout(req: Request, res: Response): Promise < void > {
    if (!req.query.all) { res.json({ status: 401, message: '\'All\' parameter is missed' }); }
    const bearerHeader: string = req.headers['authorization'];
    const bearer: string[] = bearerHeader.split(' ');

    await AuthService.logout(String(req.query.all), bearer[1]);

    res.json({ status: 200, message: 'User(s) logged out' });
}
