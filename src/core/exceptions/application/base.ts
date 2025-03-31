export enum ApplicationExceptionCode {
    Default = "DEFAULT_EXCEPTION",
    EmailExistsException = "EMAIL_EXISTS_EXCEPTION",
    UserNotFoundException = "USER_NOT_FOUND_EXCEPTION",
}

export abstract class ApplicationException extends Error {
    status!: number;

    constructor(message?: string) {
        super(message);
        Object.setPrototypeOf(this, ApplicationException.prototype);
        this.name = ApplicationExceptionCode.Default
    }
}