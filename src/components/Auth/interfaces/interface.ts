import { IUserModel } from '../../User/models/model';

export interface IAuthService {

    loginUser(userModel: IUserModel): Promise < IUserModel >;

    getTokens(id: string): Promise < string >;

    defineIdType(id: string): Promise<string>;

    logout(typeLogout: string, token: string): Promise < string >;
}
