import * as userRepo from './user.repo';
import * as patientRepo from '../patient/patient.repo';
import * as doctorRepo from '../doctor/doctor.repo';
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
        role: data.role as 'patient' | 'doctor' | 'superadmin',
        isProfileComplete: true // Assuming detailed info is passed
    });

    if (data.role === 'patient') {
        const patient = await patientRepo.createPatient({
            userId: user._id,
            gender: data.gender,
            dob: data.dob,
            address: data.address || "",
            maritalStatus: data.maritalStatus
        });

    } else if (data.role === 'doctor') {
        await doctorRepo.createDoctor({
            userId: user._id,
            name: data.name,
            gender: data.gender || '',
            dob: data.dob || new Date(),
            speciality: data.speciality || '',
            experience: data.experience || '',
            address: data.address || '',
            education: data.education || [],
            tag: data.tag || '',
            isEnabled: true
        });
    }

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

export const getUserProfile = async (userId: string) => {

    console.log("User Id", userId);

    const user = await userRepo.findUserById(userId);
    if (!user) return null;

    let profile = null;
    if (user.role === 'patient') {
        profile = await patientRepo.findPatientByUserId(userId);
    } else if (user.role === 'doctor') {
        profile = await doctorRepo.findDoctor({ userId });
    }

    return {
        ...user.toObject(),
        profile
    };
}