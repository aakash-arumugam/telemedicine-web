import { useParams, useNavigate } from 'react-router-dom';
import {
    ArrowLeft,
    Video,
    Activity,
    AlertCircle,
    FileText
} from 'lucide-react';
import PrescriptionUpload from '../../components/doctor/PrescriptionUpload';

const MOCK_PATIENT = {
    id: 1,
    name: "Sarah Johnson",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    age: 28,
    gender: "Female",
    bloodGroup: "O+",
    phone: "+1 (555) 000-1234",
    email: "sarah.j@example.com",
    history: [
        { condition: "Type 2 Diabetes", diagnosed: "2022" },
        { condition: "Hypertension", diagnosed: "2023" }
    ],
    allergies: ["Penicillin", "Peanuts"],
    consultations: [
        { date: "16 Dec 2024", doctor: "Dr. Smith", diagnosis: "Migraine", status: "Upcoming" },
        { date: "10 Nov 2024", doctor: "Dr. Smith", diagnosis: "General Checkup", status: "Completed" },
        { date: "05 Oct 2024", doctor: "Dr. Smith", diagnosis: "Flu", status: "Completed" }
    ]
};

export default function PatientProfile() {
    useParams();
    const navigate = useNavigate();

    // In a real app, fetch patient by `id`
    const patient = MOCK_PATIENT;

    return (
        <div className="space-y-6">
            {/* Header / Back */}
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-neutral-500 hover:text-neutral-900 transition-colors text-sm font-medium"
            >
                <ArrowLeft size={16} /> Back
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Profile Card */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white p-6 rounded-2xl border border-neutral-100 shadow-sm text-center">
                        <img
                            src={patient.image}
                            alt={patient.name}
                            className="w-24 h-24 rounded-full bg-neutral-100 object-cover mx-auto mb-4 border-4 border-neutral-50"
                        />
                        <h2 className="text-xl font-bold text-neutral-900">{patient.name}</h2>
                        <p className="text-sm text-neutral-500">{patient.age} yrs, {patient.gender} • {patient.bloodGroup}</p>

                        {/* <div className="grid grid-cols-2 gap-3 mt-6">
                            <button
                                onClick={() => window.open('https://meet.google.com/abc-defg-hij', '_blank')}
                                className="py-2.5 bg-neutral-900 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-neutral-200"
                            >
                                <Video size={16} /> Call
                            </button>
                            <button className="py-2.5 border border-neutral-200 text-neutral-700 rounded-xl text-sm font-bold hover:bg-neutral-50 transition-colors">
                                Message
                            </button>
                        </div> */}
                    </div>

                    {/* Medical Info */}
                    <div className="bg-white p-6 rounded-2xl border border-neutral-100 shadow-sm space-y-6">
                        <div>
                            <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-3">Medical History</h3>
                            <div className="flex flex-wrap gap-2">
                                {patient.history.map((h) => (
                                    <span key={h.condition} className="px-3 py-1 bg-red-50 text-red-700 text-xs font-semibold rounded-lg border border-red-100">
                                        {h.condition}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-3">Allergies</h3>
                            <div className="flex flex-wrap gap-2">
                                {patient.allergies.map((a) => (
                                    <span key={a} className="px-3 py-1 bg-yellow-50 text-yellow-700 text-xs font-semibold rounded-lg border border-yellow-100 flex items-center gap-1">
                                        <AlertCircle size={12} /> {a}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Upload Section */}
                    <PrescriptionUpload />
                </div>

                {/* Right Column: History & Details */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Appointment History */}
                    <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-neutral-100">
                            <h3 className="font-bold text-lg text-neutral-900 flex items-center gap-2">
                                <Activity size={20} className="text-neutral-400" />
                                Consultation History
                            </h3>
                        </div>
                        <div className="divide-y divide-neutral-100">
                            {patient.consultations.map((c, i) => (
                                <div key={i} className="p-4 flex items-center justify-between hover:bg-neutral-50 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
                                            <FileText size={20} />
                                        </div>
                                        <div>
                                            <p className="font-bold text-neutral-900 text-sm">{c.diagnosis}</p>
                                            <p className="text-xs text-neutral-500">{c.date} • {c.doctor}</p>
                                        </div>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${c.status === 'Upcoming' ? 'bg-blue-50 text-blue-700' : 'bg-neutral-100 text-neutral-600'
                                        }`}>
                                        {c.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
