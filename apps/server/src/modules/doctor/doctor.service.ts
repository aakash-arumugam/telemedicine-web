import { PasswordUtils } from '@utils/password.utils';
import * as doctorRepo from './doctor.repo';
import { createDoctorSchemaT, getDoctorsSpecialitiesSchemaT } from './doctor.validator';
import { Schema } from 'mongoose';
import { JWTUtils } from '@utils/jwt.utils';

export const listDoctorsBySpeciality = async (speciality: string) => {
    const doctors = await doctorRepo.findAllDoctors({ speciality });
    return doctors;
}

export const createDoctor = async (data: createDoctorSchemaT) => {

    const doctorExists = await doctorRepo.findDoctor({ email: data.email });

    const password = await PasswordUtils.hash(data.password);

    if (doctorExists) {
        throw new Error('Doctor already exists');
    }

    const doctor = await doctorRepo.createDoctor({ ...data, password, dob: new Date(data.dob) });

    const token = JWTUtils.generateToken(doctor._id.toString());

    return { doctor, token };
}

export const getDoctorById = async (id: Schema.Types.ObjectId) => {
    const doctor = await doctorRepo.findDoctorById(id.toString());

    if (!doctor) {
        throw new Error(`Doctor not found`);
    }


    return doctor;
}

export const getDoctorsSpecialities = async (query: getDoctorsSpecialitiesSchemaT) => {

    const pipeline = query.name ? [
        {
            $match: {
                speciality: query.name
            }
        },
        {
            $group: {
                _id: '$speciality',
                count: { $sum: 1 }
            }
        }
    ] : [
        {
            $group: {
                _id: '$speciality',
                count: { $sum: 1 }
            }
        }
    ];

    const aggrResponse = await doctorRepo.aggregateDoctor(pipeline);

    return aggrResponse;
}