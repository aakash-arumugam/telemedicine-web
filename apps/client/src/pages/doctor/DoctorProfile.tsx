import {
    User,
    Stethoscope,
    Calendar,
    MapPin,
    GraduationCap,
    Activity
} from 'lucide-react';

// MOCK DATA FROM USER REQUEST
const DOCTOR_PROFILE = {
    _id: "695a8984407a6d44d8345c71",
    userId: "695a8984407a6d44d8345c6f",
    name: "aakash",
    gender: "male",
    dob: "1998-06-15T00:00:00.000Z",
    speciality: "nuero",
    experience: "12",
    address: "7,murugan nangar mangadu road moulivakkam porur chennai",
    education: [
        {
            degree: "mbbs",
            university: "SRMC",
            year: "2014",
            _id: "695a8984407a6d44d8345c72"
        }
    ],
    // specialization: "", // Empty in mock data, using 'speciality' instead
};

export default function DoctorProfile() {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-2xl font-bold text-neutral-900">Doctor Profile</h1>
                <p className="text-neutral-500 text-sm mt-1">View your professional details.</p>
            </header>

            <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm overflow-hidden">
                {/* Profile Header */}
                <div className="bg-neutral-900 p-8 text-white flex flex-col md:flex-row items-center gap-6">
                    <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center text-4xl font-bold backdrop-blur-sm">
                        {DOCTOR_PROFILE.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="text-center md:text-left">
                        <h2 className="text-2xl font-bold capitalize">Dr. {DOCTOR_PROFILE.name}</h2>
                        <div className="flex items-center gap-2 justify-center md:justify-start text-neutral-300 mt-1">
                            <Stethoscope size={16} />
                            <span className="capitalize">{DOCTOR_PROFILE.speciality} Specialist</span>
                            <span>•</span>
                            <span>{DOCTOR_PROFILE.experience} Years Experience</span>
                        </div>
                    </div>
                </div>

                {/* Details Grid */}
                <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">

                    {/* Education Section */}
                    <div className="space-y-4">
                        <h3 className="font-bold text-lg text-neutral-900 flex items-center gap-2">
                            <GraduationCap className="text-blue-600" /> Education
                        </h3>
                        <div className="space-y-3">
                            {DOCTOR_PROFILE.education.map((edu) => (
                                <div key={edu._id} className="p-4 bg-neutral-50 rounded-xl border border-neutral-100">
                                    <h4 className="font-bold text-neutral-900 uppercase">{edu.degree}</h4>
                                    <p className="text-sm text-neutral-600">{edu.university}</p>
                                    <p className="text-xs text-neutral-400 mt-1">Year {edu.year}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Personal Details Section */}
                    <div className="space-y-4">
                        <h3 className="font-bold text-lg text-neutral-900 flex items-center gap-2">
                            <User className="text-blue-600" /> Personal Details
                        </h3>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="mt-1 text-neutral-400">
                                    <Activity size={18} />
                                </div>
                                <div>
                                    <span className="block text-xs font-bold text-neutral-400 uppercase">Gender</span>
                                    <span className="text-neutral-900 capitalize">{DOCTOR_PROFILE.gender}</span>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="mt-1 text-neutral-400">
                                    <Calendar size={18} />
                                </div>
                                <div>
                                    <span className="block text-xs font-bold text-neutral-400 uppercase">Date of Birth</span>
                                    <span className="text-neutral-900">{formatDate(DOCTOR_PROFILE.dob)}</span>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="mt-1 text-neutral-400">
                                    <MapPin size={18} />
                                </div>
                                <div>
                                    <span className="block text-xs font-bold text-neutral-400 uppercase">Address</span>
                                    <span className="text-neutral-900 capitalize leading-relaxed">{DOCTOR_PROFILE.address}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
