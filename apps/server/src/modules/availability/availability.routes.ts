import { authenticate } from "@middleware/auth.middleware";
import { Application, Router, Request, Response } from "express";
import { validateCreateAvailabilitySchema, validateGetAvailabilityByDoctorIdAndDateSchema } from "./availability.validator";
import { createAvailabilty, getAvailabilityByDoctorIdAndDate } from "./availability.services";

export const defineAvailabilityRoutes = (app: Application, baseUrl: string): void => {
    const router = Router();

    router.post('/create-availability', authenticate, validateCreateAvailabilitySchema, async (req: Request, res: Response) => {
        try {
            const availability = await createAvailabilty(req.body);
            res.status(201).json({ success: true, data: availability, message: 'Availability created successfully' });
        } catch (error: any) {
            res.status(400).json({ success: false, error: error.message });
        }
    });

    router.post('/get-availability', authenticate, validateGetAvailabilityByDoctorIdAndDateSchema, async (req: Request, res: Response) => {
        try {
            const availability = await getAvailabilityByDoctorIdAndDate(req.body);
            res.status(200).json({ success: true, data: availability, message: 'Availability fetched successfully' });
        } catch (error: any) {
            res.status(400).json({ success: false, error: error.message });
        }
    });

    // Mount the router at /api/v1/users
    app.use(`${baseUrl}/availability`, router);
};