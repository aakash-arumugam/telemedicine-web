// import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// import { registerUser } from './modules/user/user.service';
// import User from './modules/user/user.model';
// import Patient from './modules/patient/patient.model';
// import Doctor from './modules/doctor/doctor.model';

// dotenv.config();

// const verify = async () => {
//     try {
//         await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/telemedicine');
//         console.log('Connected to MongoDB');

//         // Test Patient Registration
//         const patientEmail = `test.patient.${Date.now()}@example.com`;
//         console.log(`Registering patient: ${patientEmail}`);
//         const patientReg = await registerUser({
//             name: 'Test Patient',
//             email: patientEmail,
//             password: 'password123',
//             role: 'patient',
//             phone: '1234567890',
//             gender: 'Male',
//             dob: new Date('1990-01-01'),
//             address: '123 Main St',
//             maritalStatus: 'Single'
//         } as any);

//         const savedPatientUser = await User.findById(patientReg.user._id);
//         const savedPatientProfile = await Patient.findOne({ userId: patientReg.user._id });

//         if (savedPatientUser?.role === 'patient' && savedPatientProfile) {
//             console.log('✅ Patient registration verified: User and Patient docs created.');
//         } else {
//             console.error('❌ Patient registration failed verification.');
//         }

//         // Test Doctor Registration
//         const doctorEmail = `test.doctor.${Date.now()}@example.com`;
//         console.log(`Registering doctor: ${doctorEmail}`);
//         const doctorReg = await registerUser({
//             name: 'Test Doctor',
//             email: doctorEmail,
//             password: 'password123',
//             role: 'doctor',
//             speciality: 'Cardiology',
//             experience: '10 years',
//             gender: 'Female',
//             dob: new Date('1985-01-01'),
//             address: '456 Med Park',
//             tag: 'Heart Expert',
//             education: [{ degree: 'MD', university: 'Harvard', year: '2010' }]
//         } as any);

//         const savedDoctorUser = await User.findById(doctorReg.user._id);
//         const savedDoctorProfile = await Doctor.findOne({ userId: doctorReg.user._id });

//         if (savedDoctorUser?.role === 'doctor' && savedDoctorProfile) {
//             console.log('✅ Doctor registration verified: User and Doctor docs created.');
//         } else {
//             console.error('❌ Doctor registration failed verification.');
//         }

//     } catch (error) {
//         console.error('Verification Error:', error);
//     } finally {
//         await mongoose.disconnect();
//     }
// };

// verify();
