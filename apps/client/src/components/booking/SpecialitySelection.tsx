import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Stethoscope, Heart, Brain, Baby, Eye, Bone, Activity } from 'lucide-react';

interface SpecialitySelectionProps {
    onNext: (speciality: any) => void;
    onBack: () => void;
}

const SPECIALITIES = [
    { id: 'gen', name: 'General Physician', icon: Stethoscope, color: 'bg-blue-100 text-blue-600' },
    { id: 'cardio', name: 'Cardiologist', icon: Heart, color: 'bg-red-100 text-red-600' },
    { id: 'neuro', name: 'Neurologist', icon: Brain, color: 'bg-purple-100 text-purple-600' },
    { id: 'ped', name: 'Pediatrician', icon: Baby, color: 'bg-green-100 text-green-600' },
    { id: 'ortho', name: 'Orthopedist', icon: Bone, color: 'bg-orange-100 text-orange-600' },
    { id: 'eye', name: 'Ophthalmologist', icon: Eye, color: 'bg-cyan-100 text-cyan-600' },
    { id: 'derma', name: 'Dermatologist', icon: Activity, color: 'bg-pink-100 text-pink-600' },
];

export default function SpecialitySelection({ onNext, onBack }: SpecialitySelectionProps) {
    const [search, setSearch] = useState('');

    const filtered = SPECIALITIES.filter(s =>
        s.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-4">
            <div className="sticky top-0 bg-neutral-50 pt-2 pb-4 z-10">
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search speciality..."
                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-neutral-200 focus:border-neutral-900 focus:ring-0 outline-none bg-white shadow-sm"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            <div className="grid gap-3">
                {filtered.map((item, index) => (
                    <motion.button
                        key={item.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => onNext(item)}
                        className="flex items-center gap-4 p-4 bg-white rounded-xl border border-neutral-100 shadow-sm hover:shadow-md transition-all text-left group"
                    >
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${item.color} group-hover:scale-110 transition-transform`}>
                            <item.icon size={24} />
                        </div>
                        <div className="flex-1">
                            <h3 className="font-bold text-neutral-900">{item.name}</h3>
                            <p className="text-xs text-neutral-500">Available Doctors: {Math.floor(Math.random() * 10) + 2}</p>
                        </div>
                    </motion.button>
                ))}
            </div>
        </div>
    );
}
