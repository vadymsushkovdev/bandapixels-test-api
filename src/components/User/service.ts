import * as Joi from 'joi';
import { IUserService } from './interfaces/interface';
import UserModel, { IUserModel } from './models/model';
import UserValidation from './validations/validation';
import AuthService from '../Auth/service';

const UserService: IUserService = {

    async usersInfo(token: string): Promise < IUserModel > {
        try {
            const user: IUserModel = await UserModel.findOne({ access_token: token });
            if (user) { return user; }

            throw new Error('Token is unavailable');

        } catch (error) {
            throw new Error(error);
        }
    },

    async createUser(body: IUserModel): Promise < IUserModel > {
        try {
            const validate: Joi.ValidationResult < IUserModel > = UserValidation.createUser(body);

            if (validate.error) { throw new Error(validate.error.message); }

            const user: IUserModel = new UserModel({
                id: body.id,
                id_type: body.id_type,
                access_token: await AuthService.getTokens(body.id),
                password: body.password
            });
            const query: IUserModel = await UserModel.findOne({ id: body.id });

            if (query) { throw new Error('This id already exists'); }

            const saved: IUserModel = await user.save();

            return saved;
        } catch (error) {
            throw new Error(error);
        }
    }
};

export default UserService;
