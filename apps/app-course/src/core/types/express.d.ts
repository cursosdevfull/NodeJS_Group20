import 'express';

declare global {
    namespace Express {
        interface Request {
            // biome-ignore lint/suspicious/noExplicitAny: <explanation>
            validatedQuery?: any;
        }
    }
}