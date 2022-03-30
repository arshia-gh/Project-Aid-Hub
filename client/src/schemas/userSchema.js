/* eslint-disable no-template-curly-in-string */
import { string, object } from 'yup';

export default object({
	fullname: string()
		.trim()
		.matches(/^[a-zA-Z\s]+$/, 'Full name contains invalid characters')
		.min(3, 'Full name must be at least ${min} characters')
		.max(50, 'Full name must be at most ${max} characters')
		.required('Required'),
	email: string()
		.trim()
		.lowercase()
		.email('Invalid email address format')
		.max(255, 'Email address must be at most ${max} characters'),
	mobileNo: string()
		.trim()
		.matches(/^[0-9()+]+$/, 'Invalid mobile number format')
		.min(10, 'Mobile number must be at least ${min} characters')
		.max(12, 'Mobile number must be at most ${max} characters'),
});
