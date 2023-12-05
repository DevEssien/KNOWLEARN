export class APIError extends Error {
    constructor(public message: string, public statusCode: number = 400) {
        super(message);
        Error.captureStackTrace(this, this.constructor);
    }
}