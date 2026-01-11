import { Outlet, NavLink } from 'react-router-dom';
import DoctorSidebar from './DoctorSidebar';
import { Menu, LayoutDashboard, Calendar, Clock, LogOut } from 'lucide-react';
import { useState } from 'react';

export default function DoctorLayout() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className="min-h-screen bg-neutral-50 font-sans">
            <DoctorSidebar />

            {/* Mobile Header */}
            <div className="md:hidden sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-neutral-100 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="p-2 -ml-2 text-neutral-600 hover:bg-neutral-50 rounded-lg"
                    >
                        <Menu size={20} />
                    </button>
                    <span className="font-bold text-lg text-neutral-900">TeleMed Doctor</span>
                </div>
                <div className="w-8 h-8 bg-neutral-900 rounded-lg flex items-center justify-center text-white font-bold text-xs">
                    DR
                </div>
            </div>

            {/* Main Content Area */}
            <main className="md:pl-64 min-h-screen transition-all duration-200">
                <div className="max-w-5xl mx-auto p-4 md:p-8">
                    <Outlet />
                </div>
            </main>

            {/* Mobile Sidebar Overlay (Mock implementation for now) */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-50 md:hidden">
                    <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
                    <div className="absolute left-0 top-0 bottom-0 w-64 bg-white shadow-xl animate-in slide-in-from-left duration-200">
                        {/* Reuse Sidebar logic here or just render a simple mobile menu */}
                        <div className="p-4">
                            <h2 className="font-bold text-lg mb-4 text-neutral-900">Menu</h2>
                            <div className="space-y-1">
                                <NavLink
                                    to="/doctor/dashboard"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={({ isActive }) =>
                                        `flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all ${isActive
                                            ? 'bg-neutral-900 text-white shadow-md'
                                            : 'text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900'
                                        }`
                                    }
                                >
                                    <LayoutDashboard size={20} />
                                    Dashboard
                                </NavLink>
                                <NavLink
                                    to="/doctor/appointments"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={({ isActive }) =>
                                        `flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all ${isActive
                                            ? 'bg-neutral-900 text-white shadow-md'
                                            : 'text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900'
                                        }`
                                    }
                                >
                                    <Calendar size={20} />
                                    Appointments
                                </NavLink>
                                <NavLink
                                    to="/doctor/availability"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={({ isActive }) =>
                                        `flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all ${isActive
                                            ? 'bg-neutral-900 text-white shadow-md'
                                            : 'text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900'
                                        }`
                                    }
                                >
                                    <Clock size={20} />
                                    Availability
                                </NavLink>
                            </div>

                            <div className="mt-8 pt-6 border-t border-neutral-100">
                                <button
                                    onClick={() => {
                                        localStorage.removeItem('token');
                                        window.location.href = '/login';
                                    }}
                                    className="flex items-center gap-3 w-full px-3 py-3 text-red-600 hover:bg-red-50 rounded-xl text-sm font-medium transition-colors"
                                >
                                    <LogOut size={20} />
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
