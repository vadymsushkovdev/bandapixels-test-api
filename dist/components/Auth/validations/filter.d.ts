import { NextFunction, Request, Response } from 'express';
export default function exceptionsAuthFilter(targetMethod: (req: Request, res: Response, next: NextFunction) => void): (req: Request, res: Response, next: NextFunction) => Promise<void>;
