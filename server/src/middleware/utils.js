import { createValidator } from 'express-joi-validation';

export const promisify = (func) => {
	return (req, res, next) => {
		Promise.resolve(func(req, res, next)).catch(next);
	};
};

export const validator = createValidator({ passError: true });
