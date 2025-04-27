import { ParametersType, ValidationArgumentsType } from '@core/types';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import type { NextFunction, Request, Response } from 'express';

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
                forbidNonWhitelisted: true,
                skipNullProperties: true,
            });

            if (errorsValidation.length > 0) {
                response.status(411).json({ message: "Invalid data", errors: errorsValidation });
                return;
            }

            // Handle query parameters differently since they're read-only
            if (parameterType === 'query') {
                // Create a property to store the validated query
                Object.defineProperty(request, 'validatedQuery', {
                    value: instance,
                    writable: true,
                    configurable: true
                });
            } else {
                // For other parameters, replace the originals with validated ones
                request[parameterType] = instance;
            }
        }
        next();
    }
}