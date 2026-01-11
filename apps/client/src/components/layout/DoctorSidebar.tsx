import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    Calendar,
    Clock,
    LogOut,
    User,
    Settings
} from 'lucide-react';
import { useUser } from '../../context/UserContext';

export default function DoctorSidebar() {
    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/doctor/dashboard' },
        { icon: Calendar, label: 'Appointments', path: '/doctor/appointments' },
        { icon: Clock, label: 'Availability', path: '/doctor/availability' },
        { icon: User, label: 'Profile', path: '/doctor/profile' },
    ];

    const { user, doctor } = useUser();

    return (
        <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-neutral-100 flex flex-col z-50 hidden md:flex">
            {/* Logo Area */}
            <div className="p-6 border-b border-neutral-50">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-neutral-900 rounded-lg flex items-center justify-center text-white font-bold">
                        T
                    </div>
                    <div>
                        <span className="font-bold text-lg tracking-tight block text-neutral-900 leading-none">TeleMed</span>
                        <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">Doctor</span>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <div className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${isActive
                                ? 'bg-neutral-900 text-white shadow-md shadow-neutral-200'
                                : 'text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900'
                            }`
                        }
                    >
                        <item.icon size={18} />
                        {item.label}
                    </NavLink>
                ))}
            </div>

            {/* User Profile & Logout */}
            <div className="p-4 border-t border-neutral-50">
                <button className="flex items-center gap-3 w-full p-2 rounded-xl hover:bg-neutral-50 transition-colors text-left mb-2">
                    <img
                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=DrSmith"
                        alt="Profile"
                        className="w-8 h-8 rounded-full bg-neutral-100 border border-neutral-200"
                    />
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-neutral-900 truncate">{user?.name}</p>
                        <p className="text-xs text-neutral-400 truncate">{doctor?.speciality}</p>
                    </div>
                    <Settings size={16} className="text-neutral-400" />
                </button>

                <button
                    onClick={() => {
                        localStorage.removeItem('token');
                        window.location.href = '/login';
                    }}
                    className="flex items-center gap-2 w-full p-2 px-3 text-red-600 hover:bg-red-50 rounded-xl text-sm font-medium transition-colors"
                >
                    <LogOut size={16} />
                    Logout
                </button>
            </div>
        </aside>
    );
}
