export class ApplicationException extends Error {
    status!: number;

    constructor(message: string) {
        super(message);
        this.name = "ApplicationException";
    }
}