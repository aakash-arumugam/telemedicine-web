import { Types } from 'mongoose';

export interface IDoctor {
    userId: Types.ObjectId;
    name: string;
    gender: string;
    dob: Date;
    speciality: string;
    experience: string;
    address: string;
    education: {
        degree: string;
        university: string;
        year: string;
    }[];
    tag: string;
    isEnabled: boolean;
}