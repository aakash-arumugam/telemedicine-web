import User, { IUser } from './user.model';

export const createUser = async (userData: Partial<IUser>): Promise<IUser> => {
    const user = new User(userData);
    return await user.save();
};

export const findUserById = async (id: string): Promise<IUser | null> => {
    return await User.findById(id).select('-password');
};

export const findUserByEmail = async (email: string): Promise<IUser | null> => {
    return await User.findOne({ email });
};

export const findUserByGoogleId = async (googleId: string): Promise<IUser | null> => {
    return await User.findOne({ googleId });
};

export const findAllUsers = async (): Promise<IUser[]> => {
    return await User.find().select('-password');
};

export const updateUser = async (id: string, updateData: Partial<IUser>): Promise<IUser | null> => {
    return await User.findByIdAndUpdate(id, updateData, { new: true }).select('-password');
};

export const deleteUser = async (id: string): Promise<IUser | null> => {
    return await User.findByIdAndDelete(id);
};
