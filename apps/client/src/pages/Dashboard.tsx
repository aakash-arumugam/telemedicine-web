import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Bell,
    ChevronDown,
    Calendar,
    Clock,
    Video,
    ChevronRight,
    Plus,
    FileText,
    History,
    Download,
    ShieldCheck,
    Stethoscope
} from 'lucide-react';

// --- Mock Data ---
const MOCK_USER = {
    name: "Alex Johnson",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
};

const UPCOMING_APPOINTMENT = {
    id: 1,
    doctorName: "Dr. Sarah Wilson",
    speciality: "Cardiologist",
    qualification: "MD, FACC",
    date: "Today, 16 Dec",
    time: "02:30 PM",
    status: "Confirmed",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
};

const PAST_APPOINTMENTS = [
    {
        id: 101,
        doctorName: "Dr. James Carter",
        speciality: "Dermatologist",
        date: "10 Dec 2024",
        status: "Completed",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=James"
    },
    {
        id: 102,
        doctorName: "Dr. Emily Chen",
        speciality: "General Physician",
        date: "05 Nov 2024",
        status: "Completed",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily"
    }
];

const PRESCRIPTIONS = [
    {
        id: 201,
        doctorName: "Dr. James Carter",
        date: "10 Dec 2024",
        medications: "Doxycycline, Tretinoin"
    },
    {
        id: 202,
        doctorName: "Dr. Emily Chen",
        date: "05 Nov 2024",
        medications: "Amoxicillin"
    }
];

