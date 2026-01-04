import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import AuthLayout from '../components/auth/AuthLayout';
import StepWizard from '../components/auth/StepWizard';
import { Step1Credentials, Step2PersonalDetails, Step3Verification } from '../components/auth/SignupForms';
import { Eye, EyeOff, ArrowRight, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { type SignupData } from '../api/auth.api';
import { createUser, loginUser } from '../api/user';

const shakeAnimation = {
    x: [0, -10, 10, -10, 10, 0],
    transition: { duration: 0.4 }
};

export default function Login() {
    const navigate = useNavigate();
    const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState<SignupData>({
        name: '',
        email: '',
        password: '',
        gender: '',
        maritalStatus: '',
        dob: undefined,
        code: '',
        role: 'patient',
    });

    // Login State
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [shake, setShake] = useState(false);

    const userLoginMutation = useMutation({
        mutationFn: loginUser,
        onSuccess: (data) => {
            navigate('/dashboard');
            localStorage.setItem('token', data.data.token);
        },
        onError: (error: any) => {
            setError(error.response.data.error);
            setShake(true);
            setTimeout(() => setShake(false), 400);
        }
    })

    const signupMutation = useMutation({
        mutationFn: createUser,
        onSuccess: (responseData) => {
            localStorage.setItem('token', responseData.data.token);
            navigate('/dashboard');
        },
        onError: () => {
            // setShake(true);
            // setTimeout(() => setShake(false), 400);
        }
    })

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        userLoginMutation.mutate({ email: loginEmail, password: loginPassword });
    };

    const handleSignupStep = (stepData: any) => {
        const updatedData = { ...formData, ...stepData };
        setFormData(updatedData);

        if (currentStep < 3) {
            setCurrentStep(currentStep + 1);
        } else {
            console.log("Form Data....", { ...formData })
            signupMutation.mutate({ name: formData.name, email: formData.email, password: formData.password, dob: formData.dob, gender: formData.gender, maritalStatus: formData.maritalStatus, code: formData.code, role: formData.role });
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/dashboard');
        }
    }, []);

    return (
        <AuthLayout
            title={authMode === 'login' ? 'Welcome Back' : 'Create Account'}
            subtitle={authMode === 'login' ? 'Enter your details to access your account' : 'Join us to manage your health journey'}
        >
            {authMode === 'login' ? (
                // --- Login Form ---
                <motion.form
                    onSubmit={handleLogin}
                    className="space-y-4"
                    animate={shake ? shakeAnimation : {}}
                >
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-neutral-700">Email Address</label>
                        <input
                            type="email"
                            required
                            className="w-full px-4 py-3 rounded-lg border border-neutral-200 focus:border-neutral-900 focus:ring-0 transition-colors outline-none bg-neutral-50 focus:bg-white"
                            placeholder="you@example.com"
                            value={loginEmail}
                            onChange={(e) => setLoginEmail(e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <label className="text-sm font-medium text-neutral-700">Password</label>
                            <button type="button" className="text-xs text-neutral-500 hover:text-neutral-900">Forgot password?</button>
                        </div>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                required
                                className="w-full px-4 py-3 rounded-lg border border-neutral-200 focus:border-neutral-900 focus:ring-0 transition-colors outline-none bg-neutral-50 focus:bg-white"
                                placeholder="••••••••"
                                value={loginPassword}
                                onChange={(e) => setLoginPassword(e.target.value)}
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
                        Sign In <ArrowRight size={18} />
                    </button>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-neutral-500">
                            Don't have an account?{' '}
                            <button
                                type="button"
                                onClick={() => setAuthMode('signup')}
                                className="text-neutral-900 font-medium hover:underline"
                            >
                                Sign up
                            </button>
                        </p>
                    </div>
                </motion.form>
            ) : (
                // --- Signup Flow ---
                <div>
                    <StepWizard currentStep={currentStep}>
                        <Step1Credentials onNext={handleSignupStep} data={formData} />
                        <Step2PersonalDetails onNext={handleSignupStep} data={formData} />
                        <Step3Verification
                            onNext={handleSignupStep}
                            data={formData}
                            isPending={signupMutation.isPending}
                            isError={signupMutation.isError}
                        />
                    </StepWizard>

                    <div className="mt-6 text-center border-t border-neutral-100 pt-4">
                        <p className="text-sm text-neutral-500">
                            Already have an account?{' '}
                            <button
                                type="button"
                                onClick={() => {
                                    setAuthMode('login');
                                    setCurrentStep(1);
                                }}
                                className="text-neutral-900 font-medium hover:underline"
                            >
                                Sign in
                            </button>
                        </p>
                    </div>
                </div>
            )}
        </AuthLayout>
    );
}