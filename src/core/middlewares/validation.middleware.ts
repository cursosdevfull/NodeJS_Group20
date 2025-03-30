import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import type { NextFunction, Request, Response } from 'express';

type ParametersType = "body" | "query" | "params" | "headers";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
type ValidationArgumentsType = Partial<Record<ParametersType, new (...args: any[]) => any>>;

export function validation(parameters: ValidationArgumentsType) {
    return async (request: Request, response: Response, next: NextFunction) => {
        const parametersType = Object.keys(parameters) as ParametersType[];

        for (const parameterType of parametersType) {
            const parameter = parameters[parameterType];
            const parameterValue = request[parameterType];

            if (!parameter) continue;

            if (!parameterValue) {
                response.status(400).json({ message: `${parameterType} is required` });
                return;
            }

            // Transformar primero usando class-transformer
            const instance = plainToInstance(parameter, parameterValue, {
                enableImplicitConversion: true,
            });

            const errorsValidation = await validate(instance, {
                whitelist: true,
                forbidNonWhitelisted: true
            });

            if (errorsValidation.length > 0) {
                response.status(411).json({ message: "Invalid data", errors: errorsValidation });
                return;
            }

            // Sustituir los valores originales con los transformados
            request[parameterType] = instance;
        }
        next();
    }
}