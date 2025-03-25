import type { NextFunction, Request, Response } from "express";

export function responseJson(
  _request: Request,
  response: Response,
  next: NextFunction,
) {
  const originalMethod = response.json;

  response.json = function (
    message: Record<string, object> | Record<string, object>[],
  ) {
    let objResponse: object;

    const statusCode = response.statusCode;

    if (statusCode >= 200) {
      if (
        !Array.isArray(message) &&
        Object.prototype.hasOwnProperty.call(message, "results")
      ) {
        const { results, ...metadata } = message;
        objResponse = { results, metadata: { statusCode, ...metadata } };
      } else {
        objResponse = { results: message, metadata: { statusCode } };
      }
    } else {
      objResponse = { error: message, metadata: { statusCode } };
    }

    //return originalMethod.call(this, "🚀 " + message)
    return originalMethod.call(this, objResponse);
  };

  next();
}
