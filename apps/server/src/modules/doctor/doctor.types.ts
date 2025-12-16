export interface IDoctor {
    name: string;
    email: string;
    password: string;
    gender: string;
    dob: Date;
    speciality: string;
    experience: string;
    address: string;
    education: {
        degree: string;
        university: string;
        year: string;
    }[];
    tag: string;
    isEnabled: boolean;
}