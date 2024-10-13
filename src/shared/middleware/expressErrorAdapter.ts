import { Request, Response, NextFunction } from 'express';
import { handleApplicationError } from '../errorHandler';

export const expressErrorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const { message, statusCode } = handleApplicationError(err);
    res.status(statusCode).send({ error: message });
};