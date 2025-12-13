import axiosInstance from "../../utils/axiosInstance";

const BASE_URL = '/api/v1/doctors';

export const getSpecialties = async () => {
    const response = await axiosInstance.get(`${BASE_URL}/specialties`);
    return response.data;
};

export const getDoctors = async (specialtyId?: string) => {
    const url = specialtyId ? `${BASE_URL}?specialtyId=${specialtyId}` : BASE_URL;
    const response = await axiosInstance.get(url);
    return response.data;
};
