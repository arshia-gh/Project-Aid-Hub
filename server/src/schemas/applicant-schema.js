import Joi from 'joi';
import User from './user-schema.js';

export default User.keys({
	IDno: Joi.string()
		.trim()
		.uppercase()
		.pattern(/^[A-Z0-9]+$/)
		.length(12)
		.required(),

	householdIncome: Joi.number().min(0).required(),
	address: Joi.string().trim().max(255).required(),
	email: User.extract('email').when('mobileNo', {
		is: Joi.exist(),
		then: Joi.required(),
	}),
});
