import { useState, useEffect } from 'react';
import { Eye, EyeOff, ArrowRight, CheckCircle2, Calendar, User, Heart, AlertCircle, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface StepProps {
    onNext: (data: any) => void;
    data: any;
    isPending?: boolean;
    isError?: boolean;
}

const shakeAnimation = {
    x: [0, -10, 10, -10, 10, 0],
    transition: { duration: 0.4 }
};

// --- Step 1: Credentials ---
export function Step1Credentials({ onNext, data }: StepProps) {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: data.email || '',
        password: data.password || ''
    });
    const [error, setError] = useState('');
    const [shake, setShake] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.email || !formData.password) {
            setError('Please fill in all fields');
            setShake(true);
            setTimeout(() => setShake(false), 400);
            return;
        }
        onNext(formData);
    };

    return (
        <motion.form
            onSubmit={handleSubmit}
            className="space-y-4"
            animate={shake ? shakeAnimation : {}}
        >
            <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-700">Email Address</label>
                <input
                    type="email"
                    className="w-full px-4 py-3 rounded-lg border border-neutral-200 focus:border-neutral-900 focus:ring-0 transition-colors outline-none bg-neutral-50 focus:bg-white"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        setError('');
                    }}
                />
            </div>
            <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-700">Password</label>
                <div className="relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        className="w-full px-4 py-3 rounded-lg border border-neutral-200 focus:border-neutral-900 focus:ring-0 transition-colors outline-none bg-neutral-50 focus:bg-white"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={(e) => {
                            setFormData({ ...formData, password: e.target.value });
                            setError('');
                        }}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                    >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                </div>
            </div>

            {error && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 text-red-500 text-sm"
                >
                    <AlertCircle size={16} /> {error}
                </motion.div>
            )}

            <button
                type="submit"
                className="w-full bg-neutral-900 text-white py-3 rounded-lg font-medium hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 mt-6"
            >
                Continue <ArrowRight size={18} />
            </button>
        </motion.form>
    );
}

// --- Step 2: Personal Details ---
export function Step2PersonalDetails({ onNext, data }: StepProps) {
    const [formData, setFormData] = useState({
        gender: data.gender || '',
        maritalStatus: data.maritalStatus || '',
        birthdate: data.birthdate || ''
    });
    const [error, setError] = useState('');
    const [shake, setShake] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.gender || !formData.maritalStatus || !formData.birthdate) {
            setError('Please complete all details');
            setShake(true);
            setTimeout(() => setShake(false), 400);
            return;
        }
        onNext(formData);
    };

    return (
        <motion.form
            onSubmit={handleSubmit}
            className="space-y-4"
            animate={shake ? shakeAnimation : {}}
        >
            <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-700 flex items-center gap-2">
                    <User size={16} /> Gender
                </label>
                <select
                    className="w-full px-4 py-3 rounded-lg border border-neutral-200 focus:border-neutral-900 focus:ring-0 transition-colors outline-none bg-neutral-50 focus:bg-white appearance-none"
                    value={formData.gender}
                    onChange={(e) => {
                        setFormData({ ...formData, gender: e.target.value });
                        setError('');
                    }}
                >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-700 flex items-center gap-2">
                    <Heart size={16} /> Marital Status
                </label>
                <select
                    className="w-full px-4 py-3 rounded-lg border border-neutral-200 focus:border-neutral-900 focus:ring-0 transition-colors outline-none bg-neutral-50 focus:bg-white appearance-none"
                    value={formData.maritalStatus}
                    onChange={(e) => {
                        setFormData({ ...formData, maritalStatus: e.target.value });
                        setError('');
                    }}
                >
                    <option value="">Select Status</option>
                    <option value="single">Single</option>
                    <option value="married">Married</option>
                    <option value="divorced">Divorced</option>
                    <option value="widowed">Widowed</option>
                </select>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-700 flex items-center gap-2">
                    <Calendar size={16} /> Date of Birth
                </label>
                <input
                    type="date"
                    className="w-full px-4 py-3 rounded-lg border border-neutral-200 focus:border-neutral-900 focus:ring-0 transition-colors outline-none bg-neutral-50 focus:bg-white"
                    value={formData.birthdate}
                    onChange={(e) => {
                        setFormData({ ...formData, birthdate: e.target.value });
                        setError('');
                    }}
                />
            </div>

            {error && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 text-red-500 text-sm"
                >
                    <AlertCircle size={16} /> {error}
                </motion.div>
            )}

            <button
                type="submit"
                className="w-full bg-neutral-900 text-white py-3 rounded-lg font-medium hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 mt-6"
            >
                Continue <ArrowRight size={18} />
            </button>
        </motion.form>
    );
}

