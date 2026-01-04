import { Application, Request, Response, Router } from 'express';
import * as doctorService from './doctor.service';
import { authenticate } from '../../middleware/auth.middleware';
import { validateCreateDoctor, validateGetDoctorBySpeciality, validateGetDoctorsSpecialities } from './doctor.validator';

export const defineDoctorRoutes = (app: Application, baseUrl: string): void => {
    const router = Router();

    // POST /api/v1/doctors/register - Register new doctor
    // DEPRECATED: Use /api/v1/users/register
    // router.post('/register', authenticate, validateCreateDoctor, async (req: Request, res: Response) => {
    //     try {
    //         const { doctor, token } = await doctorService.createDoctor(req.body);
    //
    //         res.status(201).json({
    //             success: true,
    //             data: { doctor, token },
    //             message: 'Doctor registered successfully',
    //         });
    //     } catch (error: any) {
    //         res.status(400).json({ success: false, error: error.message });
    //     }
    // });

    router.get('/speciality/:speciality', authenticate, validateGetDoctorBySpeciality, async (req: Request, res: Response) => {
        try {
            const doctors = await doctorService.listDoctorsBySpeciality(req.params.speciality);
            res.status(200).json({ success: true, data: doctors });
        } catch (error: any) {
            res.status(400).json({ success: false, error: error.message });
        }
    });

    router.get('/specialities', authenticate, validateGetDoctorsSpecialities, async (req: Request, res: Response) => {
        try {
            const doctors = await doctorService.getDoctorsSpecialities(req.query);
            res.status(200).json({ success: true, data: doctors });
        } catch (error: any) {
            res.status(400).json({ success: false, error: error.message });
        }
    });

    // Mount the router at /api/v1/users
    app.use(`${baseUrl}/doctors`, router);
};
