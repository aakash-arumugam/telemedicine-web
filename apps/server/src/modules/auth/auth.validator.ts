import { z } from "zod";
import { validateRequestBody } from "zod-express-middleware";

const authCallbackValidator = z.object({
    code: z.string().min(1),
});

export const validateAuthCallback = validateRequestBody(authCallbackValidator);