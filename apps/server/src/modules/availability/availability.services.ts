import { CreateAvailabilitySchemaT, GetAvailabilityByDoctorIdAndDateSchemaT } from "./availability.validator";
import * as doctorRepo from "../doctor/doctor.repo";
import * as availabilityRepo from "./availability.repo";
import { Types } from "mongoose";

export const createAvailabilty = async (availabilityData: CreateAvailabilitySchemaT) => {
    const doctorExists = await doctorRepo.findDoctorById(availabilityData.doctorId);
    if (!doctorExists) {
        throw new Error("Doctor not found");
    }

    const availabilityExists = await availabilityRepo.queryAvailability({ doctorId: new Types.ObjectId(availabilityData.doctorId), date: availabilityData.date, startTime: availabilityData.startTime, endTime: availabilityData.endTime, isEnabled: true });
    if (availabilityExists.length) {
        throw new Error("Availability already exists");
    }

    const availability = await availabilityRepo.createAvailability({
        doctorId: new Types.ObjectId(availabilityData.doctorId),
        date: availabilityData.date,
        startTime: availabilityData.startTime,
        endTime: availabilityData.endTime,
        isEnabled: true
    });

    return {
        startTime: availability.startTime,
        endTime: availability.endTime,
        date: availability.date
    };
}

export const getAvailabilityByDoctorIdAndDate = async (data: GetAvailabilityByDoctorIdAndDateSchemaT) => {

    const doctorExists = await doctorRepo.findDoctorById(data.doctorId.toString());
    if (!doctorExists) {
        throw new Error("Doctor not found");
    }

    const availability = await availabilityRepo.findAvailabilityByDoctorIdAndDate(new Types.ObjectId(data.doctorId), data.date);

    return availability
}