// --- Step 3: Verification ---
export function Step3Verification({ onNext, isPending, isError }: StepProps) {
    const [code, setCode] = useState(['', '', '', '', '', '']);
    const [timer, setTimer] = useState(60);
    const [canResend, setCanResend] = useState(false);
    const [shake, setShake] = useState(false);

    useEffect(() => {
        let interval: any;
        if (timer > 0 && !canResend) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        } else {
            setCanResend(true);
        }
        return () => clearInterval(interval);
    }, [timer, canResend]);

    useEffect(() => {
        if (isError) {
            setShake(true);
            setTimeout(() => setShake(false), 400);
        }
    }, [isError]);

    const handleResend = () => {
        setTimer(60);
        setCanResend(false);
        // Logic to trigger resend API would go here
        console.log("Resending code...");
    };

    const handleChange = (index: number, value: string) => {
        if (value.length > 1) return;
        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        if (value && index < 5) {
            const nextInput = document.getElementById(`otp-${index + 1}`);
            nextInput?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === 'Backspace' && !code[index] && index > 0) {
            const prevInput = document.getElementById(`otp-${index - 1}`);
            prevInput?.focus();
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (code.some(c => !c)) {
            setShake(true);
            setTimeout(() => setShake(false), 400);
            return;
        }
        onNext({ code: code.join('') });
    };

    return (
        <motion.form
            onSubmit={handleSubmit}
            className="space-y-6"
            animate={shake ? shakeAnimation : {}}
        >
            <div className="text-center mb-6">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
                    <CheckCircle2 size={24} />
                </div>
                <p className="text-sm text-neutral-600">
                    We've sent a verification code to your email. Please enter it below.
                </p>
            </div>

            <div className="flex justify-center gap-2">
                {code.map((digit, index) => (
                    <input
                        key={index}
                        id={`otp-${index}`}
                        type="text"
                        maxLength={1}
                        className={`w-10 h-12 text-center text-xl font-bold rounded-lg border focus:ring-0 transition-colors outline-none bg-neutral-50 focus:bg-white ${isError ? 'border-red-500 text-red-500' : 'border-neutral-200 focus:border-neutral-900'
                            }`}
                        value={digit}
                        onChange={(e) => handleChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        disabled={isPending}
                    />
                ))}
            </div>

            {isError && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center text-red-500 text-sm flex items-center justify-center gap-2"
                >
                    <AlertCircle size={16} /> Incorrect code. Please try again.
                </motion.div>
            )}

            <button
                type="submit"
                disabled={isPending}
                className="w-full bg-neutral-900 text-white py-3 rounded-lg font-medium hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
                {isPending ? <Loader2 className="animate-spin" size={18} /> : "Verify & Create Account"}
            </button>

            <p className="text-center text-xs text-neutral-400 mt-4">
                Didn't receive code?{' '}
                <button
                    type="button"
                    onClick={handleResend}
                    disabled={!canResend}
                    className={`font-medium hover:underline ${canResend ? 'text-neutral-900' : 'text-neutral-400 cursor-not-allowed'}`}
                >
                    {canResend ? "Resend" : `Resend in ${timer}s`}
                </button>
            </p>
        </motion.form>
    );
}
