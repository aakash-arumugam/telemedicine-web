import z from "zod";
import { validateRequestBody } from "zod-express-middleware";

const userCreationSchema = z.object({
    email: z.string(),
    password: z.string(),
    name: z.string(),
    gender: z.string(),
    maritalStatus: z.enum(['Single', 'Married', 'Divorced', 'Widowed']),
    dob: z.string(),
    code: z.string()
});


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