import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    ArrowLeft,
    MoreVertical,
    Clock,
    Video,
    Calendar,
    ShieldCheck,
    MapPin,
    CreditCard,
    FileText,
    Download,
    AlertCircle
} from 'lucide-react';

// Mock Data
const APPOINTMENT = {
    id: 1,
    doctor: {
        name: "Dr. Sarah Wilson",
        speciality: "Cardiologist",
        qualification: "MD, FACC",
        regNumber: "REG-2024-8921",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
        verified: true
    },
    status: "Confirmed", // Confirmed, Pending, Completed, Cancelled
    date: "16 Dec 2024",
    time: "02:30 PM",
    duration: "30 mins",
    fee: "$50.00",
    platform: "Google Meet",
    paymentStatus: "Paid"
};

export default function AppointmentDetails() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [status, setStatus] = useState(APPOINTMENT.status); // Local state for demo

    const getStatusColor = (s: string) => {
        switch (s) {
            case 'Confirmed': return 'bg-green-100 text-green-700 border-green-200';
            case 'Pending': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
            case 'Completed': return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'Cancelled': return 'bg-red-100 text-red-700 border-red-200';
            default: return 'bg-neutral-100 text-neutral-700 border-neutral-200';
        }
    };

    return (
        <div className="min-h-screen bg-neutral-50 pb-10">
            {/* --- Top Bar --- */}
            <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-neutral-100 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-2 -ml-2 text-neutral-600 hover:bg-neutral-100 rounded-full transition-colors"
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <h1 className="font-bold text-lg text-neutral-900">Appointment Details</h1>
                </div>
                <button className="p-2 -mr-2 text-neutral-600 hover:bg-neutral-100 rounded-full transition-colors">
                    <MoreVertical size={20} />
                </button>
            </div>

            <main className="max-w-md mx-auto px-4 py-6 space-y-6">

                {/* --- Status Header --- */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-5 rounded-2xl border flex flex-col items-center text-center gap-2 ${getStatusColor(status)}`}
                >
                    <div className="font-bold text-lg">{status}</div>
                    <div className="flex items-center gap-2 text-sm font-medium opacity-90">
                        <Calendar size={14} /> {APPOINTMENT.date} • {APPOINTMENT.time}
                    </div>
                    {status === 'Confirmed' && (
                        <div className="mt-2 bg-white/50 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm">
                            Starts in 15 minutes
                        </div>
                    )}
                </motion.div>

                {/* --- Doctor Info --- */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white p-5 rounded-2xl border border-neutral-100 shadow-sm"
                >
                    <div className="flex gap-4">
                        <img
                            src={APPOINTMENT.doctor.image}
                            alt={APPOINTMENT.doctor.name}
                            className="w-20 h-20 rounded-xl object-cover bg-neutral-50"
                        />
                        <div>
                            <h3 className="font-bold text-neutral-900 text-lg flex items-center gap-1">
                                {APPOINTMENT.doctor.name}
                                {APPOINTMENT.doctor.verified && <ShieldCheck size={16} className="text-blue-500" />}
                            </h3>
                            <p className="text-neutral-500 text-sm">{APPOINTMENT.doctor.speciality}</p>
                            <p className="text-xs text-neutral-400 mt-1">{APPOINTMENT.doctor.qualification}</p>
                            <p className="text-[10px] text-neutral-300 mt-0.5">Reg: {APPOINTMENT.doctor.regNumber}</p>
                        </div>
                    </div>
                </motion.div>

                {/* --- Appointment Info --- */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white p-5 rounded-2xl border border-neutral-100 shadow-sm space-y-4"
                >
                    <h4 className="font-bold text-neutral-900 text-sm">Consultation Details</h4>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <p className="text-xs text-neutral-500 flex items-center gap-1"><Video size={12} /> Mode</p>
                            <p className="font-medium text-sm text-neutral-900">Video Call</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-xs text-neutral-500 flex items-center gap-1"><MapPin size={12} /> Platform</p>
                            <p className="font-medium text-sm text-neutral-900">{APPOINTMENT.platform}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-xs text-neutral-500 flex items-center gap-1"><Clock size={12} /> Duration</p>
                            <p className="font-medium text-sm text-neutral-900">{APPOINTMENT.duration}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-xs text-neutral-500 flex items-center gap-1"><CreditCard size={12} /> Fee</p>
                            <p className="font-medium text-sm text-neutral-900">{APPOINTMENT.fee} <span className="text-green-600 text-[10px] bg-green-50 px-1 rounded ml-1">{APPOINTMENT.paymentStatus}</span></p>
                        </div>
                    </div>
                </motion.div>

                {/* --- Join Section --- */}
                {status === 'Confirmed' && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                        className="space-y-3"
                    >
                        <button className="w-full bg-neutral-900 text-white py-4 rounded-xl font-bold text-lg hover:bg-neutral-800 transition-colors shadow-lg shadow-neutral-200 flex items-center justify-center gap-2">
                            <Video size={20} /> Join Consultation
                        </button>
                        <p className="text-center text-xs text-neutral-400">
                            Link becomes active 5 minutes before the scheduled time.
                        </p>
                    </motion.div>
                )}

                {/* --- Prescription Section (Completed Only) --- */}
                {status === 'Completed' && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-blue-50 p-5 rounded-2xl border border-blue-100"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                                <FileText size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold text-neutral-900 text-sm">Prescription Available</h4>
                                <p className="text-xs text-neutral-500">Uploaded by Dr. Sarah Wilson</p>
                            </div>
                        </div>
                        <button className="w-full bg-white text-blue-600 border border-blue-200 py-2.5 rounded-lg font-medium text-sm hover:bg-blue-50 transition-colors flex items-center justify-center gap-2">
                            <Download size={16} /> Download PDF
                        </button>
                    </motion.div>
                )}

                {/* --- Actions --- */}
                {status !== 'Completed' && status !== 'Cancelled' && (
                    <div className="grid grid-cols-2 gap-3 pt-2">
                        <button className="py-3 rounded-xl font-medium text-sm border border-neutral-200 text-neutral-700 hover:bg-neutral-50 transition-colors">
                            Reschedule
                        </button>
                        <button
                            onClick={() => setStatus('Cancelled')}
                            className="py-3 rounded-xl font-medium text-sm border border-red-100 text-red-600 bg-red-50 hover:bg-red-100 transition-colors"
                        >
                            Cancel
                        </button>
                    </div>
                )}

                {/* --- Footer --- */}
                <div className="pt-6 text-center space-y-4">
                    <div className="bg-neutral-100 p-3 rounded-lg inline-flex items-start gap-2 text-left max-w-xs">
                        <AlertCircle size={16} className="text-neutral-500 mt-0.5 flex-shrink-0" />
                        <p className="text-[10px] text-neutral-500 leading-relaxed">
                            Medical advice is provided solely by the registered doctor. The platform is not responsible for clinical outcomes.
                        </p>
                    </div>
                    <button className="text-xs text-neutral-400 font-medium hover:text-neutral-600">
                        Need Help? Contact Support
                    </button>
                </div>

            </main>
        </div>
    );
}
