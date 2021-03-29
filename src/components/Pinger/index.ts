import { Request, Response } from 'express';
import { exec } from 'child_process';


export async function pingGoogle(req: Request, res: Response): Promise < void > {
    await exec('ping -b -c 4 google.com', (error, data, getter) => {
        if (error) { res.json(error.message); }
        if (getter) { res.json(data); }

        res.json(data);
    });
}


