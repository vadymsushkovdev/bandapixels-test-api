import UserModel, { IUserModel } from '@components/User/models/model';
import jwt from 'jsonwebtoken';
import app from '@config/server/server';
import authConstants from './constants';

class AuthService {

    public async defineIdType(id: string): Promise < string > {
        if (id.includes('@')) { return authConstants.id_type.email; }
        if (id.charAt(0) === '+') { throw new Error('Add the id without \'+\''); }
        if (!isNaN(Number(id))) { return authConstants.id_type.phone; }

        throw new Error('Invalid id');
    }

    public async loginUser(body: IUserModel): Promise < string > {
        try {
            const user: IUserModel | null = await UserModel.findOne({ id: body.id });

            if (user) {
                user.access_token = await this.getTokens(user.id);

                await UserModel.updateOne({ id: body.id }, { $set: user }).exec();

                return user.access_token;
            }

            throw new Error('Invalid password or id');
        } catch (error) {
            throw new Error(error);
        }
    }

    public async logout(typeLogout: string, token: string): Promise < void > {
        try {
            if (typeLogout === 'false') {
                const user: any = await UserModel.findOne({ access_token: token });
                if (user) {
                    await UserModel.updateOne({ access_token: token }, { $set: { access_token: ' ' } }).exec();
                }
            }
            if (typeLogout === 'true') {
                await UserModel.updateMany({}, { $set: { access_token: ' ' } }).exec();
            }
        } catch (error) {
            throw new Error(error);
        }
    }

    private async getTokens(userId: string): Promise < string > {
        try {
            return jwt.sign({ id: userId }, app.get('secret'), { expiresIn: authConstants.token.expareTime });
        } catch (error) {
            throw new Error(error);
        }
    }
};

export default new AuthService();

