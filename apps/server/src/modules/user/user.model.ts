import { COLLECTION_NAMES } from 'common/constants';
import mongoose, { Document, Schema } from 'mongoose';
import { IUser } from './user.types';

export interface IUserDoc extends IUser, Document {
    createdAt?: Date;
    updatedAt?: Date;
}

const UserSchema: Schema = new Schema<IUserDoc>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true, lowercase: true },
        password: { type: String, required: true },
        googleId: { type: String, required: false, unique: true, sparse: true },
        accessToken: { type: String, required: false },
        refreshToken: { type: String, required: false },
        authProvider: { type: String, enum: ['local', 'google'], default: 'local' },
        role: { type: String, enum: ['patient', 'doctor', 'superadmin'], default: 'patient' },
        isProfileComplete: { type: Boolean, default: false },
    },
    { timestamps: true }
);

export default mongoose.model<IUser>(COLLECTION_NAMES.USER, UserSchema);
