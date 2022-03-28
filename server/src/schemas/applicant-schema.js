import Joi from 'joi';
import User from './user-schema.js';

export default User.keys({
	IDno: Joi.string()
		.pattern(/^[0-9]+$/, 'ID number')
		.length(12)
		.required(),

	householdIncome: Joi.number().min(0).required(),
	address: Joi.string().max(255).required(),
	email: User.extract('email').when('mobileNo', {
		is: Joi.exist(),
		then: Joi.required(),
	}),
});
