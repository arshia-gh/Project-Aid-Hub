import Joi from 'joi';

export default Joi.object({
	description: Joi.string().trim().max(255).required(),
	estimatedValue: Joi.number().positive().required().label('Estimated value'),
});
