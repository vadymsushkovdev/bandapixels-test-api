import Joi from 'joi';
import Validation from '@components/validation';
import { IUserModel } from '@components/User/models/model';
declare class UserValidation extends Validation {
    constructor();
    createUser(params: IUserModel): Joi.ValidationResult<IUserModel>;
}
declare const _default: UserValidation;
export default _default;
