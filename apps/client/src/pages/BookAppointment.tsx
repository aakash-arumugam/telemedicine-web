import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import StepWizard from '../components/auth/StepWizard';
import SpecialitySelection from '../components/booking/SpecialitySelection';
import DoctorSelection from '../components/booking/DoctorSelection';
import TimeSlotSelection from '../components/booking/TimeSlotSelection';
import ReviewAppointment from '../components/booking/ReviewAppointment';
import BookingSuccess from '../components/booking/BookingSuccess';

export default function BookAppointment() {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);
    const [bookingData, setBookingData] = useState<any>({});

    const handleNext = (data: any) => {
        setBookingData({ ...bookingData, ...data });
        setCurrentStep(prev => prev + 1);
    };

    const handleBack = () => {
        if (currentStep === 1) {
            navigate('/dashboard');
        } else {
            setCurrentStep(prev => prev - 1);
        }
    };

    const getStepTitle = () => {
        switch (currentStep) {
            case 1: return 'Select Speciality';
            case 2: return 'Choose Doctor';
            case 3: return 'Select Time Slot';
            case 4: return 'Review Appointment';
            case 5: return 'Confirmation';
            default: return 'Book Appointment';
        }
    };

    return (
        <div className="min-h-screen bg-neutral-50 pb-10">
            {/* Top Bar */}
            {currentStep < 5 && (
                <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-neutral-100 px-4 py-3 flex items-center gap-4">
                    <button
                        onClick={handleBack}
                        className="p-2 -ml-2 text-neutral-600 hover:bg-neutral-100 rounded-full transition-colors"
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <h1 className="font-bold text-lg text-neutral-900">{getStepTitle()}</h1>
                </div>
            )}

            <main className="max-w-md mx-auto px-4 py-6">
                <StepWizard currentStep={currentStep}>
                    <SpecialitySelection
                        onNext={(speciality) => handleNext({ speciality })}
                        onBack={handleBack}
                    />
                    <DoctorSelection
                        speciality={bookingData.speciality}
                        onNext={(doctor) => handleNext({ doctor })}
                        onBack={handleBack}
                    />
                    <TimeSlotSelection
                        onNext={(slot) => handleNext({ slot })}
                        onBack={handleBack}
                    />
                    <ReviewAppointment
                        data={bookingData}
                        onNext={() => handleNext({})}
                        onBack={handleBack}
                    />
                    <BookingSuccess data={bookingData} />
                </StepWizard>
            </main>
        </div>
    );
}
