import axiosInstance from "../../utils/axiosInstance";

const BASE_URL = '/api/v1/auth';

export const getOAuthUrl = async () => {
    const response = await axiosInstance.get(`${BASE_URL}/google`);
    return response.data;
}

export const verifyOAuthCallback = async (code: string) => {
    const response = await axiosInstance.post(`${BASE_URL}/google/callback`, { code });
    return response.data;
};