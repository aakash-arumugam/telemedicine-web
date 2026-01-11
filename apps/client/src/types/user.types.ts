export interface IUser {
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
    role: 'patient' | 'doctor' | 'superadmin';
}