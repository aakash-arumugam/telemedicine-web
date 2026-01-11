import { useState } from 'react';
import AppointmentCard from '../../components/doctor/AppointmentCard';

// MOCK DATA
const APPOINTMENTS = [
    {
        id: 1,
        patientName: "Sarah Johnson",
        age: 28,
        gender: "Female",
        date: "Today, 16 Dec",
        time: "10:30 AM",
        type: "Follow-up",
        reason: "Patient reports mild headaches after starting new medication. Needs dosage review.",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
        status: "Confirmed"
    },
    {
        id: 2,
        patientName: "Michael Brown",
        age: 45,
        gender: "Male",
        date: "Today, 16 Dec",
        time: "11:00 AM",
        type: "Consultation",
        reason: "Annual cardiac checkup. Previous history of hypertension.",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
        status: "Confirmed"
    },
    {
        id: 3,
        patientName: "Emma Davis",
        age: 32,
        gender: "Female",
        date: "Today, 16 Dec",
        time: "02:15 PM",
        type: "Report Review",
        reason: "Review blood test results from last week.",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
        status: "Confirmed"
    }
];

const HISTORY = [
    {
        id: 101,
        patientName: "Robert Wilson",
        age: 52,
        gender: "Male",
        date: "15 Dec 2024",
        time: "04:00 PM",
        type: "Consultation",
        reason: "Chest pain and shortness of breath.",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Robert",
        status: "Completed"
    },
    {
        id: 102,
        patientName: "Linda Martinez",
        age: 39,
        gender: "Female",
        date: "14 Dec 2024",
        time: "11:30 AM",
        type: "Follow-up",
        reason: "Skin rash consultation.",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Linda",
        status: "Cancelled"
    }
];

export default function DoctorAppointments() {
    const [activeTab, setActiveTab] = useState<'upcoming' | 'history'>('upcoming');

    return (
        <div className="space-y-6">
            <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-neutral-900">Appointments</h1>
                    <p className="text-neutral-500 text-sm mt-1">Manage your patient consultations.</p>
                </div>

                {/* Tabs */}
                <div className="bg-white p-1 rounded-xl border border-neutral-200 inline-flex">
                    <button
                        onClick={() => setActiveTab('upcoming')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'upcoming'
                                ? 'bg-neutral-900 text-white shadow-sm'
                                : 'text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50'
                            }`}
                    >
                        Upcoming
                    </button>
                    <button
                        onClick={() => setActiveTab('history')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'history'
                                ? 'bg-neutral-900 text-white shadow-sm'
                                : 'text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50'
                            }`}
                    >
                        History
                    </button>
                </div>
            </header>

            <div className="space-y-4">
                {activeTab === 'upcoming' ? (
                    APPOINTMENTS.map((apt) => (
                        <AppointmentCard key={apt.id} appointment={apt} />
                    ))
                ) : (
                    HISTORY.map((apt) => (
                        <AppointmentCard key={apt.id} appointment={apt} isHistory />
                    ))
                )}
            </div>
        </div>
    );
}
