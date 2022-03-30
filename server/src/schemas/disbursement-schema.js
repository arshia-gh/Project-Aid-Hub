import Joi from 'joi';

export default Joi.object({
	disbursementDate: Joi.date()
		.iso()
		.min('now')
		.required()
		.messages({
			'date.min':
				'Disbursement date must be greater or equal to current date',
		})
		.label('Disbursement date'),
	amount: Joi.number().positive().required().label('Cash amount'),
	description: Joi.string().max(255).required().label('Description'),
	IDno: Joi.string()
		.trim()
		.uppercase()
		.pattern(/^[A-Z0-9]+$/)
		.length(12)
		.required()
		.label('ID Number'),
});
