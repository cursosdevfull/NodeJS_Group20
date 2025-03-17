import { Request, Response, NextFunction } from "express"

export function responseJSON(request: Request, response: Response, next: NextFunction) {
    const originalMethod = response.json

    response.json = function (message: Record<string, any> | Record<string, any>[]) {
        let objResponse

        const statusCode = response.statusCode

        if (statusCode >= 200) {
            if (!Array.isArray(message) && message.hasOwnProperty('results')) {
                const { results, ...metadata } = message
                objResponse = { results, metadata: { statusCode, ...metadata } }
            } else {
                objResponse = { results: message, metadata: { statusCode } }
            }
        } else {
            objResponse = { error: message, metadata: { statusCode } }
        }


        //return originalMethod.call(this, "🚀 " + message)
        return originalMethod.call(this, objResponse)
    }

    next()
}