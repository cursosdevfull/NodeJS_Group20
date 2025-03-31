import { ApplicationException, ApplicationExceptionCode } from "./base";

export class ApplicationEmailExistsException extends ApplicationException {
    constructor(message?: string) {
        super(message)
        this.name = ApplicationExceptionCode.EmailExistsException
        this.status = 411
    }
}

export class ApplicationUserNotFoundException extends ApplicationException {
    constructor(message?: string) {
        super(message)
        this.name = ApplicationExceptionCode.UserNotFoundException
        this.status = 411
    }
}