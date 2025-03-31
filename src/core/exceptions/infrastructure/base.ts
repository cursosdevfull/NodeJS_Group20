export enum InfrastructureExceptionCode {
    Default = "DEFAULT_EXCEPTION",
    DatabaseException = "DATABASE_EXCEPTION",
}

export abstract class InfrastructureException extends Error {
    status!: number;

    constructor(message?: string) {
        super(message);
        Object.setPrototypeOf(this, InfrastructureException.prototype);
        this.name = InfrastructureExceptionCode.Default
    }
}