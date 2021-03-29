import * as Joi from 'joi';
import Validation from '../../validation';
import { IUserModel } from '../models/model';

class UserValidation extends Validation {

    constructor() {
        super();
    }

    createUser(
        params: IUserModel
    ): Joi.ValidationResult < IUserModel > {
        if (params.id_type === 'email') {
            const schema: Joi.Schema = Joi.object().keys({
                password: Joi.string().required(),
                id: Joi.string().email({
                    minDomainAtoms: 2
                }).required(),
                id_type: Joi.string().required()
            });

            return Joi.validate(params, schema);
        }
        if (params.id_type === 'phone') {
            const schema: Joi.Schema = Joi.object().keys({
                password: Joi.string().required(),
                id: Joi.string().regex(/^[0-9]{10,14}$/).required(),
                id_type: Joi.string().required()
            });

            return Joi.validate(params, schema);
        }
    }
}

export default new UserValidation();
