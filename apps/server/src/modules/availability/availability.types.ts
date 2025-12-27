import { Types } from "mongoose";

export interface IAvailability {
    doctorId: Types.ObjectId;
    date: Date;
    startTime: Date;
    endTime: Date;
    appointmentId: Types.ObjectId | null;
    isEnabled: boolean;
}