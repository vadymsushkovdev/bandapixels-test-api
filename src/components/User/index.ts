import { Request, Response } from 'express';
import userService from './service';
import { IUserModel } from './models/model';

export async function info(req: Request, res: Response): Promise< void > {
    const bearerHeader: string = req.headers['authorization'];
    const bearer: string[] = bearerHeader.split(' ');
    const user: IUserModel = await userService.usersInfo(bearer[1]);

    res.json({ id: user.id, id_type: user.id_type });
}
