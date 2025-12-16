import * as userRepo from './user.repo';
import { IUser } from './user.types';
import { PasswordUtils } from '../../utils/password.utils';
import { JWTUtils } from '../../utils/jwt.utils';
import { userCreationSchemaT } from './user.validator';

export const registerUser = async (data: userCreationSchemaT): Promise<{ user: IUser; token: string }> => {
    // Check if user exists
    const existingUser = await userRepo.findUserByEmail(data.email);
    if (existingUser) {
        throw new Error(`User with email ${data.email} already exists`);
    }

    //Validate Code

    // Hash password
    const hashedPassword = await PasswordUtils.hash(data.password);

    // Create user
    const user = await userRepo.createUser({
        name: data.name,
        email: data.email,
        password: hashedPassword,
        dob: new Date(data.dob),
        gender: data.gender,
        maritalStatus: data.maritalStatus
    });

    // Generate token
    const token = JWTUtils.generateToken(user._id.toString());

    return { user, token };
};

export const loginUser = async (email: string, password: string): Promise<{ user: IUser; token: string }> => {
    // Find user
    const user = await userRepo.findUserByEmail(email);
    if (!user) {
        throw new Error('Invalid credentials');
    }

    // Check if user has a password (not a Google OAuth user)
    if (!user.password) {
        throw new Error('Please sign in with Google');
    }

    // Check password
    const isPasswordValid = await PasswordUtils.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error('Invalid credentials');
    }

    // Generate token
    const token = JWTUtils.generateToken(user._id.toString());

    return { user, token };
};

export const getUserById = async (id: string): Promise<IUser | null> => {
    return await userRepo.findUserById(id);
};

export const getAllUsers = async (): Promise<IUser[]> => {
    return await userRepo.findAllUsers();
};

export const updateUser = async (id: string, updateData: Partial<IUser>): Promise<IUser | null> => {
    return await userRepo.updateUser(id, updateData);
};

export const deleteUser = async (id: string): Promise<IUser | null> => {
    return await userRepo.deleteUser(id);
};

// export const findOrCreateGoogleUser = async (
//     googleId: string,
//     email: string,
//     name: string,
//     accessToken: string,
//     refreshToken: string
// ) => {
//     // First, try to find user by googleId
//     let user = await userRepo.findUserByGoogleId(googleId);

//     if (user) {
//         // Update tokens for existing Google user
//         user = await userRepo.updateUser(user._id.toString(), {
//             accessToken,
//             refreshToken,
//         });
//         return user!;
//     }

//     // If not found by googleId, try to find by email (link existing account)
//     user = await userRepo.findUserByEmail(email);

//     if (user) {
//         // Link existing email account with Google
//         user = await userRepo.updateUser(user._id.toString(), {
//             googleId,
//             accessToken,
//             refreshToken,
//             authProvider: 'google',
//         });
//         return user!;
//     }

//     // Create new user with Google credentials
//     user = await userRepo.createUser({
//         name,
//         email,
//         googleId,
//         accessToken,
//         refreshToken,
//         authProvider: 'google',
//     });

//     return user;
// };

export const getUserByEmail = async (email: string) => await userRepo.findUserByEmail(email);