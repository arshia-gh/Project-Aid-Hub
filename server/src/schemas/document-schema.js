import Joi from 'joi';

export default Joi.object({
	filename: Joi.string().trim().min(6).max(255).required(),
	description: Joi.string().trim().max(255).required(),
});
