import { Request, Response } from 'express';
import ping, {PingResponse} from 'ping';
import latencyConstants from './constants';

export async function latencyGoogle(req: Request, res: Response): Promise<Response> {
    const latency: PingResponse = await ping.promise.probe(latencyConstants.ping.google);

    if(!latency.alive){ return res.json('Connection is down') }

    return res.json(`${latencyConstants.ping.google} site response latency is ${latency.time}ms`);
}


