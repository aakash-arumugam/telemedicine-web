import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, ChevronLeft, ChevronRight } from 'lucide-react';

interface TimeSlotSelectionProps {
    onNext: (slot: any) => void;
    onBack: () => void;
}

const DATES = [
    { day: 'Mon', date: '16', full: '2024-12-16' },
    { day: 'Tue', date: '17', full: '2024-12-17' },
    { day: 'Wed', date: '18', full: '2024-12-18' },
    { day: 'Thu', date: '19', full: '2024-12-19' },
    { day: 'Fri', date: '20', full: '2024-12-20' },
    { day: 'Sat', date: '21', full: '2024-12-21' },
];

const MORNING_SLOTS = ['09:00 AM', '09:30 AM', '10:00 AM', '11:30 AM'];
const AFTERNOON_SLOTS = ['02:00 PM', '02:30 PM', '03:15 PM', '04:00 PM', '04:45 PM'];
const EVENING_SLOTS = ['06:00 PM', '06:30 PM', '07:00 PM'];

export default function TimeSlotSelection({ onNext, onBack }: TimeSlotSelectionProps) {
    const [selectedDate, setSelectedDate] = useState(DATES[0].full);
    const [selectedTime, setSelectedTime] = useState('');

    const handleContinue = () => {
        if (selectedDate && selectedTime) {
            onNext({ date: selectedDate, time: selectedTime });
        }
    };

    return (
        <div className="space-y-6">
            {/* Date Selector */}
            <div>
                <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-neutral-900">December 2024</h3>
                    <div className="flex gap-2">
                        <button className="p-1 hover:bg-neutral-100 rounded"><ChevronLeft size={18} /></button>
                        <button className="p-1 hover:bg-neutral-100 rounded"><ChevronRight size={18} /></button>
                    </div>
                </div>
                <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
                    {DATES.map((item) => (
                        <button
                            key={item.full}
                            onClick={() => setSelectedDate(item.full)}
                            className={`flex-shrink-0 w-14 h-16 rounded-xl flex flex-col items-center justify-center gap-1 border transition-all ${selectedDate === item.full
                                    ? 'bg-neutral-900 text-white border-neutral-900 shadow-lg shadow-neutral-200'
                                    : 'bg-white text-neutral-600 border-neutral-200 hover:border-neutral-400'
                                }`}
                        >
                            <span className="text-xs font-medium opacity-80">{item.day}</span>
                            <span className="text-lg font-bold">{item.date}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Time Slots */}
            <div className="space-y-5">
                <SlotSection title="Morning" slots={MORNING_SLOTS} selected={selectedTime} onSelect={setSelectedTime} />
                <SlotSection title="Afternoon" slots={AFTERNOON_SLOTS} selected={selectedTime} onSelect={setSelectedTime} />
                <SlotSection title="Evening" slots={EVENING_SLOTS} selected={selectedTime} onSelect={setSelectedTime} />
            </div>

            <div className="pt-4">
                <button
                    onClick={handleContinue}
                    disabled={!selectedTime}
                    className="w-full bg-neutral-900 text-white py-3.5 rounded-xl font-medium hover:bg-neutral-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Continue
                </button>
            </div>
        </div>
    );
}

function SlotSection({ title, slots, selected, onSelect }: { title: string, slots: string[], selected: string, onSelect: (t: string) => void }) {
    return (
        <div>
            <h4 className="text-sm font-medium text-neutral-500 mb-3 flex items-center gap-2">
                <Clock size={14} /> {title}
            </h4>
            <div className="grid grid-cols-3 gap-3">
                {slots.map((time) => (
                    <button
                        key={time}
                        onClick={() => onSelect(time)}
                        className={`py-2 px-1 rounded-lg text-sm font-medium border transition-all ${selected === time
                                ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-100'
                                : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-300'
                            }`}
                    >
                        {time}
                    </button>
                ))}
            </div>
        </div>
    );
}
