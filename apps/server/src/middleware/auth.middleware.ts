import { Response, NextFunction } from 'express';
import { AuthRequest } from '../types';
import { JWTUtils } from '../utils/jwt.utils';
import User from '../modules/user/user.model';

export const authenticate = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        // Get token from header
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            res.status(401).json({ success: false, error: 'No token provided' });
            return;
        }

        // Verify token
        const decoded = JWTUtils.verifyToken(token);

        // Find user
        const user = await User.findById(decoded.userId).select('-password');

        if (!user) {
            res.status(401).json({ success: false, error: 'User not found' });
            return;
        }

        // Attach user to request
        const userObject = user.toObject();
        req.user = {
            ...userObject,
            _id: userObject._id.toString(),
        };
        next();
    } catch (error) {
        res.status(401).json({ success: false, error: 'Invalid token' });
    }
};
