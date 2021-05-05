import { NextFunction, Response } from 'express';
import IRequestWithUser from './interfaces/interface';
export default function isAuthenticated(req: IRequestWithUser, res: Response, next: NextFunction): Promise<void>;
