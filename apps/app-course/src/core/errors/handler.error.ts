import type { NextFunction, Request, Response } from "express";

interface Ierror extends Error {
    status: number;
}

export function PathNotFoundException(request: Request, response: Response) {
    const { method, url } = request;
    const message = `Path not found: ${method} ${url}`;
    const statusCode = 404;

    response.status(statusCode).json({ message, metadata: { statusCode } });
}

export function GeneralException(error: Ierror, _request: Request, response: Response, _next: NextFunction) {
    const environment = process.env.NODE_ENV || "development";

    console.log("==========================");
    console.log(error)
    console.log("==========================");

    if (environment !== "production") {
        response.status(error.status).json({ message: error.message, stack: error.stack, metadata: { status: error.status } });
    }
    else {
        response.status(error.status).json({ message: error.message, metadata: { status: error.status } });
    }
}