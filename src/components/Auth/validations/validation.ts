import * as Joi from 'joi';
import Validation from '../../validation';
import { IUserModel } from '../../User/models/model';

class AuthValidation extends Validation {

    constructor() {
        super();
    }

    getUser(
        params: IUserModel
    ): Joi.ValidationResult < IUserModel > {
        const schema: Joi.Schema = Joi.object().keys({
            password: Joi.string().required(),
            id: Joi.string().required()
        });

        return Joi.validate(params, schema);
    }
}


export default new AuthValidation();
