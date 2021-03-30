import { Request, Response } from 'express';
import { exec } from 'child_process';
import latencyConstants from './constants';


export async function latencyGoogle(req: Request, res: Response): Promise < void > {
    await exec(latencyConstants.ping.google, (error, data, getter) => {
        if (error) { res.json(error.message); }
        if (getter) { res.json(data); }

        res.json(data);
    });
}


