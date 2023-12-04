export class APIError extends Error {
    status: string;
    errors: Array<object>;
    constructor(public message: string, public statusCode: number = 400, errors: Array<object> = []) {
        super(message);
        this.status = 'error';
        this.errors = errors
        Error.captureStackTrace(this, this.constructor);
    }
}