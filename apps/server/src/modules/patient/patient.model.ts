import { COLLECTION_NAMES } from 'common/constants';
import mongoose, { Document, Schema } from 'mongoose';
import { IPatient } from './patient.types';

export interface IPatientDoc extends IPatient, Document {
    createdAt?: Date;
    updatedAt?: Date;
}

const PatientSchema: Schema = new Schema<IPatientDoc>(
    {
        userId: { type: Schema.Types.ObjectId, ref: COLLECTION_NAMES.USER, required: true, unique: true },
        phone: { type: String, required: false },
        gender: { type: String, required: false },
        dob: { type: Date, required: false },
        address: { type: String, required: false },
        maritalStatus: { type: String, required: false },
    },
    { timestamps: true }
);

export default mongoose.model<IPatientDoc>(COLLECTION_NAMES.PATIENT, PatientSchema);
