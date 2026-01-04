import z from "zod";
import { validateRequestBody } from "zod-express-middleware";

export const userCreationSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string(),
    role: z.enum(['patient', 'doctor', 'superadmin']).default('patient'),

    // Patient/Doctor specific fields (merged in service or validated dynamically)
    // For registration, we'll accept them in the body and service will distribute
    speciality: z.string().optional(),
    experience: z.string().optional(),
    education: z.array(z.object({
        degree: z.string(),
        university: z.string(),
        year: z.string()
    })).optional(),
    tag: z.string().optional(),

    // Common profile fields
    gender: z.string().optional(),
    dob: z.coerce.date().optional(),
    address: z.string().optional(),
    maritalStatus: z.string().optional()
}).superRefine((data, ctx) => {

    if (data.role === 'doctor') {
        if (!data.speciality) {
            ctx.addIssue({
                path: ['speciality'],
                message: 'Speciality is required for doctor',
                code: z.ZodIssueCode.custom,
            });
        }

        if (!data.experience) {
            ctx.addIssue({
                path: ['experience'],
                message: 'Experience is required for doctor',
                code: z.ZodIssueCode.custom,
            });
        }

        if (!data.education || data.education.length === 0) {
            ctx.addIssue({
                path: ['education'],
                message: 'Education is required for doctor',
                code: z.ZodIssueCode.custom,
            });
        }
    }

    if (data.role === 'patient') {
        if (!data.gender) {
            ctx.addIssue({
                path: ['gender'],
                message: 'Gender is required for patient',
                code: z.ZodIssueCode.custom,
            });
        }

        if (!data.dob) {
            ctx.addIssue({
                path: ['dob'],
                message: 'Date of birth is required for patient',
                code: z.ZodIssueCode.custom,
            });
        }
    }
});;


const userLoginSchema = z.object({
    email: z.string(),
    password: z.string()
})

const verifyUserExistsSchema = z.object({
    email: z.string()
})


export type userCreationSchemaT = z.infer<typeof userCreationSchema>;
export type userLoginSchemaT = z.infer<typeof userLoginSchema>;
export type verifyUserExistsSchemaT = z.infer<typeof verifyUserExistsSchema>;

export const validateUserCreation = validateRequestBody(userCreationSchema);
export const validateUserLogin = validateRequestBody(userLoginSchema);
export const validateVerifyUserExists = validateRequestBody(verifyUserExistsSchema);