export const ERROR_CODE = {
	INTERNAL: 500,
	NOT_FOUND: 404,
	FORBIDDEN: 403,
	UNAUTHORIZED: 401,
	BAD_REQUEST: 400,
};

class ApiError extends Error {
	constructor(code, message, details) {
		super(message);
		this.code = code;
		this.details = details;
	}

	static badRequest(message, details) {
		return new ApiError(ERROR_CODE.BAD_REQUEST, message, details);
	}

	static unauthorized(message, details) {
		return new ApiError(ERROR_CODE.UNAUTHORIZED, message, details);
	}

	static forbidden(message, details) {
		return new ApiError(ERROR_CODE.FORBIDDEN, message, details);
	}

	static notFound(message, details) {
		return new ApiError(ERROR_CODE.NOT_FOUND, message, details);
	}

	static internal(message, details) {
		return new ApiError(ERROR_CODE.INTERNAL, message, details);
	}
}

export default ApiError;
