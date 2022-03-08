import Joi from 'joi';

export default Joi.object({
	filename: Joi.string().min(3).max(255).required(),
	description: Joi.string().min(3).max(255),
});
