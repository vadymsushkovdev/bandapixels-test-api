import * as Joi from 'joi';
import AuthValidation from './validations/validation';
import UserModel, { IUserModel } from '../User/models/model';
import { IAuthService } from './interfaces/interface';
import * as jwt from 'jsonwebtoken';
import app from '../../config/server/server';
import authConstants from './constants';

const AuthService: IAuthService = {

    async defineIdType(id: string): Promise<string> {
        if (id.includes('@')) { return authConstants.id_type.email; }
        if (id.charAt(0) === '+') { throw new Error('Add an id without \'+\''); }
        if (!isNaN(Number(id))) { return authConstants.id_type.phone; }

        throw new Error('Invalid id');
    },

    async loginUser(body: IUserModel): Promise < IUserModel > {
        try {
            const validate: Joi.ValidationResult < IUserModel > = AuthValidation.getUser(body);

            if (validate.error) { throw new Error(validate.error.message); }

            const user: IUserModel = await UserModel.findOne({ id: body.id });
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

    async logout(type_logout: string, token: string): Promise < string > {
        if (type_logout === 'false') {
            const user: any = await UserModel.findOne({ access_token: token });
            if (user) {
                user.access_token = ' ';
                await UserModel.updateOne({ access_token: token }, { $set: user }).exec();

                return user;
            }
        }
        if (type_logout === 'true') {
            await UserModel.updateMany({}, { $set: { access_token: ' ' } }).exec();
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

export default AuthService;
