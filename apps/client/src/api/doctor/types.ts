import type { IDoctor } from "../../types/doctor.types";

export interface IDoctorListBySpecialityRes extends IDoctor {
    nextSlot: string;
    qualification: string;
    rating: number;
    reviews: number;
}