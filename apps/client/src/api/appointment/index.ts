import axiosInstance from "../../utils/axiosInstance";

const BASE_URL = '/api/v1/appointments';

export const bookAppointment = async (data: {
    doctorId: string;
    date: string;
    startTime: string;
    endTime: string;
}) => {
    const response = await axiosInstance.post(BASE_URL, data);
    return response.data;
};

export const getAppointments = async () => {
    const response = await axiosInstance.get(BASE_URL);
    return response.data;
};
