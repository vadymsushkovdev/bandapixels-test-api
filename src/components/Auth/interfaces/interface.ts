import { IUserModel } from '../../User/models/model';

export interface IAuthService {

    loginUser(IUserModel: IUserModel): Promise < IUserModel >;

    getTokens(id: string): Promise < string >;

    defineIdType(id: string): Promise<string>;

    logout(type_logout: string, token: string): Promise < string >;
}
