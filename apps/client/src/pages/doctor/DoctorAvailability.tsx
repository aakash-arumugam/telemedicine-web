import { useState } from 'react';
import {
    Calendar as CalendarIcon,
    Clock,
    Plus,
    X,
    Save,
    ChevronLeft,
    ChevronRight,
    AlertTriangle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Modal from '../../components/common/Modal';

// Helper to get days in a month
const getDaysInMonth = (year: number, month: number) => {
    const date = new Date(year, month, 1);
    const days = [];
    while (date.getMonth() === month) {
        days.push(new Date(date));
        date.setDate(date.getDate() + 1);
    }
    return days;
};

// Helper for days of week headers
const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

const INITIAL_SLOTS = [
    { id: 1, start: '09:00', end: '09:30' },
    { id: 2, start: '10:00', end: '10:30' },
    { id: 3, start: '14:00', end: '14:30' },
    { id: 4, start: '15:30', end: '16:00' },
];

export default function DoctorAvailability() {
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [viewDate, setViewDate] = useState<Date>(new Date()); // For calendar navigation
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

    const [slots, setSlots] = useState(INITIAL_SLOTS);
    const [newSlotStart, setNewSlotStart] = useState('');
    const [newSlotEnd, setNewSlotEnd] = useState('');
    const [isAdding, setIsAdding] = useState(false);
    const [deleteSlotId, setDeleteSlotId] = useState<number | null>(null);

    // Generate calendar days
    const monthStart = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1);
    const daysInMonth = getDaysInMonth(viewDate.getFullYear(), viewDate.getMonth());
    const startDayOfWeek = monthStart.getDay(); // 0-6

    // Navigation handlers
    const prevMonth = () => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
    const nextMonth = () => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));

    const isSelected = (d: Date) => d.toDateString() === selectedDate.toDateString();
    const isToday = (d: Date) => d.toDateString() === new Date().toDateString();

    const formatDate = (d: Date) => d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

    const handleAddSlot = () => {
        if (!newSlotStart || !newSlotEnd) return;

        const newSlot = {
            id: Date.now(),
            start: newSlotStart,
            end: newSlotEnd
        };

        setSlots([...slots, newSlot].sort((a, b) => a.start.localeCompare(b.start)));
        setNewSlotStart('');
        setNewSlotEnd('');
        setIsAdding(false);
    };

    const handleRemoveSlot = (id: number) => {
        setSlots(slots.filter(s => s.id !== id));
        setDeleteSlotId(null);
    };

    return (
        <div className="space-y-6">
            <header className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-neutral-900">Availability</h1>
                    <p className="text-neutral-500 text-sm mt-1">Set your weekly schedule and time slots.</p>
                </div>
                <button className="flex items-center gap-2 bg-neutral-900 text-white px-4 py-2 rounded-xl text-sm font-medium shadow-lg shadow-neutral-200">
                    <Save size={18} />
                    Save Changes
                </button>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Calendar / Date Picker Section */}
                <div className="lg:col-span-1 space-y-4">
                    <div className="bg-white p-5 rounded-2xl border border-neutral-100 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="font-bold text-neutral-900 flex items-center gap-2">
                                <CalendarIcon size={18} />
                                {viewDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                            </h2>
                            <div className="flex gap-1">
                                <button
                                    onClick={prevMonth}
                                    className="p-1 hover:bg-neutral-50 rounded-lg text-neutral-400 hover:text-neutral-900"
                                >
                                    <ChevronLeft size={16} />
                                </button>
                                <button
                                    onClick={nextMonth}
                                    className="p-1 hover:bg-neutral-50 rounded-lg text-neutral-400 hover:text-neutral-900"
                                >
                                    <ChevronRight size={16} />
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-7 gap-1 text-center mb-2">
                            {WEEKDAYS.map((d) => (
                                <span key={d} className="text-xs font-bold text-neutral-300 py-1">{d}</span>
                            ))}
                            {/* Empty cells for start padding */}
                            {Array.from({ length: startDayOfWeek }).map((_, i) => (
                                <div key={`empty-${i}`} />
                            ))}
                            {daysInMonth.map((date) => (
                                <button
                                    key={date.toISOString()}
                                    onClick={() => setSelectedDate(date)}
                                    className={`
                                        h-8 w-8 text-sm rounded-full flex items-center justify-center transition-all
                                        ${isSelected(date)
                                            ? 'bg-neutral-900 text-white shadow-md'
                                            : isToday(date)
                                                ? 'bg-neutral-100 text-neutral-900 font-bold'
                                                : 'text-neutral-600 hover:bg-neutral-50'
                                        }
                                    `}
                                >
                                    {date.getDate()}
                                </button>
                            ))}
                        </div>

                        <div className="mt-4 pt-4 border-t border-neutral-50 text-center">
                            <button
                                onClick={() => {
                                    const today = new Date();
                                    setSelectedDate(today);
                                    setViewDate(today);
                                }}
                                className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline"
                            >
                                Jump to Today
                            </button>
                        </div>
                    </div>
                </div>

                {/* Slots Section */}
                <div className="lg:col-span-2">
                    <div className="bg-white p-6 rounded-2xl border border-neutral-100 shadow-sm min-h-[500px]">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="font-bold text-lg text-neutral-900">
                                    Slots for {formatDate(selectedDate)}
                                </h2>
                                <p className="text-xs text-neutral-500">{slots.length} slots configured</p>
                            </div>
                            <button
                                onClick={() => setIsAdding(true)}
                                className="flex items-center gap-1.5 text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors"
                            >
                                <Plus size={16} /> Add Slot
                            </button>
                        </div>

                        {isAdding && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="mb-6 p-4 bg-neutral-50 rounded-xl border border-neutral-200"
                            >
                                <h3 className="text-sm font-bold text-neutral-900 mb-3">Add New Slot</h3>
                                <div className="grid grid-cols-2 lg:flex lg:items-end gap-4">
                                    <div className="col-span-1 space-y-1.5">
                                        <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Start Time</label>
                                        <div className="relative">
                                            <input
                                                type="time"
                                                value={newSlotStart}
                                                onChange={(e) => setNewSlotStart(e.target.value)}
                                                className="block w-full px-4 py-3 bg-white border border-neutral-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-neutral-900 transition-all appearance-none"
                                            />
                                            <Clock size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
                                        </div>
                                    </div>
                                    <div className="col-span-1 space-y-1.5">
                                        <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">End Time</label>
                                        <div className="relative">
                                            <input
                                                type="time"
                                                value={newSlotEnd}
                                                onChange={(e) => setNewSlotEnd(e.target.value)}
                                                className="block w-full px-4 py-3 bg-white border border-neutral-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-neutral-900 transition-all appearance-none"
                                            />
                                            <Clock size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
                                        </div>
                                    </div>
                                    <div className="col-span-2 lg:col-span-1 flex gap-2 pt-2 lg:pt-0">
                                        <button
                                            onClick={handleAddSlot}
                                            className="flex-1 lg:flex-none px-6 py-3 bg-neutral-900 text-white rounded-xl text-sm font-bold hover:bg-neutral-800 shadow-md shadow-neutral-200 transition-all"
                                        >
                                            Add
                                        </button>
                                        <button
                                            onClick={() => setIsAdding(false)}
                                            className="flex-1 lg:flex-none px-6 py-3 bg-white border border-neutral-200 text-neutral-600 rounded-xl text-sm font-bold hover:bg-neutral-50 transition-all"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <AnimatePresence>
                                {slots.map((slot) => (
                                    <motion.div
                                        key={slot.id}
                                        layout
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        className="flex items-center justify-between p-3 bg-white border border-neutral-100 rounded-xl hover:border-neutral-200 hover:shadow-sm transition-all group"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-neutral-50 text-neutral-500 rounded-lg">
                                                <Clock size={18} />
                                            </div>
                                            <div>
                                                <p className="font-bold text-neutral-900 text-sm">{slot.start} - {slot.end}</p>
                                                <p className="text-xs text-neutral-400">30 mins</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => setDeleteSlotId(slot.id)}
                                            className="p-1.5 text-neutral-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors md:opacity-0 md:group-hover:opacity-100 opacity-100"
                                            aria-label="Delete Slot"
                                        >
                                            <X size={16} />
                                        </button>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            <Modal
                isOpen={!!deleteSlotId}
                onClose={() => setDeleteSlotId(null)}
                title="Delete Time Slot"
            >
                <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-red-50 text-red-600 rounded-full flex items-center justify-center mb-4">
                        <AlertTriangle size={24} />
                    </div>
                    <p className="text-neutral-600 mb-6">
                        Are you sure you want to remove this time slot? This action cannot be undone.
                    </p>
                    <div className="flex gap-3 w-full">
                        <button
                            onClick={() => setDeleteSlotId(null)}
                            className="flex-1 px-4 py-2.5 bg-white border border-neutral-200 text-neutral-700 rounded-xl text-sm font-bold hover:bg-neutral-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => deleteSlotId && handleRemoveSlot(deleteSlotId)}
                            className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-xl text-sm font-bold hover:bg-red-700 transition-colors shadow-lg shadow-red-200"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
