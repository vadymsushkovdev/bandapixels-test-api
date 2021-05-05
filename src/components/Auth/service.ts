import Joi from 'joi';
import AuthValidation from './validations/validation';
import UserModel, { IUserModel } from '@components/User/models/model';
import { IAuthService } from './interfaces/interface';
import jwt from 'jsonwebtoken';
import app from '@config/server/server';
import authConstants from './constants';

const authService: IAuthService = {

    async defineIdType(id: string): Promise< string > {
        if (id.includes('@')) { return authConstants.id_type.email; }
        if (id.charAt(0) === '+') { throw new Error('Add an id without \'+\''); }
        if (!isNaN(Number(id))) { return authConstants.id_type.phone; }

        throw new Error('Invalid id');
    },

    async loginUser(body: IUserModel): Promise < IUserModel > {
        try {
            const validate: Joi.ValidationResult < IUserModel > = AuthValidation.getUser(body);

            if (validate.error) { throw new Error(validate.error.message); }

            const user: IUserModel | null = await UserModel.findOne({ id: body.id });
            if (user) {
                user.access_token = await this.getTokens(user.id);
                await UserModel.updateOne({ id: body.id }, { $set: user }).exec();

                return user;
            }

            throw new Error('Invalid password or id');

        } catch (error) {
            throw new Error(error);
        }
    },

    //ts-ignore
    async logout(typeLogout: string, token: string): Promise < string | undefined > {
        try {
            if (typeLogout === 'false') {
                const user: any = await UserModel.findOne({ access_token: token });
                if (user) {
                    await UserModel.updateOne({ access_token: token }, { $set: { access_token: ' ' } }).exec();

                    return user;
                }
            }
            if (typeLogout === 'true') {
                await UserModel.updateMany({}, { $set: { access_token: ' ' } }).exec();
            }
        } catch (error) {
            throw new Error(error);
        }
    },

    async getTokens(userId: string): Promise < string > {
        try {
            return jwt.sign({ id: userId }, app.get('secret'), { expiresIn: authConstants.token.expareTime });
        } catch (error) {
            throw new Error(error);
        }
    }
};

export default authService;
