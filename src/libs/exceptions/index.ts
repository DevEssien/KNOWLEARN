import { APIError } from '../../core/ApiError';

export class ServiceException extends APIError {
  constructor(message: string = 'Malformed or Invalid Request Parameters!') {
    super(message, 400);
  }
}

export class AuthenticationException extends APIError {
  constructor(message: string = 'Authentication Failed!') {
    super(message, 401);
  }
}

export class AuthorizationException extends APIError {
  constructor(message: string = 'Unauthorized!') {
    super(message, 403);
  }
}

export class NotFoundException extends APIError {
  constructor(message: string = 'Not Found!') {
    super(message, 404);
  }
}
export class ResourceConflictException extends APIError {
  constructor(message: string = 'Already Exist!') {
    super(message, 409);
  }
}

export class ValidationException extends APIError {
  errors: Array<object>;
  constructor(message: string = 'Invalid Input!',  errors: Array<object> = []) {
    super(message, 422);
    this.errors = errors
  }
}

export class InternalServerException extends APIError {
  constructor(message: string = 'Internal Server Error') {
    super(message, 500);
  }
}