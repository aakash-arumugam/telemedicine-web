import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import Specialty from '../modules/specialty/specialty.model';
import Doctor from '../modules/doctor/doctor.model';

dotenv.config(); // Load from .env in CWD

const specialties = [
    { name: 'General Physician', icon: '👨‍⚕️' },
    { name: 'Cardiologist', icon: '❤️' },
    { name: 'Dermatologist', icon: '🧖' },
    { name: 'Pediatrician', icon: '👶' },
    { name: 'Neurologist', icon: '🧠' },
    { name: 'Psychiatrist', icon: '🧘' },
];

const doctors = [
    {
        name: 'Dr. John Doe',
        experience: 10,
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300&h=300',
        availability: { startTime: '09:00', endTime: '17:00', days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'] }
    },
    {
        name: 'Dr. Jane Smith',
        experience: 8,
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=300&h=300',
        availability: { startTime: '10:00', endTime: '18:00', days: ['Monday', 'Wednesday', 'Friday'] }
    },
    {
        name: 'Dr. Emily White',
        experience: 15,
        rating: 4.7,
        image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300&h=300',
        availability: { startTime: '08:00', endTime: '16:00', days: ['Tuesday', 'Thursday'] }
    },
    {
        name: 'Dr. Michael Brown',
        experience: 12,
        rating: 4.6,
        image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300&h=300',
        availability: { startTime: '09:00', endTime: '17:00', days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'] }
    },
];

const seed = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI as string);
        console.log('Connected to MongoDB');

        await Specialty.deleteMany({});
        await Doctor.deleteMany({});

        const createdSpecialties = await Specialty.insertMany(specialties);
        console.log('Specialties seeded');

        const doctorDocs = doctors.map((doc, index) => ({
            ...doc,
            specialty: createdSpecialties[index % createdSpecialties.length]._id
        }));

        await Doctor.insertMany(doctorDocs);
        console.log('Doctors seeded');

        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seed();
