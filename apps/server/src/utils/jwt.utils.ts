import jwt, { SignOptions } from 'jsonwebtoken';

export class JWTUtils {
    static generateToken(userId: string): string {
        return jwt.sign(
            { userId },
            process.env.JWT_SECRET! as string,
            { expiresIn: process.env.JWT_EXPIRES_IN || '7d' } as SignOptions
        );
    }

    static verifyToken(token: string): any {
        try {
            return jwt.verify(token, process.env.JWT_SECRET!);
        } catch (error) {
            throw new Error('Invalid token');
        }
    }
}
