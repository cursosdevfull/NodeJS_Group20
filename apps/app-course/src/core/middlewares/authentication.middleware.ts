import { verifyAccessToken } from "@core/services";
import { NextFunction, Request, Response } from "express";

function isAuthorizationHeaderPresent(req: Request): boolean {
    return req.headers.authorization !== undefined;
}

function isAuthorizationHeaderValid(req: Request): boolean {
    const { authorization } = req.headers;
    if (!authorization) return false;
    const [prefix, content] = authorization.split(' ');
    return prefix === 'Bearer' && !!content;
}

function getAuthorizationToken(req: Request): string {
    const { authorization } = req.headers;
    return (authorization as string).split(' ')[1];
}

export function authentication(req: Request, res: Response, next: NextFunction) {
    const isPresent = isAuthorizationHeaderPresent(req);
    if (!isPresent) {
        res.status(401).json({ message: 'Unauthorized' });
        return
    }

    const isValid = isAuthorizationHeaderValid(req);
    if (!isValid) {
        res.status(401).json({ message: 'Unauthorized' });
        return
    }

    const token = getAuthorizationToken(req);

    const payload = verifyAccessToken(token);
    if (Object.hasOwn(payload, 'statusCode')) {
        res.status(payload.statusCode).json({ message: payload.message });
        return
    }

    res.locals.roles = payload.roles;

    next()
} 