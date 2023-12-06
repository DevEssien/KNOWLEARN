export class APIError extends Error {
    private errorType: string;
    constructor(public message: string, public statusCode: number = 400) {
        super(message);
        this.errorType = 'APIError';
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
    
    getType() {
        return this.errorType;
    }
}