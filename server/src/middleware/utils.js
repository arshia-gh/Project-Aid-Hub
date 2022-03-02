import { BadRequestError } from '../utils/errors.js';

export const promisify = (func) => {
	return (req, res, next) => {
		Promise.resolve(func(req, res, next)).catch(next);
	};
};

export const requireParameters = (keys) => {
	return (req, res, next) => {
		req.requiredParameters = {};
		const missingKeys = keys.filter((key) => {
			req.requiredParameters[key] = req.body[key];
			return req.requiredParameters[key] == null;
		});

		if (missingKeys.length == 0) {
			return next();
		}

		const isPlural = missingKeys.length != 1;

		const msg =
			`Parameter${isPlural ? 's' : ''} ` +
			missingKeys.join(', ') +
			` ${isPlural ? 'are' : 'is'} required`;
		next(new BadRequestError(msg));
	};
};
