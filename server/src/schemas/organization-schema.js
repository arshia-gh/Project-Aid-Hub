import Joi from 'joi';

export default Joi.object({
	name: Joi.string().max(255).required(),
	address: Joi.string().max(255).required(),
});
