import { IDoctor } from './doctor.types';
import Doctor, { IDoctorDoc } from './doctor.model';
import { PipelineStage } from 'mongoose';

export const createDoctor = async (doctorData: Partial<IDoctor>): Promise<IDoctorDoc> => {
    const doctor = new Doctor(doctorData);
    return await doctor.save();
};

export const findDoctorById = async (id: string): Promise<IDoctorDoc | null> => {
    return await Doctor.findById(id).select('-password');
};

export const findAllDoctors = async (filter: Record<string, any> = {}): Promise<IDoctorDoc[]> => {
    return await Doctor.find(filter).select('-password');
};

export const findDoctor = async (filter: Record<string, any> = {}): Promise<IDoctorDoc | null> => {
    return await Doctor.findOne(filter).select('-password');
}

export const updateDoctor = async (id: string, updateData: Partial<IDoctor>): Promise<IDoctorDoc | null> => {
    return await Doctor.findByIdAndUpdate(id, updateData, { new: true }).select('-password');
};

export const deleteDoctor = async (id: string): Promise<IDoctorDoc | null> => {
    return await Doctor.findByIdAndDelete(id);
};

export const aggregateDoctor = async (pipleline: PipelineStage[]) => {
    return await Doctor.aggregate(pipleline).exec();
}