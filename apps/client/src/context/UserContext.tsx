import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { IUser } from '../types/user.types';
import type { IDoctor } from '../types/doctor.types';
import type { IPatient } from '../types/patient.types';

interface UserContextType {
    user: IUser | null;
    setUser: (user: IUser | null) => void;
    doctor: IDoctor | null;
    setDoctor: (doctor: IDoctor | null) => void;
    patient: IPatient | null;
    setPatient: (patient: IPatient | null) => void;
    isLoading: boolean;
    isAuthenticated: boolean;
    logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<IUser | null>(null);
    const [doctor, setDoctor] = useState<IDoctor | null>(null);
    const [patient, setPatient] = useState<IPatient | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Here you would typically fetch the user from an API using a token stored in localStorage
        // For now, we'll check for a token and maybe mock a user or leave it null until login
        const token = localStorage.getItem('token');
        if (token) {
            // Ideally: fetchUser(token).then(u => setUser(u)).finally(() => setIsLoading(false));
            // For this step, we will just simulate loading finish. 
            // The actual user fetching logic can be added later or now if an API exists.
            setIsLoading(false);
        } else {
            setIsLoading(false);
        }
    }, []);

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    const value = {
        user,
        setUser,
        setDoctor,
        setPatient,
        doctor,
        patient,
        isLoading,
        isAuthenticated: !!user,
        logout
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
}
