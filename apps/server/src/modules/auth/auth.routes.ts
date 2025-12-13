import { Application, Request, Response, Router } from 'express';
import { GoogleOAuthUtils } from '../../utils/google-oauth.utils';
import * as userService from '../user/user.service';
import { JWTUtils } from '../../utils/jwt.utils';
import { validateAuthCallback } from './auth.validator';

export const defineAuthRoutes = (app: Application, baseUrl: string): void => {
    const router = Router();

    // GET /api/v1/auth/google - Get Google OAuth URL
    router.get('/google', (req: Request, res: Response) => {
        try {
            const authUrl = GoogleOAuthUtils.generateAuthUrl();

            res.json({
                success: true,
                data: { authUrl },
                message: 'Google OAuth URL generated successfully',
            });
        } catch (error: any) {
            console.error('Error generating Google OAuth URL:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to generate OAuth URL'
            });
        }
    });

    // POST /api/v1/auth/google/callback - Verify code and create/login user
    router.post('/google/callback', validateAuthCallback, async (req: Request, res: Response) => {
        try {
            const { code } = req.body;

            if (!code) {
                return res.status(400).json({
                    success: false,
                    error: 'Authorization code is required'
                });
            }

            // Exchange code for tokens
            const { access_token, refresh_token } = await GoogleOAuthUtils.getTokensFromCode(code);



            // Get user info from Google
            const googleUser = await GoogleOAuthUtils.getUserInfo(access_token);

            // Find or create user in database
            const user = await userService.findOrCreateGoogleUser(
                googleUser.id,
                googleUser.email,
                googleUser.name,
                access_token,
                refresh_token || ''
            );

            // Generate JWT token
            const token = JWTUtils.generateToken(user._id.toString());

            res.json({
                success: true,
                data: { user, token },
                message: 'Google authentication successful',
            });
        } catch (error: any) {
            console.error('Error in Google OAuth callback:', error);
            res.status(500).json({
                success: false,
                error: error.message || 'Google authentication failed'
            });
        }
    });

    // Mount the router at /api/v1/auth
    app.use(`${baseUrl}/auth`, router);
};
