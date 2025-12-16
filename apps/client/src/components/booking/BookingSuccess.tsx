import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Loader2, Calendar, Video } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface BookingSuccessProps {
    data: any;
}

export default function BookingSuccess({ data }: BookingSuccessProps) {
    const [isProcessing, setIsProcessing] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsProcessing(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    if (isProcessing) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <Loader2 size={48} className="text-neutral-900 animate-spin mb-4" />
                <h3 className="text-lg font-bold text-neutral-900">Processing Payment</h3>
                <p className="text-neutral-500 text-sm mt-1">Please do not close this window...</p>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-8"
        >
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
                <CheckCircle2 size={40} />
            </div>

            <h2 className="text-2xl font-bold text-neutral-900 mb-2">Booking Confirmed!</h2>
            <p className="text-neutral-500 mb-8 px-4">
                Your appointment with <strong>{data.doctor?.name}</strong> has been successfully scheduled.
            </p>

            <div className="bg-neutral-50 p-6 rounded-2xl border border-neutral-100 mb-8 text-left max-w-xs mx-auto">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm text-neutral-900">
                        <Calendar size={20} />
                    </div>
                    <div>
                        <p className="text-xs text-neutral-500">Date & Time</p>
                        <p className="font-bold text-sm">{data.slot?.date}, {data.slot?.time}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm text-neutral-900">
                        <Video size={20} />
                    </div>
                    <div>
                        <p className="text-xs text-neutral-500">Mode</p>
                        <p className="font-bold text-sm">Video Consultation</p>
                    </div>
                </div>
            </div>

            <div className="space-y-3">
                <button
                    onClick={() => navigate('/dashboard')}
                    className="w-full bg-neutral-900 text-white py-3.5 rounded-xl font-medium hover:bg-neutral-800 transition-colors"
                >
                    Back to Dashboard
                </button>
                <button className="w-full text-neutral-600 py-3 rounded-xl font-medium hover:bg-neutral-50 transition-colors">
                    View Appointment Details
                </button>
            </div>
        </motion.div>
    );
}
