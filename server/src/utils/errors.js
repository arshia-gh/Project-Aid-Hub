export const ERROR_CODE = {
	NOT_FOUND: 404,
	FORBIDDEN: 403,
	UNAUTHORIZED: 401,
	BAD_REQUEST: 400,
};

export class APIError extends Error {
	constructor(message, statusCode) {
		super(message);
		this.statusCode = statusCode;
	}
}

export class BadRequestError extends APIError {
	constructor(message) {
		super(message, ERROR_CODE.BAD_REQUEST);
	}
}

export class NotFoundError extends APIError {
	constructor(message) {
		super(message, ERROR_CODE.NOT_FOUND);
	}
}

export class UnauthorizedError extends APIError {
	constructor(message) {
		super(message, ERROR_CODE.UNAUTHORIZED);
	}
}

export class ForbiddenError extends APIError {
	constructor(message) {
		super(message, ERROR_CODE.FORBIDDEN);
	}
}

export default {
	APIError,
	NotFoundError,
	ForbiddenError,
	UnauthorizedError,
	BadRequestError,
};
