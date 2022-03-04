import { UniqueConstraintError } from '@sequelize/core';
import { getLoggerInstance } from '../utils/logger.js';
import ApiError from '../utils/errors.js';

const logger = getLoggerInstance(import.meta.url);

export function databaseErrorHandler(err, req, res, next) {
	if (err instanceof UniqueConstraintError) {
		const fields = { ...err.fields, PRIMARY: undefined };
		next(
			ApiError.badRequest(
				'some fields are required to be unique, please try again',
				{
					name: UniqueConstraintError.name,
					fields,
				}
			)
		);
	} else {
		next(err);
	}
}

export function apiErrorHandler(err, req, res, next) {
	if (err instanceof ApiError) {
		res.status(err.code).json({
			error: {
				message: err.message,
				...err.details,
			},
			code: err.code,
		});
		return;
	}

	logger.fatal(err);

	res.status(500).json({
		error: {
			message:
				'something has gone wrong, please contact the administrators',
		},
		code: 500,
	});
}
