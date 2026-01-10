import { Application, Request, Response, Router } from 'express';
import * as userService from './user.service';
import { authenticate } from '../../middleware/auth.middleware';
import { validateUserCreation, validateUserLogin, validateVerifyUserExists } from './user.validator';

export const defineUserRoutes = (app: Application, baseUrl: string): void => {
    const router = Router();

    // POST /api/v1/users/register - Register new user
    router.post('/register', validateUserCreation, async (req: Request, res: Response) => {
        try {
            const { user, token } = await userService.registerUser(req.body);

            res.status(201).json({
                success: true,
                data: { user, token },
                message: 'User registered successfully',
            });
        } catch (error: any) {
            res.status(400).json({ success: false, error: error.message });
        }
    });

    router.post('/login', validateUserLogin, async (req: Request, res: Response) => {
        try {
            const { user, token } = await userService.loginUser(req.body.email, req.body.password);

            res.status(200).json({
                success: true,
                data: { user, token },
                message: 'User logged in successfully',
            });
        } catch (error: any) {
            res.status(400).json({ success: false, error: error.message });
        }
    })

    // GET /api/v1/users/me - Get current user profile
    router.get('/me', authenticate, async (req: Request, res: Response) => {
        try {
            const userId = (req as any).user._id;
            const userProfile = await userService.getUserProfile(userId);

            if (!userProfile) {
                res.status(404).json({ success: false, error: 'User not found' });
                return;
            }

            res.status(200).json({
                success: true,
                data: userProfile,
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

    //POST /api/v1/users/verify-user-exists
    router.post('/verify-user-exists', validateVerifyUserExists, async (req: Request, res: Response) => {
        try {
            const email = req.body.email;

            const user = await userService.getUserByEmail(email);
            res.json({
                success: true,
                data: { exists: !!user },
                message: `${user ? 'User already exists' : ''}`
            });
        } catch (error: any) {
            res.status(400).json({ success: false, error: error.message });
        }
    })

    // Mount the router at /api/v1/users
    app.use(`${baseUrl}/users`, router);
};
