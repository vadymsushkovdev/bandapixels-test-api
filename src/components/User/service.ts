import Joi from 'joi';
import UserModel, { IUserModel } from './models/model';
import UserValidation from './validations/validation';

class UserService {

    public async usersInfo(token: string): Promise < IUserModel > {
        try {
            const user: IUserModel | null = await UserModel.findOne({ access_token: token });
            if (user) { return user; }

            throw new Error('Token is unavailable');

        } catch (error) {
            throw new Error(error);
        }
    }

    public async createUser(body: IUserModel): Promise < IUserModel > {
        try {
            const validate: Joi.ValidationResult < IUserModel > = UserValidation.createUser(body);

            if (validate.error) { throw new Error(validate.error.message); }

            const user: IUserModel = new UserModel({
                id: body.id,
                id_type: body.id_type,
                access_token: ' ',
                password: body.password
            });
            const query: IUserModel | null = await UserModel.findOne({ id: body.id });

            if (query) { throw new Error('This id already exists'); }

            const saved: IUserModel = await user.save();

            return saved;

        } catch (error) {
            throw new Error(error);
        }
    }
};

export default new UserService();
