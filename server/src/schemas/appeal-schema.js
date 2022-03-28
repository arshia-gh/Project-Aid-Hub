import Joi from 'joi';

export default Joi.object({
	fromDate: Joi.date().iso().min('now').required(),
	toDate: Joi.date().greater(Joi.ref('fromDate')).required(),
	title: Joi.string().trim().min(6).max(255).required(),
	description: Joi.string().trim().min(6).required(),
});
