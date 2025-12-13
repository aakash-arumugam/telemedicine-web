import { Request } from 'express';

export interface IUser {
    _id: string;
    email: string;
    name: string;
    password?: string;
    googleId?: string;
    accessToken?: string;
    refreshToken?: string;
    authProvider: 'local' | 'google';
}

// Extend Express Request to include user
export interface AuthRequest extends Request {
    user?: IUser;
}
