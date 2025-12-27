import { Types } from "mongoose";
import Availability from "./availability.model";
import { IAvailability } from "./availability.types";

export const findAvailabilityById = async (id: Types.ObjectId) => {
    return await Availability.findById(id);
}

export const findAvailabilityByDoctorId = async (doctorId: Types.ObjectId) => {
    return await Availability.find({ doctorId });
}

export const findAvailabilityByDoctorIdAndDate = async (doctorId: Types.ObjectId, date: Date) => {
    return await Availability.find({ doctorId, date, isEnabled: true, appointmentId: null });
}

export const createAvailability = async (availabilityData: Partial<IAvailability>) => {
    const availability = new Availability(availabilityData);
    return await availability.save();
}

export const queryAvailability = async (filter: Partial<IAvailability>) => {
    return await Availability.find(filter).exec();
}