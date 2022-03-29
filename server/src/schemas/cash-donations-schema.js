import Joi from 'joi';

export default Joi.object({
	amount: Joi.number().positive().required(),
	paymentChannel: Joi.string()
		.trim()
		.max(255)
		.required()
		.label('Payment channel'),
	referenceNo: Joi.string()
		.trim()
		.max(255)
		.required()
		.label('Reference number'),
});
