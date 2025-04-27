import {Request, Response, NextFunction } from 'express';
export class RequestTimingMiddleware {
    static handle(req: Request, res: Response, next: NextFunction) {
        const start = Date.now();
        res.on('finish', () => {
            const duration = Date.now() - start;
            console.log(`Request to ${req.method} ${req.originalUrl} took ${duration}ms`);
        });
        next();
    }
}