import Patient, { IPatientDoc } from './patient.model';
import { IPatient } from './patient.types';

export const createPatient = async (patientData: IPatient): Promise<IPatientDoc> => {
    const patient = new Patient(patientData);
    return await patient.save();
};

export const findPatientByUserId = async (userId: string): Promise<IPatientDoc | null> => {
    return await Patient.findOne({ userId });
};

export const updatePatient = async (userId: string, updateData: Partial<IPatient>): Promise<IPatientDoc | null> => {
    return await Patient.findOneAndUpdate({ userId }, updateData, { new: true });
};
