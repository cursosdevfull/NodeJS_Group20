import { RoleUser } from "@core/enums";
import { NextFunction, Request, Response } from "express";

export function authorization(...rolesAllowed: RoleUser[]) {
    return (_req: Request, res: Response, _next: NextFunction) => {
        const roles = res.locals.roles as string[];

        const hasRole = roles.some(role => rolesAllowed.includes(role as RoleUser));

        if (!hasRole) {
            res.status(403).json({ message: 'Forbidden' });
            //return;
        }

        //next();
    }
}