import Joi from 'joi';
import Validation from '@components/validation';
import { IUserModel } from '@components/User/models/model';
declare class AuthValidation extends Validation {
    constructor();
    getUser(params: IUserModel): Joi.ValidationResult<IUserModel>;
}
declare const _default: AuthValidation;
export default _default;
