import axiosInstance from "../../utils/axiosInstance";
import type { IDoctorListBySpecialityRes } from "./types";

const BASE_URL = '/api/v1/doctors';

export const getDoctorsSpecialities = async ({ name }: { name?: string }) => {
    const query = name ? `?name=${name}` : '';
    const { data } = await axiosInstance.get<{ success: boolean, data: { _id: string, count: number }[] }>(`${BASE_URL}/specialities${query}`);

    return data.data.map((e, index) => ({
        id: index,
        name: e._id,
        count: e.count
    }));
};

export const listDoctorsBySpeciality = async ({ speciality }: { speciality: string }) => {
    const response = await axiosInstance.get<{ success: boolean, data: IDoctorListBySpecialityRes[] }>(`${BASE_URL}/speciality/${speciality}`);
    return response.data.data;
};