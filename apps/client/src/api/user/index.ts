import axiosInstance from "../../utils/axiosInstance";

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
