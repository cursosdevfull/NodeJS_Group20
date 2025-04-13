export class DatabaseException extends Error {
    readonly status: number;

    constructor(message: string) {
        super(message);
        this.name = "DatabaseException";
        this.status = 500;
    }
}