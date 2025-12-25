import z from "zod";
import { validateRequest, validateRequestBody } from "zod-express-middleware";

export const createDoctorSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters long"),
    email: z.string().email("Invalid email"),
    gender: z.enum(["male", "female", "other"]),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    dob: z.string(),
    speciality: z.string(),
    experience: z.string(),
    address: z.string(),
    education: z.array(z.object({
        degree: z.string(),
        university: z.string(),
        year: z.string(),
    })),
    tag: z.string(),
});

export const getDoctorBySpecialitySchema = z.object({
    speciality: z.string(),
});

export const getDoctorsSpecialitiesSchema = z.object({
    name: z.string().optional()
})

export type createDoctorSchemaT = z.infer<typeof createDoctorSchema>;
export type getDoctorBySpecialitySchemaT = z.infer<typeof getDoctorBySpecialitySchema>;
export type getDoctorsSpecialitiesSchemaT = z.infer<typeof getDoctorsSpecialitiesSchema>;

export const validateCreateDoctor = validateRequestBody(createDoctorSchema);
export const validateGetDoctorBySpeciality = validateRequest({
    params: getDoctorBySpecialitySchema,
});

export const validateGetDoctorsSpecialities = validateRequest({
    query: getDoctorsSpecialitiesSchema,
});