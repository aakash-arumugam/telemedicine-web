import { Video, Calendar, Clock, CreditCard, ShieldCheck, AlertCircle } from 'lucide-react';

interface ReviewAppointmentProps {
    data: any;
    onNext: () => void;
    onBack: () => void;
}

export default function ReviewAppointment({ data, onNext, onBack }: ReviewAppointmentProps) {
    const { doctor, slot } = data;

    return (
        <div className="space-y-6">
            <div className="bg-white p-5 rounded-2xl border border-neutral-100 shadow-sm">
                <div className="flex gap-4 mb-4">
                    <img
                        src={doctor?.image}
                        alt={doctor?.name}
                        className="w-16 h-16 rounded-xl object-cover bg-neutral-50"
                    />
                    <div>
                        <h3 className="font-bold text-neutral-900">{doctor?.name}</h3>
                        <p className="text-sm text-neutral-500">{doctor?.qualification}</p>
                        <div className="flex items-center gap-1 mt-1 text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded w-fit">
                            <Video size={12} /> Video Consultation
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-neutral-100">
                    <div className="bg-neutral-50 p-3 rounded-lg">
                        <p className="text-xs text-neutral-500 mb-1 flex items-center gap-1"><Calendar size={12} /> Date</p>
                        <p className="font-semibold text-sm">{slot?.date}</p>
                    </div>
                    <div className="bg-neutral-50 p-3 rounded-lg">
                        <p className="text-xs text-neutral-500 mb-1 flex items-center gap-1"><Clock size={12} /> Time</p>
                        <p className="font-semibold text-sm">{slot?.time}</p>
                    </div>
                </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-neutral-100 shadow-sm space-y-3">
                <h4 className="font-bold text-neutral-900 text-sm">Payment Details</h4>
                <div className="flex justify-between text-sm">
                    <span className="text-neutral-500">Consultation Fee</span>
                    <span className="font-medium">$50.00</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-neutral-500">Service Fee</span>
                    <span className="font-medium">$2.50</span>
                </div>
                <div className="flex justify-between text-sm pt-3 border-t border-neutral-100">
                    <span className="font-bold text-neutral-900">Total Amount</span>
                    <span className="font-bold text-neutral-900">$52.50</span>
                </div>
            </div>

            <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-100 flex gap-3">
                <AlertCircle size={20} className="text-yellow-600 flex-shrink-0" />
                <p className="text-xs text-yellow-800 leading-relaxed">
                    <strong>Cancellation Policy:</strong> Free cancellation up to 2 hours before the appointment.
                </p>
            </div>

            <div className="pt-2">
                <button
                    onClick={onNext}
                    className="w-full bg-neutral-900 text-white py-3.5 rounded-xl font-medium hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2"
                >
                    Proceed to Pay <CreditCard size={18} />
                </button>
                <p className="text-[10px] text-neutral-400 text-center mt-3 flex items-center justify-center gap-1">
                    <ShieldCheck size={12} /> Secure Payment Processing
                </p>
            </div>
        </div>
    );
}
