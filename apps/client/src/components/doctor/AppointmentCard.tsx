import { useNavigate } from 'react-router-dom';
import {
    Calendar,
    Clock,
    Video,
    FileText,
    MoreHorizontal
} from 'lucide-react';
import { motion } from 'framer-motion';

interface AppointmentCardProps {
    appointment: any; // Type strictly later
    isHistory?: boolean;
}

export default function AppointmentCard({ appointment, isHistory = false }: AppointmentCardProps) {
    const navigate = useNavigate();

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-5 rounded-2xl border border-neutral-100 shadow-sm hover:shadow-md transition-all duration-200"
        >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                {/* Patient Info */}
                <div className="flex items-start gap-4">
                    <img
                        src={appointment.image}
                        alt={appointment.patientName}
                        className="w-14 h-14 rounded-full bg-neutral-100 object-cover border border-neutral-200"
                    />
                    <div>
                        <h3 className="font-bold text-neutral-900 text-lg">{appointment.patientName}</h3>
                        <p className="text-sm text-neutral-500">{appointment.age} yrs, {appointment.gender}</p>
                        <div className="flex items-center gap-3 mt-2 text-xs font-medium text-neutral-600">
                            <span className="flex items-center gap-1 bg-neutral-50 px-2 py-1 rounded-md border border-neutral-100">
                                <Calendar size={12} /> {appointment.date}
                            </span>
                            <span className="flex items-center gap-1 bg-neutral-50 px-2 py-1 rounded-md border border-neutral-100">
                                <Clock size={12} /> {appointment.time}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 w-full md:w-auto mt-2 md:mt-0">
                    {!isHistory ? (
                        <>
                            <button
                                onClick={() => navigate(`/doctor/patient/${appointment.id}`)}
                                className="flex-1 md:flex-none px-4 py-2.5 rounded-xl text-sm font-medium border border-neutral-200 text-neutral-700 hover:bg-neutral-50 transition-colors"
                            >
                                View Details
                            </button>
                            <button
                                onClick={() => window.open('https://meet.google.com/abc-defg-hij', '_blank')}
                                className="flex-1 md:flex-none px-5 py-2.5 bg-neutral-900 text-white rounded-xl text-sm font-medium flex items-center justify-center gap-2 hover:bg-neutral-800 transition-colors shadow-lg shadow-neutral-200"
                            >
                                <Video size={16} /> Join
                            </button>
                        </>
                    ) : (
                        <div className="flex items-center gap-2 ml-auto">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${appointment.status === 'Completed'
                                    ? 'bg-green-50 text-green-700 border border-green-100'
                                    : 'bg-red-50 text-red-700 border border-red-100'
                                }`}>
                                {appointment.status}
                            </span>
                            <button
                                onClick={() => navigate(`/doctor/patient/${appointment.id}`)}
                                className="p-2 text-neutral-400 hover:text-neutral-900 hover:bg-neutral-50 rounded-lg transition-colors"
                            >
                                <MoreHorizontal size={18} />
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Reason / Notes Preview */}
            <div className="mt-4 pt-4 border-t border-neutral-50 flex items-start gap-2">
                <FileText size={14} className="text-neutral-400 mt-0.5" />
                <p className="text-sm text-neutral-600 line-clamp-1">
                    <span className="font-semibold text-neutral-900">Reason: </span>
                    {appointment.reason}
                </p>
            </div>
        </motion.div>
    );
}
