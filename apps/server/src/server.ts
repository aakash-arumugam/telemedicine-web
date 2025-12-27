import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/database';
import { defineUserRoutes } from './modules/user/user.routes';
import { defineAuthRoutes } from './modules/auth/auth.routes';
import { errorHandler } from './middleware/errorHandler';
import { defineDoctorRoutes } from '@modules/doctor/doctor.routes';
import { defineAvailabilityRoutes } from '@modules/availability/availability.routes';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/', (req: Request, res: Response) => {
    res.json({
        success: true,
        message: 'ExpenseTrack API is running...',
        version: 'v1',
    });
});

// API Routes - /api/v1
const API_PREFIX = '/api/v1';
defineUserRoutes(app, API_PREFIX);
defineDoctorRoutes(app, API_PREFIX);
defineAuthRoutes(app, API_PREFIX);
defineAvailabilityRoutes(app, API_PREFIX);

// Error handler (must be last)
app.use(errorHandler);

// Connect to MongoDB and start server
const startServer = async () => {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
        console.log(`📡 API available at http://localhost:${PORT}${API_PREFIX}`);
    });
};

startServer();
