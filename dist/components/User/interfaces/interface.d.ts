import { IUserModel } from '@components/User/models/model';
export interface IUserService {
    usersInfo(token: string): Promise<IUserModel>;
    createUser(IUserModel: IUserModel): Promise<IUserModel>;
}
