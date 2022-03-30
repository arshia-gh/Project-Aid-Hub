import Joi from 'joi';
import { phone } from 'phone';

export default Joi.object({
	fullname: Joi.string()
		.trim()
		.pattern(/^[a-zA-Z\s]+$/, 'person name')
		.min(3)
		.max(50)
		.required(),
	email: Joi.string().trim().lowercase().email().max(255),
	mobileNo: Joi.string()
		.trim()
		.pattern(/^[0-9()+]+$/)
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
