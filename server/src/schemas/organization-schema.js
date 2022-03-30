import Joi from 'joi';

export default Joi.object({
	name: Joi.string().trim().max(255).required(),
	address: Joi.string().trim().max(255).required(),
});
