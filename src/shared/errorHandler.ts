import { Logger } from './logger';

export class ApplicationError extends Error {
    constructor(message: string, public statusCode: number = 500) {
        super(message);
        this.name = "ApplicationError";
    }
}

// Generic error handler that logs the error and returns a standardized format
export const handleApplicationError = (error: Error): { message: string; statusCode: number } => {
    if (error instanceof ApplicationError) {
        Logger.warn(`Application error: ${error.message}`);
        return { message: error.message, statusCode: error.statusCode };
    }

    Logger.error(`Unexpected error: ${error.message}`);
    return { message: 'Something went wrong', statusCode: 500 };
};