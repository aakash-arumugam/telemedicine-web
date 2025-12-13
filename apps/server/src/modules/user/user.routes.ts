import { Application, Request, Response, Router } from 'express';
import * as userService from './user.service';
import { authenticate } from '../../middleware/auth.middleware';

export const defineUserRoutes = (app: Application, baseUrl: string): void => {
    const router = Router();

    // POST /api/v1/users/register - Register new user
    router.post('/register', async (req: Request, res: Response) => {
        try {
            const { name, email, password } = req.body;

            if (!name || !email || !password) {
                return res.status(400).json({ success: false, error: 'All fields are required' });
            }

            const { user, token } = await userService.registerUser(name, email, password);

            res.status(201).json({
                success: true,
                data: { user, token },
                message: 'User registered successfully',
            });
        } catch (error: any) {
            res.status(400).json({ success: false, error: error.message });
        }
    });

    // PUT /api/v1/users/profile - Update user profile
    router.put('/profile', authenticate, async (req: Request, res: Response) => {
        try {
            const userId = (req as any).user.userId;
            const { gender, maritalStatus, dob, address } = req.body;

            const updateData: any = {
                gender,
                maritalStatus,
                dob,
                address
            };

            // Check if all mandatory fields are present to mark profile as complete
            if (gender && maritalStatus && dob && address) {
                updateData.isProfileComplete = true;
            }

            const user = await userService.updateUser(userId, updateData);

            res.json({
                success: true,
                data: user,
                message: 'Profile updated successfully'
            });
        } catch (error: any) {
            res.status(400).json({ success: false, error: error.message });
        }
    });

    // Mount the router at /api/v1/users
    app.use(`${baseUrl}/users`, router);
};
