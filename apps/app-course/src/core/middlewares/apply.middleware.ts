import { RoleUser } from "@core/enums";
import { ValidationArgumentsType } from "@core/types";
import { NextFunction, Request, Response } from "express";
import { authentication } from "./authentication.middleware";
import { authorization } from "./authorization.middleware";
import { validation } from "./validation.middleware";

type Props = {
    isAuthenticated?: boolean,
    rolesAllowed?: RoleUser[],
    schemasValidation?: ValidationArgumentsType
}

export function applyMiddlewares(props: Props) {
    return (req: Request, res: Response, next: NextFunction) => {
        const { isAuthenticated, rolesAllowed, schemasValidation } = props;

        if (isAuthenticated) {
            authentication(req, res, next);
        }

        if (rolesAllowed && rolesAllowed.length > 0) {
            authorization(...rolesAllowed)(req, res, next);
        }

        if (schemasValidation) {
            console.log("schemasValidation", schemasValidation);
            validation(schemasValidation)(req, res, next);
        }
    };
}