import type { IDoctor } from "../../types/doctor.types";
import type { IPatient } from "../../types/patient.types";
import type { IUser } from "../../types/user.types";
import axiosInstance from "../../utils/axiosInstance";
import type { SignupData } from "../auth.api";

const BASE_URL = '/api/v1/users';

export const updateProfile = async (data: {
    gender: string;
    maritalStatus: string;
    dob: string;
    address: string;
}) => {
    const response = await axiosInstance.put(`${BASE_URL}/profile`, data);
    return response.data;
};

export const createUser = async (data: SignupData): Promise<{
    success: boolean;
    data: {
        user: IUser;
        token: string;
    };
    message: string;
}> => {
    const response = await axiosInstance.post(`${BASE_URL}/register`, data);
    return response.data;
}

export const loginUser = async (data: { email: string; password: string }): Promise<{
    success: boolean;
    data: {
        user: IUser;
        token: string;
        userRoleData: IDoctor | IPatient;
    };
    message: string;
}> => {
    const response = await axiosInstance.post(`${BASE_URL}/login`, data);
    return response.data;
}

export const verifyUserExists = async (email: string): Promise<{ success: boolean; data: { exists: boolean }; message: string }> => {
    const response = await axiosInstance.post(`${BASE_URL}/verify-user-exists`, { email });
    return response.data;
}