import { Types } from "mongoose";

export interface IPatient {
    userId: Types.ObjectId;
    phone?: string;
    gender?: string;
    dob?: Date;
    address?: string;
    maritalStatus?: string;
}