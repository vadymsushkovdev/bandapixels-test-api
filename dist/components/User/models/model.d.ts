import { Document } from 'mongoose';
export interface IUserModel extends Document {
    id: string;
    id_type: string;
    password: string;
    access_token: string;
}
declare const _default: import("mongoose").Model<IUserModel, {}>;
export default _default;
