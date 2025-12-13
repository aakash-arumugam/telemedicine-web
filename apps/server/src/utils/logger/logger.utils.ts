import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import path from 'path';

// Get log retention days from environment variable, default to 14 days
const LOG_RETENTION_DAYS = process.env.LOG_RETENTION_DAYS || '14';

// Store created loggers to avoid duplicates
const loggers = new Map<string, winston.Logger>();

/**
 * Creates or retrieves a logger with the specified name
 * @param loggerName - Name of the logger (will create a folder logs/loggerName)
 * @returns Winston logger instance
 */
export const createLogger = (loggerName: string = 'app'): winston.Logger => {
    // Return existing logger if already created
    if (loggers.has(loggerName)) {
        return loggers.get(loggerName)!;
    }

    // Define log directory path
    const logDir = path.join(process.cwd(), 'logs', loggerName);

    // Create custom format
    const logFormat = winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.errors({ stack: true }),
        winston.format.splat(),
        winston.format.json()
    );

    // Console format for development
    const consoleFormat = winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.printf(({ timestamp, level, message, ...meta }) => {
            let msg = `${timestamp} [${level}]: ${message}`;
            if (Object.keys(meta).length > 0) {
                msg += ` ${JSON.stringify(meta)}`;
            }
            return msg;
        })
    );

    // Daily rotate file transport for error logs
    const errorFileTransport = new DailyRotateFile({
        filename: path.join(logDir, 'error-%DATE%.log'),
        datePattern: 'YYYY-MM-DD',
        level: 'error',
        maxFiles: `${LOG_RETENTION_DAYS}d`,
        format: logFormat,
        zippedArchive: true,
    });

    // Daily rotate file transport for combined logs
    const combinedFileTransport = new DailyRotateFile({
        filename: path.join(logDir, 'combined-%DATE%.log'),
        datePattern: 'YYYY-MM-DD',
        maxFiles: `${LOG_RETENTION_DAYS}d`,
        format: logFormat,
        zippedArchive: true,
    });

    // Daily rotate file transport for info logs
    const infoFileTransport = new DailyRotateFile({
        filename: path.join(logDir, 'info-%DATE%.log'),
        datePattern: 'YYYY-MM-DD',
        level: 'info',
        maxFiles: `${LOG_RETENTION_DAYS}d`,
        format: logFormat,
        zippedArchive: true,
    });

    // Create the logger
    const logger = winston.createLogger({
        level: process.env.LOG_LEVEL || 'info',
        format: logFormat,
        transports: [
            errorFileTransport,
            combinedFileTransport,
            infoFileTransport,
        ],
    });

    // Add console transport in development
    if (process.env.NODE_ENV !== 'production') {
        logger.add(new winston.transports.Console({
            format: consoleFormat,
        }));
    }

    // Store logger for reuse
    loggers.set(loggerName, logger);

    return logger;
};