import { Request } from 'express';
import { IUserModel } from '@components/User/models/model';
export default interface IRequestWithUser extends Request {
    user: IUserModel;
}
