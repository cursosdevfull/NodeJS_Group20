import { InfrastructureException, InfrastructureExceptionCode } from "./base";

export class DatabaseException extends InfrastructureException {
    constructor(message?: string) {
        super(message)
        this.name = InfrastructureExceptionCode.DatabaseException
        this.status = 500
    }
}