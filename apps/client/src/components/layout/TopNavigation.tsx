import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, ChevronDown, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MOCK_USER = {
    name: "Alex Johnson",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
};

export default function TopNavigation() {
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-neutral-100 px-4 py-3">
            <div className="flex items-center justify-between max-w-md mx-auto">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-neutral-900 rounded-lg flex items-center justify-center text-white font-bold">
                        T
                    </div>
                    <span className="font-semibold text-lg tracking-tight">Dashboard</span>
                </div>
                <div className="flex items-center gap-3">
                    <button className="relative p-2 text-neutral-600 hover:bg-neutral-100 rounded-full transition-colors">
                        <Bell size={20} />
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                    </button>

                    <div className="relative" ref={dropdownRef}>
                        <div
                            className="flex items-center gap-1 cursor-pointer"
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        >
                            <img
                                src={MOCK_USER.avatar}
                                alt="Profile"
                                className="w-8 h-8 rounded-full bg-neutral-100 border border-neutral-200"
                            />
                            <ChevronDown size={14} className={`text-neutral-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                        </div>

                        <AnimatePresence>
                            {isDropdownOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-neutral-100 overflow-hidden"
                                >
                                    <div className="p-3 border-b border-neutral-50">
                                        <p className="text-sm font-semibold text-neutral-900">{MOCK_USER.name}</p>
                                        <p className="text-xs text-neutral-500">Patient</p>
                                    </div>
                                    {/* <div className="p-1">
                                        <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-neutral-600 hover:bg-neutral-50 rounded-lg transition-colors text-left">
                                            <User size={16} /> Profile
                                        </button>
                                        <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-neutral-600 hover:bg-neutral-50 rounded-lg transition-colors text-left">
                                            <Settings size={16} /> Settings
                                        </button>
                                        <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-neutral-600 hover:bg-neutral-50 rounded-lg transition-colors text-left">
                                            <HelpCircle size={16} /> Help & Support
                                        </button>
                                    </div> */}
                                    <div className="p-1 border-t border-neutral-50">
                                        <button
                                            onClick={handleLogout}
                                            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors text-left"
                                        >
                                            <LogOut size={16} /> Logout
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </nav>
    );
}