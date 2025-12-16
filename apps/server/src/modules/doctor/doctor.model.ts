import { COLLECTION_NAMES } from 'common/constants';
import mongoose, { Document, Schema } from 'mongoose';
import { IDoctor } from './doctor.types';

export interface IDoctorDoc extends IDoctor, Document {
    createdAt?: Date;
    updatedAt?: Date;
}

const DoctorSchema: Schema = new Schema<IDoctor>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true, lowercase: true },
        password: { type: String, required: true },
        gender: { type: String, required: true },
        dob: { type: Date, required: true },
        speciality: { type: String, required: true },
        experience: { type: String, required: true },
        address: { type: String, required: true },
        education: {
            degree: { type: String, required: true },
            university: { type: String, required: true },
            year: { type: String, required: true },
        },
        tag: { type: String, required: true },
        isEnabled: { type: Boolean, default: true },
    },
    { timestamps: true }
);

export default mongoose.model<IDoctor>(COLLECTION_NAMES.DOCTOR, DoctorSchema);
