import Joi from 'joi';

export default Joi.object({
	fromDate: Joi.date().iso().min('now').required().label('Starting date'),
	toDate: Joi.date()
		.iso()
		.greater(Joi.ref('fromDate'))
		.required()
		.label('Ending date')
		.messages({
			'date.greater': 'Ending date must be greater than starting date',
		}),
	targetAmount: Joi.number().positive().required().label('Target amount'),
	title: Joi.string().trim().min(6).max(255).required().label('Title'),
	description: Joi.string().trim().min(6).required().label('Description'),
});
