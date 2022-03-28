import Joi from 'joi';
import { phone } from 'phone';

export default Joi.object({
	fullname: Joi.string()
		.pattern(/^[a-zA-Z ]+$/, 'person name')
		.min(3)
		.max(50)
		.required(),
	email: Joi.string().email().max(255),
	mobileNo: Joi.string()
		.pattern(/^[0-9()+-\s]+$/)
		.custom((value) => {
			const { isValid, phoneNumber } = phone(value, {
				country: 'MY',
			});

			if (isValid) {
				return phoneNumber.slice(1);
			}

			throw new Error('mobile number is not a valid malaysian number');
		})
		.max(12),
});
