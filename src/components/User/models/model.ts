import bcrypt from 'bcrypt';
import connection from '@config/connection/connection';
import { Document, Schema } from 'mongoose';
import { NextFunction } from 'express';

export interface IUserModel extends Document {
    id: string;
    id_type: string;
    password: string;
    access_token: string;
}


const UserSchema: Schema = new Schema({
    id: {
        type: String,
        unique: true,
        trim: true
    },
    id_type: {
        type: String,
    },
    password: {
        type: String,
    },
    access_token: {
        type: String,
    },
}, {
    collection: 'usermodel',
    versionKey: false
    // @ts-ignore
}).pre('save', async function (next: NextFunction): Promise < void > {
    const user: any = this;

    if (!user.isModified('password')) { return next(); }

    try {
        const salt: string = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(user.password, salt);
        next();
    } catch (error) {
        return next(error);
    }
});

export default connection.model < IUserModel > ('UserModel', UserSchema);