export default function Dashboard() {
    const [hasAppointment, setHasAppointment] = useState(false); // Toggle for demo

    return (
        <div className="min-h-screen bg-neutral-50 pb-20">
            {/* --- Top Navigation --- */}
            <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-neutral-100 px-4 py-3">
                <div className="flex items-center justify-between max-w-md mx-auto">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-neutral-900 rounded-lg flex items-center justify-center text-white font-bold">
                            T
                        </div>
                        <span className="font-semibold text-lg tracking-tight">Dashboard</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="relative p-2 text-neutral-600 hover:bg-neutral-100 rounded-full transition-colors">
                            <Bell size={20} />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                        </button>
                        <div className="flex items-center gap-1 cursor-pointer">
                            <img
                                src={MOCK_USER.avatar}
                                alt="Profile"
                                className="w-8 h-8 rounded-full bg-neutral-100 border border-neutral-200"
                            />
                            <ChevronDown size={14} className="text-neutral-400" />
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-md mx-auto px-4 py-6 space-y-8">

                {/* --- Upcoming Appointment --- */}
                <section>
                    <div className="flex items-center justify-between mb-3">
                        <h2 className="text-lg font-bold text-neutral-900">Upcoming</h2>
                        {hasAppointment && (
                            <button className="text-sm text-blue-600 font-medium hover:underline">See all</button>
                        )}
                    </div>

                    {hasAppointment ? (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white rounded-2xl p-5 shadow-sm border border-neutral-100 relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 px-3 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-bl-xl border-b border-l border-green-100">
                                {UPCOMING_APPOINTMENT.status}
                            </div>

                            <div className="flex gap-4 mb-5 mt-2">
                                <img
                                    src={UPCOMING_APPOINTMENT.image}
                                    alt={UPCOMING_APPOINTMENT.doctorName}
                                    className="w-16 h-16 rounded-xl object-cover bg-neutral-100"
                                />
                                <div>
                                    <h3 className="font-bold text-neutral-900 text-lg leading-tight">
                                        {UPCOMING_APPOINTMENT.doctorName}
                                    </h3>
                                    <p className="text-neutral-500 text-sm mb-2">
                                        {UPCOMING_APPOINTMENT.speciality} • {UPCOMING_APPOINTMENT.qualification}
                                    </p>
                                    <div className="flex items-center gap-3 text-xs font-medium text-neutral-600">
                                        <div className="flex items-center gap-1 bg-neutral-50 px-2 py-1 rounded-md">
                                            <Calendar size={14} /> {UPCOMING_APPOINTMENT.date}
                                        </div>
                                        <div className="flex items-center gap-1 bg-neutral-50 px-2 py-1 rounded-md">
                                            <Clock size={14} /> {UPCOMING_APPOINTMENT.time}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <button className="flex-1 bg-neutral-900 text-white py-3 rounded-xl font-medium text-sm flex items-center justify-center gap-2 hover:bg-neutral-800 transition-colors shadow-lg shadow-neutral-200">
                                    <Video size={18} /> Join Consultation
                                </button>
                                <button className="px-4 py-3 rounded-xl font-medium text-sm border border-neutral-200 text-neutral-700 hover:bg-neutral-50 transition-colors">
                                    Details
                                </button>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-100 text-center"
                        >
                            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Stethoscope size={32} />
                            </div>
                            <h3 className="font-bold text-neutral-900 mb-1">No upcoming visits</h3>
                            <p className="text-neutral-500 text-sm mb-5">Schedule a consultation with a top doctor today.</p>
                            <button className="w-full bg-neutral-900 text-white py-3 rounded-xl font-medium text-sm hover:bg-neutral-800 transition-colors">
                                Book Appointment
                            </button>
                        </motion.div>
                    )}
                </section>

                {/* --- Quick Actions --- */}
                <section>
                    <h2 className="text-lg font-bold text-neutral-900 mb-3">Quick Actions</h2>
                    <div className="flex gap-3 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide snap-x">
                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            className="flex-shrink-0 snap-start flex flex-col items-center justify-center w-28 h-28 bg-neutral-900 text-white rounded-2xl shadow-lg shadow-neutral-200 gap-2"
                        >
                            <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                                <Plus size={20} />
                            </div>
                            <span className="text-xs font-medium">Book New</span>
                        </motion.button>

                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            className="flex-shrink-0 snap-start flex flex-col items-center justify-center w-28 h-28 bg-white border border-neutral-200 text-neutral-700 rounded-2xl gap-2 hover:bg-neutral-50"
                        >
                            <div className="w-10 h-10 bg-neutral-50 rounded-full flex items-center justify-center text-neutral-900">
                                <History size={20} />
                            </div>
                            <span className="text-xs font-medium">History</span>
                        </motion.button>

                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            className="flex-shrink-0 snap-start flex flex-col items-center justify-center w-28 h-28 bg-white border border-neutral-200 text-neutral-700 rounded-2xl gap-2 hover:bg-neutral-50"
                        >
                            <div className="w-10 h-10 bg-neutral-50 rounded-full flex items-center justify-center text-neutral-900">
                                <FileText size={20} />
                            </div>
                            <span className="text-xs font-medium">Prescriptions</span>
                        </motion.button>
                    </div>
                </section>

                {/* --- Past Appointments --- */}
                <section>
                    <div className="flex items-center justify-between mb-3">
                        <h2 className="text-lg font-bold text-neutral-900">Recent Visits</h2>
                        <button className="text-sm text-neutral-500 font-medium hover:text-neutral-900">View all</button>
                    </div>
                    <div className="space-y-3">
                        {PAST_APPOINTMENTS.map((apt, index) => (
                            <motion.div
                                key={apt.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white p-4 rounded-xl border border-neutral-100 flex items-center justify-between shadow-sm"
                            >
                                <div className="flex items-center gap-3">
                                    <img
                                        src={apt.image}
                                        alt={apt.doctorName}
                                        className="w-12 h-12 rounded-full bg-neutral-100 object-cover"
                                    />
                                    <div>
                                        <h4 className="font-bold text-neutral-900 text-sm">{apt.doctorName}</h4>
                                        <p className="text-xs text-neutral-500">{apt.speciality}</p>
                                        <p className="text-xs text-neutral-400 mt-0.5">{apt.date} • {apt.status}</p>
                                    </div>
                                </div>
                                <button className="p-2 text-neutral-400 hover:text-neutral-900 hover:bg-neutral-50 rounded-full transition-colors">
                                    <ChevronRight size={20} />
                                </button>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* --- Prescriptions --- */}
                <section>
                    <div className="flex items-center justify-between mb-3">
                        <h2 className="text-lg font-bold text-neutral-900">Prescriptions</h2>
                    </div>
                    <div className="space-y-3">
                        {PRESCRIPTIONS.map((rx, index) => (
                            <motion.div
                                key={rx.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 + (index * 0.1) }}
                                className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 flex items-center justify-between"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                                        <FileText size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-neutral-900 text-sm">Prescription #{rx.id}</h4>
                                        <p className="text-xs text-neutral-500">Dr. {rx.doctorName.split(' ').pop()} • {rx.date}</p>
                                    </div>
                                </div>
                                <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-full transition-colors">
                                    <Download size={18} />
                                </button>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* --- Footer --- */}
                <footer className="pt-8 pb-4 text-center border-t border-neutral-100">
                    <div className="flex items-center justify-center gap-4 text-xs text-neutral-500 mb-4">
                        <a href="#" className="hover:text-neutral-900">Privacy Policy</a>
                        <a href="#" className="hover:text-neutral-900">Terms of Service</a>
                        <a href="#" className="hover:text-neutral-900">Support</a>
                    </div>
                    <div className="flex items-start justify-center gap-2 text-[10px] text-neutral-400 max-w-xs mx-auto leading-relaxed">
                        <ShieldCheck size={12} className="mt-0.5 flex-shrink-0" />
                        <p>
                            This platform facilitates consultations. Medical advice is provided solely by registered doctors.
                            In case of emergency, please contact local emergency services immediately.
                        </p>
                    </div>
                </footer>

            </main>
        </div>
    );
}
