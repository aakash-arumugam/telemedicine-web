import { motion } from 'framer-motion';
import { Star, Clock, ShieldCheck, MapPin } from 'lucide-react';

interface DoctorSelectionProps {
    speciality: any;
    onNext: (doctor: any) => void;
    onBack: () => void;
}

const DOCTORS = [
    {
        id: 1,
        name: 'Dr. Sarah Wilson',
        qualification: 'MD, FACC',
        experience: '12 years',
        rating: 4.9,
        reviews: 128,
        nextSlot: 'Today, 2:30 PM',
        image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
        verified: true
    },
    {
        id: 2,
        name: 'Dr. James Carter',
        qualification: 'MBBS, MD',
        experience: '8 years',
        rating: 4.7,
        reviews: 85,
        nextSlot: 'Tomorrow, 10:00 AM',
        image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James',
        verified: true
    },
    {
        id: 3,
        name: 'Dr. Emily Chen',
        qualification: 'MD, PhD',
        experience: '15 years',
        rating: 5.0,
        reviews: 210,
        nextSlot: 'Today, 4:15 PM',
        image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
        verified: true
    }
];

export default function DoctorSelection({ speciality, onNext, onBack }: DoctorSelectionProps) {
    return (
        <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 mb-4">
                <p className="text-sm text-blue-800">
                    Showing available <strong>{speciality?.name || 'Doctors'}</strong>
                </p>
            </div>

            <div className="space-y-4">
                {DOCTORS.map((doctor, index) => (
                    <motion.div
                        key={doctor.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white p-4 rounded-2xl border border-neutral-100 shadow-sm"
                    >
                        <div className="flex gap-4">
                            <img
                                src={doctor.image}
                                alt={doctor.name}
                                className="w-20 h-20 rounded-xl object-cover bg-neutral-50"
                            />
                            <div className="flex-1">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-bold text-neutral-900 flex items-center gap-1">
                                            {doctor.name}
                                            {doctor.verified && <ShieldCheck size={14} className="text-blue-500" />}
                                        </h3>
                                        <p className="text-xs text-neutral-500">{doctor.qualification}</p>
                                    </div>
                                    <div className="flex items-center gap-1 bg-yellow-50 px-1.5 py-0.5 rounded text-xs font-bold text-yellow-700">
                                        <Star size={10} fill="currentColor" /> {doctor.rating}
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 mt-2 text-xs text-neutral-500">
                                    <span className="flex items-center gap-1"><Clock size={12} /> {doctor.experience} exp</span>
                                    <span className="flex items-center gap-1"><MapPin size={12} /> New York</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 pt-4 border-t border-neutral-50 flex items-center justify-between">
                            <div className="text-xs">
                                <p className="text-neutral-400">Next Available</p>
                                <p className="font-medium text-green-600">{doctor.nextSlot}</p>
                            </div>
                            <button
                                onClick={() => onNext(doctor)}
                                className="bg-neutral-900 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-neutral-800 transition-colors"
                            >
                                Select
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
