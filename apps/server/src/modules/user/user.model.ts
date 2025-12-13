import { COLLECTION_NAMES } from 'common/constants';
import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
    name: string;
    email: string;
    password?: string;
    googleId?: string;
    accessToken?: string;
    refreshToken?: string;
    authProvider: 'local' | 'google';
    gender?: string;
    maritalStatus?: string;
    dob?: Date;
    address?: string;
    isProfileComplete: boolean;
    lastSync: Date | null;
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true, lowercase: true },
        password: { type: String, required: false },
        googleId: { type: String, required: false, unique: true, sparse: true },
        accessToken: { type: String, required: false },
        refreshToken: { type: String, required: false },
        authProvider: { type: String, enum: ['local', 'google'], default: 'local' },
        gender: { type: String, required: false },
        maritalStatus: { type: String, required: false },
        dob: { type: Date, required: false },
        address: { type: String, required: false },
        isProfileComplete: { type: Boolean, default: false },
        lastSync: { type: Date, default: null }
    },
    { timestamps: true }
);

export default mongoose.model<IUser>(COLLECTION_NAMES.USER, UserSchema);
