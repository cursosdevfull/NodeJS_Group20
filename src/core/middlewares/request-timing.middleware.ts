import type { NextFunction, Request, Response } from "express";

export function requestTiming(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const start = Date.now();

  response.on("finish", () => {
    const elapsed = Date.now() - start;
    console.log(
      `Request to ${request.path} with method ${request.method} took ${elapsed}ms : ${new Date().toUTCString()}`,
    );
  });

  next();
}
