import Joi from 'joi';

export default Joi.object({
	description: Joi.string().trim().max(255).required().label('Description'),
	estimatedValue: Joi.number().positive().required().label('Estimated value'),
});
