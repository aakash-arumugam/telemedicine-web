import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    CalendarCheck,
    TrendingUp,
    Video
} from 'lucide-react';
import { useUser } from '../../context/UserContext';

const DASHBOARD_STATS = [
    {
        label: "Today's Appointments",
        value: "8",
        subtext: "2 remaining",
        icon: CalendarCheck,
        color: "bg-blue-500",
        bg: "bg-blue-50 text-blue-600"
    },
    // {
    //     label: "Total Patients",
    //     value: "1,248",
    //     subtext: "+12% this month",
    //     icon: Users,
    //     color: "bg-purple-500",
    //     bg: "bg-purple-50 text-purple-600"
    // },
    // {
    //     label: "Consultation Hours",
    //     value: "42h",
    //     subtext: "This week",
    //     icon: Clock,
    //     color: "bg-emerald-500",
    //     bg: "bg-emerald-50 text-emerald-600"
    // }
];

const UPCOMING_APPOINTMENTS = [
    {
        id: 1,
        patientName: "Sarah Johnson",
        age: 28,
        gender: "Female",
        time: "10:30 AM",
        type: "Follow-up",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
    },
    {
        id: 2,
        patientName: "Michael Brown",
        age: 45,
        gender: "Male",
        time: "11:00 AM",
        type: "Consultation",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael"
    },
    {
        id: 3,
        patientName: "Emma Davis",
        age: 32,
        gender: "Female",
        time: "02:15 PM",
        type: "Report Review",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma"
    }
];

export default function DoctorDashboard() {
    const navigate = useNavigate();

    const { doctor } = useUser();

    return (
        <div className="space-y-8">
            {/* Header */}
            <header>
                <h1 className="text-2xl font-bold text-neutral-900">Good Morning, Dr. {doctor?.name}</h1>
                <p className="text-neutral-500 text-sm mt-1">Here's your schedule overview for today.</p>
            </header>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {DASHBOARD_STATS.map((stat, index) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white p-6 rounded-2xl border border-neutral-100 shadow-sm flex items-start justify-between"
                    >
                        <div>
                            <p className="text-neutral-500 text-sm font-medium mb-1">{stat.label}</p>
                            <h3 className="text-3xl font-bold text-neutral-900">{stat.value}</h3>
                            <div className="flex items-center gap-1 mt-2 text-xs font-medium text-emerald-600">
                                <TrendingUp size={12} />
                                <span>{stat.subtext}</span>
                            </div>
                        </div>
                        <div className={`p-3 rounded-xl ${stat.bg}`}>
                            <stat.icon size={24} />
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Main Content Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Upcoming Appointments */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-bold text-neutral-900">Upcoming Appointments</h2>
                        <button
                            onClick={() => navigate('/doctor/appointments')}
                            className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline"
                        >
                            View All
                        </button>
                    </div>

                    <div className="space-y-3">
                        {UPCOMING_APPOINTMENTS.map((apt, index) => (
                            <motion.div
                                key={apt.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 + (index * 0.1) }}
                                className="group bg-white p-4 rounded-xl border border-neutral-100 shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-between"
                            >
                                <div className="flex items-center gap-4">
                                    <img
                                        src={apt.image}
                                        alt={apt.patientName}
                                        className="w-12 h-12 rounded-full bg-neutral-100 object-cover"
                                    />
                                    <div>
                                        <h3 className="font-bold text-neutral-900 text-sm">{apt.patientName}</h3>
                                        <p className="text-xs text-neutral-500">{apt.age} yrs, {apt.gender} • {apt.type}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="text-right hidden sm:block">
                                        <p className="font-bold text-neutral-900 text-sm">{apt.time}</p>
                                        <p className="text-xs text-emerald-600 font-medium">Confirmed</p>
                                    </div>
                                    <button
                                        onClick={() => window.open('https://meet.google.com/abc-defg-hij', '_blank')}
                                        className="p-2.5 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition-colors shadow-lg shadow-neutral-200 md:opacity-0 md:group-hover:opacity-100 opacity-100 transition-opacity"
                                        title="Join Call"
                                    >
                                        <Video size={18} />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Quick Availability / Calendar (Simplified) */}
                <div className="space-y-4">
                    <h2 className="text-lg font-bold text-neutral-900">Today's Schedule</h2>
                    <div className="bg-white p-5 rounded-2xl border border-neutral-100 shadow-sm h-full">
                        <div className="space-y-4">
                            {[10, 11, 14, 15, 16].map((hour) => (
                                <div key={hour} className="flex items-start gap-3">
                                    <span className="text-xs font-medium text-neutral-400 w-12 pt-1">{hour}:00</span>
                                    <div className="flex-1 py-3 px-3 rounded-lg bg-blue-50 border border-blue-100 text-blue-900 text-xs font-medium">
                                        Occupied Slot
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
