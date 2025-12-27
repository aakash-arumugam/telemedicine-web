import { isValidObjectId } from "mongoose";
import { z } from "zod"
import { validateRequestBody } from "zod-express-middleware";

export const createAvailabilitySchema = z.object({
    doctorId: z.string().refine(isValidObjectId, { message: "Invalid doctor id" }),
    date: z.coerce.date(),
    startTime: z.coerce.date(),
    endTime: z.coerce.date(),
    appointmentId: z.string().optional(),
    isEnabled: z.boolean().optional().default(true)
});

export const getAvailabilityByDoctorIdAndDateSchema = z.object({
    doctorId: z.string().refine(isValidObjectId, { message: "Invalid doctor id" }),
    date: z.coerce.date()
});

export type CreateAvailabilitySchemaT = z.infer<typeof createAvailabilitySchema>;
export type GetAvailabilityByDoctorIdAndDateSchemaT = z.infer<typeof getAvailabilityByDoctorIdAndDateSchema>;

export const validateCreateAvailabilitySchema = validateRequestBody(createAvailabilitySchema);
export const validateGetAvailabilityByDoctorIdAndDateSchema = validateRequestBody(getAvailabilityByDoctorIdAndDateSchema);