export interface IUser {
    name: string;
    email: string;
    password?: string;
    googleId?: string;
    accessToken?: string;
    refreshToken?: string;
    authProvider: 'local' | 'google';
    role: 'patient' | 'doctor' | 'superadmin';
    isProfileComplete: boolean;
}