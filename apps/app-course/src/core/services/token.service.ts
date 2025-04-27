import * as jwt from 'jsonwebtoken';
import {v4 as uuidv4} from 'uuid';
import { env } from '../../env';

enum ErrorAccessToken {
    JwtExpired = "jwt expired",
    JwtInvalid = "invalid token"
}

export const generateRefreshToken = () => uuidv4();

export const generateAccessToken = (name: string, roles: string[]) => {
    const payload = {
        name,
        roles,
    };
    return jwt.sign(payload as object, env.JWT_SECRET, {
        expiresIn: env.JWT_EXPIRES_IN} as jwt.SignOptions);
}

export const verifyAccessToken = (token: string) => {
    try {
        return jwt.verify(token, env.JWT_SECRET) as jwt.JwtPayload; 
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    } catch (error: any) {
        console.log('Error verifying token:', error.message);
        if (error.message === ErrorAccessToken.JwtInvalid) {
            return {statusCode: 401, message: 'Invalid token'};
        } 
        return {statusCode: 409, message: 'Token expired'};
    
    }
}