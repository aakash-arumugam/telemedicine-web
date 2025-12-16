import axios from 'axios';

const api = axios.create({
    baseURL: '/api/v1',
    headers: {
        'Content-Type': 'application/json',
    },
});

export interface SignupData {
    email: string;
    password?: string;
    gender?: string;
    maritalStatus?: string;
    birthdate?: string;
    code?: string;
}

export const verifyOtp = async (code: string): Promise<boolean> => {
    const response = await api.post('/user/verify-otp', { code });
    return response.data;
};

export const signup = async (data: SignupData): Promise<any> => {
    const response = await api.post('/user/sign-up', data);
    return response.data;
};
