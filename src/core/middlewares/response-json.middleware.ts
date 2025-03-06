import { Request, Response, NextFunction } from "express"

export function responseJSON(request: Request, response: Response, next: NextFunction) {
    const originalMethod = response.send

    response.send = function (message: string) {
        return originalMethod.call(this, "🚀 " + message)
    }

    next()
}